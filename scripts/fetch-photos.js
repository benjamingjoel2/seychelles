#!/usr/bin/env node
/**
 * Downloads every photo listed in src/data/photos.js into src/assets/photos/ as WebP at
 * a few widths, so the site serves images from its own domain (faster, and not blocked by
 * privacy extensions that stop third-party image hosts). Existing files are skipped.
 *
 *   npm run photos
 *
 * Run it after adding a photo to src/data/photos.js, then commit the new files.
 * Wikimedia Commons photos are resized locally and need ImageMagick (`convert`) with WebP support.
 */
const fs = require('fs');
const path = require('path');
const photos = require('../src/data/photos.js');

const OUT = path.join(__dirname, '..', 'src', 'assets', 'photos');
const WIDTHS = require('../src/lib/photo-widths.js');

const { execFileSync } = require('child_process');
const crypto = require('crypto');
const UA = { 'User-Agent': 'granite-coast-site/1.0 (photo registry; benjamin@hyperportergroup.com)' };

// Wikimedia Commons: fetch one large copy (1920px thumb, or the original if smaller), then resize
// locally with ImageMagick to every width. Commons rate-limits busy addresses, so retry patiently.
async function commons(p) {
  const name = p.file.replace(/ /g, '_');
  const h = crypto.createHash('md5').update(name).digest('hex');
  const e = encodeURIComponent(name);
  const base = `https://upload.wikimedia.org/wikipedia/commons/${h[0]}/${h.slice(0, 2)}/${e}`;
  const thumb = `https://upload.wikimedia.org/wikipedia/commons/thumb/${h[0]}/${h.slice(0, 2)}/${e}/1920px-${e}`;
  for (let i = 0; i < 40; i++) {
    for (const u of [thumb, base]) {
      const r = await fetch(u, { headers: UA });
      if (r.ok) return Buffer.from(await r.arrayBuffer());
      if (r.status === 429) break;
    }
    await new Promise((res) => setTimeout(res, 30000));
  }
  throw new Error(`Commons download failed for ${p.file}`);
}

const url = (p, w) =>
  p.source === 'pexels'
    ? `${p.img}?auto=compress&cs=tinysrgb&fm=webp&fit=max&w=${w}&h=${w}`
    : `${p.img}?fm=webp&q=62&fit=max&w=${w}&h=${w}`;
// `fit=max` with w = h bounds both dimensions, so portrait photos don't come out huge.

/** Pixel size of a WebP file (lossy VP8, lossless VP8L or extended VP8X). */
function webpSize(buf) {
  const kind = buf.toString('ascii', 12, 16);
  if (kind === 'VP8 ') return [buf.readUInt16LE(26) & 0x3fff, buf.readUInt16LE(28) & 0x3fff];
  if (kind === 'VP8L') {
    const b = buf.readUInt32LE(21);
    return [(b & 0x3fff) + 1, ((b >> 14) & 0x3fff) + 1];
  }
  if (kind === 'VP8X') return [buf.readUIntLE(24, 3) + 1, buf.readUIntLE(27, 3) + 1];
  throw new Error(`Unknown WebP chunk ${kind}`);
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const all = [...new Map(Object.values(photos).flat().map((p) => [p.id, p])).values()];
  let got = 0, failed = 0;
  for (const p of all) {
    if (p.source === 'wikimedia') {
      if (WIDTHS.every((w) => fs.existsSync(path.join(OUT, `${p.id}-${w}.webp`)))) continue;
      try {
        const tmp = path.join(OUT, `${p.id}.orig`);
        fs.writeFileSync(tmp, await commons(p));
        for (const w of WIDTHS) {
          execFileSync('convert', [tmp, '-auto-orient', '-strip', '-resize', `${w}x${w}>`, '-quality', '62', path.join(OUT, `${p.id}-${w}.webp`)]);
          got++;
        }
        fs.rmSync(tmp);
      } catch (e) {
        failed++;
        console.error(`Failed ${p.id} (${p.file}): ${e.message}`);
      }
      continue;
    }
    for (const w of WIDTHS) {
      const file = path.join(OUT, `${p.id}-${w}.webp`);
      if (fs.existsSync(file)) continue;
      try {
        const r = await fetch(url(p, w));
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        fs.writeFileSync(file, Buffer.from(await r.arrayBuffer()));
        got++;
      } catch (e) {
        failed++;
        console.error(`Failed ${p.id} @${w}: ${e.message}`);
      }
    }
  }
  // Record real pixel sizes so the build can write accurate srcset descriptors.
  const sizes = {};
  for (const f of fs.readdirSync(OUT).filter((f) => f.endsWith('.webp')).sort()) {
    sizes[f] = webpSize(fs.readFileSync(path.join(OUT, f)));
  }
  fs.writeFileSync(path.join(__dirname, '..', 'src', 'data', 'photo-sizes.json'), JSON.stringify(sizes, null, 0).replace(/],/g, '],\n') + '\n');
  console.log(`Downloaded ${got} files, ${failed} failed, ${all.length} photos in total.`);
  if (failed) process.exit(1);
})();
