// Privacy policy, booking terms and cookie policy. Copy lives in src/lib/legal.js.
const { html, layout, pageHero, config } = require('../lib/html.js');
const { legalPages } = require('../lib/legal.js');

const UPDATED = '30 October 2026';

module.exports = () => {
  const { privacy, terms, cookies } = legalPages({
    brand: config.brand.name,
    email: config.contact.email,
    address: config.contact.address,
    updated: UPDATED,
    storage: [
      {
        name: 'plannerRoute',
        kind: 'Local storage',
        purpose: 'Carries the route you built in the island-hopping planner over to the enquiry form. Removed when the enquiry is sent.',
        duration: 'Until the enquiry is sent or you clear site data',
      },
    ],
    enquiryNote: config.enquiryEndpoint
      ? 'The enquiry form is sent to our form-handling provider, which delivers it to our inbox.'
      : 'The enquiry form does not send anything itself: it opens your own email app with your answers filled in.',
    processors: ['with our website host and email provider, who process data on our behalf under contract;'],
  });
  const page = (path, doc, n) =>
    ({
      path,
      html: layout({
        title: doc.title,
        path,
        description: `${doc.title} for ${config.brand.name}.`,
        body: html`${pageHero({ eyebrow: 'Legal', n, title: doc.title, lede: doc.intro })}
<section class="section"><div class="wrap prose narrow legal">
${doc.sections.map((s) => `<h2>${s.h}</h2>\n${s.html.replace('COOKIES_URL', '/cookies/')}`).join('\n')}
</div></section>`,
      }),
    });
  return [page('/privacy/', privacy, 1), page('/booking-terms/', terms, 2), page('/cookies/', cookies, 3)];
};
