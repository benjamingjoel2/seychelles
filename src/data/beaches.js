/**
 * Beaches and the seasonal calm model behind the "Calm beach finder".
 *
 * The model is deliberately simple and is a planning guide, not a safety forecast:
 *   exposure 'nw'        open to the north-west monsoon (roughly Dec–Mar), calm in the south-east trades
 *   exposure 'se'        open to the south-east trades (roughly May–Oct), calm in the north-west monsoon
 *   exposure 'sheltered' protected by reef or headland for most of the year
 *   reef: true           an offshore reef softens the worst of the swell (rough -> mixed)
 *   caution: true        strong currents are common in any season; never better than "mixed"
 *
 * Each beach's exposure is listed in FACTS-TO-VERIFY.md.
 */

// Wind regime per month, Jan..Dec.
const REGIME = ['nw', 'nw', 'nw', 'transition', 'se', 'se-strong', 'se-strong', 'se-strong', 'se-strong', 'se', 'transition', 'nw'];

function rateMonth(beach, regime) {
  let r;
  if (beach.exposure === 'sheltered' || regime === 'transition') r = 'calm';
  else if (beach.exposure === 'nw') r = regime === 'nw' ? 'mixed' : 'calm';
  else if (beach.exposure === 'se') r = regime === 'se-strong' ? 'rough' : regime === 'se' ? 'mixed' : 'calm';
  if (beach.reef && r === 'rough') r = 'mixed';
  if (beach.caution && r === 'calm') r = 'mixed';
  return r;
}

const beaches = [
  // Mahé
  { slug: 'beau-vallon', name: 'Beau Vallon', island: 'mahe', coast: 'North-west Mahé', exposure: 'nw',
    blurb: 'A long, busy family beach with a gentle slope, restaurants and water sports. Smooth in the south-east trade months; choppier when the north-west monsoon blows.' },
  { slug: 'anse-major', name: 'Anse Major', island: 'mahe', coast: 'North-west Mahé', exposure: 'nw',
    blurb: 'Reached on foot by a coastal trail from the end of the Bel Ombre road, or by boat. Bring water and shade; there are no facilities.' },
  { slug: 'port-launay', name: 'Port Launay', island: 'mahe', coast: 'West Mahé', exposure: 'nw',
    blurb: 'A deep bay inside a marine national park, with good snorkelling off the rocks when the sea is settled.' },
  { slug: 'anse-takamaka', name: 'Anse Takamaka', island: 'mahe', coast: 'South-west Mahé', exposure: 'se',
    blurb: 'Takamaka trees shade the sand. Lovely in the north-west monsoon; swell rolls in when the south-east trades are strong.' },
  { slug: 'anse-intendance', name: 'Anse Intendance', island: 'mahe', coast: 'South Mahé', exposure: 'se', caution: true,
    blurb: 'Powerful surf and strong currents for much of the year, even when it looks inviting. A beach for walking and watching more than swimming.' },
  { slug: 'anse-royale', name: 'Anse Royale', island: 'mahe', coast: 'South-east Mahé', exposure: 'se', reef: true,
    blurb: 'A long reef-protected stretch with shallow water for snorkelling. Windy rather than wild in the trade-wind months.' },
  // Praslin
  { slug: 'anse-lazio', name: 'Anse Lazio', island: 'praslin', coast: 'North-west Praslin', exposure: 'nw',
    blurb: 'Granite boulders at both ends and clear water in between. At its calmest from May to October; it can be rough in the north-west monsoon.' },
  { slug: 'anse-georgette', name: 'Anse Georgette', island: 'praslin', coast: 'North-west Praslin', exposure: 'nw',
    blurb: 'Small and very beautiful, reached through a resort’s grounds. Access rules change: ask ahead. Waves can be strong in the north-west monsoon.' },
  { slug: 'cote-d-or', name: 'Côte d’Or (Anse Volbert)', island: 'praslin', coast: 'North-east Praslin', exposure: 'sheltered',
    blurb: 'A long, gently shelving bay facing Curieuse, sheltered for most of the year. The easiest swimming on Praslin.' },
  { slug: 'grand-anse-praslin', name: 'Grand Anse (Praslin)', island: 'praslin', coast: 'South-west Praslin', exposure: 'se',
    blurb: 'Near the airstrip and the ferry road. Good in the north-west monsoon; windy, often with seaweed, in the south-east trades.' },
  // La Digue
  { slug: 'anse-source-d-argent', name: 'Anse Source d’Argent', island: 'la-digue', coast: 'West La Digue', exposure: 'sheltered', reef: true,
    blurb: 'Reef-protected and shallow among the famous boulders; entered through L’Union Estate. At low tide the water can be too shallow to swim, so check the tide.' },
  { slug: 'grand-anse-la-digue', name: 'Grand Anse (La Digue)', island: 'la-digue', coast: 'South-east La Digue', exposure: 'se', caution: true,
    blurb: 'A wide, wild beach with big waves and dangerous currents, especially in the south-east trades. Respect the warning signs.' },
  { slug: 'anse-cocos', name: 'Anse Cocos', island: 'la-digue', coast: 'East La Digue', exposure: 'se', caution: true,
    blurb: 'Reached on foot from Grand Anse via Petite Anse. Rocks at the northern end form natural pools that can be calm when the open sea is not.' },
  { slug: 'anse-severe', name: 'Anse Sévère', island: 'la-digue', coast: 'North La Digue', exposure: 'nw',
    blurb: 'A short cycle from La Passe, with snorkelling over the reef. Calm in the south-east trade months.' },
];

for (const b of beaches) b.months = REGIME.map((reg) => rateMonth(b, reg));

module.exports = { beaches, REGIME };
