---
# Frontmatter here is OPTIONAL. The JSON manifest (content/projects.json) is the
# source of truth for list/card metadata. Only add keys here that the body needs.
slug: my-project
---

Open with one or two sentences framing what this is and why it exists. The card
pitch already sold the reader on clicking; this is the elevator paragraph.

<div class="tech-stack">
  <span class="tech-item">Go 1.24</span>
  <span class="tech-item">Docker</span>
  <span class="tech-item">Postgres</span>
</div>

## The Problem

What was broken, slow, or missing? Keep it concrete. A senior reader wants to
know you understood the problem before you reached for a solution.

<div class="callout callout-info">
  <span class="callout-label">Context</span>
  Use info callouts for background a reader needs but that would interrupt the flow.
</div>

## Architecture

Lead with the diagram, then walk through the pieces.

<figure class="arch-diagram">
  <!-- Replace with an Excalidraw SVG export (transparent background). -->
  <img src="/assets/images/projects/my-project/architecture.svg" alt="System architecture diagram" />
  <figcaption>High-level architecture.</figcaption>
</figure>

## Key Technical Decisions

This is the section senior engineers actually read. For each decision, state the
choice, the alternative, and why.

<div class="callout callout-decision">
  <span class="callout-label">Decision</span>
  Chose X over Y because Z. Name the tradeoff you accepted.
</div>

```go:main.go
package main

func main() {
    // Real, readable code beats pseudocode.
}
```

## Challenges & Solutions

The hard part, and how you got through it.

<div class="callout callout-warning">
  <span class="callout-label">Gotcha</span>
  Use warning callouts for sharp edges and things that bit you.
</div>

## Results

<div class="metrics-row">
  <div class="metric"><span class="metric-value">10x</span><span class="metric-label">Throughput</span></div>
  <div class="metric"><span class="metric-value">40ms</span><span class="metric-label">p95 latency</span></div>
  <div class="metric"><span class="metric-value">99.9%</span><span class="metric-label">Uptime</span></div>
</div>

## What I'd Do Differently

Honest reflection reads as senior, not self-critical. Name one or two things.
