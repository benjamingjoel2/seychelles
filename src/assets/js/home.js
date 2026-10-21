// The page is built once, so refresh "Calm this <month>" for the visitor's actual month.
(function () {
  var data = window.pageData();
  var list = document.querySelector('[data-calm-now]');
  if (!list || !data.beaches) return;
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var m = new Date().getMonth();
  document.querySelector('[data-current-month]').textContent = months[m];
  var badge = list.querySelector('.badge');
  var badgeHtml = badge ? badge.outerHTML : '';
  list.innerHTML = data.beaches.filter(function (b) { return b.months[m] === 'calm'; }).map(function (b) {
    return '<li><a href="/beaches/#' + b.slug + '">' + b.name + '</a> <span class="muted">' + b.island + '</span> ' + badgeHtml + '</li>';
  }).join('');
})();
