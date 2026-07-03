# caesarladion.com

Personal portfolio & website for Caesar Ladion — AI engineer specializing in agentic systems, backend engineering (Go/Python), data engineering, and frontier coding-agent evaluation.

Built intentionally without a framework: **static HTML + Vanilla JavaScript + jQuery + Tailwind CSS**. No bundler, no server. The only build step is the Tailwind CLI compiling one stylesheet. See [SPEC.md](./SPEC.md) for the full technical spec and [PROJECT_IDEAS.md](./PROJECT_IDEAS.md) for the project roadmap.

## Stack

- **Markup:** static HTML5, one file per route
- **Behavior:** Vanilla JS + jQuery 3.7 (slim) for partial includes and DOM wiring
- **Styling:** Tailwind CSS v3.4 (compiled via CLI to a single `assets/css/styles.css`)
- **Content:** JSON manifests + Markdown, rendered client-side with `marked` + `highlight.js` (added in a later milestone)
- **Hosting:** GitHub Pages via GitHub Actions

## Local development

Requires Node 20+ (used only for the Tailwind CLI and a static server — no application code runs through Node).

```bash
npm install

# Terminal 1 — compile Tailwind in watch mode
npm run dev:css

# Terminal 2 — serve the site (fetch() of partials/content needs a real server)
npm run serve   # http://localhost:3000
```

> Open via the dev server, not `file://` — pages fetch the header/footer partials over HTTP.

## Build

```bash
npm run build        # minified CSS + generated sitemap/robots/rss
node scripts/check-build.mjs   # CI sanity check
```

## Structure

```
index.html, about.html, resume.html, 404.html   Top-level routes
projects/, writing/                              Section index + detail templates
partials/                                        Shared header/footer (injected via jQuery)
content/                                          JSON manifests + Markdown (later milestone)
assets/css, assets/js, assets/images             Styles, scripts, media
scripts/                                          Dev-only Node (feeds, build check)
```

## Deploy

Pushing to `main` runs `.github/workflows/ci.yml`, which builds the CSS, generates feeds, runs the sanity check, and deploys to GitHub Pages. Enable Pages → "GitHub Actions" as the source in repo settings.

## License

[MIT](./LICENSE)
