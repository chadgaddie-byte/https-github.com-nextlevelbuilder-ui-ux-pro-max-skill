/* ============================================================
   Instant Magnets — main.js
   Handles: nav scroll/mobile, reveal-on-scroll, form validation & submit
   ============================================================ */

(function () {
  'use strict';

  /* ── Sticky nav shadow ──────────────────────────────────────── */
  const nav = document.querySelector('.nav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 20);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── Mobile nav ─────────────────────────────────────────────── */
  const burger    = document.querySelector('.nav__burger');
  const mobileNav = document.querySelector('.nav__mobile');

  burger.addEventListener('click', () => {
    const open = burger.getAttribute('aria-expanded') === 'true';
    burger.setAttribute('aria-expanded', String(!open));
    mobileNav.classList.toggle('open', !open);
    document.body.style.overflow = open ? '' : 'hidden';
  });

  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      burger.setAttribute('aria-expanded', 'false');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
      burger.setAttribute('aria-expanded', 'false');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
      burger.focus();
    }
  });

  /* ── Reveal on scroll (brand signature) ─────────────────────── */
  const reveals = document.querySelectorAll('.reveal');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced || !('IntersectionObserver' in window)) {
    reveals.forEach(el => el.classList.add('in'));
  } else {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(el => io.observe(el));
  }

  /* ── Form validation & submission ───────────────────────────── */
  const form       = document.getElementById('booking-form');
  const submitBtn  = document.getElementById('submit-btn');
  const successMsg = document.getElementById('form-success');
  const errorMsg   = document.getElementById('form-error');

  if (!form) return;

  function showError(field, show) {
    const group = field.closest('.form-group');
    if (group) group.classList.toggle('has-error', show);
  }

  function isValidEmail(val) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  }

  function validateForm() {
    let valid = true;

    const name = document.getElementById('name');
    if (!name.value.trim()) { showError(name, true); valid = false; }
    else                    { showError(name, false); }

    const email = document.getElementById('email');
    if (!isValidEmail(email.value.trim())) { showError(email, true); valid = false; }
    else                                   { showError(email, false); }

    const eventType = document.getElementById('event-type');
    if (!eventType.value) { showError(eventType, true); valid = false; }
    else                  { showError(eventType, false); }

    return valid;
  }

  // Validate on blur for required fields
  ['name', 'email', 'event-type'].forEach(id => {
    const field = document.getElementById(id);
    if (!field) return;
    field.addEventListener('blur', () => {
      if (id === 'email') showError(field, !isValidEmail(field.value.trim()));
      else                showError(field, !field.value.trim() && !field.value);
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    successMsg.classList.remove('success');
    errorMsg.classList.remove('error');

    if (!validateForm()) {
      const firstError = form.querySelector('.has-error input, .has-error select');
      if (firstError) firstError.focus();
      return;
    }

    submitBtn.disabled = true;
    submitBtn.classList.add('loading');

    try {
      await submitForm(new FormData(form));
      submitBtn.style.display = 'none';
      successMsg.classList.add('success');
      form.reset();
    } catch (err) {
      errorMsg.classList.add('error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.classList.remove('loading');
    }
  });

  /*
   * TODO: Implement submitForm() with your chosen form backend.
   *
   * Option A — Formspree (simplest, no server needed):
   *   1. Sign up at https://formspree.io and create a form
   *   2. Uncomment the fetch block below and set YOUR_FORM_ID
   *
   * Option B — Netlify Forms:
   *   1. Add `netlify` and `data-netlify="true"` to <form> in index.html
   *   2. Replace the fetch with a standard form POST
   *
   * Option C — EmailJS (client-side, no backend):
   *   1. Add the EmailJS SDK, then call
   *      emailjs.send('SERVICE_ID', 'TEMPLATE_ID', Object.fromEntries(formData))
   *
   * Option D — Custom backend: point the fetch at your own API endpoint.
   */
  async function submitForm(formData) {
    // TODO: Replace this stub with real submission logic (see options above).
    // Demo: simulate a network request so the success state is visible.
    await new Promise((resolve) => setTimeout(resolve, 1200));

    // Example Formspree call (uncomment + set YOUR_FORM_ID):
    // const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    //   method: 'POST',
    //   body: formData,
    //   headers: { Accept: 'application/json' },
    // });
    // if (!res.ok) throw new Error('Submission failed');
  }

})();
