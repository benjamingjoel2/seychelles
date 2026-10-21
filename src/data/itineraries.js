/** Sample itineraries. Each can be opened in the planner via its `islands` list. */
module.exports = [
  {
    slug: 'granite-trilogy', title: 'The granite trilogy', nights: 10,
    lede: 'The classic three islands, without rushing any of them.',
    islands: ['mahe', 'praslin', 'curieuse', 'la-digue'],
    days: [
      ['Mahé · 3 nights', 'Land, sleep, and spend a slow first morning on whichever coast is calm. A mountain walk on day two, Victoria market on Saturday.'],
      ['Praslin · 3 nights', 'Ferry across. Vallée de Mai early on your first full day, Anse Lazio or Côte d’Or depending on the season, and a boat to Curieuse for the tortoises.'],
      ['La Digue · 4 nights', 'Fifteen minutes by ferry, then everything by bicycle. Anse Source d’Argent at low crowd times, the east-coast walk if the sea allows, nothing at all on the last day.'],
      ['Home', 'Ferry back to Mahé for your flight; allow a generous buffer.'],
    ],
  },
  {
    slug: 'birds-and-boulders', title: 'Birds and boulders', nights: 12,
    lede: 'Granite islands plus a coral cay for people who travel with binoculars.',
    islands: ['mahe', 'bird-island', 'praslin', 'la-digue'],
    days: [
      ['Mahé · 2 nights', 'Recover from the flight; look for the Seychelles kestrel and sunbirds around the hills.'],
      ['Bird Island · 2 nights', 'A short flight north. Best between roughly April and October, when the sooty terns are nesting.'],
      ['Praslin · 4 nights', 'Vallée de Mai at opening time for the black parrot; Curieuse by boat.'],
      ['La Digue · 4 nights', 'The Veuve Reserve for the paradise flycatcher, then slow beach days.'],
    ],
  },
  {
    slug: 'edge-of-the-bank', title: 'Edge of the bank', nights: 14,
    lede: 'A mountain island and a coral island added to the classic pair.',
    islands: ['mahe', 'silhouette', 'denis', 'praslin', 'la-digue'],
    days: [
      ['Mahé · 2 nights', 'Arrive and settle.'],
      ['Silhouette · 3 nights', 'Boat across the bay from Mahé; forest trails and reef.'],
      ['Denis · 3 nights', 'Back via Mahé for the short flight north.'],
      ['Praslin · 3 nights', 'Palm forest and the north-west beaches.'],
      ['La Digue · 3 nights', 'Bicycles and boulders to finish.'],
    ],
  },
  {
    slug: 'aldabra-expedition', title: 'The Aldabra expedition', nights: 12,
    lede: 'For the few who want to reach the far south-west.',
    islands: ['mahe', 'aldabra'],
    days: [
      ['Mahé · 2–3 nights', 'A buffer before the voyage, in case flights shift.'],
      ['Aldabra expedition · 7–10 nights', 'Aboard ship, with permitted landings. Departures are rare and fixed; we plan everything around the sailing date.'],
      ['Mahé · 1 night', 'Before the flight home.'],
    ],
  },
];
