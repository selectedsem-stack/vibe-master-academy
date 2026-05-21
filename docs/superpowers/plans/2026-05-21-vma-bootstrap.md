# Vibe Master Academy — Bootstrap Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bootstrap the Vibe Master Academy course environment — folder structure, learning portal (RTL Hebrew, hosted on GitHub Pages), GitHub repository, and Lesson 1 (Setup) — so Shai can begin studying immediately upon completion.

**Architecture:** Static HTML portal with vanilla JS (no build step, no framework — beginner-readable). Hebrew RTL with Heebo font, purple accent matching Selected brand. Portal files at repo root (GitHub Pages constraint). Internal artifacts (lessons source, project code, docs) in subfolders. Two-machine workflow: Windows for now (Claude Code), Mac will clone from GitHub later.

**Tech Stack:** HTML5, CSS3 (vanilla, RTL), Vanilla JavaScript, Markdown for lesson source, Git, GitHub Pages.

---

## File Structure (after Bootstrap)

```
vibe-master-academy/
├── README.md                       Project intro + navigation (Hebrew)
├── PROGRESS.md                     Weekly progress tracker (Hebrew)
├── .gitignore                      Python/Node/OS/secrets
│
├── index.html                      ← Portal home (served by Pages)
├── glossary.html                   Hebrew glossary
├── phase-1/
│   ├── index.html                  Phase 1 overview
│   ├── lesson-01.html              Lesson 1 page
│   ├── lesson-02.html              Stub
│   ├── lesson-03.html              Stub
│   └── lesson-04.html              Stub
├── phase-2/index.html              "Unlocks after Phase 1" stub
├── phase-3/index.html              Stub
├── phase-4/index.html              Stub
├── phase-5/index.html              Stub
│
├── assets/
│   ├── css/
│   │   └── styles.css              Global RTL Hebrew styles
│   ├── js/
│   │   └── app.js                  Nav highlight, progress UI
│   └── images/
│       └── (placeholders)
│
├── lessons/                        Markdown source (internal)
│   └── phase-1/
│       └── lesson-01-setup.md      Lesson 1 Setup in Hebrew
│
├── projects/                       Code projects (internal, future)
├── exercises/                      Exercise files (internal, future)
├── notes/                          Personal notes (internal, future)
│
└── docs/
    └── superpowers/
        ├── specs/2026-05-21-vibe-master-academy-design.md  (exists)
        └── plans/2026-05-21-vma-bootstrap.md               (this file)
```

---

## Task 1: Create folder structure

**Files:**
- Create: directory tree as listed above (no files yet, just folders)

- [ ] **Step 1: Create all folders**

Run from `c:\Users\SEMSELECTED\projects\vibe-master-academy\`:

```bash
mkdir -p phase-1 phase-2 phase-3 phase-4 phase-5 \
         assets/css assets/js assets/images \
         lessons/phase-1 lessons/phase-2 lessons/phase-3 lessons/phase-4 lessons/phase-5 \
         projects exercises notes
```

- [ ] **Step 2: Verify the tree**

Run: `tree /F /A` (Windows) or visual inspection with `dir`

Expected: All folders present, no files yet (except the pre-existing spec + this plan in `docs/`).

---

## Task 2: Foundation files (README, PROGRESS, .gitignore)

**Files:**
- Create: `README.md`
- Create: `PROGRESS.md`
- Create: `.gitignore`

- [ ] **Step 1: Write README.md**

Content (Hebrew, RTL-friendly markdown):

```markdown
# Vibe Master Academy 🎓

מסע אישי של 32 שבועות (21 במאי 2026 → 31 בדצמבר 2026) להפיכה ל-**Solution Architect** — מומחה בבניית מערכות AI/אוטומציה בעולם האמיתי.

## מה כלול בקורס?

- **5 פאזות** של ~140 שעות לימוד
- **4 פרויקטים אמיתיים** בפורטפוליו
- **פורטל לימודי** באתר (גישה מכל מקום)
- **חומרי לימוד בעברית** + מקורות מצורפים באנגלית

## ניווט מהיר

| מסמך | מה זה |
|------|--------|
| [פורטל הלימודי](https://shai-vma.pages.dev) | האתר הראשי — שיעורים, שבועות, מעקב |
| [Spec הקורס](docs/superpowers/specs/2026-05-21-vibe-master-academy-design.md) | תכנון מלא של 5 הפאזות |
| [Bootstrap Plan](docs/superpowers/plans/2026-05-21-vma-bootstrap.md) | תוכנית ההקמה |
| [PROGRESS.md](PROGRESS.md) | מעקב התקדמות שבועי |

## איך מתחילים?

1. פתח את **index.html** בדפדפן (או את ה-URL של GitHub Pages)
2. עבור אל **Phase 1 — Lesson 1**
3. עקוב אחר ההוראות בשיעור

## פרויקטים בקורס

| # | פרויקט | פאזה |
|---|--------|------|
| 1 | Music Radar (n8n + Claude) | Phase 2 |
| 2 | AI Booking Agency (multi-agent) | Phase 3 |
| 3 | Master Project (TBD) | Phase 4 |
| - | Portal עצמו | רץ במקביל |

## רישיון

פרטי — לשימוש אישי של Shai Berdugo.
```

- [ ] **Step 2: Write PROGRESS.md template**

```markdown
# Progress Tracker

מסמך זה מעודכן בסוף כל שבוע. רק עובדות, לא רגשות.

## Phase 1 — Foundations Sprint

### Lesson 1 — Python יום ראשון (תאריכים: ___ - ___)
- [ ] Setup הושלם
- [ ] Concepts הושלם
- [ ] Practice הושלם
- [ ] Review הושלם
- **שעות בפועל:** ___
- **קושי (1-5):** ___
- **הערות:** ___

### Lesson 2 — מבני נתונים + JSON (תאריכים: ___ - ___)
- [ ] Lists & Dicts
- [ ] Functions
- [ ] JSON
- [ ] Practice
- [ ] Review
- **שעות בפועל:** ___
- **קושי (1-5):** ___
- **הערות:** ___

### Lesson 3 — APIs + Git + Errors (תאריכים: ___ - ___)
- [ ] HTTP/APIs
- [ ] requests in Python
- [ ] Error handling
- [ ] Git workflow
- [ ] Review
- **שעות בפועל:** ___
- **קושי (1-5):** ___
- **הערות:** ___

### Lesson 4 — n8n + Portal Setup (תאריכים: ___ - ___)
- [ ] n8n intro
- [ ] Install + Hello
- [ ] n8n + Claude
- [ ] Portal עדכון
- **שעות בפועל:** ___
- **קושי (1-5):** ___
- **הערות:** ___

### Phase 1 Checkpoint
- [ ] Demo
- [ ] Q&A
- [ ] Adjustment (אם נדרש)

---

## Phase 2 — Music Radar
*ימולא כשנגיע*

## Phase 3 — AI Booking Agency
*ימולא כשנגיע*

## Phase 4 — Master Project
*ימולא כשנגיע*

## Phase 5 — Mastery & Polish
*ימולא כשנגיע*
```

- [ ] **Step 3: Write .gitignore**

```gitignore
# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
.venv/
venv/
env/
*.egg-info/
.pytest_cache/

# Node
node_modules/
npm-debug.log
yarn-debug.log

# Environment & secrets
.env
.env.*
!.env.example
*.pem
*.key
secrets/

# OS
.DS_Store
Thumbs.db
desktop.ini
*.swp
*.swo
*~

# Editor
.vscode/
.idea/
*.sublime-workspace
*.sublime-project

# Project-specific
notes/private/
*.log
.cache/

# Keep these
!docs/
!lessons/
!exercises/
!projects/
```

- [ ] **Step 4: Verify files exist**

Run: `ls README.md PROGRESS.md .gitignore`
Expected: All three listed.

---

## Task 3: CSS framework (RTL Hebrew styles)

**Files:**
- Create: `assets/css/styles.css`

- [ ] **Step 1: Write the full stylesheet**

```css
/* ============================================
   Vibe Master Academy — Global Styles
   RTL Hebrew, clean modern design
   ============================================ */

:root {
  /* Palette — purple primary (Selected brand inspired) */
  --color-bg: #fafafa;
  --color-bg-card: #ffffff;
  --color-text: #1a1a1a;
  --color-text-soft: #6b7280;
  --color-text-muted: #9ca3af;
  --color-primary: #8b5cf6;
  --color-primary-hover: #7c3aed;
  --color-primary-soft: #ede9fe;
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-danger: #ef4444;
  --color-border: #e5e7eb;
  --color-border-strong: #d1d5db;

  /* Typography */
  --font-body: 'Heebo', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;

  /* Spacing */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;
  --space-16: 4rem;

  /* Radii */
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
}

@import url('https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 16px;
  scroll-behavior: smooth;
}

body {
  direction: rtl;
  font-family: var(--font-body);
  font-size: 1rem;
  line-height: 1.7;
  color: var(--color-text);
  background: var(--color-bg);
  min-height: 100vh;
}

/* === Layout === */
.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 var(--space-6);
}

