// Mobile menu toggle. Without JS the full navigation is simply shown.
(function () {
  var btn = document.querySelector('.menu-toggle');
  var nav = document.getElementById('site-nav');
  if (!btn || !nav) return;
  btn.hidden = false;
  btn.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
    btn.textContent = open ? 'Close' : 'Menu';
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('open')) { btn.click(); btn.focus(); }
  });
})();

window.pageData = function () {
  var el = document.getElementById('page-data');
  return el ? JSON.parse(el.textContent) : {};
};
