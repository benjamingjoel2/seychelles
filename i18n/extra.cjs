// Dictionary entries generated from copy that is already written in every language:
// the legal pages (src/lib/legal.js). Merged under i18n/<lang>.json by scripts/translate-site.cjs.
const { LEGAL } = require('../src/lib/legal.js');
const legalOptions = require('../src/lib/legal-options.js');
const { zipRuns } = require('../scripts/translate-site.cjs');
const config = require('../site.config.js');

const render = (d) =>
  [d.privacy, d.terms, d.cookies]
    .map((doc) => `<h1>${doc.title}</h1><p>${doc.intro}</p>` + doc.sections.map((s) => `<h2>${s.h}</h2>${s.html}`).join(''))
    .join('');

module.exports = (lang) => {
  if (!LEGAL[lang] || lang === 'en') return {};
  const en = LEGAL.en(legalOptions('en'));
  const tr = LEGAL[lang](legalOptions(lang));
  const out = zipRuns(render(en), render(tr));
  const name = config.brand.name;
  for (const k of ['privacy', 'terms', 'cookies']) {
    out[`${en[k].title} · ${name}`] = `${tr[k].title} · ${name}`;
    out[`${en[k].title} for ${name}.`] = `${tr[k].title} – ${name}.`;
  }
  return out;
};

// Strings that change with the build month (home page and beach finder headings): one entry per month.
const MONTHS = {
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  fr: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
  de: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
  es: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
};
const CALM_IN = { fr: 'Calme en', de: 'Ruhig im', es: 'Tranquilo en' };
const WHICH = { fr: (m) => `Quelles plages sont calmes en <span>${m}</span> ?`, de: (m) => `Welche Strände sind im <span>${m}</span> ruhig?`, es: (m) => `¿Qué playas están tranquilas en <span>${m}</span>?` };
const base = module.exports;
module.exports = (lang) => {
  const out = base(lang);
  if (!CALM_IN[lang]) return out;
  MONTHS.en.forEach((m, i) => {
    out[`Calm in <em>${m}</em>`] = `${CALM_IN[lang]} <em>${MONTHS[lang][i]}</em>`;
    out[`Which beaches are calm in <span>${m}</span>?`] = WHICH[lang](MONTHS[lang][i]);
  });
  return out;
};
