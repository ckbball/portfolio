# Project Ideas — Portfolio Build List

Companion to [SPEC.md](./SPEC.md). Goal: go from "no deployed projects" to 2–3 strong, *coherent* portfolio pieces. The theme that ties them together and matches the resume: **"I build and evaluate AI agent systems on production-grade backend infrastructure."**

## Selection principles

- **Depth over count.** Three finished, deployed, written-up projects beat eight repos of half-done code. Recruiters click one, maybe two.
- **Mirror the resume without the proprietary parts.** The Advent work (telemetry ingestion, ML pipelines, device↔dashboard protocol) can't be shown — but a public analog of it can.
- **Exploit the rare skill.** Thousands of people have a todo app with GPT bolted on. Almost nobody has 3 years of professional frontier-coding-agent evaluation. Build in that niche.
- **Every project must be deployable and have a live demo or believable recorded demo.** Fly.io / Railway / Vercel free tiers cover all of these.
- **Each project produces a case study** following the SPEC.md template (problem → architecture → decisions → results).

---

## Tier 1 — Recommended build order

### 1. ⭐ Flagship: **"Gauntlet" — a coding-agent evaluation harness** (open source)

**Pitch:** A CLI + dashboard that runs AI coding agents (Claude Code, etc.) against a suite of versioned coding tasks in sandboxed containers, scores the results across multiple axes, and tracks regressions across model/agent versions.

**Why this one:** It converts the Data Annotation experience ("SxS comparisons across 7 axes") into a public, technical artifact. It's the project only *you* can build credibly, it's timely, and it's the kind of tool AI labs and AI-tooling startups actually want people to have built. Also naturally spawns 2–3 blog posts.

**MVP scope (2–3 weeks):**
- Task format: a directory with a repo snapshot, a task prompt, and a grading script (tests + optional rubric).
- Runner (Go): spins up a Docker container per task, invokes the agent CLI headlessly, captures the full transcript, diff, and test results. Concurrency + timeouts + cost tracking from token usage.
- Scoring: pass/fail from tests + axis scores (correctness, code quality via linters, efficiency, instruction-following) — start with 2 axes, document the methodology honestly.
- Results: JSON/SQLite output + a small Next.js dashboard: runs table, per-task drill-down with transcript viewer, side-by-side comparison of two runs.
- Ship with 10–15 hand-authored tasks (realistic small bugs/features in Go and Python codebases — you can author these well).

**Stretch:** SxS blind-comparison UI, HTML report export, GitHub Action mode, community task contributions.

**Stack:** Go (runner/orchestration), Docker, SQLite→Postgres, Next.js + TypeScript (dashboard), Claude API / agent CLIs.
**Demonstrates:** Go systems design, containerization, concurrency, AI/agent domain expertise, evaluation methodology, full-stack.
**Demo strategy:** Public repo + hosted read-only dashboard with real run data + a 2-min recorded run.

---

### 2. **"Fleetline" — real-time device fleet telemetry & control platform**

**Pitch:** A simulated fleet of 500+ IoT devices (think fuel cells, EV chargers, or solar inverters) streams telemetry over gRPC to a Go ingestion service backed by TimescaleDB; a live dashboard shows fleet health, per-device metrics, anomaly flags, and lets you send control commands back down to devices (two-way protocol).

**Why this one:** It is almost exactly the Advent Technologies job — data protocol design, high-volume ingestion, metrics dashboard — rebuilt in public. The case study can honestly say "modeled on production fuel-cell telemetry systems I built professionally." Interviewers can ask about it and you have real depth to answer with.

**MVP scope (2–3 weeks):**
- Device simulator (Go): N goroutine-based virtual devices with realistic drift/failure injection, streaming protobuf metrics over gRPC.
- Ingestion service (Go): gRPC server → batch writes to TimescaleDB; Prometheus metrics on itself; backpressure handling.
- Simple anomaly detection (Python or Go): threshold + rolling z-score flags, published to a Redis stream.
- Dashboard (Next.js + a chart lib): fleet overview grid, per-device time-series, live updates via WebSocket/SSE, command dispatch (e.g., restart / throttle) with round-trip acknowledgment.
- Load-test writeup: "sustained X events/sec on one small VM" — a real measured number for the case study metrics block.

