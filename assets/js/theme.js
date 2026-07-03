/* Theme toggle. The flash-guard (applying `.dark` before paint) lives inline in
   each page's <head>; this file only wires the toggle button and persistence.
   Call window.initThemeToggle() after the header partial is in the DOM. */
(function () {
  'use strict';

  function currentThemeIsDark() {
    return document.documentElement.classList.contains('dark');
  }

  function applyTheme(dark) {
    document.documentElement.classList.toggle('dark', dark);
    try {
      localStorage.setItem('theme', dark ? 'dark' : 'light');
    } catch (e) {
      /* localStorage unavailable (private mode); non-fatal */
    }
    updateToggleState(dark);
  }

  function updateToggleState(dark) {
    var btn = document.querySelector('[data-theme-toggle]');
    if (!btn) return;
    btn.setAttribute('aria-pressed', String(dark));
    btn.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    btn.setAttribute('title', dark ? 'Switch to light theme' : 'Switch to dark theme');
  }

  window.initThemeToggle = function initThemeToggle() {
    var btn = document.querySelector('[data-theme-toggle]');
    if (!btn) return;
    updateToggleState(currentThemeIsDark());
    btn.addEventListener('click', function () {
      applyTheme(!currentThemeIsDark());
    });
  };
})();
