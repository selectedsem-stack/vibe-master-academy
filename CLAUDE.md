# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project context

**Vibe Master Academy** is a personal Hebrew RTL learning portal for **Shai Berdugo** (Head of SEO at Selected). It is a 32-week curriculum (2026-05-21 → 2026-12-31) that takes him from "vibe coder" to Solution Architect — Python + n8n + AI APIs + multi-agent systems. The full design rationale lives in `docs/superpowers/specs/2026-05-21-vibe-master-academy-design.md` and the original bootstrap plan in `docs/superpowers/plans/2026-05-21-vma-bootstrap.md`.

**Status:** Phase 1 (Foundations Sprint, 4 lessons, ~20 hours) is fully built, pedagogically reviewed, and live. Phases 2–5 are locked stubs.

## Tech stack and deployment

- **No build step.** Plain HTML + CSS + vanilla JS, served as static files by GitHub Pages from repo root.
- **GitHub Pages constraint:** Pages serves from `/(root)` or `/docs` only — never an arbitrary subfolder. That is why the portal HTML lives at root (`index.html`, `phase-N/`, `assets/`) and internal artifacts (`lessons/`, `docs/`, `exercises/`) sit in subfolders.
- **Live URL:** `https://selectedsem-stack.github.io/vibe-master-academy/`
- **Fonts:** Heebo, Rubik, Assistant, JetBrains Mono — loaded via `@import` in `assets/css/styles.css`.

## Common operations

There is no test suite, build, lint, or package manager. The workflow is:

```bash
# Edit files locally, then:
git add -A
git commit -m "..."
git push                       # GitHub Pages auto-deploys in ~1–2 min
```

After CSS/JS changes, **bump the cache-bust version** so browsers refetch:

```bash
# Replace v=20260521-N with N+1 across all HTML files
sed -i 's/?v=20260521-OLD/?v=20260521-NEW/g' *.html phase-*/index.html phase-1/lesson-*.html
```

The version param is on every `<link href="...?v=...">` and `<script src="...?v=...">` reference.

## Architecture — the lesson pattern

Every lesson page (`phase-1/lesson-NN.html`) follows the same canonical structure, established by `phase-1/lesson-01.html`. To add a new lesson, copy that file as a template. Key blocks:

1. `<div class="reading-progress">` — fixed top progress bar, fills on scroll (JS-driven).
2. `<header class="site-header">` — sticky, glassmorphism, brand + nav. JS adds a hamburger toggle on ≤720px viewports.
3. `<nav class="breadcrumbs">` — `בית › Phase N › Lesson title`.
4. `<section class="lesson-hero">` — 3 badges (phase/time/level), gradient H1, intro, `objectives` card, topic chips.
5. `<nav class="lesson-toc">` — sticky pill bar, JS highlights active section on scroll via `IntersectionObserver`.
6. `<section class="lesson-section" id="part-N">` × 5 — each with numbered gradient badge, title, time pill, code blocks, callouts, section-complete button.
7. Decorative `<div class="section-divider">` before checkpoint.
8. Checkpoint card with `<ul>` of `<li data-id="wN-...">` items — clicked items persist to `localStorage`.
9. `<div class="lesson-footer">` — prev + next buttons.

## Architecture — interactive components

All interactive behavior lives in `assets/js/app.js` (single file, IIFE, no framework). On `DOMContentLoaded` it runs:

- `highlightNav()` — bolds current nav link based on URL.
- `setupChecklist()` — persists `.checklist li[data-id]` toggles to `localStorage` under `vma-check-<id>`.
- `setupTooltips()` — `<span class="term" data-term-id="X">` shows a popover with content from the in-file `GLOSSARY` object. Tooltip links to `glossary.html#X`.
- `setupCopyButtons()` — `.code-block__copy` copies the inner `<code>` text via `navigator.clipboard`.
- `setupSectionComplete()` — `.section-complete-btn[data-section]` persists to `localStorage` and marks the corresponding TOC item.
- `setupActiveToc()` — `IntersectionObserver` highlights TOC item for the section currently in view.
- `setupReadingProgress()` — scroll listener that updates `.reading-progress__fill` width.
- `setupBackToTop()` — injects a floating "↑" button that appears after scrollY > 600.
- `setupMobileMenu()` — dynamically injects a hamburger toggle into `.site-header__inner` with proper ARIA.
- `setupGlossary()` — only active when `.glossary-grid` exists. Live search + category filter.

