/**
 * Islands. `nights` is the planner's suggested stay ([min, suggested]).
 * Anything time-, price- or rule-related is listed in FACTS-TO-VERIFY.md.
 */
module.exports = [
  {
    slug: 'mahe',
    name: 'Mahé',
    group: 'Inner islands · granite',
    kicker: 'The big island, and the way in',
    summary:
      'Mountains, mist forest and more than sixty beaches. Every international flight lands here, so every journey starts and ends on Mahé.',
    intro: [
      'Mahé is the largest island in the Seychelles and home to most of the population, the capital Victoria and the international airport. It is also wilder than people expect: the granite spine of Morne Seychellois rises steeply from the coast, and much of the interior is national park.',
      'Most visitors treat Mahé as a stopover. We think it deserves a few unhurried days at the start or end of a trip — long enough to walk a mountain trail in the cool of the morning, eat at a roadside takeaway and find a beach on the side of the island the wind is not blowing on.',
    ],
    highlights: [
      ['Morne Seychellois National Park', 'Trails through mist forest and granite slabs; Copolia and Morne Blanc are popular short hikes with big views.'],
      ['Victoria', 'One of the smallest capitals in the world. The Sir Selwyn Selwyn-Clarke market is busiest on Saturday mornings.'],
      ['Ste Anne Marine National Park', 'Small islands and reef a short boat ride from Victoria, good for a first snorkel.'],
      ['Two coasts, two seasons', 'Beau Vallon in the north-west and the southern bays such as Anse Intendance are calm at opposite times of year.'],
    ],
    gettingThere: 'International flights land at Seychelles International Airport on Mahé’s east coast. Ferries to Praslin and La Digue leave from Victoria’s Inter-Island Quay; domestic flights leave from the same airport as international ones.',
    nights: [2, 3],
    stayNote: 'Base yourself on the coast that suits the season: the north-west (Beau Vallon) from May to October, the south from December to March.',
    beaches: ['beau-vallon', 'anse-major', 'port-launay', 'anse-takamaka', 'anse-intendance', 'anse-royale'],
    hub: true,
  },
  {
    slug: 'praslin',
    name: 'Praslin',
    group: 'Inner islands · granite',
    kicker: 'Palm forest and the coco de mer',
    summary:
      'The second-largest island, quieter than Mahé, with the Vallée de Mai palm forest and two of the country’s most photographed beaches.',
    intro: [
      'Praslin is about an hour north-east of Mahé by fast ferry. It is gentler and greener, with a single road looping the island and villages strung along the coast.',
      'The island’s centre holds the Vallée de Mai, a UNESCO World Heritage palm forest and one of the only places on earth where the coco de mer grows wild. Go early, when the forest is quiet enough to hear the black parrot.',
    ],
    highlights: [
      ['Vallée de Mai', 'Ancient palm forest and the wild coco de mer. Allow two to three hours on the marked trails.'],
      ['Anse Lazio', 'A wide arc of sand framed by granite at the island’s north-west tip; at its best in the south-east trade-wind months.'],
      ['Anse Georgette', 'A small, beautiful beach reached through a resort’s grounds; access arrangements change, so ask ahead.'],
      ['Day trip to Curieuse', 'Boats from Côte d’Or cross to Curieuse to see giant tortoises and the mangrove boardwalk.'],
    ],
    gettingThere: 'Fast ferry from Victoria (about an hour) or a short domestic flight from Mahé (about 15–20 minutes). Praslin is also the jumping-off point for La Digue (about 15 minutes by ferry) and Curieuse.',
    nights: [2, 3],
    stayNote: 'Côte d’Or / Anse Volbert on the north-east coast is sheltered for much of the year and close to the La Digue and Curieuse boats.',
    beaches: ['anse-lazio', 'anse-georgette', 'cote-d-or', 'grand-anse-praslin'],
  },
  {
    slug: 'la-digue',
    name: 'La Digue',
    group: 'Inner islands · granite',
    kicker: 'Bicycles, ox-carts and boulders',
    summary:
      'A small island where most people get around by bicycle, and where the granite boulders meet the sea at Anse Source d’Argent.',
    intro: [
      'La Digue is a short ferry ride from Praslin. There are few cars, so the pace is set by bicycle; you hire one at the jetty and keep it for your stay.',
      'Day-trippers come for Anse Source d’Argent and leave by mid-afternoon. Stay a few nights and you get the island in the early mornings and evenings, which is when it is at its best.',
    ],
    highlights: [
      ['Anse Source d’Argent', 'Reached through L’Union Estate (entry fee). Shallow, reef-protected water between enormous granite boulders.'],
      ['The east-coast walk', 'Grand Anse, Petite Anse and Anse Cocos are linked by a footpath. Beautiful, but the sea here can be dangerous.'],
      ['Veuve Reserve', 'A small reserve protecting the Seychelles paradise flycatcher, one of the world’s rarest birds.'],
      ['Nid d’Aigle', 'The island’s highest point, a steady climb with views back to Praslin.'],
    ],
    gettingThere: 'Ferry from Praslin (about 15 minutes), or from Mahé on sailings that call at Praslin on the way (about 1½ hours in total).',
    nights: [2, 3],
    stayNote: 'Stay near La Passe (the jetty village) so you can walk to dinner; most guesthouses here are small and family-run.',
    beaches: ['anse-source-d-argent', 'grand-anse-la-digue', 'anse-cocos', 'anse-severe'],
  },
  {
    slug: 'silhouette',
    name: 'Silhouette',
    group: 'Inner islands · granite',
    kicker: 'The mountain across the bay',
    summary:
      'The dramatic peak you see from Beau Vallon. Most of the island is national park, with very little development and no roads.',
    intro: [
      'Silhouette is the third-largest granite island, and one of the least developed: there are no roads, and most of the land and the sea around it are protected.',
      'It suits people who like to walk. Trails cross the island through rainforest that includes plants found nowhere else, and the island is home to a breeding programme for giant tortoises and terrapins.',
    ],
    highlights: [
      ['National park trails', 'Forest walks across the island; some need a guide.'],
      ['Marine national park', 'Protected reefs around the island for snorkelling and diving.'],
      ['Quiet', 'Visitor accommodation on the island is very limited, so it stays uncrowded.'],
    ],
    gettingThere: 'Boat transfer from Mahé (roughly 45 minutes, depending on sea conditions) or helicopter, arranged through the accommodation.',
    nights: [2, 3],
    stayNote: 'Accommodation is limited; transfers are arranged by where you stay.',
    beaches: [],
  },
  {
    slug: 'curieuse',
    name: 'Curieuse',
    group: 'Inner islands · granite',
    kicker: 'Tortoises and red earth',
    summary:
      'A national park off Praslin with free-roaming giant tortoises, mangroves and wild coco de mer. A day trip — there is nowhere to stay.',
    intro: [
      'Curieuse lies just off Praslin’s north coast. Its red earth and scrub give it a different look from the other granite islands, and the whole island is a national park.',
      'Most visits combine the ranger station at Baie Laraie, where giant tortoises wander freely, with a walk along the mangrove boardwalk to Anse St José and some snorkelling on the way back.',
    ],
    highlights: [
      ['Giant tortoises', 'Aldabra giant tortoises roam the area around the ranger station.'],
      ['Mangrove boardwalk', 'A raised walk through the mangroves between Baie Laraie and Anse St José.'],
      ['Doctor’s House', 'A restored colonial house from the island’s time as a leper colony, now a small museum.'],
    ],
    gettingThere: 'Boat from Praslin (Côte d’Or or Anse Volbert), about 15–20 minutes. National park fee payable.',
    nights: [0, 0],
    dayTripFrom: 'praslin',
    stayNote: 'No visitor accommodation: visit as a day trip from Praslin.',
    beaches: [],
  },
  {
    slug: 'bird-island',
    name: 'Bird Island',
    group: 'Inner islands · coral',
    kicker: 'A coral cay full of seabirds',
    summary:
      'A small, flat coral island at the northern edge of the Seychelles bank, famous for its huge seasonal sooty tern colony.',
    intro: [
      'Bird Island is a low coral cay on the edge of the Seychelles bank, about 100 km north of Mahé. It is small enough to walk around in about an hour.',
      'Between roughly April and October the island fills with nesting sooty terns; other seabirds, nesting turtles (in season) and resident tortoises make it a place for slow days with binoculars.',
    ],
    highlights: [
      ['Sooty tern colony', 'A vast seasonal colony; noise and smell included.'],
      ['Turtles', 'Hawksbill and green turtles nest on the beaches in season.'],
      ['Simplicity', 'An island designed around birds rather than resort facilities.'],
    ],
    gettingThere: 'Domestic flight from Mahé, about 30 minutes, on a small aircraft with a strict baggage limit.',
    nights: [2, 2],
    stayNote: 'One small lodge on the island; book flights and stay together.',
    beaches: [],
  },
  {
    slug: 'denis',
    name: 'Denis',
    group: 'Inner islands · coral',
    kicker: 'A private coral island',
    summary:
      'A privately owned coral island north of Mahé with a conservation programme, a farm and long empty beaches.',
    intro: [
      'Denis is a flat coral island at the edge of the Seychelles bank, about 30 minutes’ flight north of Mahé. The island is privately owned and run as a single small resort.',
      'Conservation work on the island has brought back several endangered land birds, and the deep water just off the bank has made it known for fishing.',
    ],
    highlights: [
      ['Endemic birds', 'Rare land birds have been reintroduced as part of the island’s conservation work.'],
      ['Beaches', 'A ring of sand around a small island means there is usually a sheltered side.'],
      ['Self-sufficiency', 'Much of the food served is grown or raised on the island.'],
    ],
    gettingThere: 'Domestic charter flight from Mahé, about 30–35 minutes, with a strict baggage limit.',
    nights: [2, 3],
    stayNote: 'Single small resort; transfers arranged with the stay.',
    beaches: [],
  },
  {
    slug: 'outer-islands',
    name: 'The outer islands',
    group: 'Outer islands · coral',
    kicker: 'Atolls far from anywhere',
    summary:
      'The Amirantes, Alphonse group, Farquhar and the Aldabra group: low coral islands and atolls hundreds of kilometres from Mahé.',
    intro: [
      'Most of the Seychelles’ islands are not granite at all. Scattered south-west of Mahé are coral islands and atolls, many uninhabited, some with a single small lodge.',
      'Desroches (Amirantes) and Alphonse are the most visited, both reached by charter flight. Days revolve around the reef: fly-fishing on the flats, diving the drop-offs, and very few other people.',
    ],
    highlights: [
      ['Desroches', 'A coral island in the Amirantes with a long reef and wall diving.'],
      ['Alphonse', 'An atoll known for saltwater fly-fishing on its flats.'],
      ['Farquhar', 'Remote atoll in the far south-west, visited mainly for fishing expeditions.'],
    ],
    gettingThere: 'Charter flights from Mahé, roughly an hour or more depending on the island. Usually only bookable with the island’s accommodation.',
    nights: [3, 4],
    stayNote: 'One lodge per island in most cases; flights and stay are booked together.',
    beaches: [],
  },
  {
    slug: 'aldabra',
    name: 'Aldabra',
    group: 'Outer islands · coral',
    kicker: 'The atoll of tortoises',
    summary:
      'One of the largest raised coral atolls in the world, a UNESCO World Heritage Site, and home to the largest population of giant tortoises on earth.',
    intro: [
      'Aldabra lies around 1,100 km south-west of Mahé, closer to Madagascar than to the Seychelles capital. It is managed by the Seychelles Islands Foundation and has no tourist accommodation.',
      'Visits are rare and tightly controlled, usually from expedition ships with landing permits. It is not an island you add to a trip; it is a trip in its own right, and the planner below shows it that way.',
    ],
    highlights: [
      ['Giant tortoises', 'Aldabra holds the world’s largest population of giant tortoises.'],
      ['Flightless rail', 'The white-throated rail of Aldabra, the last flightless bird in the western Indian Ocean.'],
      ['Lagoon', 'A huge tidal lagoon that drains and fills through narrow channels with every tide.'],
    ],
    gettingThere: 'By expedition ship or specialist charter only, with permission from the Seychelles Islands Foundation. Departures are few each year.',
    nights: [7, 10],
    expedition: true,
    stayNote: 'No accommodation ashore; you sleep aboard the expedition vessel.',
    beaches: [],
  },
];
