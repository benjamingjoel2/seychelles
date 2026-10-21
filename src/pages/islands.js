const { html, esc, photo, hasPhoto, layout, pageHero, badge, arrow, label, two } = require('../lib/html.js');
const islands = require('../data/islands.js');
const { beaches } = require('../data/beaches.js');
const stays = require('../data/stays.js');
const photos = require('../data/photos.js');

const MON = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function nightsText(i) {
  if (i.expedition) return `${i.nights[0]}–${i.nights[1]} nights aboard`;
  if (i.dayTripFrom) return 'Day trip';
  return i.nights[0] === i.nights[1] ? `${i.nights[1]} nights` : `${i.nights[0]}–${i.nights[1]} nights`;
}

/** Tiny 12-month strip used on island pages. */
function monthStrip(b) {
  return `<ol class="month-strip" aria-label="${esc(b.name)} by month">${b.months
    .map((r, k) => `<li class="ms ms--${r}"><span aria-hidden="true">${MON[k]}</span><span class="sr-only">${MONTHS[k]}: ${r}</span></li>`)
    .join('')}</ol>`;
}

module.exports = () => {
  const index = html`
${pageHero({ eyebrow: 'Islands', n: 1, title: 'The <em>islands</em>', lede: 'Granite islands close to Mahé, coral cays at the edge of the bank, and atolls far to the south-west. Here is how they differ, and how long we would give each.' })}
<section class="section section--rule">
  <div class="wrap">
    ${['Inner islands · granite', 'Inner islands · coral', 'Outer islands · coral'].map((g, gi) => html`
      <div class="section-intro section-intro--compact">${label(g, gi + 2)}</div>
      <ul class="island-rows island-rows--index">
        ${islands.filter((i) => i.group === g).map((i) => html`<li class="island-row${hasPhoto(i.slug) ? '' : ' island-row--text'}">
          <p class="ir-n">${two(islands.indexOf(i) + 1)}</p>
          <h2 class="ir-name"><a href="/islands/${i.slug}/">${esc(i.name)}</a></h2>
          <div class="ir-body">
            <p class="label">${esc(i.kicker)} · ${nightsText(i)}</p>
            <p>${esc(i.summary)}</p>
            <a class="pill pill--outline" href="/islands/${i.slug}/" aria-label="Explore ${esc(i.name)}">Explore ${arrow()}</a>
          </div>
          ${hasPhoto(i.slug) ? `<div class="ir-media">${photo(i.slug, { ratio: '4:3', sizes: '(min-width: 960px) 34vw, 100vw', label: i.name })}</div>` : ''}
        </li>`)}
      </ul>`)}
  </div>
</section>`;

  const pages = [{ path: '/islands/', html: layout({ title: 'Islands', path: '/islands/', body: index, description: 'Mahé, Praslin, La Digue, Silhouette, Curieuse, Bird Island, Denis, the outer islands and Aldabra: what each is like and how long to stay.' }) }];

  islands.forEach((i, k) => {
    const isBeaches = beaches.filter((b) => b.island === i.slug);
    const isStays = stays.filter((s) => s.island === i.slug);
    const next = islands[(k + 1) % islands.length];
    const prev = islands[(k - 1 + islands.length) % islands.length];
    const body = html`
${pageHero({ eyebrow: i.group, title: esc(i.name), lede: esc(i.summary), slot: i.slug, label: i.name })}
<section class="section">
  <div class="wrap prose-grid">
    <div class="prose">
      ${i.intro.map((p) => `<p>${esc(p)}</p>`)}
      <h2>Highlights</h2>
      <dl class="highlights">
        ${i.highlights.map(([t, d]) => `<div><dt>${esc(t)}</dt><dd>${esc(d)}</dd></div>`)}
      </dl>
    </div>
    <div class="facts" aria-label="Planning notes">
      <h2 class="facts-h">Planning notes</h2>
      <dl>
        <dt>Suggested stay</dt><dd>${nightsText(i)}</dd>
        <dt>Getting there</dt><dd>${esc(i.gettingThere)}</dd>
        <dt>Where to stay</dt><dd>${esc(i.stayNote)}</dd>
      </dl>
      <p><a class="btn btn--small" href="/itineraries/?islands=${i.dayTripFrom ? `${i.dayTripFrom},` : ''}${i.slug}#planner">Add ${esc(i.name)} to a route</a></p>
      <p class="small muted">Times and fees change: check before you travel.</p>
    </div>
  </div>
</section>
${(photos[i.slug] || []).length > 1
  ? `<section class="section section--flush"><div class="wrap">${photo(i.slug, { index: 1, ratio: '21:9', sizes: '100vw', label: i.name })}</div></section>`
  : ''}
${isBeaches.length ? html`
<section class="section section--granite">
  <div class="wrap">
    <div class="section-head">
      <h2>Beaches on ${esc(i.name)}</h2>
      <p>Usual sea conditions by month. <a href="/beaches/#finder">How we rate calm, mixed and rough</a>.</p>
    </div>
    <ul class="beach-list">
      ${isBeaches.map((b) => html`<li class="beach-row">
        <div><h3><a href="/beaches/#${b.slug}">${esc(b.name)}</a></h3><p class="muted small">${esc(b.coast)}</p></div>
        ${monthStrip(b)}
      </li>`)}
    </ul>
    <p class="legend">${badge('calm')} usually calm ${badge('mixed')} variable ${badge('rough')} often rough</p>
  </div>
</section>` : ''}
${isStays.length ? html`
<section class="section">
  <div class="wrap">
    <h2>Places we would suggest</h2>
    <p class="placeholder-note">Placeholder names: real partner stays will be listed here.</p>
    <ul class="stay-list">${isStays.map((s) => `<li><strong>${esc(s.name)}</strong> <span class="muted">${esc(s.type)} · ${esc(s.size)}</span><br>${esc(s.fit)}</li>`)}</ul>
    <p><a href="/stays/">All stays →</a></p>
  </div>
</section>` : ''}
<nav class="wrap pager" aria-label="More islands">
  <a href="/islands/${prev.slug}/">← ${esc(prev.name)}</a>
  <a href="/islands/">All islands</a>
  <a href="/islands/${next.slug}/">${esc(next.name)} →</a>
</nav>`;
    pages.push({ path: `/islands/${i.slug}/`, html: layout({ title: i.name, path: `/islands/${i.slug}/`, body, description: i.summary }) });
  });
  return pages;
};

module.exports.monthStrip = monthStrip;
module.exports.nightsText = nightsText;
