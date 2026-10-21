const { html, esc, photo, layout, badge, config } = require('../lib/html.js');
const islands = require('../data/islands.js');
const { beaches } = require('../data/beaches.js');
const itineraries = require('../data/itineraries.js');

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

module.exports = () => {
  const islandName = Object.fromEntries(islands.map((i) => [i.slug, i.name]));
  const m = new Date().getMonth();
  const calmNow = beaches.filter((b) => b.months[m] === 'calm');
  const trio = islands.filter((i) => ['mahe', 'praslin', 'la-digue'].includes(i.slug));

  const body = html`
<section class="hero">
  <div class="hero-media">${photo('seychelles-generic', { eager: true, ratio: '16:9', sizes: '100vw', label: 'Granite boulders and sea' })}</div>
  <div class="wrap hero-inner">
    <p class="eyebrow">${esc(config.brand.tagline)}</p>
    <h1>See more than one beach.</h1>
    <p class="lede">Mahé, Praslin, La Digue and the islands beyond, one at a time, with time to notice each of them. We plan routes around ferries, wind and what you came to see.</p>
    <p class="actions">
      <a class="btn" href="/itineraries/#planner">Plan an island-hopping route</a>
      <a class="btn btn--ghost" href="/beaches/#finder">Find a calm beach this month</a>
    </p>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="section-head">
      <p class="eyebrow">Island by island</p>
      <h2>Three granite islands, three different paces</h2>
      <p>Most journeys start with these three. Each is a short ferry ride from the next, and each is worth more than a day trip.</p>
    </div>
    <ul class="cards cards--3">
      ${trio.map((i) => html`<li class="card">
        ${photo(i.slug, { ratio: '4:3', sizes: '(min-width: 900px) 33vw, 100vw', label: i.name })}
        <div class="card-body">
          <p class="card-kicker">${esc(i.kicker)}</p>
          <h3><a class="card-link" href="/islands/${i.slug}/">${esc(i.name)}</a></h3>
          <p>${esc(i.summary)}</p>
        </div>
      </li>`)}
    </ul>
    <p class="more"><a href="/islands/">All islands, including Silhouette, Bird, Denis and Aldabra →</a></p>
  </div>
</section>

<section class="section section--granite">
  <div class="wrap split">
    <div>
      <p class="eyebrow">Island-hopping planner</p>
      <h2>Pick your islands. See the legs.</h2>
      <p>Choose the islands you want and the planner lays out the route from Mahé: which crossings are ferries and which are short flights, roughly how long each takes, and how many nights we would suggest on each island.</p>
      <p><a class="btn" href="/itineraries/#planner">Open the planner</a></p>
    </div>
    <ol class="leg-preview" aria-label="Example route">
      <li><span class="leg-stop">Mahé</span><span class="leg-nights">3 nights</span></li>
      <li class="leg-hop"><span>Ferry · about 1 h</span></li>
      <li><span class="leg-stop">Praslin</span><span class="leg-nights">3 nights</span></li>
      <li class="leg-hop"><span>Ferry · about 15 min</span></li>
      <li><span class="leg-stop">La Digue</span><span class="leg-nights">4 nights</span></li>
    </ol>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="section-head">
      <p class="eyebrow">Calm beach finder</p>
      <h2>Calm this <span data-current-month>${MONTHS[m]}</span></h2>
      <p>The north-west monsoon and the south-east trades make different coasts calm at different times of year. These beaches are usually sheltered this month.</p>
    </div>
    <ul class="beach-chips" data-calm-now>
      ${calmNow.map((b) => `<li><a href="/beaches/#${b.slug}">${esc(b.name)}</a> <span class="muted">${esc(islandName[b.island])}</span> ${badge('calm')}</li>`)}
    </ul>
    <p class="more"><a href="/beaches/#finder">See every beach, every month →</a></p>
  </div>
</section>

<section class="section section--lagoon">
  <div class="wrap">
    <div class="section-head">
      <p class="eyebrow">Nature</p>
      <h2>Palm forests, tortoises, seabirds and reef</h2>
    </div>
    <ul class="cards cards--4">
      ${[
        ['coco-de-mer', 'The coco de mer', '/nature/#vallee-de-mai'],
        ['giant-tortoise', 'Giant tortoises', '/nature/#tortoises'],
        ['birds', 'Rare birds', '/nature/#birds'],
        ['reef', 'Reefs', '/nature/#reefs'],
      ].map(([slot, t, href]) => html`<li class="card card--compact">
        ${photo(slot, { ratio: '1:1', sizes: '(min-width: 900px) 25vw, 50vw', label: t })}
        <div class="card-body"><h3><a class="card-link" href="${href}">${t}</a></h3></div>
      </li>`)}
    </ul>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="section-head">
      <p class="eyebrow">Itineraries</p>
      <h2>Start from a route, then make it yours</h2>
    </div>
    <ul class="cards cards--3">
      ${itineraries.slice(0, 3).map((it) => html`<li class="card card--text">
        <div class="card-body">
          <p class="card-kicker">${it.nights} nights · ${it.islands.filter((s) => s !== 'curieuse').map((s) => islandName[s]).join(' · ')}</p>
          <h3><a class="card-link" href="/itineraries/#${it.slug}">${esc(it.title)}</a></h3>
          <p>${esc(it.lede)}</p>
        </div>
      </li>`)}
    </ul>
  </div>
</section>

<section class="section section--ocean">
  <div class="wrap cta">
    <h2>Tell us how you like to travel</h2>
    <p>Send us your dates, the islands that interest you and the pace you want. We reply with a suggested route and the questions we need answered before anything is booked.</p>
    <p><a class="btn btn--light" href="/enquire/">Start an enquiry</a></p>
  </div>
</section>`;

  return [{ path: '/', html: layout({ title: 'Home', path: '/', body, scripts: ['home'], data: { beaches: beaches.map(({ slug, name, island, months }) => ({ slug, name, island: islandName[island], months })) } }) }];
};
