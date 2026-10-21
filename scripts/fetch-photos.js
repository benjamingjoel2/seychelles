#!/usr/bin/env node
/**
 * Downloads every photo listed in src/data/photos.js into src/assets/photos/ as WebP at
 * a few widths, so the site serves images from its own domain (faster, and not blocked by
 * privacy extensions that stop third-party image hosts). Existing files are skipped.
 *
 *   npm run photos
 *
 * Run it after adding a photo to src/data/photos.js, then commit the new files.
 */
const fs = require('fs');
const path = require('path');
const photos = require('../src/data/photos.js');

const OUT = path.join(__dirname, '..', 'src', 'assets', 'photos');
const WIDTHS = require('../src/lib/photo-widths.js');

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
