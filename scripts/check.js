#!/usr/bin/env node
/** Post-build checks: internal links resolve, anchors exist, images have alt text, ids are unique. */
const fs = require('fs');
const path = require('path');
const DIST = path.join(__dirname, '..', 'dist');

const files = [];
(function walk(d) { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); e.isDirectory() ? walk(p) : p.endsWith('.html') && files.push(p); } })(DIST);

const pageOf = (f) => '/' + path.relative(DIST, f).replace(/index\.html$/, '').replace(/\\/g, '/');
const ids = {};
const problems = [];
for (const f of files) {
  const h = fs.readFileSync(f, 'utf8');
  const list = [...h.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  ids[pageOf(f)] = new Set(list);
  const dup = list.filter((x, i) => list.indexOf(x) !== i);
  if (dup.length) problems.push(`${pageOf(f)}: duplicate ids ${[...new Set(dup)].join(', ')}`);
  for (const m of h.matchAll(/<img\b[^>]*>/g)) {
    if (!/\salt="[^"]+"/.test(m[0])) problems.push(`${pageOf(f)}: image without alt`);
    const srcs = [(m[0].match(/\ssrc="([^"]+)"/) || [])[1], ...((m[0].match(/\ssrcset="([^"]+)"/) || [])[1] || '').split(',').map((x) => x.trim().split(' ')[0])];
    for (const src of srcs) if (src && src.startsWith('/') && !fs.existsSync(path.join(DIST, src))) problems.push(`${pageOf(f)}: missing image ${src}`);
  }
}
for (const f of files) {
  const h = fs.readFileSync(f, 'utf8');
  for (const [, href] of h.matchAll(/href="(\/[^"]*|#[^"]*)"/g)) {
    const [p, hash] = href.split('#');
    const target = (p || pageOf(f)).split('?')[0];
    if (target.startsWith('/assets/')) { if (!fs.existsSync(path.join(DIST, target))) problems.push(`${pageOf(f)}: missing asset ${target}`); continue; }
    if (!ids[target]) { problems.push(`${pageOf(f)}: broken link ${href}`); continue; }
    if (hash && !ids[target].has(hash)) problems.push(`${pageOf(f)}: missing anchor ${href}`);
  }
}
if (problems.length) { console.error(problems.join('\n')); process.exit(1); }
console.log(`Checked ${files.length} pages: links, anchors, images, alt text and ids OK.`);
