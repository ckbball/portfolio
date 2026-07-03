Gauntlet is an open-source harness for running AI coding agents against a suite
of versioned, sandboxed tasks and scoring their output across multiple axes. It
grew out of three years of doing this evaluation by hand — the goal is to make
agent comparison reproducible instead of anecdotal.

<div class="tech-stack">
  <span class="tech-item">Go 1.24</span>
  <span class="tech-item">Docker</span>
  <span class="tech-item">SQLite</span>
  <span class="tech-item">Next.js</span>
  <span class="tech-item">Claude API</span>
</div>

## The Problem

Everyone has an opinion about which coding agent is "best," but almost nobody
measures it repeatably. Runs are one-off, prompts drift, and results live in
screenshots. When a new model ships, there's no button to press that tells you
whether it regressed on the tasks you care about.

<div class="callout callout-info">
  <span class="callout-label">Context</span>
  In my consulting work I ran side-by-side comparisons across seven axes by hand.
  Gauntlet is the tool I wished I'd had — the manual methodology, made executable.
</div>

## Architecture

Each task is a directory: a repo snapshot, a prompt, and a grading script. The
runner spins up one Docker container per task, invokes the agent headlessly,
captures the transcript and diff, runs the grader, and writes results to SQLite.
A small dashboard reads that database.

<figure class="arch-diagram">
  <svg viewBox="0 0 640 140" role="img" aria-label="Pipeline: task suite to runner to scorer to dashboard" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" stroke="currentColor" stroke-width="1.5">
      <rect x="8" y="45" width="120" height="50" rx="8" />
      <rect x="184" y="45" width="120" height="50" rx="8" />
      <rect x="360" y="45" width="120" height="50" rx="8" />
      <rect x="512" y="45" width="120" height="50" rx="8" />
      <path d="M128 70 H184 M304 70 H360 M480 70 H512" />
      <path d="M176 70 l-8 -4 v8 z M352 70 l-8 -4 v8 z M504 70 l-8 -4 v8 z" fill="currentColor" stroke="none" />
    </g>
    <g fill="currentColor" font-family="ui-monospace, monospace" font-size="12" text-anchor="middle">
      <text x="68" y="74">Task suite</text>
      <text x="244" y="66">Runner</text>
      <text x="244" y="82">(Docker)</text>
      <text x="420" y="74">Scorer</text>
      <text x="572" y="74">Dashboard</text>
    </g>
  </svg>
  <figcaption>Task suite → sandboxed runner → multi-axis scorer → dashboard.</figcaption>
</figure>

The runner is the interesting part: it manages a pool of containers with strict
timeouts and per-run cost tracking derived from token usage.

```go:runner/run.go
func (r *Runner) Execute(ctx context.Context, task Task) (Result, error) {
    ctx, cancel := context.WithTimeout(ctx, r.timeout)
    defer cancel()

    container, err := r.docker.Start(ctx, task.Image)
    if err != nil {
        return Result{}, fmt.Errorf("start sandbox: %w", err)
    }
    defer container.Remove(ctx)

    transcript, err := r.agent.Run(ctx, container, task.Prompt)
    if err != nil {
        return Result{}, fmt.Errorf("agent run: %w", err)
    }
    return r.grader.Score(ctx, container, transcript)
}
```

## Key Technical Decisions

<div class="callout callout-decision">
  <span class="callout-label">Decision</span>
  Go over Python for the orchestrator. The workload is concurrent process and
  container management with hard timeouts — Go's goroutines and <code>context</code>
  cancellation model that cleanly, and a single static binary is trivial to run in CI.
</div>

<div class="callout callout-decision">
  <span class="callout-label">Decision</span>
  SQLite over Postgres for v1. Results are append-mostly and single-writer; a file
  I can commit alongside a run is more portable than a server I have to host. The
  schema is written so a swap to Postgres later is mechanical.
</div>

## Challenges & Solutions

<div class="callout callout-warning">
  <span class="callout-label">Gotcha</span>
  Non-determinism makes "did it pass?" harder than it looks. The same agent on the
  same task can succeed once and fail the next run. Gauntlet runs each task N times
  and reports a pass rate with variance, not a single boolean.
</div>

## Results

<div class="metrics-row">
  <div class="metric"><span class="metric-value">15</span><span class="metric-label">Tasks in suite</span></div>
  <div class="metric"><span class="metric-value">4</span><span class="metric-label">Scoring axes</span></div>
  <div class="metric"><span class="metric-value">8</span><span class="metric-label">Parallel runners</span></div>
</div>

## What I'd Do Differently

Start the scoring rubric even simpler. I spent early effort on four axes when
pass/fail plus a code-quality lint would have been enough to find real
regressions — the extra axes only mattered once the basics were solid.
