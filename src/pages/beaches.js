const { html, esc, photo, layout, pageHero, badge } = require('../lib/html.js');
const islands = require('../data/islands.js');
const { beaches } = require('../data/beaches.js');

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const SHORT = MONTHS.map((m) => m.slice(0, 3));

module.exports = () => {
  const islandName = Object.fromEntries(islands.map((i) => [i.slug, i.name]));
  const groups = ['mahe', 'praslin', 'la-digue'];
  const m = new Date().getMonth();

  const body = html`
${pageHero({ eyebrow: 'Beaches', title: 'Beaches, by season', lede: 'Calm or rough depends far more on the wind than on the beach. Pick a month to see which coasts are usually sheltered.' })}

<section class="section" id="finder" aria-labelledby="finder-h">
  <div class="wrap">
    <div class="section-head">
      <p class="eyebrow">Calm beach finder</p>
      <h2 id="finder-h">Which beaches are calm in <span data-finder-month>${MONTHS[m]}</span>?</h2>
      <p>From roughly December to March the <strong>north-west monsoon</strong> makes north- and west-facing coasts choppier. From roughly May to October the <strong>south-east trades</strong> do the same to south- and east-facing coasts. April and November, in between, are usually calm almost everywhere.</p>
    </div>

    <form class="month-picker" data-finder hidden aria-label="Choose a month">
      <fieldset>
        <legend class="sr-only">Month</legend>
        ${MONTHS.map((name, k) => `<label class="chip"><input type="radio" name="month" value="${k}"${k === m ? ' checked' : ''}><span><span class="sr-only">${name}</span><span aria-hidden="true">${SHORT[k]}</span></span></label>`)}
      </fieldset>
      <p class="season-line" data-season-line aria-live="polite"></p>
    </form>

    <div class="finder-results" data-finder-results>
      ${groups.map((g) => html`<div class="finder-group">
        <h3>${esc(islandName[g])}</h3>
        <ul class="finder-list">
          ${beaches.filter((b) => b.island === g).map((b) => `<li data-beach="${b.slug}" data-rating="${b.months[m]}"><a href="#${b.slug}">${esc(b.name)}</a> <span class="muted small">${esc(b.coast)}</span> <span data-badge>${badge(b.months[m])}</span></li>`)}
        </ul>
      </div>`)}
    </div>
    <p class="legend">${badge('calm')} usually calm ${badge('mixed')} variable or windy ${badge('rough')} often rough, swimming may be unsafe</p>
    <p class="notice"><strong>A planning guide, not a safety forecast.</strong> Sea conditions change day to day, and some beaches have strong currents in every season. Most beaches have no lifeguard. Look at the water, read the signs and ask locally before you swim.</p>
  </div>
</section>

<section class="section section--granite" aria-labelledby="year-h">
  <div class="wrap">
    <h2 id="year-h">The whole year at a glance</h2>
    <div class="table-scroll" tabindex="0" role="region" aria-label="Beach conditions by month (scrolls sideways)">
      <table class="year-table">
        <caption class="sr-only">Usual sea conditions for each beach, January to December</caption>
        <thead><tr><th scope="col">Beach</th>${SHORT.map((s, k) => `<th scope="col"><abbr title="${MONTHS[k]}">${s}</abbr></th>`)}</tr></thead>
        <tbody>
          ${beaches.map((b) => `<tr><th scope="row">${esc(b.name)}<span class="muted small"> · ${esc(islandName[b.island])}</span></th>${b.months.map((r) => `<td class="yc yc--${r}"><span class="sr-only">${r}</span><span aria-hidden="true">${{ calm: '●', mixed: '◐', rough: '○' }[r]}</span></td>`)}</tr>`)}
        </tbody>
      </table>
    </div>
    <p class="legend small">● calm · ◐ mixed · ○ rough</p>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <h2>The beaches</h2>
    <ul class="beach-cards">
      ${beaches.map((b) => html`<li class="beach-card" id="${b.slug}">
        ${photo(b.slug, { ratio: '3:2', sizes: '(min-width: 900px) 40vw, 100vw', label: b.name })}
        <div>
          <p class="card-kicker">${esc(islandName[b.island])} · ${esc(b.coast)}</p>
          <h3>${esc(b.name)}</h3>
          <p>${esc(b.blurb)}</p>
          <p class="small">Usually calmest: <strong>${calmText(b)}</strong></p>
        </div>
      </li>`)}
    </ul>
  </div>
</section>`;

  return [{
    path: '/beaches/',
    html: layout({
      title: 'Beaches and the calm beach finder',
      path: '/beaches/',
      body,
      description: 'Which Seychelles beaches are calm in which month: the north-west monsoon and south-east trades explained, beach by beach.',
      scripts: ['finder'],
      data: { months: MONTHS, beaches: beaches.map(({ slug, months }) => ({ slug, months })) },
    }),
  }];
};

function calmText(b) {
  if (b.caution) return 'December to March, and even then with care';
  const calm = b.months.map((r, k) => (r === 'calm' ? k : -1)).filter((k) => k >= 0);
  if (calm.length === 12) return 'most of the year';
  if (!calm.length) return 'rarely';
  // Collapse into ranges, wrapping around the year.
  const set = new Set(calm);
  const ranges = [];
  let start = calm.find((k) => !set.has((k + 11) % 12));
  if (start === undefined) start = calm[0];
  let k = start;
  for (let n = 0; n < 12; n++, k = (k + 1) % 12) {
    if (set.has(k) && !set.has((k + 11) % 12)) ranges.push([k, k]);
    else if (set.has(k)) ranges[ranges.length - 1][1] = k;
  }
  return ranges.map(([a, z]) => (a === z ? MONTHS[a] : `${MONTHS[a]} to ${MONTHS[z]}`)).join(', ');
}
