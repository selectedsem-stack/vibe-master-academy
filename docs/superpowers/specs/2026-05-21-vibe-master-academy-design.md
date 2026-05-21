# Vibe Master Academy — Curriculum Design Spec

**Date:** 2026-05-21
**Student:** Shai Berdugo (Head of SEO, Selected agency)
**Duration:** 32 weeks (2026-05-21 → 2026-12-31)
**Total commitment:** ~140–150 hours (5h/week core + occasional bonus)
**Expected budget:** ₪600–1,500
**Spec status:** Draft for review (pre-implementation plan)

---

## 1. רקע ומטרה

### 1.1 המצב הנוכחי

Shai מנהל את מחלקת ה-SEO ב-Selected. במהלך השנים האחרונות בנה מספר פרויקטים אמיתיים בעזרת Claude Code: Smart Brief, PageSpeed scan, Cockpit (ספק v2.2 ממתין לאישור Marcel), SEO Brain (spec), SEO Academy (HTML onboarding). הוא **vibe coder מנוסה** — אך תלוי מאוד ב-AI ככלי כתיבה, ופחות מבין את היסודות שמתחת.

### 1.2 הגדרת "מאסטר"

"מאסטר" בעיני Shai = **Solution Architect** (עיקרי) + **light Python literacy** (משני). כלומר:

- **Solution Architect (90%):** מבין מתי להשתמש בכלי X לעומת Y, מרכיב מערכות מורכבות (n8n + APIs + Python + AI + DB), מוביל פרויקטים טכניים, מעריך trade-offs וsell-cost.
- **Python literacy (10%):** מספיק כדי לקרוא קוד, לזהות באג, לתקן שורה, להבין מה Claude כתב. **לא** הופך למפתח Python.
- **Debugging:** סקיל שמתפתח על פני שנים דרך פרויקטים, לא דרך מודול נפרד.

### 1.3 הנחיות עיצוב יסודיות

- **Project-driven:** אין "תרגילים יבשים". כל מודול קשור לפרויקט אמיתי.
- **בנייה הדרגתית:** כלי חדש נכנס רק אחרי שהיסוד שמתחתיו נלמד.
- **YAGNI ruthless:** לומדים רק מה שהפרויקטים דורשים. לא Python OOP מעמיק, לא algorithms, לא Frontend.
- **Hebrew primary, English fluent:** חומרי לימוד בעברית מועדפים. אנגלית כשאין ברירה (רוב התיעוד הטכני).
- **AI כ-Tutor**, לא רק כ-Coder: לומדים *איך* ללמוד עם AI.
- **גמישות בנויה:** הקורס יכול להשתנות תוך תנועה. ראה סעיף 15.

---

## 2. הגישה הפדגוגית — "Foundations Sprint + 3 Project Arcs + Polish"

מבנה 5 פאזות שמשלב יסודות, פרויקטים בקנה מידה גדל, ופיתוח שיפוט עצמאי.

```
Phase 1 — Foundations Sprint        שיעורים 1–4    ~20h
Phase 2 — Arc #1: Music Radar       שיעורים 5–10   ~30h
Phase 3 — Arc #2: AI Booking Agency שיעורים 11–20  ~50h
Phase 4 — Arc #3: Master Project    שיעורים 21–28  ~35h
Phase 5 — Mastery & Polish          שיעורים 29–32  ~10h
─────────────────────────────────────────────────────────
                                    32 שבועות    ~145h
```

### 2.1 קצב שבועי

```
שבת בוקר      3 שעות   מושג חדש + tutorial + תרגול ראשון
ראשון בוקר    1.5 שעות עבודה על פרויקט (Application)
לילה אחד      30 דקות  Review + planning + portal update
─────────────────────────────────────────────────────────
              5 שעות   סה"כ
```

**Bonus 2–3h כשמתאפשר:** עומק על נושא, וידאו ארוך, דחיפה לפרויקט אישי.

### 2.2 Checkpoints

