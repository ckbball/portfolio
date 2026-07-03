/* Injects the shared header/footer partials into every page, then wires up the
   theme toggle and highlights the active nav link. Pages include empty
   <div id="site-header"></div> / <div id="site-footer"></div> and load this file
   (after jquery, config.js and theme.js).

   Network fetch uses native fetch() because we ship the jQuery *slim* build,
   which omits the AJAX module ($.get/$.load). jQuery is still used for DOM work. */
(function ($) {
  'use strict';

  // Normalize a path for comparison: strip trailing "index.html" so
  // "/projects/" and "/projects/index.html" match.
  function normalizePath(path) {
    return path.replace(/index\.html$/, '');
  }

  function markActiveNav() {
    var here = normalizePath(window.location.pathname);
    $('[data-nav-link]').each(function () {
      var href = normalizePath(new URL(this.href).pathname);
      // Section match: a nav item is active if the current path starts with it
      // (so /projects/detail.html highlights the "Projects" link).
      var isActive = href === here || (href.length > 1 && here.indexOf(href) === 0);
      if (isActive) {
        $(this)
          .attr('aria-current', 'page')
          .addClass('text-foreground')
          .removeClass('text-muted-foreground');
      }
    });
  }

  function inject(selector, url) {
    return fetch(url)
      .then(function (res) {
        if (!res.ok) throw new Error(url + ' -> ' + res.status);
        return res.text();
      })
      .then(function (html) {
        $(selector).html(html);
      });
  }

  function loadPartials() {
    Promise.all([
      inject('#site-header', '/partials/header.html'),
      inject('#site-footer', '/partials/footer.html'),
    ])
      .then(function () {
        $('[data-current-year]').text(new Date().getFullYear());
        markActiveNav();
        if (typeof window.initThemeToggle === 'function') {
          window.initThemeToggle();
        }
        document.dispatchEvent(new CustomEvent('partials:loaded'));
      })
      .catch(function (err) {
        console.error('Failed to load partials:', err);
      });
  }

  $(loadPartials);
})(jQuery);
