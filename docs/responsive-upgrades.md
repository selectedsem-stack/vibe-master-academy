# VMA Responsive Upgrades Roadmap

A short, pragmatic upgrade list applying patterns from the `responsive-design` skill to VMA's plain HTML/CSS stack. Phase 1 is sealed — these are for **Phase 2 onwards** and any new components added to existing lessons.

> **Hard rule (carried over from `feedback_vma_mobile_first`):** Every new HTML pattern ships with matching mobile-responsive CSS in the same commit. The patterns below are the *vocabulary*, not a license to skip the discipline.

---

## 1. Adopt a fluid type scale (replace ad-hoc `clamp()`)

Today `clamp()` lives only on the hero title. Adopt a full scale in `:root` so every heading and body size becomes fluid automatically.

```css
:root {
  --text-xs:   clamp(0.75rem,  0.70rem + 0.25vw, 0.875rem);
  --text-sm:   clamp(0.875rem, 0.80rem + 0.375vw, 1rem);
  --text-base: clamp(1rem,     0.90rem + 0.5vw,  1.125rem);
  --text-lg:   clamp(1.125rem, 1.00rem + 0.625vw, 1.25rem);
  --text-xl:   clamp(1.25rem,  1.00rem + 1.25vw, 1.5rem);
  --text-2xl:  clamp(1.5rem,   1.25rem + 1.25vw, 2rem);
  --text-3xl:  clamp(1.875rem, 1.50rem + 1.875vw, 2.5rem);
  --text-4xl:  clamp(2.25rem,  1.75rem + 2.5vw,  3.5rem);
}
```

**Migration:** add the tokens now. Migrate sections to use them as you touch them in Phase 2.

---

## 2. Container queries for lesson cards

`.lessons-grid` currently uses viewport media queries to collapse from 2 columns to 1 at ≤720px. With container queries, the same card can be reused inside narrower contexts (a sidebar, a callout) and respond to *its container*, not the page.

```css
.lessons-grid { container-type: inline-size; container-name: lessons; }

.lesson-card { /* base, mobile-first */ }

@container lessons (min-width: 540px) {
  .lesson-card { /* row layout: icon + content */ }
}
```

**Where it pays off:** Phase 2+ if Shai embeds mini-cards inside a sidebar or modal.

---

## 3. Use `100dvh` instead of `100vh` for full-height elements

Mobile Safari's address bar makes `100vh` overflow. Replace with `100dvh` in:

- The mobile menu overlay (if/when it covers viewport)
- Any future modal that targets full screen
- Hero sections that intentionally fill viewport

```css
.menu-overlay {
  min-height: 100dvh; /* shrinks with browser chrome */
}
```

Safe to ship today — `dvh` is supported in all current browsers (since 2022).

---

## 4. Mobile-first cascade for new components

VMA's existing cascade is **desktop-first** (`@media (max-width: 720px)` overrides). That's fine for Phase 1 — don't rewrite. But for new components going forward, prefer mobile-first:

```css
.new-component { /* mobile defaults */ }

@media (min-width: 720px) { /* tablet+ enhancements */ }
@media (min-width: 1024px) { /* desktop+ enhancements */ }
```

**Reason:** mobile-first matches how Shai studies (Mac with browser narrowed + phone) and keeps the "mobile is the baseline, not an afterthought" mindset enforced.

---

## 5. Responsive tables — card fallback at ≤480px

Today tables overflow horizontally on mobile. Acceptable, but the skill's card-fallback pattern reads better for instructional content (where columns are key:value).

```css
@media (max-width: 480px) {
  .lesson-table { display: none; }
  .lesson-table-cards { display: grid; gap: var(--space-3); }
}
```

Requires authoring both views; only worth doing for tables with >3 columns.

---

## 6. Logical properties for RTL-readiness

Even though VMA is Hebrew-content + LTR code, prefer logical properties so future RTL switches are painless:

```css
/* Instead of */
margin-left: 1rem;
padding-right: 0.5rem;

/* Use */
margin-inline-start: 1rem;
padding-inline-end: 0.5rem;
```

Adopt incrementally — no rewrite needed.

---

## What we are NOT changing in Phase 1

- The existing `max-width` breakpoint cascade in `styles.css` (Batches A–L). It works, Shai starts studying tomorrow, no value in churning.
- The 1024/720/480 breakpoint values. These match VMA content well.
- The "Batch M/N/..." commenting convention. Keep using it for new responsive blocks.

---

## Reference

Full responsive patterns library: `~/.claude/skills/responsive-design/SKILL.md`
