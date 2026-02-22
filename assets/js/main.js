// Minimal JS: mobile nav toggle + copy email button (optional)
(function () {
  // Support multiple navs/pages: bind each toggle to its nearest .navbar [data-nav-links]
  const toggles = document.querySelectorAll('[data-nav-toggle]');

  toggles.forEach((toggle) => {
    const navbar = toggle.closest('.navbar');
    if (!navbar) return;
    const links = navbar.querySelector('[data-nav-links]');
    if (!links) return;

    // Click the hamburger to open/close the dropdown for this nav
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });

    // Close menu when a nav link inside this nav is clicked (mobile)
    links.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        links.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close when clicking outside the nav
    document.addEventListener('click', (ev) => {
      if (!links.classList.contains('is-open')) return;
      if (navbar.contains(ev.target)) return; // click inside nav -> ignore
      links.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  const copyBtn = document.querySelector('[data-copy-email]');
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const email = copyBtn.getAttribute('data-email');
      if (!email) return;
      try {
        await navigator.clipboard.writeText(email);
        copyBtn.textContent = 'Copied ✓';
        setTimeout(() => (copyBtn.textContent = 'Copy email'), 1200);
      } catch (e) {
        // clipboard may be blocked; fail silently
      }
    });
  }
})();