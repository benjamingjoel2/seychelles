const { html, esc, photo, layout, badge, arrow, label, two } = require('../lib/html.js');
const islands = require('../data/islands.js');
const { beaches } = require('../data/beaches.js');
const itineraries = require('../data/itineraries.js');

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function nights(i) {
  if (i.expedition) return `${i.nights[0]}–${i.nights[1]} nights aboard`;
  if (i.dayTripFrom) return 'Day trip';
  return `${i.nights[1]} nights`;
}

module.exports = () => {
  const by = Object.fromEntries(islands.map((i) => [i.slug, i]));
  const m = new Date().getMonth();
  const calmNow = beaches.filter((b) => b.months[m] === 'calm');
  const trio = ['mahe', 'praslin', 'la-digue'].map((s) => by[s]);
  const further = ['silhouette', 'curieuse', 'bird-island', 'denis', 'outer-islands', 'aldabra'].map((s) => by[s]);
  const strip = [
    ['mahe', 'The big island'],
    ['praslin', 'Palm forest'],
    ['la-digue', 'Bicycles and boulders'],
    ['outer-islands', 'Atolls far out'],
  ];

  const body = html`
<section class="hero">
  <div class="hero-media">${photo('seychelles-generic', { eager: true, ratio: '16:9', sizes: '100vw', label: 'Granite boulders and sea' })}</div>
  <div class="hero-inner wrap">
    <div class="hero-top">
      ${label('Island-hopping in the Seychelles')}
      ${label('Indian Ocean · 4°S 55°E')}
    </div>
    <h1 class="hero-title">See more than <em>one beach.</em></h1>
    <div class="hero-bottom">
      <p class="hero-lede">Mahé, Praslin, La Digue and the islands beyond, one at a time, with time to notice each of them. We plan routes around ferries, wind and what you came to see.</p>
      <p class="actions">
        <a class="pill pill--light" href="/itineraries/#planner">Plan a route ${arrow()}</a>
        <a class="pill pill--outline-light" href="/beaches/#finder">Calm beaches this month</a>
      </p>
    </div>
  </div>
  <ol class="hero-strip wrap" aria-label="Where to start">
    ${strip.map(([s, t], k) => html`<li>
      <a href="/islands/${s}/">
        <span class="hs-n">${two(k + 1)}</span>
        <span class="hs-name">${esc(by[s].name)}</span>
        <span class="hs-note">${esc(t)}</span>
      </a>
    </li>`)}
  </ol>
</section>

<section class="section">
  <div class="wrap cols">
    <div class="cols-side">${label('The idea', 1)}</div>
    <div class="cols-main">
      <p class="statement">The Seychelles are not one beach. They are granite mountains and palm forests, coral cays and far-off atolls, each with its own pace. <span class="statement-quiet">We plan journeys through several of them, slowly enough to notice the difference.</span></p>
      <p><a class="link-arrow" href="/about/">How we plan ${arrow()}</a></p>
    </div>
  </div>
</section>

<section class="section section--rule">
  <div class="wrap">
    <div class="section-intro">
      ${label('Islands', 2)}
      <h2 class="display-2">Three granite islands, <em>then further out.</em></h2>
    </div>
    <ul class="island-rows">
      ${trio.map((i, k) => html`<li class="island-row">
        <p class="ir-n">${two(k + 1)}</p>
        <h3 class="ir-name"><a href="/islands/${i.slug}/">${esc(i.name)}</a></h3>
        <div class="ir-body">
          <p class="label">${esc(i.kicker)} · ${nights(i)}</p>
          <p>${esc(i.summary)}</p>
          <a class="pill pill--outline" href="/islands/${i.slug}/" aria-label="Explore ${esc(i.name)}">Explore ${arrow()}</a>
        </div>
        <div class="ir-media">${photo(i.slug, { ratio: '4:3', sizes: '(min-width: 960px) 34vw, 100vw', label: i.name })}</div>
      </li>`)}
    </ul>
    <ul class="further">
      ${further.map((i) => html`<li>
        <a href="/islands/${i.slug}/">
          <span class="label">${esc(i.group.split(' · ')[1])} / ${nights(i)}</span>
          <span class="further-name">${esc(i.name)}</span>
          <span class="further-note">${esc(i.kicker)}</span>
        </a>
      </li>`)}
    </ul>
  </div>
</section>

<section class="section block block--green">
  <div class="wrap split">
    <div>
      ${label('Island-hopping planner', 3)}
      <h2 class="display-2">Ferry, flight, <em>or both.</em></h2>
      <p class="block-lede">Choose the islands you want. The planner lays out the route from Mahé: which crossings are ferries and which are short flights, roughly how long each takes, and how many nights we would give each island.</p>
      <p><a class="pill pill--light" href="/itineraries/#planner">Open the planner ${arrow()}</a></p>
    </div>
    <ol class="leg-preview" aria-label="Example route">
      <li class="lp-stop"><span class="lp-name">Mahé</span><span class="label">3 nights</span></li>
      <li class="lp-hop"><span class="label">Ferry · about 1 h</span></li>
      <li class="lp-stop"><span class="lp-name">Praslin</span><span class="label">3 nights</span></li>
      <li class="lp-hop"><span class="label">Ferry · about 15 min</span></li>
      <li class="lp-stop"><span class="lp-name">La Digue</span><span class="label">4 nights</span></li>
      <li class="lp-hop"><span class="label">Ferry · about 1½ h</span></li>
      <li class="lp-stop"><span class="lp-name">Mahé</span><span class="label">Fly home</span></li>
    </ol>
  </div>
</section>

<section class="section block block--granite">
  <div class="wrap">
    <div class="split split--top">
      <div>
        ${label('Calm beach finder', 4)}
        <h2 class="display-2">Calm in <em data-current-month>${MONTHS[m]}</em></h2>
      </div>
      <p class="block-lede">The north-west monsoon and the south-east trades make different coasts calm at different times of year. These beaches are usually sheltered this month.</p>
    </div>
    <ul class="calm-list" data-calm-now>
      ${calmNow.map((b) => `<li><a href="/beaches/#${b.slug}">${esc(b.name)}</a><span class="label">${esc(by[b.island].name)}</span>${badge('calm')}</li>`)}
    </ul>
    <p><a class="link-arrow" href="/beaches/#finder">Every beach, every month ${arrow()}</a></p>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="section-intro">
      ${label('Nature', 5)}
      <h2 class="display-2">Palm forest, tortoises, <em>seabirds and reef.</em></h2>
    </div>
    <ul class="columns-4">
      ${[
        ['coco-de-mer', 'Coco de mer', 'Praslin', '/nature/#vallee-de-mai'],
        ['giant-tortoise', 'Giant tortoises', 'Curieuse · Aldabra', '/nature/#tortoises'],
        ['birds', 'Rare birds', 'Across the islands', '/nature/#birds'],
        ['reef', 'Reefs', 'Marine parks', '/nature/#reefs'],
      ].map(([slot, t, where, href]) => html`<li>
        <div class="col-head"><h3 class="col-title"><a href="${href}">${t}</a></h3><span class="label">/ ${where}</span></div>
        ${photo(slot, { ratio: '4:5', sizes: '(min-width: 960px) 25vw, 50vw', label: t })}
      </li>`)}
    </ul>
  </div>
</section>

<section class="section section--rule">
  <div class="wrap">
    <div class="section-intro section-intro--row">
      <div>${label('Itineraries', 6)}<h2 class="display-2">Routes to <em>start from.</em></h2></div>
      <a class="link-arrow" href="/itineraries/">All itineraries ${arrow()}</a>
    </div>
    <ul class="list-rows">
      ${itineraries.map((it, k) => html`<li>
        <a href="/itineraries/#${it.slug}">
          <span class="lr-n label">${two(k + 1)}</span>
          <span class="lr-title">${esc(it.title)}</span>
          <span class="lr-meta label">${it.islands.filter((s) => s !== 'curieuse').map((s) => by[s].name).join(' · ')}</span>
          <span class="lr-nights label">${it.nights} nights</span>
          ${arrow()}
        </a>
      </li>`)}
    </ul>
  </div>
</section>

<section class="closing">
  <div class="closing-media">${photo('anse-source-d-argent', { ratio: '21:9', sizes: '100vw', label: 'Anse Source d’Argent' })}</div>
  <div class="closing-inner wrap">
    ${label('Enquire', 7)}
    <h2 class="display-1">Begin with <em>a conversation.</em></h2>
    <p class="hero-lede">Send your dates, the islands that interest you and the pace you want. We reply with a suggested route and the questions we need answered before anything is booked.</p>
    <p><a class="pill pill--light" href="/enquire/">Start an enquiry ${arrow()}</a></p>
  </div>
</section>`;

  return [{
    path: '/',
    html: layout({
      title: 'Home', path: '/', body, overlay: true, scripts: ['home'],
      data: { beaches: beaches.map(({ slug, name, island, months }) => ({ slug, name, island: by[island].name, months })) },
    }),
  }];
};
