# Granite Coast: a Seychelles island-hopping travel site

A fast, static travel website for slow island-hopping in the Seychelles. It has:

- **Pages:** home, islands (index plus Mahé, Praslin, La Digue, Silhouette, Curieuse, Bird Island, Denis, the outer islands and Aldabra), beaches, nature, itineraries, when to go, stays, about, journal (3 posts), enquiry form, privacy policy, booking terms, cookie policy, 404.
- **Island-hopping planner** (`/itineraries/#planner`): pick islands and it orders them from Mahé, shows each leg (ferry, flight, boat, helicopter or expedition) with rough times and alternatives, and suggests nights on each island. You can change the nights, share a link to the route, or send it with an enquiry.
- **Calm beach finder** (`/beaches/#finder`): pick a month to see which beaches are usually calm, mixed or rough under the north-west monsoon or the south-east trades. There is also a whole-year table, and the home page shows this month's calm beaches.

There are no dependencies and no framework: a ~150-line Node script turns plain JavaScript
templates into HTML in `dist/`. Interactive parts are small vanilla JS files that load
only on the pages that need them. Without JavaScript every page still works, and the
planner and finder fall back to static tables.

## Run it

Requires Node 18 or newer.

```bash
npm run dev      # build, serve on http://localhost:3000 and rebuild on every change
npm run build    # build into dist/
npm run check    # build, then check internal links, anchors, alt text and duplicate ids
```

`npm run dev` serves on port 3000. Set `PORT=4000` to change it. No `npm install` is needed.

## Edit it

| To change… | Edit |
|---|---|
| Brand name, tagline, story, contact details, form endpoint, colours, fonts | `site.config.js` (**the only file needed to rebrand**) |
| Islands: text, highlights, suggested nights | `src/data/islands.js` |
| Beaches and their seasonal exposure | `src/data/beaches.js` |
| Planner legs, times and visiting order | `src/data/routes.js` |
| Sample itineraries | `src/data/itineraries.js` |
| Month-by-month notes | `src/data/months.js` |
| Stays (currently placeholders) | `src/data/stays.js` |
| Journal posts | `src/data/journal.js` (body is HTML) |
| Photos | `src/data/photos.js` |
| Page layouts | `src/pages/*.js`; shared header, footer and photo helper in `src/lib/html.js` |
| Styles | `src/assets/css/site.css` (colours come from config as CSS variables) |
| Planner / finder / form behaviour | `src/assets/js/planner.js`, `finder.js`, `enquiry.js` |

### Rebranding

Change `brand`, `contact`, `url`, `palette` and `fonts` in `site.config.js` and rebuild. Fonts are self-hosted from `src/assets/fonts/` (downloaded from Google Fonts, latin and latin-ext subsets): Instrument Serif (display), Inter Tight (text) and IBM Plex Mono (labels). To change a family, replace the files and `fonts.css` there, and the preload in `src/lib/html.js`. The other
brand option, **Lamer Seychelles** ("lamer" is Seychellois Creole for "the sea"), is noted
in the config. The favicon, logo colours, theme colour and CSS tokens all follow the palette.

The build **fails if any text colour pair listed in `contrastPairs` drops below WCAG AA
(4.5:1)**, so a new palette cannot quietly break accessibility. If you use a colour for
text against a new background, add the pair to `contrastPairs`.

### The enquiry form

It works without a backend: by default, submitting opens the visitor's email app with the
answers filled in. To receive submissions directly, set `enquiryEndpoint` in
`site.config.js` to any service that accepts a standard form POST (for example Formspree).
The form validates in the browser, includes a honeypot field against spam, and redirects to
`/enquire/thanks/` on success. A route from the planner is attached automatically.

### Photos

Photos come from Unsplash or Pexels. They are **downloaded into `src/assets/photos/`**
(WebP at 640, 960, 1100, 1280 and 1920 px) by `npm run photos` and served from the site's own domain,
so privacy blockers that stop third-party image hosts can't hide them. After adding a photo
to `src/data/photos.js`, run `npm run photos` and commit the new files. Photos are served at responsive
sizes with `srcset` and lazy-loaded below the fold; the hero photo is preloaded. Unsplash and
Pexels licences do not require attribution, so the site shows only the location in each caption.
Photographer and source stay recorded in `src/data/photos.js`. If a Creative Commons photo is ever
added, it must be credited (bring back a credits page for those photos only).

**Rule:** only add a photo when the location on its Unsplash or Pexels page names the place
it is used for. Copy that text into `location`; it is shown in the caption.
A slot without a photo shows a drawn granite-and-sea illustration rather than a photo of
somewhere else. See `FACTS-TO-VERIFY.md` for the empty slots.

### Facts

Travel times, fees, entry rules and the beach-exposure model are listed in
**`FACTS-TO-VERIFY.md`** and must be checked before launch. The site contains no reviews,
ratings, press logos or awards. Do not add any unless they are real and sourced.

### Languages

The site is in English (default, at the current URLs), French (`/fr/`), German (`/de/`) and Spanish (`/es/`), every page pre-rendered; there is no translation code in the browser.

- `node build.js` builds the English site, then `scripts/translate-site.cjs` writes `dist/fr/`, `dist/de/` and `dist/es/` from the dictionaries in `i18n/<lang>.json` (English text → translation): page text, alt/aria/meta text, the page data used by the planner and beach finder, and the strings in the page scripts. It rewrites internal links to the same language, sets `<html lang>`, canonical and `hreflang` (en, fr, de, es, x-default) and lists every language in the sitemap.
- The legal pages are written in all four languages (`src/lib/legal.js`), and month-dependent headings are generated, both via `i18n/extra.cjs`.
- **When you change English copy:** run `node build.js` and `node scripts/translate-site.cjs extract` (writes every translatable string to `i18n/strings.en.json`). The build lists any string without a translation; add it to the three `i18n/<lang>.json` files. `I18N_STRICT=1 node build.js` fails on missing strings.
- The selector (EN · FR · DE · ES) is in the header on desktop and at the bottom of the menu on smaller screens. Settings live in `i18n/config.json`.
- Have native speakers review the French, German and Spanish copy before launch.

### Legal pages

`/privacy/`, `/booking-terms/` and `/cookies/` are generated from `src/lib/legal.js` using the brand
name, email and address in `site.config.js`. The cookie policy lists the one item of browser storage
the site uses (`plannerRoute`); update it if you add analytics or anything else. Have a lawyer
review all three before launch.

## Before launch

- Confirm the business address in `site.config.js` (`contact.address`): see the open question in the PR.
- Set up the `granitecoast@tourground.com` mailbox and point `granitecoast.tourground.com` at the Vercel project.
- Replace the placeholder stays and request images for them (`IMAGES-NEEDED.md`).
- Work through `FACTS-TO-VERIFY.md`, have a lawyer review the legal pages and native speakers the FR/DE/ES copy.

## Deploy

The site is configured for Vercel (`vercel.json`: build `node build.js`, output `dist`,
clean URLs, cache headers). Connect the GitHub repo in Vercel, or deploy from the CLI:

```bash
npx vercel deploy --prod
```

Any static host works: upload `dist/` after `npm run build`.
