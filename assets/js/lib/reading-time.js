/* Estimate reading time from Markdown/plain text at ~200 wpm.
   Exposed as window.readingTime(text) -> "N min read". */
(function () {
  'use strict';

  window.readingTime = function readingTime(text) {
    var words = String(text || '')
      .replace(/```[\s\S]*?```/g, ' ') // drop code fences from the count
      .replace(/<[^>]+>/g, ' ') // drop raw HTML tags
      .trim()
      .split(/\s+/)
      .filter(Boolean).length;
    var minutes = Math.max(1, Math.round(words / 200));
    return minutes + ' min read';
  };
})();