בסוף כל פאזה:
1. **Demo** — Shai מציג את הפרויקט (לי, או לאדם אמיתי כמו Marcel/חברים)
2. **Reflection** — מה עבד, מה לא, איפה תקוע
3. **Adjustment** — אם הקצב לא תואם, מעדכנים. אם פרויקט פאזה הבאה שונה — מעדכנים.

---

## 3. Phase 1 — Foundations Sprint (שיעורים 1–4, ~20h)

**מטרה:** בסוף הפאזה Shai מסוגל לקרוא סקריפט Python של 50 שורות, להבין מה הוא עושה, ולהפעיל workflow ראשון ב-n8n שמדבר עם Claude.

### 3.1 שיעור 1 — Python יום ראשון (5h)

| בלוק | זמן | תוכן | חומר |
|------|-----|------|------|
| Setup | 1.5h | VSCode + Python 3.12 + הסקריפט הראשון | מדריך עברי שלי + screenshots |
| Concepts | 1.5h | משתנים, טיפוסים, print/input, comments | שיעור עברי שלי + Corey Schafer ~15min |
| Practice | 1.5h | סקריפט: URL → דומיין | תרגיל שלי |
| Review | 30min | סיכום בפורטל | טופס Review |

### 3.2 שיעור 2 — מבני נתונים + JSON (5h)

| בלוק | זמן | תוכן |
|------|-----|------|
| Lists & Dicts | 1.5h | רשימות, מילונים, לולאות פשוטות |
| Functions | 1h | פונקציה, params, return |
| JSON | 1h | מה זה, איך קוראים קובץ |
| Practice | 1h | דמה לקוחות → top 5 |
| Review | 30min | פורטל |

### 3.3 שיעור 3 — APIs + Git + Errors (5h)

| בלוק | זמן | תוכן |
|------|-----|------|
| HTTP/APIs | 1.5h | GET/POST, status codes, headers, JSON over HTTP |
| `requests` ב-Python | 1.5h | קריאה ראשונה ל-Claude API |
| Error handling | 1h | try/except |
| Git workflow | 30min | branch, commit, push, PR |
| Review | 30min | פורטל |

**Bonus:** הפעלת prompt של Smart Brief מ-Python ידני (לא דרך Claude Code).

### 3.4 שיעור 4 — n8n + Portal Setup (5h)

| בלוק | זמן | תוכן |
|------|-----|------|
| n8n intro | 1h | n8n vs Zapier vs Make |
| התקנה + Hello | 1.5h | n8n.cloud trial. Webhook → Process → Email |
| n8n + Claude | 1.5h | Workflow: text → Claude summary → email |
| Portal setup | 1h | בניית skeleton של פורטל הלימודי |

### 3.5 Deliverables של פאזה 1

1. סביבת Python עובדת + יכולת לכתוב 30–50 line scripts
2. יכולת לקרוא לכל REST API מ-Python ולעבד את התשובה
3. n8n רץ + workflow ראשון שמדבר עם Claude
4. פורטל לימודי מוקם ומתועד
5. Git workflow יומי

### 3.6 Checkpoint סוף פאזה 1

- **Demo:** workflow ב-n8n + הסבר על Python script
- **Q&A עומק:** שאלות שמגלות הבנה אמיתית vs חיקוי
- **Adjustment:** אם לא תפס — שיעור חזרה לפני פאזה 2

---

## 4. Phase 2 — Arc #1: Music Radar (שיעורים 5–10, ~30h)

**מטרה:** פרויקט אישי שעובד, n8n-heavy, Python מועט. אמן רכה ל-Phase 3.

### 4.1 תיאור הפרויקט

n8n workflow שכל יום ראשון בבוקר:
- סורק Beatport, Resident Advisor, 1001tracklists, Bandcamp לlabels/DJs מועדפים
- מזהה שחרורים חדשים, sets, אירועים
- שולח ל-Claude לסיכום בעברית — "מה חדש השבוע במוזיקה שלך"
- שולח מייל מעוצב + שומר DB
- בעלייה ב-Phase 3: הופך מ-passive consumption ל-active outreach (Booking Agency)