.site-header {
  background: var(--color-bg-card);
  border-bottom: 1px solid var(--color-border);
  padding: var(--space-4) 0;
  position: sticky;
  top: 0;
  z-index: 10;
}

.site-header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  text-decoration: none;
  color: var(--color-text);
}

.brand__logo {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-md);
  background: linear-gradient(135deg, var(--color-primary), #c084fc);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 800;
  font-size: 1.1rem;
}

.brand__name {
  font-weight: 700;
  font-size: 1.1rem;
}

.site-nav {
  display: flex;
  gap: var(--space-6);
}

.site-nav a {
  color: var(--color-text-soft);
  text-decoration: none;
  font-weight: 500;
  transition: color 150ms;
}

.site-nav a:hover,
.site-nav a.active {
  color: var(--color-primary);
}

/* === Typography === */
h1, h2, h3, h4 {
  font-weight: 700;
  line-height: 1.3;
  margin-bottom: var(--space-4);
}

h1 { font-size: 2.25rem; }
h2 { font-size: 1.75rem; margin-top: var(--space-8); }
h3 { font-size: 1.35rem; margin-top: var(--space-6); }
h4 { font-size: 1.1rem; margin-top: var(--space-4); }

p {
  margin-bottom: var(--space-4);
}

a {
  color: var(--color-primary);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

code {
  font-family: var(--font-mono);
  font-size: 0.9em;
  background: var(--color-primary-soft);
  padding: 0.15rem 0.4rem;
  border-radius: var(--radius-sm);
  direction: ltr;
  display: inline-block;
}

pre {
  background: #1e1e2e;
  color: #f5f5f5;
  padding: var(--space-4);
  border-radius: var(--radius-md);
  overflow-x: auto;
  margin: var(--space-4) 0;
  direction: ltr;
  text-align: left;
}

pre code {
  background: transparent;
  color: inherit;
  padding: 0;
}

/* === Hero === */
.hero {
  padding: var(--space-12) 0 var(--space-8);
  text-align: center;
}

.hero__title {
  font-size: 2.75rem;
  margin-bottom: var(--space-4);
  background: linear-gradient(135deg, var(--color-primary), #c084fc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero__subtitle {
  font-size: 1.15rem;
  color: var(--color-text-soft);
  max-width: 600px;
  margin: 0 auto;
}

/* === Progress bar === */
.progress {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  margin: var(--space-8) 0;
}

.progress__label {
  display: flex;
  justify-content: space-between;
  font-weight: 500;
  margin-bottom: var(--space-3);
  color: var(--color-text-soft);
}

.progress__bar {
  height: 8px;
  background: var(--color-border);
  border-radius: var(--radius-sm);
  overflow: hidden;
}

.progress__fill {
  height: 100%;
  background: linear-gradient(90deg, var(--color-primary), #a78bfa);
  border-radius: var(--radius-sm);
  transition: width 600ms;
}

/* === Phase grid === */
.phases {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-6);
  margin: var(--space-8) 0;
}

.phase-card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  transition: all 200ms;
  text-decoration: none;
  color: var(--color-text);
  display: block;
}

.phase-card:hover {
  border-color: var(--color-primary);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  text-decoration: none;
}

.phase-card__number {
  display: inline-block;
  background: var(--color-primary-soft);
  color: var(--color-primary);
  font-weight: 700;
  font-size: 0.85rem;
  padding: 0.2rem 0.7rem;
  border-radius: var(--radius-sm);
  margin-bottom: var(--space-3);
}

.phase-card__title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: var(--space-2);
}

.phase-card__meta {
  color: var(--color-text-soft);
  font-size: 0.9rem;
  margin-bottom: var(--space-3);
}

.phase-card__desc {
  color: var(--color-text-soft);
  font-size: 0.95rem;
}

.phase-card--locked {
  opacity: 0.55;
  pointer-events: none;
}

.phase-card--locked .phase-card__number {
  background: var(--color-border);
  color: var(--color-text-muted);
}

.phase-card__status {
  display: inline-block;
  font-size: 0.8rem;
  font-weight: 500;
  padding: 0.15rem 0.6rem;
  border-radius: var(--radius-sm);
  margin-top: var(--space-3);
}

.phase-card__status--active {
  background: #d1fae5;
  color: #065f46;
}

.phase-card__status--locked {
  background: var(--color-border);
  color: var(--color-text-muted);
}

