# Technical Specification: Personal Portfolio & Website — Caesar Ladion

**Version:** 2.0 (simplified stack)
**Date:** 2026-07-03
**Status:** Ready for implementation
**Audience:** This document is written to be executed by a coding agent (Claude Code) with minimal human intervention. Follow it top to bottom; acceptance criteria are listed per milestone.

> **v2 note:** This revision replaces the Next.js/React/TypeScript/MDX stack with a deliberately minimal stack — **static HTML + Vanilla JavaScript + jQuery + Tailwind CSS**. No framework, no bundler, no server. The only build step is the Tailwind CLI compiling one CSS file. The site is a folder of static files that can be opened directly or served by any static host.

---

## 1. Purpose & Goals

### 1.1 What this site is

A personal portfolio and website for **Caesar Ladion** — AI engineer specializing in agentic systems, backend engineering (Go/Python), data engineering, and frontier coding-agent evaluation. GitHub: [ckbball](https://github.com/ckbball). Location: Bay Area, CA. Email: caesar.ladion@gmail.com.

### 1.2 Primary goals (in priority order)

1. **Get interviews.** The #1 reader is a recruiter or hiring manager spending 30–90 seconds. The homepage must communicate "senior-capable AI/backend engineer" in one screen.
2. **Showcase projects as case studies**, not just repo links. Each project page tells: problem → architecture → decisions → results, with diagrams and live demos where possible.
3. **Demonstrate engineering skill through the site itself** — clean, readable, well-organized code and fast load. Assume engineers will read the source. A tidy vanilla codebase that scores 100 on Lighthouse is its own flex.
4. **Publish writing.** A lightweight blog for posts on agent evaluation, Go, and data engineering. This is the strongest differentiator given the "Frontier Coding Agent evaluation" experience — almost nobody writes credibly about this.

### 1.3 Positioning statement (use as the basis for all copy)

> "I build and evaluate AI agent systems. 3+ years shipping backend and data systems in Go and Python, including production LLM applications and expert-level evaluation of frontier coding agents."

### 1.4 Non-goals

- No CMS, no database, no auth, no backend of any kind.
- No framework (React/Vue/Next), no bundler (Webpack/Vite), no TypeScript.
- No comments system, no newsletter (add later if writing takes off).
- No over-designed animation showcase. Tasteful motion only; content first.

---

## 2. Tech Stack

Deliberately small. If a requirement seems to need more than this list, prefer dropping the requirement over adding a tool.

| Layer | Choice | Rationale |
|---|---|---|
| Markup | **Static HTML5** — one file per page | No framework, directly hostable, perfectly SEO-friendly |
| Behavior | **Vanilla JavaScript (ES2020+)** in plain `<script>` files, no modules bundler | Simple, debuggable, no build |
| DOM helper | **jQuery 3.7 (slim build)** | Requested; used for DOM wiring, partial injection, render of content, tag filtering. Note: slim omits `$.ajax`, so the network fetch itself uses native `fetch()`; jQuery handles the DOM. |
| Styling | **Tailwind CSS v3.4 via the Tailwind CLI** | One compiled `styles.css`; the *only* build step |
| Content rendering | **`marked`** (Markdown → HTML) + **`highlight.js`** (code) loaded from CDN | Lets project/blog bodies be authored in Markdown and rendered client-side without a build |
| Fonts | **Google Fonts or self-hosted** (Inter + JetBrains Mono) via `<link>`/`@font-face` | 2 families max |
| Icons | **Inline SVG** (hand-picked from Lucide/Heroicons, pasted into markup or a small sprite) | Zero dependency |
| Local dev server | **`npx serve`** or VS Code Live Server (any static server) | Needed because pages use `fetch()` for partials/content, which fails on `file://` |
| Deployment | **GitHub Pages** (primary) or Netlify/Cloudflare Pages | Free static hosting; GitHub Pages keeps everything on GitHub |
| CI | **GitHub Actions** — build Tailwind, run HTML/link checks, run a headless smoke test | Proves the site builds and basic invariants hold |

**Node/npm usage is limited to two things:** installing the Tailwind CLI (and a couple of dev-only checkers) and running the CSS build. No application code runs through Node. `package.json` exists only to pin those dev tools and hold npm scripts.

> **Tailwind note:** Use Tailwind **v3.4** with a classic `tailwind.config.js` and `content` globbing over `**/*.html` and `assets/js/**/*.js`. (v4 is fine too but v3.4 is the most battle-tested static setup and is what this spec assumes.) Do **not** use the Tailwind Play CDN in production — it ships the whole engine and hurts performance; compile a purged stylesheet with the CLI.

**Domain:** `caesarladion.com` (or `.dev`), ~$10–12/yr, pointed at the static host. Until purchased, ship on the GitHub Pages / Netlify default URL — do not block launch on the domain.

---

## 3. Information Architecture

Because there is no router, each route is a real HTML file. Detail pages (which vary by content item) are a single template page that reads a `?slug=` query parameter and loads the matching Markdown file.

```
/index.html                     Homepage
/projects/index.html            Project index (card grid, tag filter)
/projects/detail.html?slug=…    Project case study (loads content/projects/<slug>.md)
/writing/index.html             Blog index (chronological list)
/writing/post.html?slug=…       Blog post (loads content/writing/<slug>.md)
/about.html                     Bio, experience timeline, skills detail
/resume.html                    HTML resume + "Download PDF" button
/404.html                       Custom not-found page
/rss.xml                        RSS feed for writing (generated — see §7)
/sitemap.xml                    Sitemap (generated — see §7)
/robots.txt                     Robots
```

> **Pretty-URL option (optional, post-launch):** Netlify/Cloudflare redirects or a per-project folder (`projects/<slug>/index.html`) can replace the `?slug=` query style. Query params are the simplest zero-config approach and are the default for v1.

### 3.1 Global layout

- **Header** and **footer** are authored once as HTML partials in `/partials/` and injected into every page (fetched with native `fetch()`, inserted with jQuery — see §5.3). This avoids duplicating nav markup across files.
- **Header:** name/logo left (links home), nav right: `Projects · Writing · About · Resume`. Theme toggle (dark/light). At 375px the four nav items still fit at small size — no hamburger needed.
- **Footer:** © year, GitHub, LinkedIn, email, RSS link, and a "Built with vanilla JS + Tailwind — view source" link to the site's own public repo.
- Max content width: `~42rem` for prose, `~72rem` for grids/homepage. Use a shared `.container-page` utility.

---

## 4. Page Specifications

### 4.1 Homepage `/index.html`

Single scroll, no carousel. Sections in order:

1. **Hero.** Name, one-line positioning (§1.3), 2–3 sentence elaboration, location, two CTAs: `View Projects` (primary) and `Resume` (secondary). Links row: GitHub, LinkedIn, email. No stock imagery. Optional: a small terminal-style snippet cycling role keywords (`ai engineer`, `go backend`, `agent evaluation`) via a tiny `setInterval` — must check `prefers-reduced-motion` and stop if set.
2. **Featured projects.** Exactly 3 cards, driven by the `featured`/`order` fields in `projects.json` (§5.1). Card: title, one-line pitch, 3–5 tech tags, thumbnail or CSS gradient, link to case study. Plus "All projects →".
3. **Experience strip.** Compact 3-row timeline: Advent Technologies (AI Engineer, 2023–2026), Data Annotation (SWE Consultant, 2023–present), Smurfin (SWE, 2020–2021). One impact line each. Links to `/about.html`.
4. **Recent writing.** Latest 3 posts from `posts.json`. If there are zero posts, hide the whole section (no "no posts" text).
5. **Skills strip.** Grouped inline tags, **not** progress bars (progress bars read as junior): `Languages: Go · Python · TypeScript · SQL` / `AI: LLM apps · agent evaluation · prompt engineering · Claude API` / `Infra: GCP · Kubernetes · Docker · Terraform · Postgres · Redis · gRPC`.

The homepage's featured-projects and recent-writing sections are populated at load time by JS reading the JSON manifests, so adding content never requires editing `index.html`.

### 4.2 Projects index `/projects/index.html`

- JS reads `content/projects.json` and renders a responsive card grid (1 col mobile / 2 col ≥768px / 3 col ≥1152px).
- Tag filter chips (`Go`, `AI/LLM`, `Data Eng`, `Frontend`, `Infra`) implemented in vanilla JS/jQuery. Selected tags sync to the URL query string (`?tag=Go`) so filtered views are shareable; on load, read the query and apply.
- Card: title, pitch, tags, status badge (`Live` / `In Progress` / `Case Study`), links (whole card → detail; GitHub icon; demo icon if present).
- Sort: `featured` first, then `order`, then `date` descending.

### 4.3 Project case study `/projects/detail.html?slug=…`

The most important template on the site.

- On load: read `slug` from the query string, `fetch` `content/projects/<slug>.md`, parse its YAML-ish frontmatter (§5.2), render the body Markdown with `marked`, highlight code with `highlight.js`, and populate the page. If the slug is missing or the fetch 404s, show the 404 content inline.
- **Header block:** title, one-line pitch, tag row, external links (GitHub / Live Demo / Write-up), date range.
- **"At a glance" box** (sticky sidebar ≥1024px, top box on mobile): role, stack list, status, key metrics.
- **Body conventions** (documented in `content/projects/_TEMPLATE.md`):
  1. The Problem
  2. Architecture (diagram required — see §6.4)
  3. Key Technical Decisions ("why X over Y" — what senior engineers read)
  4. Challenges & Solutions
  5. Results / Metrics
  6. What I'd Do Differently
- **Reusable rendered components** — since there's no MDX, implement these as either (a) HTML you write directly in the Markdown (Markdown allows raw HTML) using pre-styled classes, or (b) a tiny post-render pass in JS that upgrades marker syntax. Provide styled classes for: `.callout` (info/warning/decision variants), `.figure` (img + caption), `.arch-diagram` (theme-swapping image), `.metrics-row`, `.tech-stack`, and code blocks with a filename header bar.
- **Footer:** prev/next project links (compute from `projects.json` order).

### 4.4 Writing index & post

- `/writing/index.html`: JS reads `content/posts.json`, renders a plain chronological list (date · title · description). Text-forward, no cards.
- `/writing/post.html?slug=…`: same fetch-and-render pipeline as project detail. Adds: reading time (computed from word count), published/updated dates, tags, and a table of contents built in JS from the rendered `h2`/`h3` with scroll-spy (desktop). Heading anchor links appear on hover.

### 4.5 About `/about.html`

- 3–4 paragraph first-person bio; throughline: *backend/data engineer → AI engineer → agent-evaluation expert*. Mention UCSC CS degree, Bay Area, what he's looking for.
- Experience timeline with expanded bullets (rewritten from the resume, less terse).
- Skills section grouped as on the homepage, expanded.
- Optional photo — layout must work with or without it.

### 4.6 Resume `/resume.html`

- Resume rendered as semantic HTML (not an embedded PDF) for readability + SEO.
- Prominent `Download PDF` button linking to `/assets/resume.pdf` (static file; human keeps it updated).
- Print stylesheet (`@media print`): hide nav/footer, adjust margins so printing `/resume.html` yields a clean resume.

### 4.7 404 `/404.html`

"Nothing here." + links home/projects, keeping header/footer. Configure the host to serve this for unknown paths (GitHub Pages uses `404.html` automatically).

---

## 5. Content Model

No database and no build-time validation framework. Content is: **JSON manifests** (for lists/metadata) + **Markdown files** (for bodies). A small vanilla JS validator (`assets/js/lib/validate.js`) checks manifest shape at load in dev and logs clear console errors; CI runs the same checks in Node (§10, M4).

### 5.1 Manifests

`content/projects.json` — array of project metadata objects:

```json
[
  {
    "slug": "fleet-telemetry",
    "title": "Fleetline — Device Telemetry Platform",
    "pitch": "Real-time device fleet monitoring over gRPC with a live dashboard",
    "description": "150–160 char meta description",
    "date": "2026-07-01",
    "dateEnd": null,
    "status": "live",
    "featured": true,
    "order": 1,
    "tags": ["Go", "gRPC", "React", "Postgres", "AI/LLM"],
    "stack": ["Go 1.24", "gRPC + protobuf", "TimescaleDB", "Fly.io"],
    "role": "Solo — design, build, deploy",
    "links": { "github": "https://github.com/ckbball/…", "demo": "https://…" },
    "metrics": [{ "label": "Ingest throughput", "value": "10k events/sec" }],
    "thumbnail": "/assets/images/projects/fleet-telemetry/thumb.png",
    "draft": false
  }
]
```

`content/posts.json` — array of post metadata:

```json
[
  {
    "slug": "evaluating-frontier-coding-agents",
    "title": "What I Learned Evaluating Frontier Coding Agents",
    "description": "meta description",
    "date": "2026-07-10",
    "updated": null,
    "tags": ["ai", "agents", "evaluation"],
    "draft": false
  }
]
```

`draft: true` items are filtered out unless the URL contains `?preview=1` (dev convenience). The `slug` maps to `content/projects/<slug>.md` or `content/writing/<slug>.md`.

### 5.2 Markdown body files

Each body file is Markdown with a small frontmatter block delimited by `---`. Because there's no build parser, keep frontmatter minimal and parse it with a ~20-line vanilla function (`assets/js/lib/frontmatter.js`) — split on the second `---`, parse simple `key: value` lines and inline arrays. The manifest is the source of truth for metadata used in lists; frontmatter in the `.md` is optional and only for anything the body render needs. Prefer keeping metadata in the JSON manifest to avoid duplication.

`content/projects/_TEMPLATE.md` documents the section conventions and available styled classes.

### 5.3 Partials & site config

- `/partials/header.html`, `/partials/footer.html` — fetched with native `fetch()` and injected via `$('#site-header').html(...)`. Each page includes empty `<div id="site-header"></div>` / `<div id="site-footer"></div>` and loads `partials.js`, which then wires the theme toggle and marks the active nav link.
- `/assets/js/config.js` — a single global `SITE` object: name, title suffix, base URL, social links, nav items. No magic strings scattered across pages.

---

## 6. Design System

### 6.1 Principles

Text-forward, generous whitespace, restrained color. Think `leerob.com` / `paco.me` — engineer-credible, not agency-flashy. The design disappears behind the content.

### 6.2 Tokens

Define CSS custom properties in `assets/css/input.css` and map them into Tailwind via `tailwind.config.js` `theme.extend.colors` (e.g. `background: 'rgb(var(--background) / <alpha-value>)'`). Semantic tokens: `--background`, `--foreground`, `--muted`, `--muted-foreground`, `--border`, `--accent`, each with a `.dark` override.

- **Colors:** neutral (zinc) scale + **one accent** (emerald or blue-cyan; pick one, use sparingly: links, active states, small accents).
- **Dark mode:** Tailwind `darkMode: 'class'`. Default follows `prefers-color-scheme`; toggle persists to `localStorage`. Prevent flash-of-wrong-theme with a tiny **blocking inline script in `<head>`** that sets the `.dark` class before paint (this script must be inline, not deferred).
- **Typography:** Inter (UI/prose) + JetBrains Mono (code). Base 16px, prose line-height 1.7. Scale: 14 / 16 / 18 / 24 / 32 / 44. Use Tailwind's `@tailwindcss/typography` plugin for rendered-Markdown prose.
- **Spacing:** default Tailwind scale; section spacing 64–96px desktop, 48–64px mobile.
- **Radii:** `rounded-lg` cards, `rounded-md` buttons/chips.
- **Motion:** 150–200ms ease-out on hover/theme only. Any scroll-reveal must respect `prefers-reduced-motion`.

### 6.3 Breakpoints

Mobile-first. Test at 375, 768, 1024, 1440. No horizontal scroll at any width ≥320px.

### 6.4 Diagrams

Architecture diagrams are required for project case studies. Author in Excalidraw, export SVG with transparent background (or light+dark variants), store in `/assets/images/projects/<slug>/`. The `.arch-diagram` styling ensures legibility on both themes; if using two variants, a `data-` attribute + a few lines of JS swaps the `src` on theme change.

---

## 7. SEO, Meta & Feeds

- Every HTML page has hand-written `<title>` (pattern `Page — Caesar Ladion`), meta description, and canonical `<link>`. A small helper in `config.js` can set the title suffix, but static tags are fine and better for SEO.
- OpenGraph + Twitter card meta on every page. **OG images are static** (no dynamic generation in this stack): create one branded default `assets/images/og-default.png` (1200×630) and optionally per-project images. Reference them in each page's `<meta property="og:image">`.
- JSON-LD `<script type="application/ld+json">`: `Person` on the homepage (name, jobTitle, sameAs: GitHub/LinkedIn). For project/post detail pages, inject `BlogPosting`/`CreativeWork` JSON-LD from the manifest data after load (acceptable, but if maximal SEO is wanted, hand-add it to the template head).
- `sitemap.xml`, `robots.txt`, and `rss.xml`: generated by a small **Node script** `scripts/generate-feeds.mjs` that reads the JSON manifests and writes the three files. Run it as part of the build (§10) so they stay in sync. This is dev-only Node, not runtime.
- All images: explicit `width`/`height`, descriptive `alt`, lazy-loaded (`loading="lazy"`) below the fold.

> **SEO caveat to accept up front:** project/blog *bodies* render client-side from Markdown, so their body text isn't in the initial HTML. Mitigations: (a) the important marketing pages (home, about, projects index, resume) are fully static HTML; (b) each detail page's `<head>` has a correct static-ish title/description injected early and a `<noscript>` fallback linking to the raw `.md`; (c) modern Googlebot executes JS and will index rendered content. If body-text SEO becomes a priority, the escape hatch is a one-file Node prerender script (`scripts/prerender.mjs`) that writes rendered HTML snapshots — out of scope for v1.

---

## 8. Performance & Accessibility Budgets (hard requirements)

- Lighthouse (mobile, production build) on the static homepage: **Performance ≥ 95, Accessibility ≥ 100, Best Practices ≥ 100, SEO ≥ 100**.
- Total JS on the homepage: jQuery slim (~24KB gzip) + a few small vanilla files. `marked`/`highlight.js` load **only** on detail/post pages, not the homepage. Load third-party scripts with `defer`.
- Fonts: 2 families, `font-display: swap`, preconnect to the font host (or self-host to avoid the extra origin).
- Keyboard navigable end-to-end; visible focus states; skip-to-content link; semantic landmarks (`header/nav/main/footer`); AA color contrast minimum; every interactive control reachable and labeled.

---

## 9. Repository Structure

```
portfolio/
├── index.html
├── about.html
├── resume.html
├── 404.html
├── projects/
│   ├── index.html
│   └── detail.html
├── writing/
│   ├── index.html
│   └── post.html
├── partials/
│   ├── header.html
│   └── footer.html
├── content/
│   ├── projects.json
│   ├── posts.json
│   ├── projects/  (_TEMPLATE.md + <slug>.md)
│   └── writing/   (<slug>.md)
├── assets/
│   ├── css/
│   │   ├── input.css      (Tailwind directives + @theme tokens + custom classes)
│   │   └── styles.css      (COMPILED output — the only stylesheet pages link)
│   ├── js/
│   │   ├── config.js
│   │   ├── partials.js     (load header/footer, active nav)
│   │   ├── theme.js        (toggle + persistence; flash-guard is inline in <head>)
│   │   ├── home.js         (render featured projects + recent writing)
│   │   ├── projects.js     (index grid + tag filter)
│   │   ├── project-detail.js
│   │   ├── writing.js      (index list)
│   │   ├── post.js         (post render + TOC)
│   │   ├── lib/ (frontmatter.js, validate.js, reading-time.js, markdown.js)
│   │   └── vendor/         (jquery.slim.min.js; marked & highlight via CDN with SRI)
│   ├── images/
│   │   ├── og-default.png
│   │   └── projects/<slug>/…
│   └── resume.pdf
├── scripts/
│   ├── generate-feeds.mjs  (sitemap.xml, robots.txt, rss.xml)
│   └── check-links.mjs      (optional CI link check)
├── tailwind.config.js
├── package.json            (dev tools + npm scripts only)
├── .github/workflows/ci.yml
├── LICENSE (MIT)
└── README.md
```

Repo hygiene: public GitHub repo, meaningful commits, README with screenshot + stack + local-dev instructions, MIT license. The repo is itself a portfolio artifact — keep the vanilla code clean and commented where non-obvious.

### 9.1 npm scripts (`package.json`)

```json
{
  "scripts": {
    "dev:css": "tailwindcss -i assets/css/input.css -o assets/css/styles.css --watch",
    "build:css": "tailwindcss -i assets/css/input.css -o assets/css/styles.css --minify",
    "build:feeds": "node scripts/generate-feeds.mjs",
    "build": "npm run build:css && npm run build:feeds",
    "serve": "serve -l 3000 .",
    "dev": "npm run serve"
  }
}
```

(`tailwindcss` and `serve` are `devDependencies`. Run `npm run dev:css` and `npm run serve` in two terminals during development.)

---

## 10. Implementation Milestones

Execute in order. Each milestone should be a working, viewable state (open in a static server).

### M1 — Scaffold & foundations
- `package.json` with the scripts above; install `tailwindcss` + `serve` as devDependencies (npm, not pnpm).
- `tailwind.config.js` (`darkMode: 'class'`, content globs over `**/*.html` + `assets/js/**/*.js`, `@tailwindcss/typography`).
- `assets/css/input.css` with Tailwind directives, CSS-variable tokens, and base component classes (`.container-page`, buttons, tags, `.callout`, etc.). Compile to `assets/css/styles.css`.
- Fonts wired (Inter + JetBrains Mono).
- `partials/header.html` + `partials/footer.html`; `assets/js/partials.js` injecting them via jQuery `$.load()` and marking the active nav item.
- `assets/js/config.js` (`SITE` object) and `assets/js/theme.js`; inline flash-guard script in a shared head snippet.
- Dark-mode toggle working with no flash.
- A placeholder `index.html` that includes header/footer, links the compiled CSS, and shows the hero shell.
- `.github/workflows/ci.yml`: install deps, run `build:css`, run an HTML validation / link check, fail on error.
- Deploy: GitHub Pages via Actions (or Netlify) serving the placeholder homepage.
- **Accept:** deployed URL renders the placeholder home with working header/footer partials; theme toggle works with **no flash**; CI is green.

### M2 — Content pipeline
- `content/projects.json`, `content/posts.json` with 1–2 sample entries; `content/projects/_TEMPLATE.md` + one sample `.md`.
- `lib/frontmatter.js`, `lib/markdown.js` (wraps `marked` + `highlight.js` config), `lib/validate.js`, `lib/reading-time.js`.
- Styled render classes for `.callout`, `.figure`, `.arch-diagram`, `.metrics-row`, `.tech-stack`, and code blocks with a filename header.
- **Accept:** a sample `.md` opened through `detail.html?slug=…` renders all styled elements correctly in light + dark; a malformed manifest logs a clear console error via `validate.js`.

### M3 — Pages
- Homepage sections 1–5 (featured/recent populated from JSON; writing section auto-hides when empty).
- Projects index with URL-synced tag filter; project detail with at-a-glance box + prev/next.
- Writing index + post with TOC/scroll-spy; about; resume (+ print stylesheet); 404.
- **Accept:** every route renders with real/sample content at 375/768/1440px with no horizontal scroll; full keyboard navigation works.

### M4 — SEO, meta & feeds
- Per-page title/description/canonical + OG/Twitter tags; static default OG image.
- `Person` JSON-LD on home; `BlogPosting`/`CreativeWork` on detail pages.
- `scripts/generate-feeds.mjs` producing `sitemap.xml`, `robots.txt`, `rss.xml`; wired into `npm run build` and CI. Node validator mirrors `validate.js` checks.
- **Accept:** `rss.xml` and `sitemap.xml` validate; social-card preview looks correct; rich-results test passes for Person + BlogPosting.

### M5 — Polish & budgets
- Lighthouse pass to meet §8 budgets on the deployed home.
- Headless smoke test in CI (Playwright or Puppeteer): home renders, partials inject, nav works, theme toggle toggles.
- A11y sweep (focus states, skip link, contrast); favicon set; README with screenshot.
- **Accept:** all §8 numbers met on the deployed production URL; CI runs the smoke test green.

### M6 — Real content (human + agent)
- Write homepage/about copy from the positioning statement; port the resume to `/resume.html`; drop the real `resume.pdf` into `/assets`; author the first project case study; publish. No lorem ipsum in production — ship `in-progress` status or omit.

---

## 11. Content Roadmap (post-launch, human-driven)

The site launches credibly with 1 case study and 0–1 posts. Priority order:

1. Case study: flagship project (see [PROJECT_IDEAS.md](./PROJECT_IDEAS.md) — the agent-eval harness).
2. Post: "What I learned evaluating frontier coding agents for 3 years" — the highest-leverage single post for this profile.
3. Case study: fleet telemetry platform (mirrors the Advent work without proprietary data).
4. Case study / write-up: Smurfin retrospective — running a real two-sided marketplace is a great story.
5. Ongoing: ~1 post/month, agent-evaluation and Go/data-engineering topics.

### Future enhancements (out of v1 scope)
- Pretty URLs via host redirects; `/uses` page; per-page dynamic OG images (would need a build step or a hosted service); a Node prerender step for body-text SEO; an "Ask my resume" RAG chatbot (better shipped as its own *project* with a case study than as a site gimmick).

---

## Appendix A — Why the simplified stack

This site intentionally uses no framework. For a content-first personal site, static HTML + a compiled Tailwind stylesheet + a few hundred lines of vanilla JS (with jQuery for partial includes and DOM wiring) is faster to load, trivial to host, has essentially no dependency-maintenance burden, and — critically for a portfolio — is fully legible to anyone who opens the source. The tradeoff accepted is client-side rendering of long-form content bodies (see §7 SEO caveat), which is acceptable because the marketing-critical pages remain fully static and modern crawlers execute JS.