### 4.2 מבנה השיעורים

| שיעור | זמן | תוכן | מה חדש |
|------|-----|------|---------|
| **5** | 5h | Spec writing + n8n nodes deep dive | spec writing, n8n expressions |
| **6** | 5h | סקרייפר ראשון: Beatport API/scraping | OAuth, HTTP details |
| **7** | 5h | סקרייפר שני + שלישי (RA, 1001tracklists) | dedup, rate limiting |
| **8** | 5h | DB layer (Google Sheets → SQLite). HTML email | DB basics, email design |
| **9** | 5h | Error handling, retry, scheduling (cron) | resilience patterns |
| **10** | 5h | Demo + תיעוד + Refactor. **Checkpoint.** | code review |

### 4.3 Skills שנלמדים

- Spec writing מקצועי
- n8n: nodes, expressions, workflow patterns, error handling, scheduling
- OAuth flows (Google APIs בסיסי)
- HTTP/API ברמה מעשית עם 3 שירותים שונים
- Database basics — איפה לשמור state
- Email automation מקצועית
- Cron/scheduling
- Logging & monitoring בסיסיים

### 4.4 Deliverables

1. Music Radar שרץ בפרודקשן (מייל אוטומטי כל ראשון)
2. תיעוד מלא בפורטל
3. Repo נקי בגיט
4. הבנה אמיתית של מערכת end-to-end

### 4.5 Checkpoint סוף פאזה 2

- Live demo
- Q&A עומק על failure modes
- אישור סופי של פרויקט פאזה 3

---

## 5. Phase 3 — Arc #2: AI Booking Agency (שיעורים 11–20, ~50h)

**מטרה:** הפרויקט הדגל. מערכת רב-סוכנים שמזהה אמנים, מעריכה סיכויי הסכמה, ומיירטת מייל אישי. כאן "הכל מתחבר".

### 5.1 ארכיטקטורת המערכת

```
┌─────────────────────────────────────────────────────────┐
│  n8n Orchestrator (scheduler + triggers + low-code)    │
│                                                         │
│  Discover ──→ Enrich ──→ Decide                        │
│     ↓           ↓          ↓                            │
│  Scraping  Research      Scoring                       │
│  (Python)  Agent         Agent                         │
│            (Claude)      (Claude)                      │
└──────────┬──────────────────────────────────────────────┘
           ↓ if score > threshold
   Draft Agent (Claude) → Human Review → Send (Resend)
                                              ↓
                                       Reply Tracker
                                       (IMAP + Claude)
                                              ↓
                                     Database (SQLite/Postgres)
```

### 5.2 שיעורים 11–20

| שיעור | זמן | תוכן | מה חדש |
|------|-----|------|---------|
| **11** | 5h | Spec מלא + Architecture. ER diagrams. מיפוי מקורות. | Spec writing מקצועי. ER. |
| **12** | 5h | Data layer: SQLite + Pydantic. סקרייפר ראשון. | DB design. Pydantic. |
| **13** | 5h | Multi-source scraping. Dedup. Rate limiting. | BeautifulSoup, Playwright. |
| **14** | 5h | Claude API direct deep dive. SDK, system prompts, structured output, cost. | API ידני, לא דרך Claude Code. Prompt caching. |
| **15** | 5h | Agent #1: Research Agent. Tool use (search, fetch). | Tool calling. Agent loop. |
| **16** | 5h | Agent #2: Scoring Agent. 0–100 + הסבר. Multi-step reasoning. | JSON mode. |
| **17** | 5h | Agent #3: Drafting Agent. Personal email. A/B variants. | Long-form gen. Templates. |
| **18** | 5h | Orchestration: n8n + Python hybrid. Webhooks. | Hybrid architecture. Async. |
| **19** | 5h | Email send (Resend) + Reply tracking (IMAP). Classification. | Email infra. Inbox processing. |
| **20** | 5h | Polish + Deploy (Railway/VPS) + Demo. **Checkpoint.** | Production deploy. Monitoring. |

