(function () {
  document.documentElement.classList.add('js');
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.menu-toggle');

  // Header: transparent over hero, solid after scroll
  function onScroll() { header.classList.toggle('scrolled', window.scrollY > 40); }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile menu
  toggle.addEventListener('click', function () {
    var open = header.classList.toggle('menu-open');
    toggle.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  document.querySelectorAll('.nav a').forEach(function (a) {
    a.addEventListener('click', function () {
      header.classList.remove('menu-open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Reveal on scroll
  var els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    els.forEach(function (el) { io.observe(el); });
  } else { els.forEach(function (el) { el.classList.add('in'); }); }

  // Solutions explorer
  var tabs = document.querySelectorAll('.tab');
  var panels = document.querySelectorAll('.panel');
  function activate(id, scroll) {
    var found = false;
    tabs.forEach(function (t) {
      var on = t.dataset.sol === id; t.classList.toggle('active', on);
      t.setAttribute('aria-selected', on); t.tabIndex = on ? 0 : -1;
      if (on) { found = true; t.scrollIntoView({ block: 'nearest', inline: 'center' }); }
    });
    panels.forEach(function (p) { p.classList.toggle('active', p.id === 's-' + id); });
    if (found && scroll) {
      document.getElementById('explorer').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    return found;
  }
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { activate(t.dataset.sol, false); history.replaceState(null, '', '#s-' + t.dataset.sol); });
    t.addEventListener('keydown', function (e) {
      var k = e.key, n = null;
      if (k === 'ArrowDown' || k === 'ArrowRight') n = tabs[(i + 1) % tabs.length];
      if (k === 'ArrowUp' || k === 'ArrowLeft') n = tabs[(i - 1 + tabs.length) % tabs.length];
      if (n) { e.preventDefault(); n.focus(); n.click(); }
    });
  });
  // Any link to #s-<id> (cards, footer) opens that panel
  document.querySelectorAll('a[href^="#s-"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      var id = a.getAttribute('href').slice(3);
      activate(id, true); history.replaceState(null, '', '#s-' + id);
    });
  });
  if (location.hash.indexOf('#s-') === 0) activate(location.hash.slice(3), true);

  // "Discuss this solution" pre-selects the topic in the form
  var select = document.getElementById('solution-select');
  document.querySelectorAll('[data-topic]').forEach(function (b) {
    b.addEventListener('click', function () { if (select) select.value = b.dataset.topic; });
  });

  // Contact form: Formspree via fetch; falls back to email if no form ID is set yet
  var form = document.querySelector('.contact-form');
  var status = form.querySelector('.form-status');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var data = new FormData(form);
    if (form.action.indexOf('YOUR_FORM_ID') !== -1) {
      var body = 'Name: ' + data.get('name') + '\nOrganisation: ' + data.get('organisation') +
        '\nEmail: ' + data.get('email') + '\nSolution: ' + data.get('solution') + '\n\n' + data.get('message');
      location.href = 'mailto:Penofolic@yahoo.com?subject=' + encodeURIComponent('Enquiry from penofolic website') + '&body=' + encodeURIComponent(body);
      status.textContent = 'Opening your email app…';
      return;
    }
    status.textContent = 'Sending…';
    fetch(form.action, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
      .then(function (r) {
        if (r.ok) { form.reset(); status.textContent = 'Thank you. We will be in touch shortly.'; }
        else { status.textContent = 'Something went wrong. Please email Penofolic@yahoo.com.'; }
      })
      .catch(function () { status.textContent = 'Network error. Please email Penofolic@yahoo.com.'; });
  });

  document.getElementById('year').textContent = new Date().getFullYear();
})();
