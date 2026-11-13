// Photo credits: author, licence and source of every Creative Commons / Wikimedia Commons photo
// the build used. Built by build.js after the other pages, so it lists exactly the photos on the
// site and the pages each one appears on. Credits are never shown on the photos themselves.
const { html, esc, layout, pageHero } = require('../lib/html.js');

const LICENCES = {
  'CC BY 2.0': 'https://creativecommons.org/licenses/by/2.0/',
  'CC BY 4.0': 'https://creativecommons.org/licenses/by/4.0/',
  'CC BY-SA 2.0': 'https://creativecommons.org/licenses/by-sa/2.0/',
  'CC BY-SA 3.0': 'https://creativecommons.org/licenses/by-sa/3.0/',
  'CC BY-SA 3.0 IGO': 'https://creativecommons.org/licenses/by-sa/3.0/igo/',
  'CC BY-SA 4.0': 'https://creativecommons.org/licenses/by-sa/4.0/',
  CC0: 'https://creativecommons.org/publicdomain/zero/1.0/',
};
const PUBLIC_DOMAIN = /^public domain$/i;

/** Page title from a built page's <title> ("Curieuse · Granite Coast" -> "Curieuse"); the home page is "Home". */
const titleOf = (p, brand) => (p.path === '/' ? 'Home' : ((p.html.match(/<title>([^<]*)<\/title>/) || [])[1] || p.path).replace(` · ${brand}`, ''));

/**
 * @param {Array<{path: string, html: string}>} pages  every page already built
 * @param {Map<string, object>} used                    photos used by those pages (id -> photo)
 */
module.exports = (pages, used) => {
  const { config } = require('../lib/html.js');
  const brand = config.brand.name;
  const credited = [...used.values()].filter((p) => p.source === 'wikimedia').sort((a, b) => a.location.localeCompare(b.location));
  for (const p of credited) {
    if (!PUBLIC_DOMAIN.test(p.license) && !LICENCES[p.license]) throw new Error(`No licence URL for "${p.license}" (${p.file}). Add it to src/pages/credits.js.`);
  }
  const listed = pages.filter((pg) => !pg.path.endsWith('.html') && !pg.html.includes('content="noindex"'));

  const items = credited.map((p) => {
    const on = listed.filter((pg) => pg.html.includes(`/assets/photos/${p.id}-`));
    const licence = PUBLIC_DOMAIN.test(p.license)
      ? '<span>Public domain</span>'
      : `<a href="${LICENCES[p.license]}" rel="license noopener" target="_blank">${esc(p.license)}</a>`;
    return html`<li class="credit">
      <img src="/assets/photos/${p.id}-640.webp" width="640" height="427" alt="${esc(p.alt)}" loading="lazy" decoding="async">
      <div>
        <p class="credit-place">${esc(p.location)}</p>
        <p class="credit-meta"><span>By</span> <span>${esc(p.photographer)}</span> <span aria-hidden="true">·</span> ${licence} <span aria-hidden="true">·</span> <a href="${esc(p.page)}" rel="noopener" target="_blank">Source on Wikimedia Commons</a></p>
        ${on.length ? `<p class="credit-meta"><span>Used on</span> ${on.map((pg) => `<a href="${pg.path}">${esc(titleOf(pg, brand))}</a>`).join(' <span aria-hidden="true">·</span> ')}</p>` : ''}
      </div>
    </li>`;
  });

  const body = html`${pageHero({ eyebrow: 'Legal', n: 4, title: 'Photo credits', lede: 'Who took the photographs on this site, the licence each one is used under and where to find the original.' })}
<section class="section"><div class="wrap prose narrow legal">
<p>Where Unsplash and Pexels had no photograph of a place, we use photographs from Wikimedia Commons under Creative Commons licences. Their photographers and licences are listed here rather than on the photos themselves.</p>
<ul class="credits-list">
${items}
</ul>
<p>All other photographs on this site come from Unsplash and Pexels and are used under the <a href="https://unsplash.com/license" rel="noopener" target="_blank">Unsplash licence</a> and the <a href="https://www.pexels.com/license/" rel="noopener" target="_blank">Pexels licence</a>.</p>
</div></section>`;

  return { path: '/photo-credits/', html: layout({ title: 'Photo credits', path: '/photo-credits/', body, description: `Photographers, licences and sources of the photos on ${brand}.` }) };
};
