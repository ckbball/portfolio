/* Markdown → HTML rendering, wrapping `marked` + `highlight.js` (both vendored).
   Adds a custom fenced-code renderer that supports a `lang:filename` info string
   and emits a filename header bar. Exposed as window.MD.render(markdown).

   Loaded only on detail/post pages (not the homepage) to keep the home budget
   small. Requires vendor/marked.min.js and vendor/highlight.min.js first. */
(function () {
  'use strict';

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function highlight(code, lang) {
    if (typeof window.hljs === 'undefined') return escapeHtml(code);
    try {
      if (lang && window.hljs.getLanguage(lang)) {
        return window.hljs.highlight(code, { language: lang }).value;
      }
      return window.hljs.highlightAuto(code).value;
    } catch (e) {
      return escapeHtml(code);
    }
  }

  // Defensive across marked versions: older marked calls code(code, info, esc);
  // newer token-based renderers call code(token). Handle both shapes.
  function renderCode(codeOrToken, infostring) {
    var code, info;
    if (codeOrToken && typeof codeOrToken === 'object') {
      code = codeOrToken.text || '';
      info = codeOrToken.lang || '';
    } else {
      code = codeOrToken || '';
      info = infostring || '';
    }

    var parts = String(info).split(':');
    var lang = parts[0].trim();
    var filename = parts[1] ? parts.slice(1).join(':').trim() : '';

    var body = highlight(code, lang);
    var header = filename
      ? '<div class="code-filename">' + escapeHtml(filename) + '</div>'
      : '';
    var langClass = lang ? ' language-' + escapeHtml(lang) : '';

    return (
      '<div class="code-block">' +
      header +
      '<pre><code class="hljs' +
      langClass +
      '">' +
      body +
      '</code></pre></div>'
    );
  }

  function configure() {
    if (typeof window.marked === 'undefined') {
      console.error('markdown.js: marked is not loaded.');
      return;
    }
    window.marked.use({
      gfm: true,
      breaks: false,
      renderer: { code: renderCode },
    });
  }

  var configured = false;

  window.MD = {
    render: function render(markdown) {
      if (!configured) {
        configure();
        configured = true;
      }
      if (typeof window.marked === 'undefined') return '';
      return window.marked.parse(String(markdown || ''));
    },
  };
})();
