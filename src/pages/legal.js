// Privacy policy, booking terms and cookie policy. Copy lives in src/lib/legal.js.
const { html, layout, pageHero, config } = require('../lib/html.js');
const { LEGAL } = require('../lib/legal.js');
const legalOptions = require('../lib/legal-options.js');

module.exports = () => {
  const { privacy, terms, cookies } = LEGAL.en(legalOptions('en'));

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