/* === Week grid (inside phase pages) === */
.weeks {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: var(--space-4);
  margin: var(--space-6) 0;
}

.week-card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-4);
  text-decoration: none;
  color: var(--color-text);
  transition: all 200ms;
}

.week-card:hover {
  border-color: var(--color-primary);
  text-decoration: none;
}

.week-card__num {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: var(--space-1);
}

.week-card__title {
  font-weight: 600;
  margin-bottom: var(--space-2);
}

.week-card__hours {
  font-size: 0.85rem;
  color: var(--color-text-soft);
}

/* === Lesson content === */
.lesson {
  max-width: 760px;
  margin: 0 auto;
  padding: var(--space-8) 0;
}

.lesson__meta {
  color: var(--color-text-soft);
  font-size: 0.9rem;
  margin-bottom: var(--space-2);
}

.lesson__title {
  font-size: 2.25rem;
  margin-bottom: var(--space-3);
}

.lesson__intro {
  font-size: 1.1rem;
  color: var(--color-text-soft);
  margin-bottom: var(--space-8);
}

.checklist {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-4) var(--space-6);
  margin: var(--space-6) 0;
}

.checklist__title {
  font-weight: 600;
  margin-bottom: var(--space-3);
}

.checklist ul {
  list-style: none;
  padding: 0;
}

.checklist li {
  padding: var(--space-2) 0;
  display: flex;
  align-items: start;
  gap: var(--space-2);
}

.checklist li::before {
  content: '☐';
  font-size: 1.2rem;
  color: var(--color-text-muted);
  margin-left: var(--space-2);
}

.callout {
  border-right: 4px solid var(--color-primary);
  background: var(--color-primary-soft);
  padding: var(--space-4) var(--space-6);
  border-radius: var(--radius-md);
  margin: var(--space-6) 0;
}

.callout--warning {
  border-color: var(--color-warning);
  background: #fef3c7;
}

.callout__title {
  font-weight: 600;
  margin-bottom: var(--space-2);
}

/* === Footer === */
.site-footer {
  margin-top: var(--space-16);
  padding: var(--space-8) 0;
  background: var(--color-bg-card);
  border-top: 1px solid var(--color-border);
  text-align: center;
  color: var(--color-text-soft);
  font-size: 0.9rem;
}

/* === Responsive === */
@media (max-width: 700px) {
  .hero__title { font-size: 2rem; }
  h1 { font-size: 1.75rem; }
  .site-nav { gap: var(--space-3); font-size: 0.9rem; }
  .container { padding: 0 var(--space-4); }
}
```

- [ ] **Step 2: Verify**

Run: `ls assets/css/styles.css`
Expected: file exists, ~12KB.

---

## Task 4: JavaScript helper

**Files:**
- Create: `assets/js/app.js`

- [ ] **Step 1: Write app.js**

```javascript
// Vibe Master Academy — minimal JS for nav highlighting + progress sync

(function () {
  'use strict';

  // Highlight current nav item based on URL
  function highlightNav() {
    const links = document.querySelectorAll('.site-nav a');
    const path = window.location.pathname;
    links.forEach(link => {
      const href = link.getAttribute('href');
      if (path.endsWith(href) || (href === '/' && path === '/')) {
        link.classList.add('active');
      }
    });
  }

  // Progress bar fill (data-driven from data attribute)
  function fillProgress() {
    const bars = document.querySelectorAll('.progress__fill');
    bars.forEach(bar => {
      const pct = bar.dataset.pct || 0;
      bar.style.width = pct + '%';
    });
  }

  // Checklist persistence via localStorage
  function setupChecklist() {
    const items = document.querySelectorAll('.checklist li[data-id]');
    items.forEach(item => {
      const id = item.dataset.id;
      const storageKey = 'vma-check-' + id;
      if (localStorage.getItem(storageKey) === '1') {
        item.classList.add('checked');
      }
      item.addEventListener('click', () => {
        item.classList.toggle('checked');
        localStorage.setItem(
          storageKey,
          item.classList.contains('checked') ? '1' : '0'
        );
      });
    });
  }

  // Init
  document.addEventListener('DOMContentLoaded', () => {
    highlightNav();
    fillProgress();
    setupChecklist();
  });
})();
```

- [ ] **Step 2: Add checklist style for `.checked` state**

Append to `assets/css/styles.css`:

```css
.checklist li {
  cursor: pointer;
  user-select: none;
}

.checklist li.checked::before {
  content: '☑';
  color: var(--color-success);
}

.checklist li.checked {
  text-decoration: line-through;
  color: var(--color-text-muted);
}
```

- [ ] **Step 3: Verify**

Run: `ls assets/js/app.js`
Expected: file exists.

---

## Task 5: Home page (index.html — the dashboard)

**Files:**
- Create: `index.html`

- [ ] **Step 1: Write the home page**

```html
<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vibe Master Academy — מסע 32 שבועות</title>
  <link rel="stylesheet" href="assets/css/styles.css">