## Architecture — glossary system (two sources of truth)

Glossary terms exist in **two places that must stay in sync**:

1. **`glossary.html`** — full term cards inside `.glossary-grid` with `id="<term-id>"`, `data-category="..."`, colored category badge, term name, English label, definition.
2. **`assets/js/app.js`** — the `GLOSSARY = { ... }` const at top of file. Used by the inline tooltip system in lessons.

When adding a term, update **both** places. When the glossary card count changes, update the `<span class="glossary-search__count">N מושגים</span>` in `glossary.html`.

## Critical CSS scoping rule — the `.term` trap

`.term` is used in **two completely different ways**:

- **Inline in lessons:** `<span class="term" data-term-id="...">Python</span>` — a small inline tooltip trigger with a dotted underline.
- **Card in glossary:** `<div class="term" id="...">` — a full-size card with padding, border, shadow.

The card styles **must be scoped** as `.glossary-grid .term { ... }` to avoid breaking the inline form. The JS uses `.glossary-grid .term` for the same reason. If a term tooltip suddenly renders as a giant card mid-paragraph, this is the bug — re-scope.

## Content sync — markdown ↔ HTML

Each Phase 1 lesson exists in two files that should mirror each other:

- `lessons/phase-1/lesson-NN-*.md` — Hebrew markdown source (backup, easier to grep)
- `phase-1/lesson-NN.html` — the live interactive lesson served by Pages

When editing lesson content, update **both**. Code fences in markdown must use real triple backticks; the HTML uses `<div class="code-block">` wrappers with filename header and copy button.

## Hebrew RTL conventions

- All pages declare `<html lang="he" dir="rtl">`.
- Use Hebrew masculine grammar (the user is male).
- Code blocks force `direction: ltr` and `text-align: left` — keep code untouched.
- Inline `<code>` also forces LTR via CSS.
- Borders/accents use logical properties where possible; the `.callout` accent is `border-right` (visually the start side in RTL).

## Pedagogical conventions (Phase 1)

The 4 lessons were reviewed at "Level B" (true beginner-friendly). When adding or editing lessons, preserve these patterns:

- **Refresher box** at the top of each part referencing what was learned previously.
- **Progressive hints** — never reveal the full solution in a hint. Hint 1 = nudge to think, Hint 2 = explain the concept, Hint 3 = the technique (but not the whole answer). Solution sits in `<details class="solution">`.
- **Explain a tool before using it.** If an exercise uses `lambda`, the explanation must appear in the same lesson before the exercise. Same for `f-strings`, `try/except`, environment variables.
- **Section-complete buttons** at the end of each part, with `data-section="part-N"`.
- **6–8 item checkpoint** at the end with `data-id="wN-..."` for localStorage persistence.

## Two-machine workflow

Work alternates between:
- **Windows work machine** (via RDP) — where Claude Code currently runs.
- **Mac personal** — where Shai actually studies and runs lessons.

The sync is **Git on GitHub** — never file-level sync (Dropbox/iCloud break venv and `.git`). Mac instructions live in `docs/mac-sync.md`. The repo is public; sensitive notes go under `notes/private/` which is in `.gitignore`.

## File map (where to look)

| Path | What it is |
|------|------------|
| `index.html` | Portal home — hero, stats strip, CTA, 5 phase cards |
| `glossary.html` | Searchable, filterable term cards (46 terms in 5 categories) |
| `phase-N/index.html` | Phase landing page — overview + lesson cards (phase-1 active, 2-5 locked stubs) |
| `phase-1/lesson-NN.html` | The canonical interactive lesson — copy as template for new lessons |
| `assets/css/styles.css` | One stylesheet, ~2500 lines, organized in section comment blocks |
| `assets/js/app.js` | One JS file, single IIFE, all interactive features + GLOSSARY object |
| `lessons/phase-N/*.md` | Markdown source for each lesson (sync with HTML) |
| `docs/superpowers/specs/` | The curriculum design spec (32-week plan) |
| `docs/superpowers/plans/` | The original bootstrap implementation plan |
| `docs/mac-sync.md` | How Shai pulls/pushes between Mac and the repo |
| `PROGRESS.md` | Weekly progress tracker — Shai fills this in as he studies |
| `exercises/lesson-NN/` | Sample data files and exercise scaffolding |
