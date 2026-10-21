const { html, photo, layout, pageHero } = require('../lib/html.js');

module.exports = () => {
  const body = html`
${pageHero({ eyebrow: 'Nature', title: 'Forest, tortoises, birds and reef', lede: 'Islands that have been isolated for a very long time grow their own species. Much of the Seychelles’ land and sea is now protected, and visiting slowly is the best way to see it.' })}

<nav class="wrap toc" aria-label="On this page">
  <ul><li><a href="#vallee-de-mai">Vallée de Mai &amp; coco de mer</a></li><li><a href="#tortoises">Giant tortoises</a></li><li><a href="#birds">Birds</a></li><li><a href="#reefs">Reefs</a></li><li><a href="#responsibly">Visiting responsibly</a></li></ul>
</nav>

<section class="section" id="vallee-de-mai">
  <div class="wrap split split--media">
    ${photo('coco-de-mer', { ratio: '4:5', sizes: '(min-width: 900px) 45vw, 100vw', label: 'Coco de mer' })}
    <div class="prose">
      <p class="eyebrow">Praslin</p>
      <h2>The Vallée de Mai and the coco de mer</h2>
      <p>The Vallée de Mai is a palm forest in the middle of Praslin, protected as a UNESCO World Heritage Site and managed by the Seychelles Islands Foundation. It is one of only two places where the coco de mer grows wild: the other is neighbouring Curieuse.</p>
      <p>The coco de mer produces the largest seed of any plant. Male and female trees are separate; the nuts take years to mature, and a palm can live for centuries. Walking under the fronds, many metres overhead, is the closest thing the islands have to a cathedral.</p>
      <p>The forest is also the stronghold of the Seychelles black parrot. Go at opening time, walk slowly and listen. Fond Ferdinand, a smaller reserve in the south-east of Praslin, also protects coco de mer palms and is usually quieter.</p>
      <p class="small muted">Entry fee payable; opening hours and fees change, so check before you go. Coco de mer nuts may only be exported with an official certificate.</p>
    </div>
  </div>
</section>

<section class="section section--granite" id="tortoises">
  <div class="wrap split split--media split--reverse">
    ${photo('giant-tortoise', { ratio: '4:5', sizes: '(min-width: 900px) 45vw, 100vw', label: 'Aldabra giant tortoise' })}
    <div class="prose">
      <p class="eyebrow">Curieuse, Aldabra and beyond</p>
      <h2>Giant tortoises</h2>
      <p>The Aldabra giant tortoise is one of the largest tortoises in the world. Its home atoll, Aldabra, holds by far the biggest wild population; elsewhere you will meet tortoises roaming free on Curieuse, on Bird Island and in gardens and small reserves across the inner islands.</p>
      <p>They are wild or semi-wild animals. Watch from a respectful distance, never sit on or ride them, and only feed them where rangers say it is allowed.</p>
      <p><a href="/islands/curieuse/">Visiting Curieuse →</a></p>
    </div>
  </div>
</section>

<section class="section" id="birds">
  <div class="wrap">
    <div class="split">
      <div class="prose">
        <p class="eyebrow">Birds</p>
        <h2>Rare land birds and great seabird colonies</h2>
        <p>Several Seychelles birds were once among the rarest in the world. Careful conservation, including moving birds to predator-free islands, has brought some back from the brink. Others are seabirds that nest in huge numbers on the coral islands.</p>
      </div>
      ${photo('birds', { ratio: '4:3', sizes: '(min-width: 900px) 45vw, 100vw', label: 'Seychelles birdlife' })}
    </div>
    <dl class="species">
      <div><dt>Seychelles black parrot</dt><dd>Praslin’s national bird, best looked for in the Vallée de Mai.</dd></div>
      <div><dt>Seychelles paradise flycatcher</dt><dd>Mostly confined to La Digue; the Veuve Reserve protects its habitat.</dd></div>
      <div><dt>Seychelles magpie-robin</dt><dd>Once down to a handful of birds, now on several predator-free islands including Denis.</dd></div>
      <div><dt>Seychelles kestrel</dt><dd>A small endemic falcon, often seen on Mahé.</dd></div>
      <div><dt>Sooty tern</dt><dd>Nests in an enormous seasonal colony on Bird Island, roughly April to October.</dd></div>
      <div><dt>White (fairy) tern and tropicbirds</dt><dd>Seen across the islands, often nesting in trees and on granite ledges.</dd></div>
    </dl>
  </div>
</section>

<section class="section section--lagoon" id="reefs">
  <div class="wrap split split--media">
    ${photo('reef', { ratio: '4:5', sizes: '(min-width: 900px) 45vw, 100vw', label: 'Coral reef' })}
    <div class="prose">
      <p class="eyebrow">Under water</p>
      <h2>Reefs</h2>
      <p>Granite reefs around the inner islands, and coral reefs, walls and flats around the coral islands, make the Seychelles good for snorkelling straight from the beach and for diving further out. Marine national parks include Ste Anne and Baie Ternay off Mahé, Port Launay, Curieuse and the waters around Silhouette.</p>
      <p>Coral reefs here, as everywhere, have been hit by marine heatwaves and bleaching. Recovery varies from site to site, which is another reason to go with local guides who know the current state of each reef.</p>
      <p>Visibility is often best in the calm transition months of April–May and October–November. Whale sharks are sometimes seen off Mahé in the later months of the year.</p>
    </div>
  </div>
</section>

<section class="section" id="responsibly">
  <div class="wrap prose narrow">
    <h2>Visiting responsibly</h2>
    <ul>
      <li>Don’t stand on, touch or take coral, shells or sand.</li>
      <li>Use mineral sunscreen or, better, cover up with a rash vest.</li>
      <li>Keep your distance from nesting turtles and seabirds, and follow rangers’ instructions.</li>
      <li>Pay park and reserve fees: they fund the people who look after these places.</li>
      <li>Buy coco de mer products only from licensed sellers, with the export certificate.</li>
      <li>Take your rubbish back with you, especially from beaches without bins.</li>
    </ul>
  </div>
</section>`;
  return [{ path: '/nature/', html: layout({ title: 'Nature', path: '/nature/', body, description: 'The Vallée de Mai and the coco de mer, giant tortoises, rare birds and reefs of the Seychelles, and how to visit them responsibly.' }) }];
};