### 5.3 Skills שנלמדים

- Anthropic API ברמת מומחה (system prompts, tools, structured outputs, caching, cost)
- Multi-agent architecture (מתי מפצלים, מתי מאחדים)
- Web scraping אחראי (BeautifulSoup, Playwright, rate limiting, robots.txt)
- Pydantic + structured data
- Database design (schema, migrations, queries)
- Hybrid orchestration (n8n + Python)
- Email infrastructure (Resend, IMAP, deliverability)
- Production deployment
- Cost engineering

### 5.4 Deliverables

1. מערכת רב-סוכנים שעובדת בפרודקשן
2. 50+ אמנים שעברו את המערכת, scores, drafts
3. Repository מקצועי, מתועד
4. Cost report
5. שליטה אמיתית בכל ה-stack

### 5.5 Checkpoint סוף פאזה 3 (הקשה ביותר)

- **Live demo:** ריצת end-to-end על אמן חדש
- **Architecture review:** Shai מצייר ומסביר את הארכיטקטורה
- **Failure modes Q&A:** מה אם Claude API נופל? מה אם artist מופיע פעמיים? וכו'
- **Cost defense:** כמה זה עולה? איך מוזילים ב-50%?

עובר את ה-checkpoint → **Solution Architect ברמה תפעולית**.

### 5.6 Risk Note

Phase 3 היא הפאזה הקשה ביותר. צפויים באגים, פייפליינים נשברים, prompts שלא עובדים, עלויות מפתיעות. **זה הפיצ'ר, לא הבאג.**

---

## 6. Phase 4 — Arc #3: Master Project (שיעורים 21–28, ~35h)

**מטרה:** פרויקט גביע. Solution Architect הוכחה — מערכת לא טריוויאלית שמשלבת את כל מה שנלמד.

### 6.1 בחירת פרויקט — בשבוע 18, לא עכשיו

מועמדים:

**א. SEO Brain — Build It Yourself (המלצה חזקה)**
Shai כבר כתב spec של SEO Brain. הפאזה הזאת בונה את ה-spec הזה — Task Engine של Cockpit, multi-agent, מתחבר ל-APIs רבים. סוגר מעגל עם העולם המקצועי.

**ב. AI Booking Agency 2.0 — The Business**
מרחיב את פאזה 3: Reply negotiation loop, Calendar integration, Venue/promoter management, Dashboard. MVP → עסק.

**ג. Selected Cockpit Modular Tool**
משהו ספציפי שעלה ב-Cockpit אחרי אישור Marcel.

**ד. Project X — שיופיע תוך כדי**
פרויקט אישי או מתחום חדש.

### 6.2 שיעורים 21–28 — מבנה גנרי

| שיעור | זמן | תוכן |
|------|-----|------|
| **21** | 5h | Spec מאפס לבד. אני מבקר. |
| **22** | 5h | Architecture + planning. ER, sequence, מודולים. |
| **23–25** | 15h | Core building — 3 שיעורים רצופים. Shai מוביל, אני יועץ. |
| **26** | 5h | Integration + testing. Edge cases. |
| **27** | 5h | Demo prep + cost optimization. |
| **28** | 5h | Final demo + Checkpoint. |

### 6.3 Skills חדשים בפאזה 4

עד עכשיו נלמדו כלים. עכשיו לומדים **שיפוט**:
- System design
- Trade-off analysis
- Cost engineering מעמיק
- Self code review
- Project management עצמי

### 6.4 Deliverables

1. פרויקט מורכב בפרודקשן, עם משתמשים אמיתיים
2. Spec + architecture documentation מקצועיים
3. Repository שdeveloper חיצוני יכול להבין ולקלון
4. Demo פומבי (Marcel / חברים / LinkedIn)

---

## 7. Phase 5 — Mastery & Polish (שיעורים 29–32, ~10h)

