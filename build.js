#!/usr/bin/env node
/**
 * Zero-dependency static site build.
 *   node build.js          build into dist/
 *   node build.js --serve  build, then serve dist/ on http://localhost:3000 and rebuild on change
 */
const fs = require('fs');
const path = require('path');
const http = require('http');

const ROOT = __dirname;
const DIST = path.join(ROOT, 'dist');
const SRC = path.join(ROOT, 'src');

function freshRequire(p) {
  // Drop cached project modules so --serve picks up edits.
  for (const k of Object.keys(require.cache)) if (k.startsWith(ROOT) && !k.includes('node_modules')) delete require.cache[k];
  return require(p);
}

// ---------- WCAG contrast ----------
function lum(hex) {
  const v = hex.replace('#', '').match(/../g).map((h) => parseInt(h, 16) / 255);
  const [r, g, b] = v.map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
const contrast = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};

function checkContrast(config) {
  const fails = [];
  for (const [fg, bg] of config.contrastPairs) {
    const ratio = contrast(config.palette[fg], config.palette[bg]);
    if (ratio < 4.5) fails.push(`${fg} on ${bg}: ${ratio.toFixed(2)}:1`);
  }
  if (fails.length) throw new Error(`Palette fails WCAG AA (4.5:1) for:\n  ${fails.join('\n  ')}`);
}

const kebab = (s) => s.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);

function copyDir(from, to) {
  fs.mkdirSync(to, { recursive: true });
  for (const e of fs.readdirSync(from, { withFileTypes: true })) {
    const a = path.join(from, e.name), b = path.join(to, e.name);
    e.isDirectory() ? copyDir(a, b) : fs.copyFileSync(a, b);
  }
}

function build() {
  const t0 = Date.now();
  const config = freshRequire(path.join(ROOT, 'site.config.js'));
  checkContrast(config);

  fs.rmSync(DIST, { recursive: true, force: true });
  copyDir(path.join(SRC, 'assets'), path.join(DIST, 'assets'));

  // Palette -> CSS custom properties, prepended to the stylesheet.
  const tokens = `:root{${Object.entries(config.palette).map(([k, v]) => `--${kebab(k)}:${v}`).join(';')}}\n`;
  const cssPath = path.join(DIST, 'assets/css/site.css');
  fs.writeFileSync(cssPath, tokens + fs.readFileSync(cssPath, 'utf8'));

  // Favicon in brand colours.
  fs.writeFileSync(path.join(DIST, 'assets/favicon.svg'),
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" rx="8" fill="${config.palette.sand}"/><path d="M4 30c4-10 9-16 15-16 5 0 7 4 11 4 3 0 5-2 6-3v15H4z" fill="${config.palette.granite}"/><path d="M4 31c6-2 10 2 16 0s10-2 16 0v5H4z" fill="${config.palette.oceanBright}"/></svg>`);

  const pageModules = ['home', 'islands', 'beaches', 'nature', 'plan', 'misc'];
  const pages = pageModules.flatMap((m) => freshRequire(path.join(SRC, 'pages', `${m}.js`))());
  // Credits must be built after every other page has registered its photos.
  pages.push(freshRequire(path.join(SRC, 'pages', 'misc.js')).creditsPage());

  for (const p of pages) {
    const file = p.path.endsWith('.html') ? path.join(DIST, p.path) : path.join(DIST, p.path, 'index.html');
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, p.html);
  }

  const indexable = pages.filter((p) => !p.path.endsWith('.html') && !p.html.includes('content="noindex"'));
  fs.writeFileSync(path.join(DIST, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexable.map((p) => `  <url><loc>${config.url}${p.path}</loc></url>`).join('\n')}\n</urlset>\n`);
  fs.writeFileSync(path.join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${config.url}/sitemap.xml\n`);

  console.log(`Built ${pages.length} pages into dist/ in ${Date.now() - t0} ms`);
  return pages;
}

function serve() {
  const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.xml': 'application/xml', '.txt': 'text/plain' };
  http.createServer((req, res) => {
    let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    let file = path.join(DIST, p);
    if (!file.startsWith(DIST)) return res.writeHead(403).end();
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
    if (!fs.existsSync(file)) {
      if (!p.endsWith('/') && fs.existsSync(path.join(DIST, p, 'index.html'))) return res.writeHead(308, { Location: p + '/' }).end();
      res.writeHead(404, { 'content-type': types['.html'] });
      return res.end(fs.readFileSync(path.join(DIST, '404.html')));
    }
    res.writeHead(200, { 'content-type': types[path.extname(file)] || 'application/octet-stream' });
    res.end(fs.readFileSync(file));
  }).listen(process.env.PORT || 3000, () => console.log(`Serving http://localhost:${process.env.PORT || 3000}`));

  let timer;
  for (const dir of [SRC, ROOT]) {
    fs.watch(dir, { recursive: dir === SRC }, (_, f) => {
      if (dir === ROOT && f !== 'site.config.js') return;
      clearTimeout(timer);
      timer = setTimeout(() => { try { build(); } catch (e) { console.error(e.message); } }, 100);
    });
  }
}

if (require.main === module) {
  try {
    build();
  } catch (e) {
    console.error(`\nBuild failed: ${e.message}\n`);
    process.exit(1);
  }
  if (process.argv.includes('--serve')) serve();
}

module.exports = { build, contrast };