**Stretch:** Kubernetes deploy with Terraform (exercises resume-listed infra skills), Grafana comparison, LLM-generated fleet-health summaries (ties themes together).

**Stack:** Go, gRPC/protobuf, TimescaleDB (Postgres), Redis, Next.js, Docker, Fly.io.
**Demonstrates:** exactly the resume's backend/data/protocol claims, with measurable performance numbers.
**Demo strategy:** Live hosted dashboard fed by the simulator (cheap — it's all synthetic), architecture diagram front and center.

---

### 3. **"Refbot" — AI pull-request review agent** (GitHub App)

**Pitch:** A GitHub App you can install on a repo; on PR open it clones the branch, builds context (diff + related files + repo conventions), runs a structured multi-pass Claude review (correctness, security, style), and posts inline comments with confidence labels. Includes an eval suite of PRs-with-known-bugs to measure its own catch rate — the eval angle again.

**Why this one:** Small enough to finish, immediately understandable by any engineer ("oh, it reviews PRs"), shows production LLM app skills (webhooks, queueing, prompt design, structured outputs, cost control), and the self-evaluation twist links it to the flagship. Also genuinely useful — you can dogfood it on projects #1 and #2, which makes a great case-study detail.

**MVP scope (1–2 weeks):**
- Go service: GitHub webhook handler → job queue (Redis or in-process worker pool) → context builder → Claude API with structured output (JSON findings) → GitHub review comments via API.
- Config file in target repo (`.refbot.yml`): review focus, ignore paths, max comments.
- Eval set: 15 seeded-bug PRs; report precision/recall in the README.
- Cost/latency instrumentation per review.

**Stretch:** severity-gated "request changes", incremental re-review on push, comparison mode across models.

**Stack:** Go, GitHub App API/webhooks, Claude API, Redis, Fly.io/Railway.
**Demonstrates:** production LLM integration, API/webhook systems, prompt engineering, measurement discipline.
**Demo strategy:** Install it live on your own portfolio repo — reviewers can see its comments on your actual PRs.

---

## Tier 2 — Good alternates / later additions

4. **"Ask my career" RAG chatbot** — embedded on the portfolio site; answers questions about your experience from resume + case studies, with citations and honest "I don't know" behavior. Small (a weekend+), charming, and demonstrates RAG hygiene (chunking, retrieval eval, guardrails). Best done *after* the site exists; write up the retrieval-evaluation part.
5. **Smurfin retrospective (write-up only, no code)** — you ran a real two-sided marketplace with Go/Vue/GCP/K8s. A "post-mortem of a marketplace I built and operated" case study costs days, not weeks, and shows product/ops maturity most engineers lack. Strongly recommended as cheap filler while Tier 1 builds.
6. **Streaming data pipeline on public data** — e.g., GitHub Events firehose or ADS-B aircraft feed → Go consumer → Postgres/ClickHouse → analytics dashboard. Only if you want a second pure-data-eng piece; Fleetline mostly covers this ground.
7. **Distributed job queue in Go** ("build your own Sidekiq" with visibility timeouts, retries, dead-letter, web UI). Classic systems cred, but a crowded genre — only worth it with excellent docs/benchmarks.

## Explicitly avoid

- Generic CRUD apps, todo/notes/weather apps, tutorial-shaped clones.
- "ChatGPT wrapper" chat UIs with no evaluation or systems substance.
- Starting a fourth project before three are deployed and written up.

---

## Suggested sequence (≈8–10 weeks part-time)

| Weeks | Work |
|---|---|
| 1–2 | Portfolio site v1 (SPEC.md M1–M5) + Smurfin retrospective case study so the site launches non-empty |
| 3–5 | Fleetline MVP → deploy → case study #2 (fastest path to a live demo; it's your home turf) |
| 6–8 | Gauntlet MVP → deploy dashboard → flagship case study + first blog post on agent evaluation |
| 9–10 | Refbot MVP, dogfood it on your own repos → case study #4 |

After week 5 you already have: a polished site, two case studies, one live demo. Every week after that compounds.