</head>
<body>

  <header class="site-header">
    <div class="container site-header__inner">
      <a href="index.html" class="brand">
        <div class="brand__logo">V</div>
        <div class="brand__name">Vibe Master Academy</div>
      </a>
      <nav class="site-nav">
        <a href="index.html">בית</a>
        <a href="phase-1/index.html">Phase 1</a>
        <a href="glossary.html">מילון</a>
      </nav>
    </div>
  </header>

  <main class="container">
    <section class="hero">
      <h1 class="hero__title">Vibe Master Academy</h1>
      <p class="hero__subtitle">
        מסע 32 שבועות (21.5.2026 → 31.12.2026) להפיכה ל-Solution Architect — בונה מערכות AI ואוטומציה אמיתיות.
      </p>
    </section>

    <section class="progress">
      <div class="progress__label">
        <span>התקדמות כללית</span>
        <span><strong>0</strong> / 32 שבועות</span>
      </div>
      <div class="progress__bar">
        <div class="progress__fill" data-pct="0"></div>
      </div>
    </section>

    <h2>הפאזות</h2>
    <section class="phases">

      <a href="phase-1/index.html" class="phase-card">
        <div class="phase-card__number">Phase 1</div>
        <h3 class="phase-card__title">Foundations Sprint</h3>
        <div class="phase-card__meta">שבועות 1–4 · 20 שעות</div>
        <p class="phase-card__desc">יסודות חיים — Python ראשון, JSON/APIs, Git, n8n hello world.</p>
        <span class="phase-card__status phase-card__status--active">פעיל</span>
      </a>

      <a class="phase-card phase-card--locked">
        <div class="phase-card__number">Phase 2</div>
        <h3 class="phase-card__title">Music Radar</h3>
        <div class="phase-card__meta">שבועות 5–10 · 30 שעות</div>
        <p class="phase-card__desc">פרויקט ראשון — n8n + Claude סורקים מוזיקה אלקטרונית.</p>
        <span class="phase-card__status phase-card__status--locked">ננעל עד השלמת Phase 1</span>
      </a>

      <a class="phase-card phase-card--locked">
        <div class="phase-card__number">Phase 3</div>
        <h3 class="phase-card__title">AI Booking Agency</h3>
        <div class="phase-card__meta">שבועות 11–20 · 50 שעות</div>
        <p class="phase-card__desc">הפרויקט הדגל — מערכת רב-סוכנים שמיירטת DJs.</p>
        <span class="phase-card__status phase-card__status--locked">ננעל</span>
      </a>

      <a class="phase-card phase-card--locked">
        <div class="phase-card__number">Phase 4</div>
        <h3 class="phase-card__title">Master Project</h3>
        <div class="phase-card__meta">שבועות 21–28 · 35 שעות</div>
        <p class="phase-card__desc">פרויקט הגביע — נבחר בשבוע 18.</p>
        <span class="phase-card__status phase-card__status--locked">ננעל</span>
      </a>

      <a class="phase-card phase-card--locked">
        <div class="phase-card__number">Phase 5</div>
        <h3 class="phase-card__title">Mastery & Polish</h3>
        <div class="phase-card__meta">שבועות 29–32 · 10 שעות</div>
        <p class="phase-card__desc">Refactor, deploy, תיעוד, graduation.</p>
        <span class="phase-card__status phase-card__status--locked">ננעל</span>
      </a>

    </section>

    <h2>איפה אני עכשיו?</h2>
    <div class="callout">
      <div class="callout__title">השבוע: לפני יום 1</div>
      <p>סיימת את אפיון הקורס וההקמה. ההמלצה — קרא את ה-<a href="phase-1/week-01.html">שיעור הראשון</a> ותעבור עליו.</p>
    </div>

  </main>

  <footer class="site-footer">
    <div class="container">
      <p>Vibe Master Academy · נוצר במאי 2026 על ידי Shai Berdugo + Claude</p>
    </div>
  </footer>

  <script src="assets/js/app.js"></script>
</body>
</html>
```

- [ ] **Step 2: Open in browser to verify**

On Mac/Windows: Open the file `index.html` directly in browser (drag onto Chrome).
Expected: Hebrew RTL layout, purple accent, 5 phase cards (1 active, 4 locked), responsive on resize.

---

## Task 6: Phase landing pages (5 pages)

**Files:**
- Create: `phase-1/index.html`
- Create: `phase-2/index.html`, `phase-3/index.html`, `phase-4/index.html`, `phase-5/index.html`

- [ ] **Step 1: Write phase-1/index.html (the active phase)**

```html
<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Phase 1 — Foundations Sprint · VMA</title>
  <link rel="stylesheet" href="../assets/css/styles.css">
</head>
<body>

  <header class="site-header">
    <div class="container site-header__inner">
      <a href="../index.html" class="brand">
        <div class="brand__logo">V</div>
        <div class="brand__name">Vibe Master Academy</div>
      </a>
      <nav class="site-nav">
        <a href="../index.html">בית</a>
        <a href="index.html" class="active">Phase 1</a>
        <a href="../glossary.html">מילון</a>
      </nav>
    </div>
  </header>

  <main class="container">
    <section class="hero">
      <h1 class="hero__title">Phase 1 — Foundations Sprint</h1>
      <p class="hero__subtitle">
        שבועות 1–4 · ~20 שעות · יסודות חיים שתשתמש בהם בכל הקורס
      </p>
    </section>

    <div class="callout">
      <div class="callout__title">מטרת הפאזה</div>
      <p>בסוף 4 השבועות האלה אתה מסוגל לקרוא סקריפט Python של 50 שורות, להבין מה הוא עושה, ולהפעיל workflow ראשון ב-n8n שמדבר עם Claude. <strong>לא הופך אותך למפתח</strong> — נותן לך אוריינות מספיקה כדי להתחיל לבנות.</p>
    </div>

    <h2>4 השבועות</h2>
    <section class="weeks">

      <a href="week-01.html" class="week-card">
        <div class="week-card__num">Week 1</div>
        <div class="week-card__title">Python יום ראשון</div>
        <div class="week-card__hours">5 שעות · setup, משתנים, print/input</div>
      </a>

      <a href="week-02.html" class="week-card">
        <div class="week-card__num">Week 2</div>
        <div class="week-card__title">מבני נתונים + JSON</div>
        <div class="week-card__hours">5 שעות · lists, dicts, functions, JSON</div>
      </a>

      <a href="week-03.html" class="week-card">
        <div class="week-card__num">Week 3</div>
        <div class="week-card__title">APIs + Git + Errors</div>
        <div class="week-card__hours">5 שעות · HTTP, requests, try/except, git</div>
      </a>

      <a href="week-04.html" class="week-card">
        <div class="week-card__num">Week 4</div>
        <div class="week-card__title">n8n + Portal Setup</div>
        <div class="week-card__hours">5 שעות · n8n hello world + portal final</div>
      </a>

    </section>

    <h2>Checkpoint סוף פאזה 1</h2>
    <p>בסוף השבוע ה-4 — Demo של workflow ב-n8n + הסבר על Python script שכתבת. Q&A עומק כדי לוודא הבנה אמיתית. אם משהו לא תפס — שבוע 5 לחזרה לפני פאזה 2.</p>

  </main>

  <footer class="site-footer">
    <div class="container"><p>Vibe Master Academy</p></div>
  </footer>

  <script src="../assets/js/app.js"></script>
</body>
</html>
```

- [ ] **Step 2: Write phase-2/index.html (locked stub)**

```html
<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Phase 2 — Music Radar · VMA</title>
  <link rel="stylesheet" href="../assets/css/styles.css">
</head>
<body>

  <header class="site-header">
    <div class="container site-header__inner">
      <a href="../index.html" class="brand">
        <div class="brand__logo">V</div>
        <div class="brand__name">Vibe Master Academy</div>
      </a>
      <nav class="site-nav">
        <a href="../index.html">בית</a>
        <a href="../glossary.html">מילון</a>
      </nav>
    </div>
  </header>

  <main class="container">
    <section class="hero">
      <h1 class="hero__title">Phase 2 — Music Radar</h1>
      <p class="hero__subtitle">
        שבועות 5–10 · 30 שעות · הפרויקט הראשון שלך
      </p>
    </section>

    <div class="callout callout--warning">
      <div class="callout__title">🔒 הפאזה הזאת ננעלת עד שתשלים את Phase 1</div>
      <p>חזור אל <a href="../phase-1/index.html">Phase 1</a> ותמשיך משם. כשתסיים את Phase 1 והצלחת את ה-Checkpoint — תוכן הפאזה הזאת ייפתח.</p>
    </div>

    <h2>מה יהיה כאן בעתיד</h2>
    <p>פרויקט "Music Radar" — n8n workflow שכל ראשון בבוקר סורק Beatport, Resident Advisor, 1001tracklists, ו-Bandcamp ל-DJs ו-labels שאתה אוהב, מסכם עם Claude לעברית, ושולח מייל. אמן רכה לAI Booking Agency של פאזה 3.</p>

  </main>

  <footer class="site-footer">
    <div class="container"><p>Vibe Master Academy</p></div>
  </footer>

  <script src="../assets/js/app.js"></script>
