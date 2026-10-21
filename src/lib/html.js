const config = require('../../site.config.js');
const photos = require('../data/photos.js');

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

/**
 * Responsive photo with credit. If no location-verified photo exists for `slot`,
 * renders a drawn placeholder instead — never a photo of somewhere else.
 */
function photo(slot, { index = 0, ratio = '3:2', sizes = '100vw', eager = false, cls = '', label = '' } = {}) {
  const list = photos[slot] || [];
  const p = list[index % (list.length || 1)];
  const [rw, rh] = ratio.split(':').map(Number);
  if (!p) {
    return html`<figure class="photo photo--placeholder ${cls}">
      <div class="placeholder-art" style="aspect-ratio:${rw}/${rh}" role="img" aria-label="${esc(label || slot)}: illustration, photograph to come"><span>${esc(label)}</span></div>
    </figure>`;
  }
  used.set(p.id, { ...p, slot });
  const src = (w) =>
    p.source === 'pexels'
      ? `${p.img}?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${Math.round((w * rh) / rw)}`
      : `${p.img}?auto=format&fit=crop&w=${w}&ar=${rw}:${rh}&q=70`;
  const widths = [480, 800, 1200, 1800];
  return html`<figure class="photo ${cls}">
    <img src="${src(1200)}" srcset="${widths.map((w) => `${src(w)} ${w}w`).join(', ')}" sizes="${sizes}"
      width="${1200}" height="${Math.round((1200 * rh) / rw)}" alt="${esc(p.alt)}"
      ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" style="aspect-ratio:${rw}/${rh}">
    <figcaption>${esc(p.location)} · Photo: <a href="${creditUrl(p, p.photographer_url)}">${esc(p.photographer)}</a> / <a href="${creditUrl(p, p.page)}">${SOURCE[p.source]}</a></figcaption>
  </figure>`;
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

function layout({ title, description = config.brand.description, path = '/', body, scripts = [], data = null, noindex = false }) {
  const fullTitle = path === '/' ? `${config.brand.name} · ${config.brand.tagline}` : `${title} · ${config.brand.name}`;
  const navItems = NAV.map(
    ([href, label]) =>
      `<li><a href="${href}"${path.startsWith(href) ? ' aria-current="page"' : ''}>${label}</a></li>`
  ).join('');
  const c = config.contact;
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
<meta name="theme-color" content="${config.palette.ocean}">
${noindex ? '<meta name="robots" content="noindex">' : ''}
<link rel="preconnect" href="https://images.unsplash.com">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<script>document.documentElement.className="js"</script>
<link rel="stylesheet" href="/assets/css/site.css">
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<header class="site-header">
  <div class="wrap header-inner">
    <a class="logo" href="/" aria-label="${esc(config.brand.name)}, home">
      <svg class="logo-mark" viewBox="0 0 40 40" aria-hidden="true"><path d="M4 30c4-10 9-16 15-16 5 0 7 4 11 4 3 0 5-2 6-3v15H4z" fill="var(--granite)"/><path d="M4 31c6-2 10 2 16 0s10-2 16 0v5H4z" fill="var(--ocean-bright)"/></svg>
      <span class="logo-text">${esc(config.brand.name)}</span>
    </a>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav" hidden>Menu</button>
    <nav id="site-nav" class="site-nav" aria-label="Main"><ul>${navItems}<li class="nav-cta"><a class="btn btn--small" href="/enquire/"${path.startsWith('/enquire') ? ' aria-current="page"' : ''}>Enquire</a></li></ul></nav>
  </div>
</header>
<main id="main">
${body}
</main>
<footer class="site-footer">
  <div class="wrap footer-grid">
    <div>
      <p class="footer-brand">${esc(config.brand.name)}</p>
      <p>${esc(config.brand.tagline)}.</p>
    </div>
    <div>
      <h2 class="footer-h">Contact</h2>
      <ul class="plain">
        <li><a href="mailto:${esc(c.email)}">${esc(c.email)}</a></li>
        <li><a href="tel:${esc(c.phone.replace(/\s+/g, ''))}">${esc(c.phone)}</a></li>
        ${c.whatsapp ? `<li><a href="https://wa.me/${esc(c.whatsapp.replace(/\D/g, ''))}">WhatsApp</a></li>` : ''}
        <li>${esc(c.address)}</li>
        <li>${esc(c.hours)}</li>
      </ul>
    </div>
    <div>
      <h2 class="footer-h">Explore</h2>
      <ul class="plain">${NAV.map(([h, l]) => `<li><a href="${h}">${l}</a></li>`).join('')}</ul>
    </div>
    <div>
      <h2 class="footer-h">Plan</h2>
      <ul class="plain">
        <li><a href="/itineraries/#planner">Island-hopping planner</a></li>
        <li><a href="/beaches/#finder">Calm beach finder</a></li>
        <li><a href="/enquire/">Send an enquiry</a></li>
        <li><a href="/credits/">Photo credits</a></li>
        ${config.social.instagram ? `<li><a href="${esc(config.social.instagram)}">Instagram</a></li>` : ''}
      </ul>
    </div>
  </div>
  <div class="wrap footer-small">
    <p>Travel times, fees and entry rules change. Always check current information before you travel. Photos via <a href="https://unsplash.com/?${utm}">Unsplash</a> and <a href="https://www.pexels.com/">Pexels</a>, credited on each image.</p>
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

/** Simple page header used by most inner pages. */
function pageHero({ eyebrow, title, lede, slot, label }) {
  return html`<section class="page-hero${slot ? ' page-hero--photo' : ''}">
    <div class="wrap page-hero-inner">
      <div class="page-hero-text">
        ${eyebrow ? `<p class="eyebrow">${esc(eyebrow)}</p>` : ''}
        <h1>${title}</h1>
        ${lede ? `<p class="lede">${lede}</p>` : ''}
      </div>
      ${slot ? photo(slot, { eager: true, ratio: '4:3', sizes: '(min-width: 900px) 50vw, 100vw', label: label || title }) : ''}
    </div>
  </section>`;
}

const badge = (rating) =>
  `<span class="badge badge--${rating}">${{ calm: 'Calm', mixed: 'Mixed', rough: 'Rough' }[rating]}</span>`;

module.exports = { esc, html, photo, hasPhoto, layout, pageHero, badge, used, config, utm, SOURCE, creditUrl };
