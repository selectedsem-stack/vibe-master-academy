# Lesson 4 — n8n + אוטומציה (Capstone)

**זמן צפוי:** 3 שעות
**גישה:** Vibe coder — בונים workflows ויזואליים, בלי קוד.
**הפרויקט:** AI Assistant דרך webhook + workflow אישי + סיום Phase 1.

---

## חלק 1: Setup n8n cloud (30 דקות)

### n8n vs Zapier vs Make

- **Zapier:** הכי קל, הכי הרבה אינטגרציות
- **Make:** יחס מחיר/ערך טוב
- **n8n:** גמיש כמו קוד, יש self-hosted חינמי — הבחירה של vibe coders

### הרשמה

1. n8n.io/cloud → הירשם
2. Free Trial 14 ימים (ללא כרטיס)
3. תקבל URL ייחודי כמו `https://shai.app.n8n.cloud`

### 4 מושגי יסוד

- **Workflow** — סדרת nodes מחוברים בחיצים
- **Node** — צעד יחיד (Gmail, HTTP, פילטור...)
- **Trigger** — ה-node הראשון (Manual, Webhook, Schedule)
- **Credential** — פרטי גישה מוצפנים לשירות חיצוני

---

## חלק 2: Workflow 1 — Hello Email (30 דקות)

**מבנה:** Manual Trigger → Gmail Send

### צעדים

1. + New Workflow
2. הוסף Manual Trigger
3. הוסף Gmail node → Send Email
4. צור credential — Sign in with Google
5. To: המייל שלך · Subject: "Hello from n8n!" · Message: "First workflow 🎉"
6. Execute Workflow → בדוק שהגיע מייל

---

## חלק 3: ⭐ Workflow 2 — AI Assistant דרך Webhook (60 דקות)

**מבנה:** Webhook → HTTP Request (Claude) → Gmail

### Node 1 — Webhook

- HTTP Method: POST
- Path: `ai-assistant`
- העתק את ה-Test URL

### Node 2 — HTTP Request ל-Claude

- Method: POST
- URL: `https://api.anthropic.com/v1/messages`
- Authentication: Header Auth — `x-api-key`: ה-API key שלך
- Headers:
  - `anthropic-version`: `2023-06-01`
  - `content-type`: `application/json`
- Body (JSON):
  ```json
  {
    "model": "claude-haiku-4-5",
    "max_tokens": 512,
    "system": "אתה עוזר ידידותי שעונה בעברית.",
    "messages": [
      { "role": "user", "content": "={{ $json.body.question }}" }
    ]
  }
  ```

### Node 3 — Gmail עם תשובת Claude

- To: המייל שלך
- Subject: `תשובת Claude ל: {{ $('Webhook').first().json.body.question }}`
- Message: `{{ $json.content[0].text }}`

### בדיקה

```bash
curl -X POST 'https://shai.app.n8n.cloud/webhook-test/ai-assistant' \
  -H 'Content-Type: application/json' \
  -d '{"question": "מה ההבדל בין SEO ל-SEM?"}'
```

תקבל מייל עם תשובת Claude.

### הפעלה ל-production

לחץ **Active** בפינה הימנית — Production URL פעיל 24/7.

---

## חלק 4: Workflow 3 — בנה משהו שלך (45 דקות)

### רעיונות

- **A — Daily Tip:** Schedule (כל בוקר) → Claude (טיפ SEO) → Gmail
- **B — Wikipedia Researcher:** Webhook → Wikipedia → Claude → Gmail (אותו pipeline כמו שיעור 3, בלי קוד)
- **C — RSS Digest:** Schedule → RSS Read → Claude (סיכום) → Gmail
- **D — משלך:** טריגר + 1-2 צעדי עיבוד + מוצא

### עדכן PROGRESS.md

- איזה workflow בנית
- כמה זמן זה לקח
- איפה היה הקושי הגדול
- מה היה הרגע המתגמל

---

## חלק 5: Phase 1 Retrospective (15 דקות)

### מה בנית

| שיעור | פרויקט | למה זה חשוב |
|--------|---------|--------------|
| 1 | greet, domain_extractor, ask_claude | Python מדבר עם Claude |
| 2 | seo_advisor + recommendations.json | Pipeline data → AI → output מובנה |
| 3 | topic_researcher + safe_researcher | שילוב 2 APIs + error handling + Git |
| 4 | ai-assistant workflow + שלך | אותם דברים בלי קוד, ב-n8n |

### Self-rating (1-5)

- קריאת קוד Python
- עבודה עם JSON
- קריאה ל-API חיצוני
- חיבור ל-Claude API
- Git workflow יומי
- n8n workflows

כל 3+ → מוכן ל-Phase 2.

### Git commit סופי

```bash
cd ~/projects/vibe-master-academy
git add PROGRESS.md
git commit -m "Phase 1 complete — n8n workflows + retrospective"
git push
```

---

## Checkpoint

- [ ] חשבון n8n פעיל עם URL ייחודי
- [ ] Workflow 1 (Hello Email) רץ והגיע מייל
- [ ] Workflow 2 (AI Assistant) — curl ל-webhook החזיר תשובה במייל
- [ ] Workflow 3 שלי רץ פעם אחת בהצלחה
- [ ] PROGRESS.md מעודכן עם retrospective של Phase 1
- [ ] Git commit + push של Phase 1 בוצעו
