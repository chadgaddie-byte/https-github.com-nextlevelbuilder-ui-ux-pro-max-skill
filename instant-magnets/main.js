/* ============================================================
   Instant Magnets — main.js
   Handles: nav scroll/mobile, form validation, form submission
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

  // Close mobile nav when a link is tapped
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      burger.setAttribute('aria-expanded', 'false');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
      burger.setAttribute('aria-expanded', 'false');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
      burger.focus();
    }
  });

  /* ── Form validation & submission ───────────────────────────── */
  const form       = document.getElementById('booking-form');
  const submitBtn  = document.getElementById('submit-btn');
  const successMsg = document.getElementById('form-success');
  const errorMsg   = document.getElementById('form-error');

  if (!form) return;

  function getGroup(field) {
    return document.getElementById('group-' + field.id.replace('event-', 'event-'));
  }

  function showError(field, show) {
    const group = field.closest('.form-group');
    if (!group) return;
    group.classList.toggle('has-error', show);
  }

  function isValidEmail(val) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  }

  function validateForm() {
    let valid = true;

    const name = document.getElementById('name');
    if (!name.value.trim()) { showError(name, true);  valid = false; }
    else                     { showError(name, false); }

    const email = document.getElementById('email');
    if (!isValidEmail(email.value.trim())) { showError(email, true);  valid = false; }
    else                                   { showError(email, false); }

    const eventType = document.getElementById('event-type');
    if (!eventType.value) { showError(eventType, true);  valid = false; }
    else                  { showError(eventType, false); }

    return valid;
  }

  // Validate on blur for each required field
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
      // Move focus to first invalid field
      const firstError = form.querySelector('.has-error input, .has-error select');
      if (firstError) firstError.focus();
      return;
    }

    // Loading state
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');

    try {
      await submitForm(new FormData(form));

      // Success
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
   *   2. Replace the fetch URL with your Formspree endpoint
   *   3. Add method="POST" and action="https://formspree.io/f/YOUR_FORM_ID"
   *      to the <form> tag if you prefer HTML-native submission
   *
   * Option B — Netlify Forms:
   *   1. Add `netlify` attribute to <form> and `data-netlify="true"`
   *   2. Replace the fetch below with a standard form POST
   *
   * Option C — EmailJS (client-side email, no backend):
   *   1. npm install @emailjs/browser (or add CDN script)
   *   2. Call emailjs.send('SERVICE_ID', 'TEMPLATE_ID', Object.fromEntries(data))
   *
   * Option D — Custom backend:
   *   1. Point the fetch URL to your own API endpoint
   *   2. Adjust headers/body as needed for your server
   */
  async function submitForm(formData) {
    // TODO: Replace this stub with real form submission logic (see options above)
    // Simulating a network request for demonstration:
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        // Change to reject() to test the error state
        resolve();
      }, 1200);
    });

    // Example Formspree call (uncomment and replace YOUR_FORM_ID):
    // const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    //   method: 'POST',
    //   body: formData,
    //   headers: { Accept: 'application/json' },
    // });
    // if (!res.ok) throw new Error('Submission failed');
  }

})();
