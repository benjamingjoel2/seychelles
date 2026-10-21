const config = require('../../site.config.js');
const photos = require('../data/photos.js');
const PHOTO_WIDTHS = require('./photo-widths.js');
let photoSizes = {};
try { photoSizes = require('../data/photo-sizes.json'); } catch { /* no local photos yet */ }

const esc = (s = '') =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const html = (strings, ...vals) =>
  strings.reduce((out, s, i) => out + s + (i < vals.length ? (Array.isArray(vals[i]) ? vals[i].join('') : vals[i] ?? '') : ''), '');

const utm = `utm_source=${encodeURIComponent(config.brand.name.toLowerCase().replace(/\s+/g, '_'))}&utm_medium=referral`;

const SOURCE = { unsplash: 'Unsplash', pexels: 'Pexels' };
// Unsplash asks for referral parameters on credit links; Pexels links are left clean.
const creditUrl = (p, url) => (p.source === 'unsplash' ? `${url}?${utm}` : url);

/** Every photo used on the site, collected for the credits page. */
const used = new Map();

const two = (n) => String(n).padStart(2, '0');

/** Arrow inside a circle, used on pill buttons and links. */
const arrow = (dir = 'right') =>
  `<span class="arrow" aria-hidden="true"><svg viewBox="0 0 16 16" width="12" height="12"><path d="${
    dir === 'up-right' ? 'M4 12 12 4M5.5 4H12v6.5' : 'M2 8h11M9 4l4 4-4 4'
  }" fill="none" stroke="currentColor" stroke-width="1.5"/></svg></span>`;

/** Small uppercase monospace label, e.g. "(02) Islands". */
const label = (text, n) => `<p class="label">${n != null ? `<span class="label-n">(${two(n)})</span> ` : ''}${esc(text)}</p>`;

/**
 * Responsive photo with credit. If no location-verified photo exists for `slot`,
 * renders a drawn placeholder instead, never a photo of somewhere else.
 */
function photo(slot, { index = 0, ratio = '3:2', sizes = '100vw', eager = false, cls = '', label: lbl = '', caption = true } = {}) {
  const list = photos[slot] || [];
  const p = list[index % (list.length || 1)];
  const [rw, rh] = ratio.split(':').map(Number);
  if (!p) {
    return html`<figure class="photo photo--placeholder ${cls}">
      <div class="placeholder-art" style="aspect-ratio:${rw}/${rh}" role="img" aria-label="${esc(lbl || slot)}: illustration, photograph to come"><span>${esc(lbl)}</span></div>
    </figure>`;
  }
  used.set(p.id, { ...p, slot });
  // Self-hosted copies (see scripts/fetch-photos.js); fall back to the source CDN if missing.
  const local = PHOTO_WIDTHS.map((w) => [`${p.id}-${w}.webp`, w]).filter(([f]) => photoSizes[f]);
  const srcset = local.length
    ? local.map(([f]) => `/assets/photos/${f} ${photoSizes[f][0]}w`).join(', ')
    : [480, 800, 1200, 1800].map((w) => `${remote(p, w, rw, rh)} ${w}w`).join(', ');
  const fallback = local.length ? `/assets/photos/${local[Math.min(1, local.length - 1)][0]}` : remote(p, 1200, rw, rh);
  return html`<figure class="photo ${cls}">
    <img src="${fallback}" srcset="${srcset}" sizes="${sizes}"
      width="1200" height="${Math.round((1200 * rh) / rw)}" alt="${esc(p.alt)}"
      ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" style="aspect-ratio:${rw}/${rh}">
    ${caption ? `<figcaption>${esc(p.location)} · <a href="${creditUrl(p, p.photographer_url)}">${esc(p.photographer)}</a> / <a href="${creditUrl(p, p.page)}">${SOURCE[p.source]}</a></figcaption>` : ''}
  </figure>`;
}

function remote(p, w, rw, rh) {
  return p.source === 'pexels'
    ? `${p.img}?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${Math.round((w * rh) / rw)}`
    : `${p.img}?auto=format&fit=crop&w=${w}&ar=${rw}:${rh}&q=72`;
}

const hasPhoto = (slot) => Boolean((photos[slot] || []).length);

const NAV = [
  ['/islands/', 'Islands'],
  ['/beaches/', 'Beaches'],
  ['/nature/', 'Nature'],
  ['/itineraries/', 'Itineraries'],
  ['/when-to-go/', 'When to go'],
  ['/stays/', 'Stays'],
  ['/journal/', 'Journal'],
  ['/about/', 'About'],
];

/**
 * Page shell. `overlay: true` puts a transparent header over a full-bleed dark hero.
 */
