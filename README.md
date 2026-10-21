# Granite Coast: a Seychelles island-hopping travel site

A fast, static travel website for slow island-hopping in the Seychelles. It has:

- **Pages:** home, islands (index plus Mahé, Praslin, La Digue, Silhouette, Curieuse, Bird Island, Denis, the outer islands and Aldabra), beaches, nature, itineraries, when to go, stays, about, journal (3 posts), enquiry form, photo credits, 404.
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
| Brand name, tagline, story, contact details, form endpoint, colours | `site.config.js` (**the only file needed to rebrand**) |
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

Change `brand`, `contact`, `url` and `palette` in `site.config.js` and rebuild. The other
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

Photos come from Unsplash or Pexels, are hotlinked from their CDNs, served at responsive
sizes with `srcset`, lazy-loaded below the fold, and credited in every caption and on
`/credits/`.

**Rule:** only add a photo when the location on its Unsplash or Pexels page names the place
it is used for. Copy that text into `location`; it is shown in the caption.
A slot without a photo shows a drawn granite-and-sea illustration rather than a photo of
somewhere else. See `FACTS-TO-VERIFY.md` for the empty slots.

### Facts

Travel times, fees, entry rules and the beach-exposure model are listed in
**`FACTS-TO-VERIFY.md`** and must be checked before launch. The site contains no reviews,
ratings, press logos or awards. Do not add any unless they are real and sourced.

## Deploy

The site is configured for Vercel (`vercel.json`: build `node build.js`, output `dist`,
clean URLs, cache headers). Connect the GitHub repo in Vercel, or deploy from the CLI:

```bash
npx vercel deploy --prod
```

Any static host works: upload `dist/` after `npm run build`.
