// Enquiry form: client-side validation, planner hand-off, and submission to the configured
// endpoint, or a pre-filled email when no endpoint is set.
(function () {
  var form = document.querySelector('[data-enquiry]');
  if (!form) return;
  var endpoint = form.getAttribute('data-endpoint');
  var email = form.getAttribute('data-email');
  var errors = form.querySelector('[data-errors]');

  // Route from the planner.
  var plan = new URLSearchParams(location.search).get('plan');
  if (!plan) { try { plan = localStorage.getItem('plannerRoute'); } catch (e) {} }
  if (plan && /from=planner|plan=/.test(location.search)) {
    var field = form.querySelector('[data-plan-field]');
    field.hidden = false;
    field.querySelector('textarea').value = plan;
  }

  function fail(list) {
    errors.innerHTML = '<p><strong>Please check ' + (list.length === 1 ? 'one thing' : list.length + ' things') + ':</strong></p><ul>' +
      list.map(function (x) { return '<li><a href="#' + x[0].id + '">' + x[1] + '</a></li>'; }).join('') + '</ul>';
    errors.hidden = false;
    errors.focus();
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    form.querySelectorAll('[aria-invalid]').forEach(function (el) { el.removeAttribute('aria-invalid'); });
    var problems = [];
    var name = form.elements.name, mail = form.elements.email, consent = form.elements.consent;
    if (!name.value.trim()) problems.push([name, 'Enter your name']);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail.value.trim())) problems.push([mail, 'Enter a valid email address']);
    if (!consent.checked) { consent.id = consent.id || 'f-consent'; problems.push([consent, 'Tick the box so we can reply to you']); }
    problems.forEach(function (p) { p[0].setAttribute('aria-invalid', 'true'); });
    if (problems.length) return fail(problems);
    errors.hidden = true;
    if (form.elements.website.value) return; // honeypot

    var fd = new FormData(form);
    if (endpoint) {
      var btn = form.querySelector('[type=submit]');
      btn.disabled = true; btn.textContent = 'Sending…';
      fetch(endpoint, { method: 'POST', body: fd, headers: { Accept: 'application/json' } })
        .then(function (r) { if (!r.ok) throw new Error(r.status); try { localStorage.removeItem('plannerRoute'); } catch (e) {} location.href = '/enquire/thanks/'; })
        .catch(function () {
          btn.disabled = false; btn.textContent = 'Send enquiry';
          errors.innerHTML = '<p>Sorry, your enquiry could not be sent. Please try again, or email us at <a href="mailto:' + email + '">' + email + '</a>.</p>';
          errors.hidden = false; errors.focus();
        });
      return;
    }
    // No backend configured: open the visitor's email app with everything filled in.
    var lines = [];
    var seen = {};
    fd.forEach(function (v, k) {
      if (k === 'website' || k === 'consent' || !String(v).trim()) return;
      var label = k.replace(/_/g, ' ');
      if (seen[k]) { lines[seen[k] - 1] += ', ' + v; return; }
      lines.push(label.charAt(0).toUpperCase() + label.slice(1) + ': ' + v);
      seen[k] = lines.length;
    });
    location.href = 'mailto:' + email + '?subject=' + encodeURIComponent('Trip enquiry from ' + form.elements.name.value.trim()) + '&body=' + encodeURIComponent(lines.join('\n'));
  });
})();
