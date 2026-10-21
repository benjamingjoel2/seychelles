const { html, esc, layout, pageHero, badge } = require('../lib/html.js');
const islands = require('../data/islands.js');
const routes = require('../data/routes.js');
const itineraries = require('../data/itineraries.js');
const months = require('../data/months.js');
const { beaches } = require('../data/beaches.js');

const MODE = { ferry: 'Ferry', flight: 'Flight', boat: 'Boat', helicopter: 'Helicopter', expedition: 'Expedition voyage' };
const fmt = (min, max) => {
  if (min == null) return 'multi-day';
  const f = (n) => (n >= 60 ? `${Math.floor(n / 60)} h${n % 60 ? ` ${n % 60} min` : ''}` : `${n} min`);
  return min === max ? `about ${f(min)}` : `${f(min)}–${f(max)}`;
};

module.exports = () => {
  const name = Object.fromEntries(islands.map((i) => [i.slug, i.name]));

  const planner = html`
<section class="section" id="planner" aria-labelledby="planner-h">
  <div class="wrap">
    <div class="section-head">
      <p class="label">Island-hopping planner</p>
      <h2 id="planner-h">Build a route</h2>
      <p>Pick the islands you would like to see. We will put them in a sensible order from Mahé, show each crossing and suggest how many nights to spend. Adjust the nights to suit you, then send the route with your enquiry.</p>
    </div>
    <div class="planner" data-planner hidden>
      <form class="planner-picks" aria-label="Choose islands">
        <fieldset>
          <legend>Islands</legend>
          <div class="pick-grid">
            ${routes.order.map((s) => {
              const i = islands.find((x) => x.slug === s);
              return `<label class="pick"><input type="checkbox" name="island" value="${s}"><span class="pick-name">${esc(i.name)}</span><span class="pick-note">${esc(i.kicker)}</span></label>`;
            })}
          </div>
        </fieldset>
        <p class="small muted">International flights arrive on Mahé, so every route starts and ends there.</p>
      </form>
      <div class="planner-out" aria-live="polite">
        <div data-planner-messages></div>
        <ol class="route" data-planner-route></ol>
        <div class="route-summary" data-planner-summary></div>
      </div>
    </div>
    <noscript><p class="notice">The interactive planner needs JavaScript. The crossings it uses are listed below.</p></noscript>
    <details class="legs-table">
      <summary>All crossings and rough times</summary>
      <div class="table-scroll" tabindex="0" role="region" aria-label="Crossings">
        <table>
          <thead><tr><th scope="col">Between</th><th scope="col">How</th><th scope="col">Rough time</th><th scope="col">Notes</th></tr></thead>
          <tbody>
            ${routes.legs.flatMap((l) => l.options.map((o, k) => `<tr>${k === 0 ? `<th scope="row" rowspan="${l.options.length}">${esc(name[l.a])} – ${esc(name[l.b])}</th>` : ''}<td>${MODE[o.mode]}</td><td>${fmt(o.min, o.max)}</td><td>${esc(o.note)}</td></tr>`))}
          </tbody>
        </table>
      </div>
      <p class="small muted">Crossing times only, not check-in or waiting. Timetables vary by season; we confirm everything before booking.</p>
    </details>
  </div>
</section>`;

  const samples = html`
<section class="section section--granite">
  <div class="wrap">
    <div class="section-head"><p class="label">Sample itineraries</p><h2>Routes we like</h2><p>Starting points, not packages. Each one can be opened in the planner and changed.</p></div>
    <div class="itins">
      ${itineraries.map((it) => html`<article class="itin" id="${it.slug}">
        <p class="card-kicker">${it.nights} nights</p>
        <h3>${esc(it.title)}</h3>
        <p>${esc(it.lede)}</p>
        <ol class="itin-days">${it.days.map(([t, d]) => `<li><strong>${esc(t)}</strong> ${esc(d)}</li>`)}</ol>
        <p><a class="btn btn--small btn--ghost" href="/itineraries/?islands=${it.islands.join(',')}#planner">Open in planner</a></p>
      </article>`)}
    </div>
  </div>
</section>`;

  const itinBody = html`${pageHero({ eyebrow: 'Itineraries', title: 'Island-hopping, slowly', lede: 'Three nights is our usual minimum on each main island: enough for a day of arriving, a day of doing and a day of doing nothing.' })}${planner}${samples}`;

  const plannerData = {
    islands: islands.map(({ slug, name, nights, dayTripFrom, expedition, hub }) => ({ slug, name, nights, dayTripFrom, expedition, hub })),
    order: routes.order,
    legs: routes.legs,
  };

  // When to go
  const whenBody = html`
${pageHero({ eyebrow: 'When to go', title: 'When to go', lede: 'Warm all year, so the real question is wind and rain. Each season makes some coasts calm and others rough, and the best months depend on what you want to do.' })}
<section class="section">
  <div class="wrap prose-grid">
    <div class="prose">
      <h2>The short version</h2>
      <ul>
        <li><strong>April–May and October–November</strong>: the transition months. Usually the lightest winds, calmest seas and best underwater visibility.</li>
        <li><strong>May–October</strong>: the south-east trades. Cooler, drier and breezy; north-west-facing beaches are calm, south- and east-facing ones can be rough. Ferry crossings can be bumpy.</li>
        <li><strong>December–March</strong>: the north-west monsoon. Hotter, more humid and wetter, with mostly lighter winds; south- and east-facing beaches calm down.</li>
        <li><strong>Christmas, New Year, Easter and European summer holidays</strong> are the busiest and most expensive weeks.</li>
      </ul>
      <p>Temperatures stay in a narrow, warm band through the year. Rain often comes in heavy, short bursts, and the mountains of Mahé and Silhouette see more of it than the coral islands.</p>
    </div>
    <div class="facts">
      <h2 class="facts-h">Plan around the wind</h2>
      <p>Use the <a href="/beaches/#finder">calm beach finder</a> to see which beaches are usually sheltered in the month you are travelling.</p>
    </div>
  </div>
</section>
<section class="section section--granite">
  <div class="wrap">
    <h2>Month by month</h2>
    <ul class="month-cards">
      ${months.map((mo, k) => {
        const calm = beaches.filter((b) => b.months[k] === 'calm');
        return html`<li class="month-card">
        <h3>${mo.m}</h3>
        <p class="card-kicker">${esc(mo.season)}</p>
        <p>${esc(mo.note)}</p>
        <p class="small">${badge('calm')} ${calm.length} of ${beaches.length} beaches in our finder</p>
      </li>`;
      })}
    </ul>
    <p class="small muted">General patterns only. Weather varies from year to year.</p>
  </div>
</section>`;

  return [
    { path: '/itineraries/', html: layout({ title: 'Island-hopping itineraries and planner', path: '/itineraries/', body: itinBody, description: 'Plan an island-hopping route through the Seychelles: ferries, short flights, rough travel times and suggested nights on each island.', scripts: ['planner'], data: plannerData }) },
    { path: '/when-to-go/', html: layout({ title: 'When to go', path: '/when-to-go/', body: whenBody, description: 'When to visit the Seychelles: the north-west monsoon, the south-east trades and the calm months between, month by month.' }) },
  ];
};
