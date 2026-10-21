// Mobile menu toggle. Without JS the full navigation is simply shown.
(function () {
  var header = document.querySelector('.site-header');
  var btn = document.querySelector('.menu-toggle');
  if (!header || !btn) return;
  var word = btn.querySelector('.menu-word');
  btn.hidden = false;
  function set(open) {
    header.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
    word.textContent = open ? 'Close' : 'Menu';
  }
  btn.addEventListener('click', function () { set(!header.classList.contains('open')); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && header.classList.contains('open')) { set(false); btn.focus(); }
  });
})();

window.pageData = function () {
  var el = document.getElementById('page-data');
  return el ? JSON.parse(el.textContent) : {};
};