function layout({ title, description = config.brand.description, path = '/', body, scripts = [], data = null, noindex = false, overlay = false }) {
  const fullTitle = path === '/' ? `${config.brand.name} · ${config.brand.tagline}` : `${title} · ${config.brand.name}`;
  const navItems = NAV.map(
    ([href, l]) => `<li><a href="${href}"${path.startsWith(href) ? ' aria-current="page"' : ''}>${l}</a></li>`
  ).join('');
  const c = config.contact;
  const f = config.fonts;
  return html`<!doctype html>
<html lang="en" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${config.url}${path}">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:type" content="website">
<meta property="og:url" content="${config.url}${path}">
<meta name="theme-color" content="${config.palette.night}">
${noindex ? '<meta name="robots" content="noindex">' : ''}
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${f.googleFonts}">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<script>document.documentElement.className="js"</script>
<style>:root{--font-display:${f.display};--font-text:${f.text};--font-mono:${f.mono}}</style>
<link rel="stylesheet" href="/assets/css/site.css">
</head>
<body${overlay ? ' class="has-overlay"' : ''}>
<a class="skip" href="#main">Skip to content</a>
<header class="site-header${overlay ? ' site-header--overlay' : ''}">
  <div class="header-inner">
    <a class="logo" href="/" aria-label="${esc(config.brand.name)}, home">
      <span class="logo-word">${esc(config.brand.name)}</span>
      <span class="logo-sub">Seychelles</span>
    </a>
    <nav id="site-nav" class="site-nav" aria-label="Main"><ul>${navItems}<li class="nav-enquire"><a href="/enquire/">Enquire</a></li></ul></nav>
    <div class="header-actions">
      <a class="pill pill--solid" href="/enquire/"${path.startsWith('/enquire') ? ' aria-current="page"' : ''}>Enquire ${arrow('up-right')}</a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav" hidden><span class="menu-lines" aria-hidden="true"></span><span class="menu-word">Menu</span></button>
    </div>
  </div>
</header>
<main id="main">
${body}
</main>
<footer class="site-footer">
  <div class="wrap">
    <div class="footer-top">
      <p class="footer-statement">${esc(config.brand.tagline)}.</p>
      <a class="pill pill--light" href="/enquire/">Start planning ${arrow()}</a>
    </div>
    <div class="footer-grid">
      <div>
        <h2 class="label">Contact</h2>
        <ul class="plain">
          <li><a href="mailto:${esc(c.email)}">${esc(c.email)}</a></li>
          <li><a href="tel:${esc(c.phone.replace(/\s+/g, ''))}">${esc(c.phone)}</a></li>
          ${c.whatsapp ? `<li><a href="https://wa.me/${esc(c.whatsapp.replace(/\D/g, ''))}">WhatsApp</a></li>` : ''}
          <li>${esc(c.address)}</li>
          <li>${esc(c.hours)}</li>
        </ul>
      </div>
      <div>
        <h2 class="label">Explore</h2>
        <ul class="plain">${NAV.map(([h, l]) => `<li><a href="${h}">${l}</a></li>`).join('')}</ul>
      </div>
      <div>
        <h2 class="label">Plan</h2>
        <ul class="plain">
          <li><a href="/itineraries/#planner">Island-hopping planner</a></li>
          <li><a href="/beaches/#finder">Calm beach finder</a></li>
          <li><a href="/enquire/">Send an enquiry</a></li>
          <li><a href="/credits/">Photo credits</a></li>
          ${config.social.instagram ? `<li><a href="${esc(config.social.instagram)}">Instagram</a></li>` : ''}
        </ul>
      </div>
    </div>
  </div>
  <p class="footer-wordmark" aria-hidden="true">${esc(config.brand.name)}</p>
  <div class="wrap footer-small">
    <p>Travel times, fees and entry rules change: always check before you travel. Photos via <a href="https://unsplash.com/?${utm}">Unsplash</a> and <a href="https://www.pexels.com/">Pexels</a>, credited on each image.</p>
    <p>© ${new Date().getFullYear()} ${esc(config.brand.name)}</p>
  </div>
</footer>
${data ? `<script id="page-data" type="application/json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>` : ''}
<script src="/assets/js/site.js" defer></script>
${scripts.map((s) => `<script src="/assets/js/${s}.js" defer></script>`).join('\n')}
</body>
</html>
`;
}

/**
 * Inner-page header: label, very large title, lede; optional full-width photo below.
 */
function pageHero({ eyebrow, n, title, lede, slot, index = 0, label: lbl, ratio = '21:9', aside = '' }) {
  return html`<section class="page-hero">
    <div class="wrap">
      <div class="page-hero-top">
        ${eyebrow ? label(eyebrow, n) : ''}
        ${aside ? `<div class="page-hero-aside">${aside}</div>` : ''}
      </div>
      <h1 class="display">${title}</h1>
      ${lede ? `<div class="page-hero-lede"><p class="lede">${lede}</p></div>` : ''}
    </div>
    ${slot ? `<div class="page-hero-media">${photo(slot, { index, eager: true, ratio, sizes: '100vw', label: lbl || title })}</div>` : ''}
  </section>`;
}

const badge = (rating) =>
  `<span class="badge badge--${rating}">${{ calm: 'Calm', mixed: 'Mixed', rough: 'Rough' }[rating]}</span>`;

module.exports = { esc, html, photo, hasPhoto, layout, pageHero, badge, used, config, utm, SOURCE, creditUrl, arrow, label, two };
