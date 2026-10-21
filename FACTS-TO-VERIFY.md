# Facts to verify

Everything below was written from general knowledge and has **not** been checked against
current official sources. Check each item before launch, then again at least once a year:
timetables, fees and entry rules change often.

Tick the box when an item is verified, and note the source and date next to it.
The file each fact lives in is given in brackets.

## Entry and arrival rules

- [ ] Visitors need a **Travel Authorisation** applied for online before travel. Check the fee, how far ahead to apply, and passport-validity, return-ticket, accommodation and funds requirements. Not mentioned on the site yet; add it to an FAQ or the "When to go" page once confirmed.
- [ ] **Tourism / environmental sustainability levy** charged per night by accommodation. Check amounts and which islands it applies to. Not on the site yet.
- [ ] Health requirements (e.g. yellow fever certificate if arriving from an endemic country). Not on the site yet.
- [ ] **Coco de mer export**: nuts may only be exported with an official certificate/permit, bought from licensed sellers. (`src/pages/nature.js`, `src/data/journal.js`)
- [ ] Time zone: Seychelles is **UTC+4**, with no daylight saving. (`site.config.js` contact hours)

## Getting around: times (`src/data/routes.js`, `src/data/islands.js`, journal)

- [ ] Mahé–Praslin fast ferry: **about 60–75 min**, from Victoria’s Inter-Island Quay, several sailings a day.
- [ ] Mahé–Praslin domestic flight: **about 15–20 min**; smaller baggage allowance than international flights.
- [ ] Praslin–La Digue ferry: **about 15–20 min**, Baie Ste Anne jetty to La Passe, frequent crossings.
- [ ] Mahé–La Digue ferry: **about 80–100 min** on sailings that call at Praslin.
- [ ] Praslin–Curieuse boat: **about 15–20 min** from Côte d’Or / Anse Volbert.
- [ ] Mahé–Silhouette: boat **about 40–50 min**, or helicopter **about 15–20 min**, arranged by the accommodation.
- [ ] Mahé–Bird Island flight: **about 30–35 min**; strict soft-bag baggage limit.
- [ ] Mahé–Denis flight: **about 30–35 min**; strict baggage limit; booked with the stay.
- [ ] Mahé–outer islands (Desroches, Alphonse) charter flights: **about 60–90 min**; booked with the lodge.
- [ ] Aldabra: reached only by expedition ship/charter with **Seychelles Islands Foundation** permission; few fixed departures a year; no accommodation ashore.
- [ ] Ferry and flight operators’ current names, schedules and seasonal timetable changes. The site deliberately names no operator.
- [ ] La Digue: few cars, and bicycles hired at the jetty.

## Fees and access

- [ ] **Vallée de Mai** entry fee and opening hours. The site says "entry fee payable" with no amount. (`src/pages/nature.js`)
- [ ] **L’Union Estate** entry fee, required to reach Anse Source d’Argent. (`src/data/islands.js`, `src/data/beaches.js`)
- [ ] **Curieuse** national park fee. (`src/data/islands.js`, `src/data/routes.js`, planner text in `src/assets/js/planner.js`)
- [ ] Marine park fees (Ste Anne, Baie Ternay, Port Launay, Curieuse, Silhouette). Fees are mentioned generally only.
- [ ] **Anse Georgette** access through the Constance Lemuria grounds: current rules for non-guests. (`src/data/islands.js`, `src/data/beaches.js`)
- [ ] Anse Major trail: starts at the end of the Bel Ombre road; no facilities at the beach.
- [ ] Fond Ferdinand reserve (Praslin) protects coco de mer palms; location described as south-east Praslin.

## Islands and nature (`src/data/islands.js`, `src/pages/nature.js`)

