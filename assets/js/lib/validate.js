/* Client-side manifest validator. Checks the shape of projects.json / posts.json
   and logs clear, actionable console errors (with the offending slug) when an
   entry is malformed. Returns only the entries that pass, so a single bad record
   never blank-screens the page. CI mirrors these rules in Node (M4).
   Exposed as window.validateManifest(type, items). */
(function () {
  'use strict';

  var STATUSES = ['live', 'in-progress', 'case-study'];

  var SCHEMAS = {
    project: {
      required: {
        slug: 'string',
        title: 'string',
        pitch: 'string',
        date: 'string',
        status: 'status',
        tags: 'array',
      },
      optional: {
        description: 'string',
        dateEnd: 'string',
        featured: 'boolean',
        order: 'number',
        stack: 'array',
        role: 'string',
        links: 'object',
        metrics: 'array',
        thumbnail: 'string',
        draft: 'boolean',
      },
    },
    post: {
      required: {
        slug: 'string',
        title: 'string',
        date: 'string',
        tags: 'array',
      },
      optional: {
        description: 'string',
        updated: 'string',
        draft: 'boolean',
      },
    },
  };

  function typeOf(value) {
    if (Array.isArray(value)) return 'array';
    if (value === null) return 'null';
    return typeof value;
  }

  function checkField(errors, ctx, key, expected, value, isRequired) {
    if (value === undefined || value === null) {
      if (isRequired) errors.push(ctx + 'missing required field "' + key + '"');
      return;
    }
    if (expected === 'status') {
      if (STATUSES.indexOf(value) === -1) {
        errors.push(
          ctx + '"status" must be one of ' + STATUSES.join(' | ') + ' (got "' + value + '")'
        );
      }
      return;
    }
    var actual = typeOf(value);
    if (actual !== expected) {
      errors.push(ctx + '"' + key + '" should be ' + expected + ' but is ' + actual);
    }
  }

  window.validateManifest = function validateManifest(type, items) {
    var schema = SCHEMAS[type];
    if (!schema) {
      console.error('validateManifest: unknown type "' + type + '"');
      return [];
    }
    if (!Array.isArray(items)) {
      console.error(
        'Manifest for "' + type + '" must be a JSON array (got ' + typeOf(items) + ').'
      );
      return [];
    }

    var valid = [];
    var seenSlugs = {};

    items.forEach(function (item, i) {
      var label = item && item.slug ? '"' + item.slug + '"' : 'index ' + i;
      var ctx = type + ' ' + label + ': ';
      var errors = [];

      if (typeOf(item) !== 'object') {
        console.error(type + ' index ' + i + ': entry must be an object.');
        return;
      }

      Object.keys(schema.required).forEach(function (key) {
        checkField(errors, ctx, key, schema.required[key], item[key], true);
      });
      Object.keys(schema.optional).forEach(function (key) {
        checkField(errors, ctx, key, schema.optional[key], item[key], false);
      });

      if (item.slug) {
        if (seenSlugs[item.slug]) errors.push(ctx + 'duplicate slug "' + item.slug + '"');
        seenSlugs[item.slug] = true;
      }

      if (errors.length) {
        console.error(
          'Invalid ' + type + ' entry (' + label + '):\n' +
            errors.map(function (e) { return '  - ' + e; }).join('\n')
        );
        return; // drop the bad entry
      }
      valid.push(item);
    });

    return valid;
  };
})();