</body>
</html>
```

- [ ] **Step 3: Create phase-3/index.html, phase-4/index.html, phase-5/index.html as locked stubs**

Use the same template as phase-2/index.html with these substitutions:

For `phase-3/index.html`:
- Title: `Phase 3 — AI Booking Agency · VMA`
- H1: `Phase 3 — AI Booking Agency`
- Subtitle: `שבועות 11–20 · 50 שעות · פרויקט הדגל`
- "מה יהיה כאן": `מערכת רב-סוכנים שמזהה אמנים פוטנציאליים, מעריכה סיכויי הסכמה, ומיירטת מייל אישי. multi-agent + scraping + scoring + email + DB.`

For `phase-4/index.html`:
- Title: `Phase 4 — Master Project · VMA`
- H1: `Phase 4 — Master Project`
- Subtitle: `שבועות 21–28 · 35 שעות · פרויקט הגביע`
- "מה יהיה כאן": `פרויקט גביע שמשלב את כל הסקיל. נבחר בשבוע 18 מבין: SEO Brain build, AI Booking Agency 2.0, Cockpit module, או פרויקט שיופיע.`

For `phase-5/index.html`:
- Title: `Phase 5 — Mastery & Polish · VMA`
- H1: `Phase 5 — Mastery & Polish`
- Subtitle: `שבועות 29–32 · 10 שעות · graduation`
- "מה יהיה כאן": `Refactor sweep, deployment hardening, portfolio polish, Master Review הסופי.`

- [ ] **Step 4: Verify all 5 phase pages render**

Open each `phase-N/index.html` in browser. Expected: Hebrew RTL, correct title and content, navigation works.

---

## Task 7: Glossary skeleton

**Files:**
- Create: `glossary.html`

- [ ] **Step 1: Write glossary with seed terms**

```html
<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>מילון מושגים · VMA</title>
  <link rel="stylesheet" href="assets/css/styles.css">
  <style>
    .term { margin-bottom: var(--space-6); padding-bottom: var(--space-4); border-bottom: 1px solid var(--color-border); }
    .term__name { font-size: 1.2rem; font-weight: 700; color: var(--color-primary); margin-bottom: var(--space-2); }
    .term__en { font-size: 0.9rem; color: var(--color-text-muted); font-weight: normal; }
  </style>
</head>
<body>

  <header class="site-header">
    <div class="container site-header__inner">
      <a href="index.html" class="brand">
        <div class="brand__logo">V</div>
        <div class="brand__name">Vibe Master Academy</div>
      </a>
      <nav class="site-nav">
        <a href="index.html">בית</a>
        <a href="phase-1/index.html">Phase 1</a>
        <a href="glossary.html" class="active">מילון</a>
      </nav>
    </div>
  </header>

  <main class="container lesson">
    <h1>מילון מושגים</h1>
    <p class="lesson__intro">המילון מתעדכן עם כל מושג חדש שאתה פוגש. עברית כשאפשר, אנגלית כשמושג הוא מילה אנגלית מקצועית.</p>

    <div class="term">
      <div class="term__name">Python <span class="term__en">(פייתון)</span></div>
      <p>שפת תכנות פופולרית, פשוטה לקריאה. ה-DSL הלא-רשמי של AI ו-data. אנחנו לומדים אותה ברמת קריאה ועריכה, לא ברמת מפתח.</p>
    </div>

    <div class="term">
      <div class="term__name">n8n</div>
      <p>פלטפורמה ויזואלית לבניית workflows (זרימות אוטומציה). חופשי בקוד פתוח. מתחבר לכל API בעולם בגרירה ושחרור.</p>
    </div>

    <div class="term">
      <div class="term__name">API <span class="term__en">(Application Programming Interface)</span></div>
      <p>"דלת" שתוכנה אחת פותחת בשבילך כדי שתוכנה אחרת תוכל לבקש ממנה דברים. למשל ה-API של Claude מאפשר ל-Python שלך לבקש סיכומים.</p>
    </div>

    <div class="term">
      <div class="term__name">JSON <span class="term__en">(JavaScript Object Notation)</span></div>
      <p>פורמט טקסט מובנה לחילופי מידע בין מערכות. כל ה-APIs כמעט מדברים JSON. נראה כמו מילון ב-Python.</p>
    </div>

    <div class="term">
      <div class="term__name">Git</div>
      <p>מערכת ניהול גרסאות. שומרת היסטוריה של כל שינוי שעשית בקוד, ומאפשרת לסנכרן בין מחשבים דרך GitHub.</p>
    </div>

    <div class="term">
      <div class="term__name">GitHub</div>
      <p>שרת בענן שמארח repositories (תיקיות עם היסטוריית גיט). חינמי לפרויקטים פרטיים. גם נותן GitHub Pages — אירוח חינמי לאתרי HTML סטטיים.</p>
    </div>

  </main>

  <footer class="site-footer">
    <div class="container"><p>Vibe Master Academy</p></div>
  </footer>

  <script src="assets/js/app.js"></script>
</body>
</html>
```

- [ ] **Step 2: Verify**

Open `glossary.html` in browser. Expected: 6 terms listed cleanly.

---

## Task 8: Lesson 1 — Setup (the first real content)

**Files:**
- Create: `lessons/phase-1/lesson-01-setup.md` (markdown source)
- Create: `phase-1/lesson-01.html` (the HTML view linking to it)
- Create: `phase-1/lesson-02.html`, `phase-1/lesson-03.html`, `phase-1/lesson-04.html` (stubs)

- [ ] **Step 1: Write the Hebrew lesson — lessons/phase-1/lesson-01-setup.md**

```markdown
# Week 1 — Python יום ראשון

