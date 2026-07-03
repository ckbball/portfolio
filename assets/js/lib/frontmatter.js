/* Tiny YAML-ish frontmatter parser. Handles a leading `---` block with simple
   `key: value` lines, inline arrays (`tags: [a, b]`), booleans, and null. The
   JSON manifests remain the source of truth for list metadata; frontmatter here
   is only for anything a body render needs. Exposed as window.parseFrontmatter. */
(function () {
  'use strict';

  function coerce(value) {
    var v = value.trim();
    if (v === '') return '';
    if (v === 'true') return true;
    if (v === 'false') return false;
    if (v === 'null' || v === '~') return null;
    // Inline array: [a, b, "c"]
    if (v[0] === '[' && v[v.length - 1] === ']') {
      var inner = v.slice(1, -1).trim();
      if (inner === '') return [];
      return inner.split(',').map(function (item) {
        return stripQuotes(item.trim());
      });
    }
    if (!isNaN(Number(v)) && v !== '') return Number(v);
    return stripQuotes(v);
  }

  function stripQuotes(s) {
    if (
      (s[0] === '"' && s[s.length - 1] === '"') ||
      (s[0] === "'" && s[s.length - 1] === "'")
    ) {
      return s.slice(1, -1);
    }
    return s;
  }

  window.parseFrontmatter = function parseFrontmatter(raw) {
    var text = String(raw).replace(/^﻿/, ''); // strip BOM
    var match = /^---\s*\n([\s\S]*?)\n---\s*(?:\n|$)/.exec(text);
    if (!match) return { data: {}, content: text };

    var data = {};
    match[1].split('\n').forEach(function (line) {
      if (!line.trim() || line.trim().startsWith('#')) return;
      var idx = line.indexOf(':');
      if (idx === -1) return;
      var key = line.slice(0, idx).trim();
      data[key] = coerce(line.slice(idx + 1));
    });

    return { data: data, content: text.slice(match[0].length) };
  };
})();
