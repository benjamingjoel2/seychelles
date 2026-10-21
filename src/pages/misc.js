const { html, esc, photo, layout, pageHero, used, config, utm } = require('../lib/html.js');
const islands = require('../data/islands.js');
const stays = require('../data/stays.js');
const journal = require('../data/journal.js');
const routes = require('../data/routes.js');

const fmtDate = (d) => new Date(d + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

function staysPage() {
  const name = Object.fromEntries(islands.map((i) => [i.slug, i.name]));
  const order = [...new Set(stays.map((s) => s.island))];
  const body = html`
${pageHero({ eyebrow: 'Stays', title: 'Where to stay', lede: 'Small places, mostly: family guesthouses, self-catering cottages and a few island lodges. We match the stay to the season and the coast as much as to the room.' })}
<section class="section">
  <div class="wrap">
    <p class="placeholder-note"><strong>Placeholder names.</strong> These are examples of the kinds of places we suggest, not real properties. Real partner stays will replace them.</p>
    ${order.map((s) => html`<h2 class="group-h">${esc(name[s])}</h2>
      <ul class="cards cards--3">${stays.filter((x) => x.island === s).map((x) => html`<li class="card card--text">
        <div class="card-body"><p class="card-kicker">${esc(x.type)} · ${esc(x.size)}</p><h3>${esc(x.name)}</h3><p>${esc(x.fit)}</p></div>
      </li>`)}</ul>`)}
    <h2>How we choose</h2>
    <ul>
      <li>Location first: the right coast for the time of year, and close enough to the jetty or trailhead that matters.</li>
      <li>Small and locally run where possible.</li>
      <li>We describe places as we find them and do not publish ratings or reviews we cannot stand behind.</li>
    </ul>
  </div>
</section>`;
  return { path: '/stays/', html: layout({ title: 'Stays', path: '/stays/', body, description: 'Guesthouses, self-catering cottages and island lodges across the Seychelles, chosen for the right coast and season.' }) };
}

function aboutPage() {
  const body = html`
${pageHero({ eyebrow: 'About', title: `About ${esc(config.brand.name)}`, lede: 'We plan island-hopping trips in the Seychelles for people who want to see more than one beach, and to see each one properly.' })}
<section class="section">
  <div class="wrap prose narrow">
    <h2>The name</h2>
    <p>${esc(config.brand.nameStory)}</p>
    <h2>What we do</h2>
    <p>We help you decide which islands to visit, in what order, for how long and in which season. Then we put the pieces together: ferries and flights, places to stay, and the few things worth booking ahead.</p>
    <h2>How we plan</h2>
    <ul>
      <li><strong>Slowly.</strong> Usually three nights or more on each main island, and transfer days with room to spare.</li>
      <li><strong>Around the wind.</strong> The season decides which coast you should sleep on and which beaches will be calm.</li>
      <li><strong>Honestly.</strong> If a beach is often dangerous for swimming, or a famous view is crowded at midday, we say so.</li>
      <li><strong>Lightly.</strong> We favour small, locally run places and pay-to-enter parks and reserves that fund conservation.</li>
    </ul>
    <h2>Talk to us</h2>
    <p>Email <a href="mailto:${esc(config.contact.email)}">${esc(config.contact.email)}</a>, call ${esc(config.contact.phone)}, or <a href="/enquire/">send an enquiry</a>.</p>
  </div>
</section>`;
  return { path: '/about/', html: layout({ title: 'About', path: '/about/', body }) };
}

function journalPages() {
  const posts = [...journal].sort((a, b) => b.date.localeCompare(a.date));
  const index = html`
${pageHero({ eyebrow: 'Journal', title: 'Journal', lede: 'Notes on wind, water, ferries and forests.' })}
<section class="section"><div class="wrap">
  <ul class="cards cards--3">${posts.map((p) => html`<li class="card">
    ${photo(p.photo, { ratio: '3:2', sizes: '(min-width: 900px) 33vw, 100vw', label: p.title })}
    <div class="card-body"><p class="card-kicker"><time datetime="${p.date}">${fmtDate(p.date)}</time></p><h2 class="h3"><a class="card-link" href="/journal/${p.slug}/">${esc(p.title)}</a></h2><p>${esc(p.dek)}</p></div>
  </li>`)}</ul>
</div></section>`;
  const out = [{ path: '/journal/', html: layout({ title: 'Journal', path: '/journal/', body: index }) }];
  for (const p of posts) {
    const body = html`
<article>
  <header class="section article-head"><div class="wrap narrow">
    <p class="eyebrow"><a href="/journal/">Journal</a> · <time datetime="${p.date}">${fmtDate(p.date)}</time></p>
    <h1>${esc(p.title)}</h1>
    <p class="lede">${esc(p.dek)}</p>
  </div></header>
  <div class="wrap narrow">${photo(p.photo, { eager: true, ratio: '16:9', sizes: '(min-width: 760px) 720px, 100vw', label: p.title })}</div>
  <div class="section"><div class="wrap narrow prose">${p.body}</div></div>
</article>`;
    out.push({ path: `/journal/${p.slug}/`, html: layout({ title: p.title, path: `/journal/${p.slug}/`, body, description: p.dek }) });
  }
  return out;
}

function enquirePages() {
  const endpoint = config.enquiryEndpoint;
  const body = html`
${pageHero({ eyebrow: 'Enquire', title: 'Start planning', lede: 'Tell us a little about your trip. We reply by email, usually within two working days, with a suggested route and any questions. There is no obligation and nothing is booked until you say so.' })}
<section class="section">
  <div class="wrap form-wrap">
    <form class="enquiry" method="post" action="${esc(endpoint || `mailto:${config.contact.email}`)}" ${endpoint ? '' : 'enctype="text/plain"'} data-enquiry data-endpoint="${esc(endpoint)}" data-email="${esc(config.contact.email)}" novalidate>
      <div class="field"><label for="f-name">Your name <span class="req">(required)</span></label><input id="f-name" name="name" autocomplete="name" required></div>
      <div class="field"><label for="f-email">Email <span class="req">(required)</span></label><input id="f-email" name="email" type="email" autocomplete="email" required></div>
      <div class="field"><label for="f-phone">Phone or WhatsApp <span class="opt">(optional)</span></label><input id="f-phone" name="phone" type="tel" autocomplete="tel"></div>
      <div class="field-row">
        <div class="field"><label for="f-month">Roughly when?</label><input id="f-month" name="travel_month" type="month"></div>
        <div class="field"><label for="f-nights">How many nights?</label><input id="f-nights" name="nights" type="number" min="1" max="60" inputmode="numeric"></div>
        <div class="field"><label for="f-people">How many travellers?</label><input id="f-people" name="travellers" type="number" min="1" max="20" inputmode="numeric"></div>
      </div>
      <fieldset class="field">
        <legend>Islands you are interested in</legend>
        <div class="check-grid">${routes.order.map((s) => `<label class="check"><input type="checkbox" name="islands" value="${esc(islands.find((i) => i.slug === s).name)}"> ${esc(islands.find((i) => i.slug === s).name)}</label>`)}<label class="check"><input type="checkbox" name="islands" value="Not sure yet"> Not sure yet</label></div>
      </fieldset>
      <fieldset class="field">
        <legend>Pace</legend>
        <div class="check-grid">
          <label class="check"><input type="radio" name="pace" value="Slow" checked> Slow: 3+ nights per island</label>
          <label class="check"><input type="radio" name="pace" value="Very slow"> Very slow: one or two islands, properly</label>
          <label class="check"><input type="radio" name="pace" value="Fuller"> Fuller: more islands, shorter stays</label>
        </div>
      </fieldset>
      <div class="field" data-plan-field hidden><label for="f-plan">Your planner route</label><textarea id="f-plan" name="planner_route" rows="5" readonly></textarea><p class="small muted">From the <a href="/itineraries/#planner">island-hopping planner</a>. Edit it there if you want to change it.</p></div>
      <div class="field"><label for="f-msg">Anything else?</label><textarea id="f-msg" name="message" rows="5" placeholder="What you love doing, who is travelling, anything to avoid…"></textarea></div>
      <div class="hp" aria-hidden="true"><label for="f-web">Leave this empty</label><input id="f-web" name="website" tabindex="-1" autocomplete="off"></div>
      <div class="field"><label class="check"><input type="checkbox" name="consent" value="yes" required> I agree to ${esc(config.brand.name)} using these details to reply to my enquiry. <span class="req">(required)</span></label></div>
      <div class="form-errors" data-errors role="alert" tabindex="-1" hidden></div>
      <p><button class="btn" type="submit">Send enquiry</button></p>
      ${endpoint ? '' : '<p class="small muted">Sending opens your email app with your answers filled in.</p>'}
    </form>
    <div class="facts">
      <h2 class="facts-h">Prefer to talk?</h2>
      <p><a href="mailto:${esc(config.contact.email)}">${esc(config.contact.email)}</a><br>${esc(config.contact.phone)}<br>${esc(config.contact.hours)}</p>
    </div>
  </div>
</section>`;
  const thanks = html`${pageHero({ eyebrow: 'Enquire', title: 'Thank you', lede: 'Your enquiry is on its way. We will reply by email, usually within two working days.' })}<section class="section"><div class="wrap"><p><a href="/">Back to the home page</a></p></div></section>`;
  return [
    { path: '/enquire/', html: layout({ title: 'Enquire', path: '/enquire/', body, scripts: ['enquiry'], description: `Send ${config.brand.name} your dates and the islands you would like to see.` }) },
    { path: '/enquire/thanks/', html: layout({ title: 'Thank you', path: '/enquire/thanks/', body: thanks, noindex: true }) },
  ];
}

/** Built last, after every other page has registered the photos it uses. */
function creditsPage() {
  const list = [...used.values()].sort((a, b) => a.slot.localeCompare(b.slot));
  const body = html`
${pageHero({ eyebrow: 'Credits', title: 'Photo credits', lede: 'Every photograph on this site comes from Unsplash and was chosen only when its location on Unsplash matches the place we show it for. Where we have no matching photo yet, we show an illustration instead.' })}
<section class="section"><div class="wrap">
  <div class="table-scroll" tabindex="0" role="region" aria-label="Photo credits">
  <table class="credits">
    <thead><tr><th scope="col">Used for</th><th scope="col">Location on Unsplash</th><th scope="col">Photographer</th><th scope="col">Photo</th></tr></thead>
    <tbody>${list.map((p) => `<tr><td>${esc(p.slot)}</td><td>${esc(p.location_on_unsplash)}</td><td><a href="${p.photographer_url}?${utm}">${esc(p.photographer)}</a></td><td><a href="${p.page}?${utm}">View on Unsplash</a></td></tr>`).join('')}</tbody>
  </table>
  </div>
</div></section>`;
  return { path: '/credits/', html: layout({ title: 'Photo credits', path: '/credits/', body }) };
}

function notFound() {
  const body = html`${pageHero({ eyebrow: '404', title: 'This page has drifted off', lede: 'The page you were looking for is not here. Try the <a href="/islands/">islands</a>, the <a href="/beaches/">beaches</a> or the <a href="/">home page</a>.' })}`;
  return { path: '/404.html', html: layout({ title: 'Page not found', path: '/404.html', body, noindex: true }) };
}

module.exports = () => [staysPage(), aboutPage(), ...journalPages(), ...enquirePages(), notFound()];
module.exports.creditsPage = creditsPage;