**זמן צפוי:** 5 שעות (3 שבת + 1.5 ראשון + 30 דק' לילה)
**מטרה:** סביבת Python עובדת אצלך במאק + יודע לכתוב סקריפט פשוט.

---

## חלק 1: Setup (1.5 שעות)

### מה זה Python בכלל?

Python היא שפת תכנות. כשאתה כותב קוד Python, אתה כותב הוראות לחומרה שלך בשפה שיותר קלה לבני אדם לקרוא. הקוד עצמו הוא קובץ טקסט שמסתיים ב-`.py`.

**דוגמה לקוד Python**:

```python
print("Hello, Shai!")
```

זאת שורה אחת. היא מבקשת מהמחשב להדפיס את המילים האלה למסך.

---

### שלב 1: התקנת Python על המאק

המאק שלך בא עם גרסת Python ישנה (2.x) שאנחנו לא רוצים. נתקין את הגרסה החדשה (3.12) דרך Homebrew.

פתח את ה-**Terminal** (Cmd+Space, חפש "Terminal").

הרץ:

```bash
brew install python@3.12
```

אם brew לא מותקן, תקבל הודעה. תתקין דרך:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

אחרי ההתקנה, בדוק שזה עבד:

```bash
python3 --version
```

אמור להופיע משהו כמו `Python 3.12.x`. ✅

---

### שלב 2: VS Code על המאק

אם אין לך VS Code:

```bash
brew install --cask visual-studio-code
```

פתח את VS Code. בצד שמאל יש סמל של אפליקציות (extensions). לחץ עליו, חפש **Python**, ולחץ Install על ה-extension של Microsoft.

---

### שלב 3: יוצרים את הסקריפט הראשון

ב-Terminal:

```bash
cd ~/projects/vibe-master-academy
mkdir -p exercises/week-01
cd exercises/week-01
code hello.py
```

זה יפתח את VS Code עם קובץ חדש בשם `hello.py`. הכנס לתוכו:

```python
print("Hello, Shai!")
print("This is my first Python script.")
```

שמור (Cmd+S).

חזור ל-Terminal, וב-`exercises/week-01/` הרץ:

```bash
python3 hello.py
```

אמור להופיע:

```
Hello, Shai!
This is my first Python script.
```

🎉 **הרצת את הקוד הראשון שלך.**

---

## חלק 2: Concepts בסיסיים (1.5 שעות)

### משתנים

משתנה הוא "תיבה" שמכילה ערך. בDOmen Python:

```python
name = "Shai"
age = 35
is_seo_head = True
```

עכשיו תוכל להשתמש בהם:

```python
print(name)            # מדפיס: Shai
print("שלום", name)    # מדפיס: שלום Shai
```

### טיפוסים בסיסיים

| טיפוס | דוגמה | למה זה |
|-------|--------|--------|
| `str` | `"Shai"` | מחרוזת — טקסט |
| `int` | `35` | מספר שלם |
| `float` | `3.14` | מספר עם נקודה עשרונית |
| `bool` | `True` או `False` | בוליאני — נכון/לא נכון |

### Print ו-Input

```python
print("מה השם שלך?")
name = input()
print("שלום,", name)
```

הרץ את זה. המחשב יחכה שתכניס שם, ואז ידפיס לך שלום.

### הערות

הערות הן טקסט בקוד שה-Python מתעלם ממנו. הן בשבילך, לזכור מה הקוד עושה:

```python
# זאת הערה — לא משפיעה על ההרצה
name = "Shai"   # זאת גם הערה, אחרי קוד
```

**הרגל מצוין:** הוסף הערה לפני כל שורה לא טריוויאלית. עוד שנה תודה לעצמך.

---

## חלק 3: תרגול (1.5 שעות)

### תרגיל: מה הדומיין של URL?

צור קובץ חדש: `exercises/week-01/domain_extractor.py`

המטרה: סקריפט שמקבל URL מהמשתמש ומדפיס רק את הדומיין.

**דוגמה לתפעול:**
```
הכנס URL: https://www.beatport.com/genre/techno
הדומיין הוא: beatport.com
```

**רמז 1:** השתמש ב-`input()` כדי לקבל URL.
**רמז 2:** השתמש בpattern של `.replace("https://", "").replace("http://", "").replace("www.", "")`.
**רמז 3:** השתמש ב-`.split("/")[0]` כדי לחתוך אחרי הדומיין.

**אל תפתח את ה-Claude עדיין.** נסה לבד 30 דקות לפחות. אם תקעת — אז תפתח.

---

### פתרון (אחרי שניסית!)

```python
# domain_extractor.py
url = input("הכנס URL: ")

# מסירים את הפרוטוקול
url = url.replace("https://", "").replace("http://", "")

# מסירים www
url = url.replace("www.", "")

# חותכים בסלאש הראשון
domain = url.split("/")[0]

print("הדומיין הוא:", domain)
```

הרץ עם כמה URLs כדי לראות שזה עובד.

---

## חלק 4: Review (30 דקות)

### עדכן את PROGRESS.md

פתח `PROGRESS.md` בשורש הפרויקט. סמן ✅ ליד "Week 1 — Setup הושלם", "Concepts הושלם", "Practice הושלם".

מלא:
- **שעות בפועל:** כמה שעות זה לקח באמת
- **קושי (1-5):** סובייקטיבי
- **הערות:** מה הפתיע אותך, מה לא היה ברור, מה רצית ללמוד יותר

### שאלות לפני שאתה ממשיך

ענה לעצמך:
1. מה ההבדל בין `print` ל-`input`?
2. מה השם של הטיפוס `35`?
3. למה הוספנו `.replace("www.", "")`?

אם אתה לא בטוח על אחת מאלה — חזור על החלק הרלוונטי.

---

## checkpoint לסוף שבוע 1

- [ ] Python 3.12 מותקן על המאק
- [ ] VS Code עם extension של Python
- [ ] `hello.py` רץ והדפיס שלום
- [ ] `domain_extractor.py` עובד עם 3 URLs לפחות
- [ ] PROGRESS.md מעודכן
- [ ] git commit + push

**כשכל אלה ✅ — אתה מוכן לWeek 2.**

```

- [ ] **Step 2: Write phase-1/lesson-01.html (the portal page that links to the lesson)**

```html
<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Week 1 — Python יום ראשון · VMA</title>
  <link rel="stylesheet" href="../assets/css/styles.css">
</head>
<body>

  <header class="site-header">
    <div class="container site-header__inner">
      <a href="../index.html" class="brand">
        <div class="brand__logo">V</div>
        <div class="brand__name">Vibe Master Academy</div>
      </a>
      <nav class="site-nav">
        <a href="../index.html">בית</a>
        <a href="index.html">Phase 1</a>
        <a href="../glossary.html">מילון</a>
      </nav>
    </div>
  </header>

  <main class="container lesson">
    <div class="lesson__meta">Phase 1 · Week 1 · 5 שעות</div>
    <h1 class="lesson__title">Python יום ראשון</h1>
    <p class="lesson__intro">
      בסוף השבוע הזה סביבת Python עובדת אצלך במאק, אתה יודע מה זה משתנה, ויש לך שני סקריפטים שרצים.
    </p>

    <h2>מה לומדים השבוע</h2>
    <ul>
      <li>התקנת Python על המאק דרך Homebrew</li>
      <li>הגדרת VS Code עם extension של Python</li>
      <li>משתנים, טיפוסים בסיסיים (str, int, float, bool)</li>
      <li>print ו-input</li>
      <li>הערות בקוד</li>
      <li>תרגיל מעשי: סקריפט שמחלץ דומיין מ-URL</li>
    </ul>

    <h2>השיעור המלא</h2>
    <p>השיעור עצמו כתוב במלואו (בעברית, עם דוגמאות וקוד) כאן:</p>

    <div class="callout">
      <div class="callout__title">📖 השיעור המלא</div>
      <p>פתח את הקובץ <code>lessons/phase-1/week-01-setup.md</code> בעורך שלך (VS Code) או ב-GitHub. הקובץ כולל את כל ההסברים, הקוד לעתיק, התרגיל, והפתרון.</p>
      <p><a href="../lessons/phase-1/week-01-setup.md">פתח שיעור →</a></p>
    </div>

    <h2>Checklist להשלמת השבוע</h2>
    <div class="checklist">
      <ul>
        <li data-id="w1-python">Python 3.12 מותקן על המאק</li>
        <li data-id="w1-vscode">VS Code עם extension של Python</li>
        <li data-id="w1-hello">hello.py רץ והדפיס שלום</li>
        <li data-id="w1-domain">domain_extractor.py עובד עם 3 URLs</li>
        <li data-id="w1-progress">PROGRESS.md מעודכן</li>
        <li data-id="w1-commit">git commit + push</li>
      </ul>
    </div>

    <div class="callout">
      <div class="callout__title">משהו לא ברור?</div>
      <p>אל תיתקע לבד יותר מ-30 דקות. שאל את Claude (בצ'אט או ב-Claude Code), או חזור על החלק הרלוונטי. אם אחרי 60 דקות עוד תקוע — תכתוב לי, ננווט יחד.</p>
    </div>

  </main>

  <footer class="site-footer">
    <div class="container"><p>Vibe Master Academy</p></div>
  </footer>

  <script src="../assets/js/app.js"></script>
</body>
</html>
```

- [ ] **Step 3: Write phase-1/lesson-02.html, lesson-03.html, lesson-04.html (stubs)**

Use this template, substituting per week:

```html
<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Week {N} · VMA</title>
  <link rel="stylesheet" href="../assets/css/styles.css">
</head>
<body>

  <header class="site-header">
    <div class="container site-header__inner">
      <a href="../index.html" class="brand">
        <div class="brand__logo">V</div>
        <div class="brand__name">Vibe Master Academy</div>
      </a>
      <nav class="site-nav">
        <a href="../index.html">בית</a>
        <a href="index.html">Phase 1</a>
        <a href="../glossary.html">מילון</a>
      </nav>
    </div>
  </header>

  <main class="container lesson">
    <div class="lesson__meta">Phase 1 · Week {N} · 5 שעות</div>
    <h1 class="lesson__title">{WEEK_TITLE}</h1>
    <p class="lesson__intro">{WEEK_INTRO}</p>

    <div class="callout callout--warning">
      <div class="callout__title">🔒 השבוע ייכתב בקרוב</div>
      <p>תוכן השיעור ייכתב לפני שתגיע אליו. כרגע השלם את <a href="week-{PREV_N}.html">Week {PREV_N}</a> ראשון.</p>
    </div>

  </main>

  <footer class="site-footer">
    <div class="container"><p>Vibe Master Academy</p></div>
  </footer>

  <script src="../assets/js/app.js"></script>
</body>
</html>
```

Substitutions:
- **lesson-02.html**: N=2, LESSON_TITLE="מבני נתונים + JSON", LESSON_INTRO="lists, dicts, functions, JSON.", PREV_N=01
- **lesson-03.html**: N=3, LESSON_TITLE="APIs + Git + Errors", LESSON_INTRO="HTTP, requests, try/except, git workflow.", PREV_N=02
- **lesson-04.html**: N=4, LESSON_TITLE="n8n + Portal Setup", LESSON_INTRO="n8n hello world + portal final touches.", PREV_N=03

- [ ] **Step 4: Verify**

Open `phase-1/lesson-01.html` in browser. Click through to phase-1/index.html and back. Test the checklist (click items, refresh page — should remain checked via localStorage).

---

## Task 9: First Git commit (local)

**Files:**
- All files created so far

- [ ] **Step 1: Git init**

```bash
cd c:/Users/SEMSELECTED/projects/vibe-master-academy
git init
git branch -m main
```

- [ ] **Step 2: Initial commit**

```bash
git add .
git status
```

Expected: All files staged, no .env or secrets visible.

```bash
git commit -m "Initial scaffold: portal skeleton + Lesson 1

- Folder structure (portal at root, internal subfolders)
- README, PROGRESS, .gitignore
- CSS framework (RTL Hebrew, purple accent)
- Home dashboard + 5 phase pages + glossary
- Phase 1 Lesson 1 full lesson (Hebrew)
- Phase 1 Lessons 2-4 stubs

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

- [ ] **Step 3: Verify**

Run: `git log --oneline`
Expected: 1 commit visible.

---

## Task 10: Create GitHub remote repo and push

**NOTE:** This task requires Shai's action. The GitHub CLI is installed on his Mac, not necessarily on the Windows machine. We have two paths.

**Privacy decision:** Repo will be **public** for two reasons: (a) GitHub Pages on private repos requires GitHub Pro ($4/month), and (b) the content is educational with no secrets. Sensitive notes go in `notes/private/` which is gitignored. If Shai prefers private later, he can switch + pay for Pro, or migrate to Cloudflare Pages.

- [ ] **Step 1: Try GitHub CLI on Windows (preferred)**

```bash
gh --version
```

If gh exists and is authenticated:

```bash
gh repo create vibe-master-academy --public --source=. --remote=origin --push
```

This creates the repo on GitHub under `selectedsem-stack/vibe-master-academy` and pushes.

- [ ] **Step 2: If gh is NOT on Windows — use web UI**

If gh fails, Shai does this manually:
1. Browser → https://github.com/new
2. Repository name: `vibe-master-academy`
3. Owner: `selectedsem-stack`
4. **Public** (selected)
5. Do NOT init with README/license/.gitignore (we have them)
6. Click "Create repository"
7. Copy the SSH or HTTPS URL shown

Then in Terminal:

```bash
git remote add origin https://github.com/selectedsem-stack/vibe-master-academy.git
git push -u origin main
```

- [ ] **Step 3: Verify**

Open https://github.com/selectedsem-stack/vibe-master-academy in browser. Expected: All files visible, README rendered in Hebrew.

---

## Task 11: Enable GitHub Pages

- [ ] **Step 1: Go to repo Settings → Pages**

Browser: https://github.com/selectedsem-stack/vibe-master-academy/settings/pages

- [ ] **Step 2: Configure source**

- **Source:** Deploy from a branch
- **Branch:** `main` · `/` (root)
- Click **Save**

- [ ] **Step 3: Wait for first deployment**

GitHub builds and deploys (~1-2 minutes). The URL will be:
`https://selectedsem-stack.github.io/vibe-master-academy/`

- [ ] **Step 4: Verify**

Open the URL above. Expected: Hebrew RTL home page renders. Navigate to Phase 1 → Lesson 1. Open the lesson markdown link — verify GitHub renders the markdown.

- [ ] **Step 5: Add Pages URL to README**

Update `README.md` — replace `https://shai-vma.pages.dev` with the actual URL `https://selectedsem-stack.github.io/vibe-master-academy/`.

```bash
git add README.md
git commit -m "Update portal URL in README"
git push
```

---

## Task 12: Mac sync — instructions for Shai when he's on Mac

**Files:**
- Create: `docs/mac-sync.md` — explicit instructions for the Mac side

- [ ] **Step 1: Write mac-sync.md**

```markdown
# Mac Sync — איך להוריד את הקורס למאק

(נכתב מהמחשב Windows; הוראות לביצוע במאק)

## 1. וודא שהכלים מותקנים

```bash
git --version
gh --version
```

אם משהו חסר:

```bash
brew install git gh
gh auth login    # אם עוד לא חיברת
```

## 2. קלון של הריפו

```bash
cd ~
mkdir -p projects
cd projects
gh repo clone selectedsem-stack/vibe-master-academy
cd vibe-master-academy
ls
```

צריך לראות את כל הקבצים — index.html, README.md, phase-1/, וכו'.

## 3. הקצב היומי-יומי

**לפני שעובדים על הקורס:**
```bash
cd ~/projects/vibe-master-academy
git pull
```

**אחרי שעבדת:**
```bash
git add .
git commit -m "[Phase X Week Y] תיאור קצר של מה שעשיתי"
git push
```

## 4. אם יש קונפליקט

אם `git pull` מודיע על קונפליקט (סביר רק אם עבדת על אותו קובץ משני מחשבים בלי לדחוף ביניהם):

1. אל תיכנס לפניקה
2. הרץ `git status` כדי לראות מה
3. צור קשר איתי — נפתור יחד

## 5. פתיחת הפורטל מקומית

לעבודה offline:

```bash
cd ~/projects/vibe-master-academy
open index.html
```

לעבודה online (כל מקום בעולם):

`https://selectedsem-stack.github.io/vibe-master-academy/`
```

- [ ] **Step 2: Commit and push**

```bash
git add docs/mac-sync.md
git commit -m "Add Mac sync instructions for Shai"
git push
```

- [ ] **Step 3: Verify on GitHub**

Browse to the file on GitHub, confirm it renders in Hebrew correctly.

---

## Task 13: Final walkthrough — verify everything works end-to-end

- [ ] **Step 1: From any browser, navigate the portal**

URL: `https://selectedsem-stack.github.io/vibe-master-academy/`

Click through:
1. Home → 5 phase cards visible
2. Click Phase 1 → see 4 week cards
3. Click Lesson 1 → see lesson page
4. Click "פתח שיעור" → see markdown rendered on GitHub
5. Check checklist items → checkmarks appear, refresh page → still checked
6. Click מילון → 6 terms render
7. Click locked phases → see "Coming after Phase 1" message

- [ ] **Step 2: Verify all navigation links work**

No 404s. All paths relative. Header brand link returns to home from any page.

- [ ] **Step 3: Mobile test**

Open URL on phone. Expected: Responsive, readable, RTL preserved.

- [ ] **Step 4: Final commit message — closure**

```bash
git status
```

If clean — bootstrap done. If not — commit anything pending.

---

## Task 14: Update master spec with portal-at-root restructure

**Files:**
- Modify: `docs/superpowers/specs/2026-05-21-vibe-master-academy-design.md` section 8.1

- [ ] **Step 1: Edit section 8.1**

Replace the folder structure block in section 8.1 with the updated structure (portal contents at root, internal subfolders preserved). The block to replace starts with `### 8.1 מבנה התיקייה` and ends before `### 8.2`.

New content:

```markdown
### 8.1 מבנה התיקייה

```
vibe-master-academy/
├── README.md                    הקדמה + ניווט
├── PROGRESS.md                  מעקב שבועי
├── .gitignore
│
├── index.html                   ← פורטל בית (GitHub Pages root)
├── glossary.html                מילון
├── phase-1/                     שיעורי Phase 1 בHTML
│   ├── index.html
│   ├── lesson-01.html
│   ├── lesson-02.html
│   ├── lesson-03.html
│   └── lesson-04.html
├── phase-2/                     ושאר הפאזות (stubs בהתחלה)
├── phase-3/
├── phase-4/
├── phase-5/
├── assets/
│   ├── css/styles.css
│   ├── js/app.js
│   └── images/
│
├── lessons/                     Markdown source (פנימי)
│   └── phase-N/
├── projects/                    קוד הפרויקטים (פנימי)
├── exercises/                   תרגילים (פנימי)
├── notes/                       סיכומים אישיים (פנימי)
│
└── docs/                        תיעוד הקורס
    ├── mac-sync.md
    └── superpowers/
        ├── specs/
        └── plans/
```

**הערה על המבנה:** GitHub Pages מגיש מהשורש, ולכן הHTML של הפורטל יושב בשורש (לא בתת-תיקייה `portal/`). הקבצים הפנימיים (lessons source, code, docs) נמצאים בתת-תיקיות.
```

- [ ] **Step 2: Commit**

```bash
git add docs/superpowers/specs/2026-05-21-vibe-master-academy-design.md
git commit -m "Update spec section 8.1: portal at root (GitHub Pages constraint)"
git push
```

---

## סיום

עם השלמת 14 ה-Tasks:
- ✅ פורטל וובי שלם מתארח בענן, נגיש מכל מקום
- ✅ Phase 1 Lesson 1 שיעור מלא בעברית, מוכן ללמידה
- ✅ Phases 2-5 + Phase 1 שיעורים 2-4 כsubs מוכנות לכתיבה
- ✅ Git workflow פעיל בין Windows ו-Mac
- ✅ תיעוד מלא — spec, plan, README, מסמך sync

Shai יכול **להתחיל את שיעור 1 מיד אחרי שיגיע למאק וירוץ את הוראות `docs/mac-sync.md`**.