- [ ] Mahé: largest island, holds most of the population; "more than sixty beaches".
- [ ] Victoria described as "one of the smallest capitals in the world"; market (Sir Selwyn Selwyn-Clarke Market) busiest on Saturday mornings.
- [ ] Copolia and Morne Blanc trails in Morne Seychellois National Park.
- [ ] Praslin is the second-largest island; a single road loops the island.
- [ ] Silhouette is the third-largest granite island; no roads; most land and surrounding sea protected; tortoise/terrapin breeding programme; very limited accommodation.
- [ ] Curieuse: ranger station at Baie Laraie, free-roaming Aldabra giant tortoises, mangrove boardwalk to Anse St José, Doctor’s House museum, former leper colony, red earth, no visitor accommodation.
- [ ] Bird Island: about 100 km north of Mahé; walk around in about an hour; sooty tern colony roughly **April–October** (also in `src/data/months.js`, "arrive around May"); hawksbill and green turtles nest in season; resident tortoises; one small lodge.
- [ ] Denis: privately owned, single resort; conservation programme with reintroduced endangered birds (Seychelles magpie-robin named on the nature page); known for fishing; much food grown on the island.
- [ ] Outer islands: Desroches (Amirantes, wall diving), Alphonse (fly-fishing), Farquhar (fishing expeditions).
- [ ] Aldabra: about **1,100 km** south-west of Mahé; one of the largest raised coral atolls; UNESCO World Heritage Site; largest giant tortoise population in the world; white-throated rail (last flightless bird in the western Indian Ocean).
- [ ] Vallée de Mai: UNESCO World Heritage Site managed by the Seychelles Islands Foundation; coco de mer grows wild only on Praslin and Curieuse; largest seed in the plant kingdom; separate male and female trees; nuts take years to mature; palms live for centuries; black parrot is Praslin’s/the national bird and lives in the Vallée de Mai.
- [ ] Seychelles paradise flycatcher mostly confined to La Digue; Veuve Reserve.
- [ ] Seychelles kestrel often seen on Mahé.
- [ ] Marine national parks named: Ste Anne, Baie Ternay, Port Launay, Curieuse, Silhouette.
- [ ] Whale sharks "sometimes seen off Mahé in the later months of the year".
- [ ] Best underwater visibility in April–May and October–November.

## Weather and the calm beach finder (`src/data/beaches.js`, `src/data/months.js`, `src/pages/plan.js`)

The finder uses a simple model: north-west monsoon roughly **Dec–Mar**, transition in
**Apr** and **Nov**, south-east trades **May–Oct**, strongest **Jun–Sep**. Have someone with
local knowledge check the model and each beach's exposure:

| Beach | Island | Exposure used | Flags |
|---|---|---|---|
| Beau Vallon | Mahé | north-west | |
| Anse Major | Mahé | north-west | |
| Port Launay | Mahé | north-west | |
| Anse Takamaka | Mahé | south-east | |
| Anse Intendance | Mahé | south-east | caution (strong currents all year) |
| Anse Royale | Mahé | south-east | reef softens swell |
| Anse Lazio | Praslin | north-west | |
| Anse Georgette | Praslin | north-west | |
| Côte d’Or / Anse Volbert | Praslin | sheltered | |
| Grand Anse (Praslin) | Praslin | south-east | seaweed in trades |
| Anse Source d’Argent | La Digue | sheltered | reef; very shallow at low tide |
| Grand Anse (La Digue) | La Digue | south-east | caution |
| Anse Cocos | La Digue | south-east | caution; rock pools at north end |
| Anse Sévère | La Digue | north-west | |

Also check:
- [ ] Rain: wettest around December–January; trade-wind months drier.
- [ ] "Temperatures stay in a narrow, warm band through the year."
- [ ] July as the windiest stretch of the year.
- [ ] Turtle nesting season "gets going" in November.
- [ ] Busiest periods: Christmas/New Year, Easter, European summer.
- [ ] "Most beaches have no lifeguard."

## Business details (placeholders, not facts)

- [ ] Email, phone, WhatsApp, address and hours in `site.config.js`.
- [ ] "We reply usually within two working days" (enquiry page). Make sure it is true.
- [ ] Stay names in `src/data/stays.js` are **invented placeholders**. Replace them with real properties before launch.
- [ ] Domain in `site.config.js` (`url`).

## Photos

- [ ] Each photo in `src/data/photos.js` was accepted because its location on its Unsplash or Pexels page names the place it illustrates (recorded verbatim in `location`). Re-check occasionally that the photos are still online and the locations unchanged.
- [ ] Slots still without a matching photo, which show an illustration instead: Silhouette, Curieuse, Bird Island, Denis, Aldabra, birds, reefs, Anse Takamaka, Port Launay, Côte d’Or, Grand Anse (Praslin), Grand Anse (La Digue), Anse Cocos, Anse Sévère.
