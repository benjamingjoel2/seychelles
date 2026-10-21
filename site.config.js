/**
 * Brand configuration. This is the ONLY file you need to edit to rebrand the site.
 * Everything here flows into every page, the CSS colour tokens, the footer,
 * the enquiry form and the metadata at build time.
 *
 * After editing, run `npm run build` (or `npm run dev`) — the build also checks
 * that the palette pairs used for text still pass WCAG AA contrast.
 */
module.exports = {
  brand: {
    name: 'Granite Coast',
    // Shown under the logo and in <title> on the home page.
    tagline: 'Island-hopping Seychelles, done slowly',
    // One-sentence description used for search engines and social cards.
    description:
      'Plan a slow, island-hopping journey through the Seychelles: Mahé, Praslin, La Digue and the outer islands, with a route planner and a seasonal calm-beach finder.',
    // Short story behind the name, used on the About page.
    nameStory:
      'The inner Seychelles are made of granite — pink-grey boulders hundreds of millions of years old, the only granite islands in the middle of an ocean. We named ourselves after that coast.',
    // Alternative considered: name 'Lamer Seychelles', nameStory about "lamer", Seychellois Creole for "the sea".
  },

  // Public URL of the deployed site (no trailing slash). Used for canonical links and the sitemap.
  url: 'https://granite-coast.vercel.app',

  contact: {
    // PLACEHOLDERS — replace with real details before launch.
    email: 'hello@example.com',
    phone: '+248 000 0000',
    whatsapp: '', // e.g. '+2480000000' — leave empty to hide
    address: 'Victoria, Mahé, Seychelles (placeholder)',
    hours: 'Mon–Fri, 09:00–17:00 Seychelles time (UTC+4)',
  },

  // Where the enquiry form posts. Leave empty to fall back to opening the visitor's
  // email app with the form contents pre-filled (works with no backend at all).
  // Any service that accepts a standard HTML form POST works, e.g. Formspree:
  //   'https://formspree.io/f/xxxxxxx'
  enquiryEndpoint: '',

  /**
   * Typography (Google Fonts). `googleFonts` is the css2 URL; the three stacks are used
   * for display headings, running text, and small uppercase labels.
   */
  fonts: {
    googleFonts:
      'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap',
    display: '"Instrument Serif", "Iowan Old Style", Palatino, Georgia, serif',
    text: '"Inter Tight", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
    mono: '"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
  },

  social: {
    instagram: '', // full URL, leave empty to hide
  },

  /**
   * Palette. Names are semantic, so swap values freely.
   * `contrastPairs` below lists every foreground/background combination the CSS
   * uses for text; the build fails if any pair drops under WCAG AA (4.5:1).
   */
  palette: {
    night: '#0B2230', // deepest ocean: dark sections, footer
    ocean: '#0E3B57', // deep ocean blue: headings, buttons
    oceanBright: '#1C6A93', // links, focus rings
    lagoon: '#D5E8EE', // pale water tint for panels
    granite: '#CDB8B2', // pink-grey granite: decorative bands
    graniteLight: '#EFE6E2', // granite wash backgrounds
    graniteDeep: '#6A5550', // granite text on light backgrounds
    takamaka: '#2E5B44', // takamaka green: nature accents, "calm" badges
    takamakaLight: '#DCE9DF',
    sand: '#FAF7F2', // white sand page background
    white: '#FFFFFF',
    coral: '#E7735C', // decorative coral touches only (not for small text)
    coralDeep: '#A63F2B', // coral for text, "rough" badges
    coralLight: '#FBE3DC',
    ink: '#1B2A33', // body text
    amber: '#7A5A00', // "mixed" badge text
    amberLight: '#F6EBC8',
  },

  contrastPairs: [
    ['ink', 'sand'],
    ['ink', 'white'],
    ['ink', 'graniteLight'],
    ['ink', 'lagoon'],
    ['ocean', 'sand'],
    ['ocean', 'white'],
    ['ocean', 'lagoon'],
    ['ocean', 'graniteLight'],
    ['oceanBright', 'sand'],
    ['oceanBright', 'white'],
    ['white', 'ocean'],
    ['white', 'oceanBright'],
    ['sand', 'ocean'],
    ['sand', 'night'],
    ['white', 'night'],
    ['granite', 'night'],
    ['sand', 'takamaka'],
    ['takamakaLight', 'takamaka'],
    ['ink', 'granite'],
    ['ocean', 'granite'],
    ['granite', 'ocean'],
    ['graniteDeep', 'sand'],
    ['graniteDeep', 'white'],
    ['graniteDeep', 'graniteLight'],
    ['takamaka', 'takamakaLight'],
    ['takamaka', 'sand'],
    ['white', 'takamaka'],
    ['coralDeep', 'coralLight'],
    ['coralDeep', 'sand'],
    ['amber', 'amberLight'],
  ],
};