**מטרה:** סגירת הקורס בצורה שניתן לחזור אליה ולהציג אותו.

### 7.1 שיעורים 29–32

| שיעור | זמן | תוכן |
|------|-----|------|
| **29** | 3h | Refactor sweep — חוזרים על 3 הפרויקטים, מתקנים חוב טכני |
| **30** | 3h | Deployment hardening — monitoring, alerts, secrets management |
| **31** | 2h | Portfolio + Documentation — GitHub portfolio, READMEs, demo videos |
| **32** | 2h | Final retrospective + Phase 6 planning |

### 7.2 Master Review (Graduation)

- **Show & Tell of 60 minutes** — מציג 3 פרויקטים, מסביר ארכיטקטורות
- **Self-assessment** — ציון לעצמו ב-10 מדדים (ראה סעיף 11)
- **Phase 6 planning** (אופציונלי) — אם רוצים להמשיך
- **Public artifact** — פוסט בלינקדאין / Twitter / מאמר

---

## 8. Vibe Master Academy Portal

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

### 8.2 גישה מכל מקום — GitHub Pages

הפורטל מתארח ב-GitHub Pages (חינם, גישה מכל דפדפן, מכל מכשיר, מכל מקום).

**הערה על פרטיות:** GitHub Pages במצב Private repo דורש מנוי Pro/Enterprise כדי להיות באמת פרטי. שלוש אפשרויות:
1. **Pages פתוח, URL לא רגיש** — תוכן הלימוד (שיעורים, סיכומים) פומבי. רק קוד הפרויקטים נשאר ב-repo פרטי. **המלצה — פשוט וחינמי.**
2. **Cloudflare Pages עם Access Policy** — חינמי, מאפשר Pages פרטי עם הגנה. דורש הקמה ראשונית של 30 דקות.
3. **GitHub Pro** — $4/חודש, פעם אחת מגדירים private Pages.

נחליט ב-Day 1 לפי העדפה.

```
Mac אישי ──┐                     ┌── דף הקורס
            git push              │   https://shai-vma.pages.dev
            ────────→  GitHub  ───┤   (גישה מכל דפדפן)
            git push              │
Windows ──┘   (single source)    └── repo קוד (פרטי תמיד)
```

### 8.3 פרטיות

