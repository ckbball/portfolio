/* Project case-study controller. Reads ?slug=, loads the manifest + Markdown
   body, renders the body via window.MD, and populates the header, "at a glance"
   box, and prev/next links. */
(function ($) {
  'use strict';

  function qs(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  function esc(s) {
    return $('<div>').text(s == null ? '' : String(s)).html();
  }

  function formatDateRange(entry) {
    var opts = { year: 'numeric', month: 'short' };
    var start = new Date(entry.date).toLocaleDateString('en-US', opts);
    if (!entry.dateEnd) return start + ' — Present';
    return start + ' — ' + new Date(entry.dateEnd).toLocaleDateString('en-US', opts);
  }

  function badgeFor(status) {
    var map = {
      live: ['badge-live', 'Live'],
      'in-progress': ['badge-progress', 'In Progress'],
      'case-study': ['badge-progress', 'Case Study'],
    };
    var b = map[status] || map['case-study'];
    return '<span class="' + b[0] + '">' + b[1] + '</span>';
  }

  function showNotFound() {
    $('#project-not-found').removeClass('hidden');
    document.title = 'Project not found' + window.SITE.titleSuffix;
  }

  function renderHeader(entry) {
    document.title = entry.title + window.SITE.titleSuffix;
    var descEl = document.querySelector('meta[name="description"]');
    if (descEl && entry.description) descEl.setAttribute('content', entry.description);

    $('#project-title').text(entry.title);
    $('#project-pitch').text(entry.pitch);

    $('#project-tags').html(
      (entry.tags || []).map(function (t) {
        return '<span class="tag">' + esc(t) + '</span>';
      }).join('')
    );

    var meta = [badgeFor(entry.status), '<span class="text-muted-foreground">' + esc(formatDateRange(entry)) + '</span>'];
    var links = entry.links || {};
    if (links.github) meta.push('<a class="link" href="' + esc(links.github) + '" target="_blank" rel="noopener noreferrer">GitHub ↗</a>');
    if (links.demo) meta.push('<a class="link" href="' + esc(links.demo) + '" target="_blank" rel="noopener noreferrer">Live demo ↗</a>');
    if (links.writeup) meta.push('<a class="link" href="' + esc(links.writeup) + '" target="_blank" rel="noopener noreferrer">Write-up ↗</a>');
    $('#project-meta').html(meta.join(''));
  }

  function renderGlance(entry) {
    var rows = [];
    if (entry.role) rows.push(['Role', esc(entry.role)]);
    rows.push(['Status', badgeFor(entry.status)]);
    if (entry.stack && entry.stack.length) {
      rows.push(['Stack', entry.stack.map(function (s) {
        return '<span class="tech-item">' + esc(s) + '</span>';
      }).join(' ')]);
    }
    var html = rows.map(function (r) {
      return (
        '<div><dt class="text-xs font-medium uppercase tracking-wide text-muted-foreground">' + r[0] + '</dt>' +
        '<dd class="mt-1.5 flex flex-wrap gap-1.5 text-foreground">' + r[1] + '</dd></div>'
      );
    });

    if (entry.metrics && entry.metrics.length) {
      html.push(
        '<div><dt class="text-xs font-medium uppercase tracking-wide text-muted-foreground">Key metrics</dt>' +
        '<dd class="mt-2 space-y-2">' +
        entry.metrics.map(function (m) {
          return '<div class="flex items-baseline justify-between gap-3">' +
            '<span class="font-mono text-sm font-semibold text-foreground">' + esc(m.value) + '</span>' +
            '<span class="text-xs text-muted-foreground">' + esc(m.label) + '</span></div>';
        }).join('') +
        '</dd></div>'
      );
    }
    $('#project-glance').html(html.join(''));
  }

  function renderPrevNext(list, idx) {
    var prev = list[idx - 1];
    var next = list[idx + 1];
    var cell = function (entry, dir) {
      if (!entry) return '<div></div>';
      var align = dir === 'next' ? 'sm:text-right' : '';
      return (
        '<a class="card p-4 ' + align + '" href="/projects/detail.html?slug=' + esc(entry.slug) + '">' +
        '<span class="text-xs text-muted-foreground">' + (dir === 'next' ? 'Next' : 'Previous') + '</span>' +
        '<span class="mt-1 block font-medium text-foreground">' + esc(entry.title) + '</span></a>'
      );
    };
    $('#project-prevnext').html(cell(prev, 'prev') + cell(next, 'next'));
  }

  function sortProjects(list) {
    return list.slice().sort(function (a, b) {
      if (!!b.featured !== !!a.featured) return b.featured ? 1 : -1;
      if ((a.order || 99) !== (b.order || 99)) return (a.order || 99) - (b.order || 99);
      return new Date(b.date) - new Date(a.date);
    });
  }

  function init() {
    var slug = qs('slug');
    if (!slug) return showNotFound();

    fetch('/content/projects.json')
      .then(function (r) {
        if (!r.ok) throw new Error('projects.json ' + r.status);
        return r.json();
      })
      .then(function (raw) {
        var list = sortProjects(window.validateManifest('project', raw));
        var idx = list.findIndex(function (p) { return p.slug === slug; });
        if (idx === -1) throw new Error('slug not found: ' + slug);
        var entry = list[idx];

        return fetch('/content/projects/' + slug + '.md')
          .then(function (r) {
            if (!r.ok) throw new Error(slug + '.md ' + r.status);
            return r.text();
          })
          .then(function (raw) {
            var parsed = window.parseFrontmatter(raw);
            $('#project-body').html(window.MD.render(parsed.content));
            renderHeader(entry);
            renderGlance(entry);
            renderPrevNext(list, idx);
            $('#project-article').removeClass('hidden');
          });
      })
      .catch(function (err) {
        console.error('Failed to load project:', err);
        showNotFound();
      });
  }

  // Run after partials so header/footer exist; init itself doesn't depend on them
  // but this keeps ordering predictable.
  document.addEventListener('partials:loaded', init);
})(jQuery);
