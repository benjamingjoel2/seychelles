// Island-hopping planner. Data (islands, legs, visiting order) is embedded in the page at build time.
(function () {
  var root = document.querySelector('[data-planner]');
  if (!root) return;
  var data = window.pageData();
  var form = root.querySelector('form');
  var routeEl = root.querySelector('[data-planner-route]');
  var msgEl = root.querySelector('[data-planner-messages]');
  var sumEl = root.querySelector('[data-planner-summary]');

  var island = {};
  data.islands.forEach(function (i) { island[i.slug] = i; });
  var MODE = { ferry: 'Ferry', flight: 'Flight', boat: 'Boat', helicopter: 'Helicopter', expedition: 'Expedition voyage' };

  // Graph of crossings, weighted by the fastest option plus a penalty per change, so a direct
  // crossing beats two shorter ones with a connection in between.
  var graph = {};
  data.legs.forEach(function (l) {
    var w = (l.options[0].min == null ? 10000 : l.options[0].min) + 45;
    (graph[l.a] = graph[l.a] || []).push({ to: l.b, w: w, leg: l });
    (graph[l.b] = graph[l.b] || []).push({ to: l.a, w: w, leg: l });
  });

  function path(a, b) {
    var dist = {}, prev = {}, todo = Object.keys(graph);
    todo.forEach(function (k) { dist[k] = Infinity; });
    dist[a] = 0;
    while (todo.length) {
      todo.sort(function (x, y) { return dist[x] - dist[y]; });
      var u = todo.shift();
      if (u === b || dist[u] === Infinity) break;
      graph[u].forEach(function (e) {
        if (dist[u] + e.w < dist[e.to]) { dist[e.to] = dist[u] + e.w; prev[e.to] = { from: u, leg: e.leg }; }
      });
    }
    var hops = [], at = b;
    while (at !== a && prev[at]) { hops.unshift({ from: prev[at].from, to: at, leg: prev[at].leg }); at = prev[at].from; }
    return hops;
  }

  function fmt(o) {
    if (o.min == null) return 'multi-day';
    var f = function (n) { return n >= 60 ? Math.floor(n / 60) + ' h' + (n % 60 ? ' ' + (n % 60) + ' min' : '') : n + ' min'; };
    return o.min === o.max ? 'about ' + f(o.min) : f(o.min) + '–' + f(o.max);
  }

  var nights = {};
  function defaultNights(s) { return island[s].nights[1]; }
  function minNights(s) { return island[s].expedition ? island[s].nights[0] : 1; }

  // --- State from URL: ?islands=mahe,praslin&n=mahe:3,praslin:4
  var params = new URLSearchParams(location.search);
  var initial = (params.get('islands') || '').split(',').filter(function (s) { return island[s]; });
  (params.get('n') || '').split(',').forEach(function (p) {
    var kv = p.split(':'); if (island[kv[0]] && +kv[1] > 0) nights[kv[0]] = Math.min(30, +kv[1]);
  });
  form.querySelectorAll('input[name=island]').forEach(function (cb) { cb.checked = initial.indexOf(cb.value) > -1; });

  function selected() {
    return Array.prototype.map.call(form.querySelectorAll('input[name=island]:checked'), function (cb) { return cb.value; });
  }

  function legHtml(hop, extraNote) {
    var o = hop.leg.options[0];
    if (island[hop.from].expedition) {
      return '<li class="route-leg"><span class="mode">Return</span> · ' + island[hop.from].name + ' to ' + island[hop.to].name + ' at the end of the expedition' +
        (extraNote ? '<span class="alt">' + extraNote + '</span>' : '') + '</li>';
    }
    var alts = hop.leg.options.slice(1).map(function (a) { return 'Or ' + MODE[a.mode].toLowerCase() + ', ' + fmt(a); }).join(' · ');
    return '<li class="route-leg"><span class="mode">' + MODE[o.mode] + '</span> · ' + island[hop.from].name + ' to ' + island[hop.to].name + ', ' + fmt(o) +
      (alts ? '<span class="alt">' + alts + '</span>' : '') +
      '<span class="alt">' + o.note + '</span>' + (extraNote ? '<span class="alt">' + extraNote + '</span>' : '') + '</li>';
  }

  var lastText = '';

  function render() {
    var sel = selected();
    var messages = [];
    if (sel.indexOf('curieuse') > -1 && sel.indexOf('praslin') === -1) {
      form.querySelector('input[value=praslin]').checked = true;
      sel = selected();
      messages.push('Curieuse is visited as a day trip from Praslin, so we added Praslin.');
    }
    var stops = data.order.filter(function (s) { return sel.indexOf(s) > -1 && s !== 'curieuse'; });
    var curieuse = sel.indexOf('curieuse') > -1;

    if (!stops.length) {
      routeEl.innerHTML = '<li class="planner-empty">Choose one or more islands to see a route.</li>';
      sumEl.innerHTML = ''; msgEl.innerHTML = ''; lastText = '';
      updateUrl(sel);
      return;
    }
    if (stops[0] !== 'mahe') {
      stops.unshift('mahe');
      messages.push('International flights land on Mahé, so the route starts there. Add Mahé if you would like to stay a few nights.');
    }
    var mahéTransit = sel.indexOf('mahe') === -1;

    var html = '', text = [], totalNights = 0, tMin = 0, tMax = 0, crossings = 0, multiDay = false;
    function addLegs(a, b, finalLeg) {
      path(a, b).forEach(function (hop, k, all) {
        var note = '';
        if (all.length > 1 && k < all.length - 1) note = 'Connect on ' + island[hop.to].name + '. Depending on schedules this may need a night there.';
        if (finalLeg && k === all.length - 1) note = 'Back to Mahé for your flight home. Where possible we avoid a ferry and a long-haul flight on the same day.';
        html += legHtml(hop, note);
        var o = hop.leg.options[0];
        crossings++;
        if (o.min == null) multiDay = true; else { tMin += o.min; tMax += o.max; }
        text.push('  → ' + MODE[o.mode] + ' to ' + island[hop.to].name + ' (' + fmt(o) + ')');
      });
    }

    stops.forEach(function (s, idx) {
      if (idx > 0) addLegs(stops[idx - 1], s);
      var i = island[s];
      var transit = s === 'mahe' && mahéTransit;
      if (nights[s] == null) nights[s] = defaultNights(s);
      var n = transit ? 0 : nights[s];
      totalNights += n;
      var label = transit ? 'Arrive' : (i.expedition ? n + ' nights aboard' : n + (n === 1 ? ' night' : ' nights'));
      html += '<li class="route-stop"><h3>' + i.name + '</h3>' +
        (transit ? '<span class="muted">Arrive, then connect</span>' :
          '<div class="nights" role="group" aria-label="Nights on ' + i.name + '">' +
          '<button type="button" data-dec="' + s + '" aria-label="One fewer night on ' + i.name + '"' + (n <= minNights(s) ? ' disabled' : '') + '>−</button>' +
          '<output aria-live="polite">' + label + '</output>' +
          '<button type="button" data-inc="' + s + '" aria-label="One more night on ' + i.name + '"' + (n >= 30 ? ' disabled' : '') + '>+</button></div>') +
        (!transit && n === defaultNights(s) ? '<p class="route-note">Our suggestion for ' + i.name + '.</p>' : (!transit ? '<p class="route-note">We suggest ' + defaultNights(s) + ' here.</p>' : '')) +
        (s === 'praslin' && curieuse ? '<p class="route-note"><strong>Day trip to Curieuse</strong>: boat from Côte d’Or, about 15–20 minutes each way. National park fee payable.</p>' : '') +
        (i.expedition ? '<p class="route-note">Fixed departures only; we plan the rest of the trip around the sailing date.</p>' : '') +
        '</li>';
      text.push(i.name + (transit ? ' (arrive)' : ' — ' + label) + (s === 'praslin' && curieuse ? ', with a day trip to Curieuse' : ''));
    });

    var last = stops[stops.length - 1];
    if (last !== 'mahe') addLegs(last, 'mahe', true);
    text.push('Mahé (depart)');

    routeEl.innerHTML = html;
    msgEl.innerHTML = messages.map(function (m) { return '<p class="planner-msg">' + m + '</p>'; }).join('');
    var travelText = crossings ? crossings + (crossings === 1 ? ' crossing' : ' crossings') + (tMax ? ', roughly ' + Math.round(tMin / 60 * 10) / 10 + '–' + Math.round(tMax / 60 * 10) / 10 + ' hours of travel in total' : '') + (multiDay ? ', plus the expedition voyage' : '') : '';
    sumEl.innerHTML = '<p class="total">' + totalNights + ' nights in the Seychelles</p>' +
      (travelText ? '<p>' + travelText + ', not counting check-in and waiting.</p>' : '') +
      '<p class="small muted">Rough guide only. Timetables and fares change by season; we confirm everything before anything is booked.</p>' +
      '<p class="actions"><a class="btn" href="/enquire/?from=planner" data-send>Send this route with an enquiry</a> <button class="btn btn--ghost" type="button" data-copy>Copy link to this route</button></p>';
    lastText = 'Planner route (' + totalNights + ' nights):\n' + text.join('\n');
    updateUrl(sel);
  }

  function updateUrl(sel) {
    var q = sel.length ? '?islands=' + sel.join(',') + '&n=' + sel.filter(function (s) { return nights[s] != null && s !== 'curieuse'; }).map(function (s) { return s + ':' + nights[s]; }).join(',') : location.pathname;
    try { history.replaceState(null, '', (sel.length ? q : location.pathname) + '#planner'); } catch (e) {}
  }

  form.addEventListener('change', render);
  root.addEventListener('click', function (e) {
    var t = e.target.closest('button, a');
    if (!t) return;
    var s;
    if ((s = t.getAttribute('data-inc'))) { nights[s] = Math.min(30, nights[s] + 1); render(); focusAgain('data-inc', s); }
    else if ((s = t.getAttribute('data-dec'))) { nights[s] = Math.max(minNights(s), nights[s] - 1); render(); focusAgain('data-dec', s); }
    else if (t.hasAttribute('data-send')) { try { localStorage.setItem('plannerRoute', lastText); } catch (err) { t.href = '/enquire/?plan=' + encodeURIComponent(lastText); } }
    else if (t.hasAttribute('data-copy')) {
      var done = function () { t.textContent = 'Link copied'; };
      if (navigator.clipboard) navigator.clipboard.writeText(location.href).then(done, function () { t.textContent = 'Copy the address bar'; });
      else t.textContent = 'Copy the address bar';
    }
  });
  function focusAgain(attr, s) {
    var b = root.querySelector('[' + attr + '="' + s + '"]');
    if (b && !b.disabled) b.focus(); else { var o = root.querySelector('[data-inc="' + s + '"]'); if (o) o.focus(); }
  }

  root.hidden = false;
  render();
})();