- Repo פרטי
- מפתחות API לעולם לא בגיט (`.env` ב-`.gitignore`)
- כל הקוד הרגיש (Smart Brief, Cockpit וכו') נשאר במחשבים המקומיים או ב-repos פרטיים נפרדים

---

## 9. סביבת המחשוב — Mac primary, Windows secondary

### 9.1 חלוקת המחשבים

**Mac אישי = ה-default. סביבת הפיתוח הראשית.**

| כלי | מיקום | סטטוס |
|-----|--------|--------|
| Python 3.12 | Mac | להתקין דרך brew |
| VS Code | Mac | קיים? להתקין דרך brew |
| Git + GitHub CLI | Mac | **הותקן והוגדר ✅** |
| Node.js (אם נצטרך n8n self-host) | Mac | לפי הצורך |
| Docker Desktop | Mac | לפי הצורך |
| n8n self-hosted | Mac | אופציה — n8n.cloud עדיף תחילה |
| Claude Code (work account) | Windows + Mac (?) | לבדוק יציבות במאק |
| Resend, Anthropic API, Railway | ענן | נגיש משני המחשבים |

**Windows עבודה (RDP) = Claude Code only.**

נכנס לתמונה רק כשצריך Claude Code עם המנוי של העבודה. שאר העבודה — במאק.

### 9.2 סנכרון בין מחשבים — Git על GitHub

**אל סנכרון Dropbox/iCloud/OneDrive על תיקיות עם git repos.** זה שובר git, venv, node_modules.

**הסנכרון = Git על GitHub.** מאק push, GitHub מקבל, Windows pull (או ההפך).

זה גם **תרגיל לימודי בפועל** — Git workflow יומיומי הופך לחלק טבעי מהקורס.

### 9.3 Claude Code על Mac

נסיון ראשון נכשל (התנתק במהירות). **לבדוק שוב בשבוע הבא** כש-Shai חוזר למשרד ויש לו גישה ל-2-step verification.

חלופה אם לא יציב: **Claude Pro אישי ($20/חודש)** או Anthropic API credits ישירות.

---

## 10. חומרי לימוד ותקציב

### 10.1 חומרים — Free Layer (חובה)

- שיעורים שאני כותב בעברית (~10–15 דפים לפאזה)
- Anthropic Python Quickstart + Cookbook
- n8n official docs + n8n Academy
- GitHub Docs — Git Basics
- Corey Schafer YouTube (Python)
- Trevor Saudi YouTube (n8n)
- DeepLearning.AI — AI Agents short courses (קריטי לפאזה 3)
- Anthropic Engineering Blog

### 10.2 חומרים — Paid Layer (אופציונלי, מומלץ)

- **n8n.cloud** ($20/חודש × 4 חודשים פאזות 2–3) = ~₪300
- **Boot.dev Python Track** ($25/חודש × 1–2 חודשים) = ~₪150–300 *אופציונלי*
- **ZTM "AI Engineering Bootcamp"** או **Eden Marco LangGraph** = ₪400–500
- **Anthropic API credits** = ₪200–400
- **Resend** = חינם עד 100 מיילים/יום (לא נחרוג)
- **Railway/Render** = $5/חודש × 3 חודשים = ~₪50

**סה"כ צפוי: ₪600–1,500** (תלוי בבחירות).

### 10.3 פירוט תקציבי לפי פאזה

| פאזה | טווח עלות |
|------|-----------|
| Phase 1 | ₪0–100 |
| Phase 2 | ₪80–250 |
| Phase 3 | ₪400–800 |
| Phase 4 | ₪100–300 |
| Phase 5 | ₪0–50 |
| **סה"כ** | **₪580–1,500** |

---

## 11. מדדי הצלחה

### 11.1 שלוש רמות

**רמה 1 — Pass (Solution Architect בסיסי):**
- בנה 3 פרויקטים end-to-end
- יודע להסביר כל ארכיטקטורה
- יודע לדבג שגיאות בסיסיות לבד
- יודע לתכנן spec לפרויקט חדש

**רמה 2 — Proficient (המטרה האמיתית):**
- כל הנ"ל +
- יודע מתי להשתמש בכלי X לעומת Y
- מוביל פרויקט טכני ב-Selected
- מזהה באג בקוד שClaude כתב לפני שהוא רץ
- מעריך עלות לפני שמתחילים ועומד בה

**רמה 3 — Master (stretch):**
- כל הנ"ל +
- בונה משהו שלא ראה בקורס מאפס
- אנשים שואלים אותו עצות
- מלמד מישהו אחר

### 11.2 10 מדדים לציון בכל Checkpoint

1. Python literacy (read, modify, debug)
2. n8n mastery (workflow design + nodes)
3. AI API depth (system prompts, tools, structured outputs)
4. Agent design (when to split, when to merge)
5. Web scraping (responsible, resilient)
6. Database design (schema, queries)
7. Deployment (production-grade)
8. Debugging (root cause vs symptom)
9. System design (trade-offs, architecture)
10. Communication (explain to non-technical)

ציון 1–5 בכל מדד. מטרה: ממוצע 4+ בסוף הקורס.

---

## 12. סיכונים והתמודדות

| סיכון | סבירות | התמודדות |
|-------|---------|-----------|
| Shai תקוע 3 שבועות על מודול | בינוני | Checkpoint שבועי. תקוע → מחליפים גישה, לא ממשיכים בעקשנות. |
| Selected/Cockpit ייקח זמן מהקורס | גבוה | גמישות בנויה. עוצרים 2 שבועות אם צריך. |
| Phase 3 קשה מדי | בינוני | חותכים scope (פחות agents, פחות מקורות). |
| מוטיבציה יורדת באמצע | בינוני | פרויקטים מבוססי תשוקה (מוזיקה). Checkpoints פומביים. |
| עלות הקורס חורגת | נמוך | Cost reviews בכל פאזה. נדע לפני שמסתבכים. |
| מסיים מרגיש שזו רק התחלה | גבוה | זה הפיצ'ר. Phase 6 מתוכנן כסיום הדרגתי. |

---

## 13. Out of Scope (מה במפורש לא בקורס)

- ❌ Frontend מתקדם (React, Vue, Next.js) — אופציה ל-Phase 6
- ❌ Mobile development
- ❌ DevOps עמוק (Kubernetes, IaC)
- ❌ Data Science / ML training (אנחנו צרכני AI, לא מאמני מודלים)
- ❌ System design ברמת FAANG
- ❌ Algorithms / leetcode
- ❌ Python OOP מתקדם (classes, decorators, metaclasses) אלא אם פרויקט דורש

---

## 14. Day 1 Setup Checklist

### 14.1 על Mac אישי

- [ ] Python 3.12 (`brew install python`)
- [ ] VS Code (`brew install --cask visual-studio-code`)
- [ ] Git (פרה-מותקן ב-macOS) + identity (`git config --global user.name/email`)
- [x] **GitHub CLI** (`brew install gh`) + `gh auth login` ✅ **הותקן**
- [ ] Anthropic API key (יש לShai חשבון)
- [ ] חשבון Resend (חינם)
- [ ] חשבון Railway/Render (לפאזה 3)
- [ ] חשבון n8n.cloud (trial)

### 14.2 על Windows (כשShai חוזר למשרד)

- [ ] קלון של vibe-master-academy מ-GitHub
- [ ] בדיקת Claude Code על המאק עם חשבון העבודה (יציבות)

### 14.3 Day 1 — Claude Code יוצר על המאק

- [ ] Folder structure של vibe-master-academy (סעיף 8.1)
- [ ] README ראשי
- [ ] Portal skeleton (HTML)
- [ ] GitHub repo פרטי
- [ ] GitHub Pages enabled
- [ ] First commit + push

---

## 15. גמישות ועדכון הקורס

### 15.1 מתי משנים?

- **בכל Checkpoint סוף פאזה** — שיחת התאמה רשמית
- **באמצע פאזה** — Shai אומר "זה לא יושב לי", עוצרים, מתאימים
- **שינויי כיוון גדולים** — פרויקט שלא מתחבר, פרויקט דחוף חדש — מחליפים

### 15.2 מה לא משנים?

- **את העיקרון של project-driven**
- **את ה-budget של 5h/שבוע** (אלא אם Shai רוצה להגדיל)
- **את ה-Hebrew first preference**

### 15.3 איך מתעדים שינוי?

עדכון של מסמך זה (`docs/superpowers/specs/2026-05-21-vibe-master-academy-design.md`) עם:
- תאריך השינוי
- מה השתנה
- למה
- מה ההשפעה על שאר הקורס

---

## 16. סיכום — מה המסמך הזה אומר

עד 31 בדצמבר 2026, Shai יהיה Solution Architect בעל שליטה מעמיקה ב:
- **Python ברמת קריאה/דיבוג** (לא כתיבה מאפס מעמיקה)
- **n8n ברמת מומחה**
- **AI APIs ברמת מומחה** (Anthropic Claude בעיקר)
- **Multi-agent systems**
- **Web scraping אחראי**
- **Database design ו-deployment**

עם **4 פרויקטים אמיתיים** בפורטפוליו: Music Radar, AI Booking Agency, Master Project, ופורטל הלימודי עצמו.

בעלות של **₪600–1,500**.

על פני **32 שבועות**, **5 שעות בשבוע**, מהמאק האישי שלו, נגיש מכל מקום.

---

**Spec Status:** Awaiting Shai's review and approval before moving to implementation plan.
