/**
 * Planner legs. Times are rough door-to-door-ish travel times in minutes for the
 * crossing itself (not check-in or waiting). Every value is in FACTS-TO-VERIFY.md.
 * `options` are alternatives for the same leg; the first is the default shown.
 */
module.exports = {
  // Order the planner visits islands in, after arriving on Mahé. Chosen to avoid backtracking
  // and to finish near Mahé for the international flight home.
  order: ['mahe', 'silhouette', 'bird-island', 'denis', 'outer-islands', 'aldabra', 'praslin', 'curieuse', 'la-digue'],
  legs: [
    { a: 'mahe', b: 'praslin', options: [
      { mode: 'ferry', min: 60, max: 75, note: 'Fast catamaran from Victoria’s Inter-Island Quay; several sailings a day.' },
      { mode: 'flight', min: 15, max: 20, note: 'Domestic flight; small aircraft with a tighter baggage allowance.' },
    ] },
    { a: 'praslin', b: 'la-digue', options: [
      { mode: 'ferry', min: 15, max: 20, note: 'Frequent crossings from Baie Ste Anne jetty to La Passe.' },
    ] },
    { a: 'mahe', b: 'la-digue', options: [
      { mode: 'ferry', min: 80, max: 100, note: 'Sailings from Victoria that call at Praslin on the way.' },
    ] },
    { a: 'praslin', b: 'curieuse', options: [
      { mode: 'boat', min: 15, max: 20, note: 'Day-trip boats from Côte d’Or / Anse Volbert; national park fee payable.' },
    ] },
    { a: 'mahe', b: 'silhouette', options: [
      { mode: 'boat', min: 40, max: 50, note: 'Boat transfer arranged by your accommodation; depends on sea state.' },
      { mode: 'helicopter', min: 15, max: 20, note: 'Helicopter transfer, on request.' },
    ] },
    { a: 'mahe', b: 'bird-island', options: [
      { mode: 'flight', min: 30, max: 35, note: 'Small-aircraft flight; strict soft-bag baggage limit.' },
    ] },
    { a: 'mahe', b: 'denis', options: [
      { mode: 'flight', min: 30, max: 35, note: 'Charter flight booked with the stay; strict baggage limit.' },
    ] },
    { a: 'mahe', b: 'outer-islands', options: [
      { mode: 'flight', min: 60, max: 90, note: 'Charter flight to Desroches or Alphonse, booked with the lodge.' },
    ] },
    { a: 'mahe', b: 'aldabra', options: [
      { mode: 'expedition', min: null, max: null, note: 'Expedition voyage with permits from the Seychelles Islands Foundation; usually a charter flight plus days at sea. Fixed departures only.' },
    ] },
  ],
};
