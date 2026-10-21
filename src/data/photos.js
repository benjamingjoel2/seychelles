/**
 * Unsplash photos, keyed by the slot they illustrate.
 *
 * RULE: a photo is only added when the "location" field on its Unsplash page names
 * the place it is used for. `location_on_unsplash` records that text verbatim and is
 * shown in the caption. Slots with no entry render an illustration instead.
 * Hotlinked from images.unsplash.com, as Unsplash's guidelines ask; credited in the
 * caption and on /credits/.
 */
const P = (slot, id, page, img, photographer, handle, location_on_unsplash, alt) => ({
  slot, id, page, img: `https://images.unsplash.com/${img}`, photographer,
  photographer_url: `https://unsplash.com/@${handle}`, location_on_unsplash, alt,
});

const list = [
  P('seychelles-generic', 'ocnUF8fSY6Q', 'https://unsplash.com/photos/a-sandy-beach-with-large-rocks-and-palm-trees-ocnUF8fSY6Q', 'photo-1693260741034-fcac2303f00a', 'Philipp', 'picture_scape', 'Port Glaud, Seychellen', 'Large granite boulders and a palm tree on a white-sand beach at Port Glaud, Mahé'),
  P('seychelles-generic', '9mGSc18MV3s', 'https://unsplash.com/photos/an-aerial-view-of-a-rocky-beach-with-palm-trees-9mGSc18MV3s', 'photo-1632222707460-c43a5c78559b', 'Ryan Geller', 'ryangeller', 'Île St. Pierre, Seychelles', 'Aerial view of Île St Pierre, a granite islet with palm trees in turquoise sea'),
  P('mahe', 'm08eZAM_cs0', 'https://unsplash.com/photos/a-couple-of-people-standing-on-top-of-a-wooden-bridge-m08eZAM_cs0', 'photo-1706089048239-8bf62860a48c', 'seytales', 'seytales', 'Morne Blanc, Seychelles', 'Hikers on the Morne Blanc viewing platform above forested granite peaks on Mahé'),
  P('mahe', 'mXIHHRwI100', 'https://unsplash.com/photos/green-trees-on-brown-sand-near-body-of-water-during-daytime-mXIHHRwI100', 'photo-1617472891016-3777420d3f7f', 'Yuliya Pankevich', 'i_story_pictures', 'Mahé, Seychelles', 'Quiet sandy cove on Mahé with granite boulders, palms and green hills'),
  P('praslin', 'FjDaN9WlRLg', 'https://unsplash.com/photos/sea-waves-crashing-on-shore-during-daytime-FjDaN9WlRLg', 'photo-1618822461310-da1be362e30c', 'AJ', 'alaistair', 'Praslin, Seychelles', 'Palm shade over white sand and granite rocks on a turquoise Praslin beach'),
  P('praslin', 'UTP7ob5Kz9U', 'https://unsplash.com/photos/island-on-body-of-water-UTP7ob5Kz9U', 'photo-1516534726759-c5ae5aea7965', 'Tommaso Nervegna', 'nervegna', 'Praslin, Seychelles', 'Drone view of a small granite islet with palms in turquoise water off Praslin'),
  P('la-digue', 'jPmurJKSL_0', 'https://unsplash.com/photos/large-rocks-on-the-island-jPmurJKSL_0', 'photo-1553829176-61484f865ac3', 'Christian Cacciamani', 'cacciahands', 'La Digue, Seychelles', 'Large granite boulders on the shore of La Digue'),
  P('la-digue', 'vXtb1JUQYf0', 'https://unsplash.com/photos/an-aerial-view-of-an-island-in-the-middle-of-the-ocean-vXtb1JUQYf0', 'photo-1709843038603-7d8d91a9c8c6', 'Marc Schmittbuhl', 'cybercap', 'La Digue, Seychelles', 'Aerial view of La Digue’s green coastline in the Indian Ocean'),
  P('outer-islands', 'VD77MItGm9c', 'https://unsplash.com/photos/brown-turtle-on-green-grass-during-daytime-VD77MItGm9c', 'photo-1593427264193-1d7bba99d577', 'Dan Maisey', 'dwm12', 'Alphonse Island, Seychelles', 'Giant tortoise resting on grass on Alphonse Island'),
  P('anse-source-d-argent', 'I2BHCLmVpEg', 'https://unsplash.com/photos/an-aerial-view-of-a-beach-with-rocks-and-water-I2BHCLmVpEg', 'photo-1706088843591-77d9f1fcb584', 'seytales', 'seytales', "Anse Source d'Argent, Seychelles", 'Aerial view of Anse Source d’Argent with granite boulders and shallow turquoise water'),
  P('anse-source-d-argent', '328MrR1aZIk', 'https://unsplash.com/photos/brown-rock-formation-on-sea-shore-during-daytime-328MrR1aZIk', 'photo-1624978478827-59c58ef74e6e', 'Secret Travel Guide', 'secrettravelguide', "Anse Source d'Argent, La Digue, Seychelles", 'Sculpted granite boulders along the shore at Anse Source d’Argent'),
  P('anse-lazio', 'pwod5dX4hEc', 'https://unsplash.com/photos/boulders-on-seashore-pwod5dX4hEc', 'photo-1542487121137-168451d21e71', 'Maksim Shutov', 'maksimshutov', 'Anse Lazio, Seychelles', 'Granite boulders on the shore at Anse Lazio, Praslin'),
  P('anse-georgette', 'qdoTFBJyBq0', 'https://unsplash.com/photos/green-trees-near-blue-sea-under-blue-sky-during-daytime-qdoTFBJyBq0', 'photo-1607198387595-d47e8346a86f', 'Ron Barabash', 'ronbarab', 'Anse Georgette, Seychelles', 'Anse Georgette seen from the trail, green trees above blue sea'),
  P('beau-vallon', '8UxrK13xZdg', 'https://unsplash.com/photos/a-beach-with-a-boat-in-the-water-and-a-tree-with-a-hill-in-the-background-8UxrK13xZdg', 'photo-1663330350777-d59a483d8024', 'Kirill Sirazheev', 'kirillkkka', 'Beau Vallon, Seychelles', 'Beau Vallon beach with a boat moored offshore and green hills behind'),
  P('anse-intendance', 'Gp1tuP_KXZI', 'https://unsplash.com/photos/a-tropical-beach-with-palm-trees-and-rocks-Gp1tuP_KXZI', 'photo-1636065441314-619af7a2dd8d', 'Steffen Holzner', 'steffen______', 'Anse Intendance, Mahe Island, Seychelles', 'Palm trees and granite rocks at Anse Intendance, Mahé'),
  P('anse-major', 'ChOQbOKTKxg', 'https://unsplash.com/photos/ChOQbOKTKxg', 'photo-1706524181950-ebaa9ccd54c1', 'seytales', 'seytales', 'Anse Major Trail, Seychelles', 'Hikers on the rocky Anse Major trail through green vegetation, Mahé'),
  P('anse-royale', '--zMbLO3-Ik', 'https://unsplash.com/photos/green-trees-on-island-during-daytime---zMbLO3-Ik', 'photo-1615894252810-ed4e2c14b451', 'Datingjungle', 'datingjungle', 'Anse Royale, Seychelles', 'Calm turquoise bay at Anse Royale, Mahé, with a small tree-covered islet offshore'),
  P('coco-de-mer', 'MvQNOPfufIg', 'https://unsplash.com/photos/large-coconuts-hanging-from-a-palm-tree-MvQNOPfufIg', 'photo-1768295037683-99d69f6a1f31', 'Bram Wouters', 'bram_wouters', 'Fond Ferdinand, Seychelles', 'Coco de mer nuts hanging beneath fan-shaped palm leaves at Fond Ferdinand, Praslin'),
  P('giant-tortoise', 'Bu-fUI69fRo', 'https://unsplash.com/photos/person-feeding-gray-tortoise-during-daytime-Bu-fUI69fRo', 'photo-1536746295297-2539b444b74d', 'Philipp Meeh', 'philmeahh', 'La Digue, Seychelles', 'A giant tortoise taking a leaf from a person’s hand on La Digue'),
  P('giant-tortoise', 'sw0nfMrXxcg', 'https://unsplash.com/photos/brown-turtle-on-brown-wooden-log-sw0nfMrXxcg', 'photo-1593427264099-20e0c3e7fdb2', 'Dan Maisey', 'dwm12', 'Alphonse Island, Seychelles', 'Giant tortoise with a leaf in its mouth on Alphonse Island'),
];

const bySlot = {};
for (const p of list) (bySlot[p.slot] ||= []).push(p);
module.exports = bySlot;
