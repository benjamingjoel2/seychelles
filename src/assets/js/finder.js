// Calm beach finder: re-rates every beach for the chosen month.
(function () {
  var form = document.querySelector('[data-finder]');
  if (!form) return;
  var data = window.pageData();
  var label = { calm: 'Calm', mixed: 'Mixed', rough: 'Rough' };
  var season = function (m) {
    if (m === 11 || m <= 2) return 'North-west monsoon: south- and east-facing coasts are usually calmer.';
    if (m === 3 || m === 10) return 'Transition month: light winds, calm on most coasts.';
    if (m >= 5 && m <= 8) return 'South-east trades at their strongest: choose north- and west-facing coasts.';
    return 'South-east trades, lighter at this end of the season: north- and west-facing coasts are calmest.';
  };
  var rows = {};
  document.querySelectorAll('[data-beach]').forEach(function (li) { rows[li.getAttribute('data-beach')] = li; });

  function update(m) {
    document.querySelector('[data-finder-month]').textContent = data.months[m];
    form.querySelector('[data-season-line]').textContent = data.months[m] + '. ' + season(m);
    data.beaches.forEach(function (b) {
      var li = rows[b.slug];
      if (!li) return;
      var r = b.months[m];
      li.setAttribute('data-rating', r);
      li.querySelector('[data-badge]').innerHTML = '<span class="badge badge--' + r + '">' + label[r] + '</span>';
    });
    try { history.replaceState(null, '', '?month=' + (m + 1) + location.hash); } catch (e) {}
  }

  var q = parseInt(new URLSearchParams(location.search).get('month'), 10);
  var start = q >= 1 && q <= 12 ? q - 1 : new Date().getMonth();
  form.querySelector('input[value="' + start + '"]').checked = true;
  form.hidden = false;
  update(start);
  form.addEventListener('change', function (e) { if (e.target.name === 'month') update(parseInt(e.target.value, 10)); });
})();
