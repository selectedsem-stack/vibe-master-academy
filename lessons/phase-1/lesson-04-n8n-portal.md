# Lesson 4 — n8n + Portal Setup

**זמן צפוי:** 5 שעות
**מטרה:** בסוף השיעור Shai יודע: מה זה n8n ולמה הוא קיים, איך מתקינים workflow ראשון (n8n.cloud), איך לחבר Claude API לתוך n8n, ואיך לסיים את הפורטל הלימודי שלו.

---

## חלק 1: n8n — מה זה ולמה זה קיים (1 שעה)

### רענון מ-Lesson 3

ב-Lesson 3 ראינו איך לקרוא ל-API מ-Python. אבל בכל פעם שאתה רוצה לחבר 3-4 שירותים יחד, אתה כותב הרבה קוד — error handling, loops, retry logic. n8n מאפשר לבנות את אותם flows ויזואלית, בלי לכתוב את כל ה-boilerplate.

---

### מה זה n8n?

n8n הוא **open-source workflow automation tool**. במקום לכתוב קוד Python שקורא API → מעבד נתונים → שולח מייל, אתה גורר node על canvas, מחבר חיצים, ומגדיר פרמטרים.

כל **node** הוא צעד אחד. החיצים מחברים בין הצעדים. הזרימה כולה נקראת **workflow**.

```
[Webhook Trigger] → [HTTP Request] → [Email Send]
```

n8n רץ את ה-workflow כשה-**trigger** מופעל — בין אם זה HTTP request, תזמון (cron), או לחיצת כפתור.

---

### n8n vs Zapier vs Make

| תכונה | n8n | Zapier | Make |
|-------|-----|--------|------|
| מחיר | חינמי (self-hosted) / $20 לחודש (cloud) | $30+/חודש | בינוני |
| התאמה אישית | גמיש מאוד | מוגבל | בינוני |
| JavaScript בתוך nodes | כן | חלקי | חלקי |
| self-hosted | כן | לא | לא |
| מתאים ל | מפתחים שרוצים שליטה | non-technical | בינוני |

**מתי תבחר n8n:** כשאתה צריך גמישות, כשאתה רוצה לכתוב JavaScript בתוך node, כשאתה רוצה לאחסן את הנתונים בשרת שלך.

**מתי Zapier הגיוני:** כשאתה צריך לחבר שני כלים מוכרים מהר, בלי להשקיע זמן.

---

### Anatomy של n8n

שלוש קטגוריות של nodes:

1. **Triggers (טריגרים)** — מפעילים את ה-workflow:
   - `Webhook` — HTTP request נכנס מבחוץ
   - `Schedule Trigger` (Cron) — בזמן קבוע
   - `Manual Trigger` — לחיצת כפתור ידנית

2. **Action Nodes** — עושים משהו:
   - `HTTP Request` — קורא API חיצוני
   - `Gmail` / `SMTP` — שולח מייל
   - `Slack` — שולח הודעה בסלאק

3. **Logic Nodes** — מסננים ומנתבים:
   - `IF` — מפצל לפי תנאי
   - `Switch` — ניתוב לפי ערכים
   - `Merge` — מאחד זרמים

---

## חלק 2: התקנה + Hello Workflow (1.5 שעות)

### שלב 1: הרשמה ל-n8n.cloud

אפשרויות התקנה:
- **n8n.cloud (מומלץ לרגע זה):** פשוט, מנוהל, 14 יום ניסיון חינמי. לא צריך Docker, לא צריך שרת.
- **Self-hosted (Docker):** מריצים על מחשב מקומי עם Docker. מדלגים עליו בפאזה 1 — אנחנו ב-n8n.cloud.

כדי להירשם:
1. כנס ל-[https://n8n.cloud](https://n8n.cloud)
2. הרשם עם Gmail
3. ה-instance שלך יהיה ב-`https://YOUR-NAME.app.n8n.cloud`

---

### שלב 2: ממשק n8n — סקירה מהירה

- **Workflows list** — כל ה-workflows שלך, פעיל/לא פעיל
- **Editor Canvas** — ה-canvas ויזואלי. גורר nodes, מחבר בחיצים
- **Credentials** — פרטי גישה מוצפנים לשירותים חיצוניים
- **Executions** — לוג של כל פעם ש-workflow רץ (מה נכנס, מה יצא)

---

### שלב 3: First Workflow — Webhook → Set → Email

**מה אנחנו בונים:** workflow שמקבל HTTP request ושולח מייל.

**שלב 3א: Webhook node**
1. לחץ "New Workflow"
2. הוסף node → חפש "Webhook"
3. שמור את ה-URL שה-Webhook נותן לך (נראה כמו: `https://YOUR-INSTANCE.app.n8n.cloud/webhook/SOME-ID`)
4. שים את ה-Webhook ב-"Test" mode בינתיים

**שלב 3ב: Set node (לעיבוד)**
1. הוסף node → "Edit Fields (Set)"
2. הגדר שדה חדש: `subject` = `"מבחן מ-n8n: {{$json.name}}"`
3. חבר את ה-Webhook אל ה-Set node

**שלב 3ג: Email node**
1. הוסף node → "Gmail" או "Email (SMTP)"
2. הגדר Credential — פרטי ה-Gmail שלך (OAuth ל-Gmail, או App Password ל-SMTP)
3. `To`: הכנס את כתובת המייל שלך
4. `Subject`: `{{$json.subject}}`
5. `Body`: `קיבלת הודעה מ: {{$json.name}} — {{$json.message}}`
6. חבר את ה-Set node אל ה-Email node

**שלב 3ד: בדיקה**
```bash
curl -X POST https://YOUR-N8N-INSTANCE.app.n8n.cloud/webhook/test \
  -H "Content-Type: application/json" \
  -d '{"name": "Shai", "message": "מבחן ראשון"}'
```

אם הכל תקין — תקבל מייל תוך שניות.

---

### איך n8n מאחסן Credentials

**לעולם לא** להכניס API keys ישירות ב-workflow JSON. n8n מספק מנגנון Credentials:
- הנתונים מוצפנים (AES-256) ב-database של n8n.cloud
- ה-node מקבל reference לcredential, לא את המפתח עצמו
- בלוג ה-execution לא מופיעות הסיסמאות — רק `[CREDENTIALS HIDDEN]`

---

## חלק 3: n8n + Claude — Workflow מורכב יותר (1.5 שעות)

### רענון מ-Lesson 3

ב-Lesson 3 קראת ל-Claude API מ-Python. עכשיו ניתן ל-n8n לעשות את זה במקומך — בלי לכתוב קוד Python, בלי לנהל environment variables ידנית.

---

### Workflow 2: Text → Claude → Email Summary

**מה אנחנו בונים:** Webhook מקבל טקסט, שולח ל-Claude לסיכום, שולח את הסיכום במייל.

```
[Webhook] → [HTTP Request → Claude API] → [Email]
```

**שלב 1: Webhook node**
- Webhook מקבל JSON: `{"text": "...הטקסט לסיכום..."}`

**שלב 2: HTTP Request node (Claude)**
- Method: `POST`
- URL: `https://api.anthropic.com/v1/messages`
- Headers:
  ```
  x-api-key: {{ $credentials.anthropicApiKey }}
  anthropic-version: 2023-06-01
  content-type: application/json
  ```
- Body (JSON):
  ```json
  {
    "model": "claude-opus-4-7",
    "max_tokens": 500,
    "messages": [
      {
        "role": "user",
        "content": "סכם בעברית את הטקסט הבא:\n\n{{$json.text}}"
      }
    ]
  }
  ```

שים לב ל-`{{$json.text}}` — זה מוסיף את הטקסט מה-Webhook לתוך הבקשה ל-Claude.

**שלב 3: Parse תגובת Claude**

Claude מחזיר JSON. הסיכום נמצא ב:
```
{{$json.content[0].text}}
```

**שלב 4: Email node**
- `Subject`: `סיכום AI`
- `Body`: `{{$json.content[0].text}}`

**בדיקה עם curl:**

```bash
curl -X POST https://YOUR-N8N-INSTANCE.app.n8n.cloud/webhook/claude-summary \
  -H "Content-Type: application/json" \
  -d '{"text": "n8n היא פלטפורמה ויזואלית לאוטומציה. היא מאפשרת לחבר APIs בלי לכתוב קוד. מתחרה של Zapier ו-Make."}'
```

אחרי כמה שניות — תקבל מייל עם סיכום ב-Claude.

---

### זה בעצם Smart Brief ב-workflow

ה-workflow שבנית כאן הוא בדיוק הבסיס של Smart Brief:
1. קלט נכנס (URL / טקסט)
2. Claude מסכם
3. תוצאה נשלחת (מייל / Slack / webhook אחר)

ב-Phase 2 נבנה גרסה מלאה.

---

## חלק 4: Portal Final Touches (1 שעה)

### מה בנינו ב-Phase 1

בארבעה שיעורים הקמנו פורטל לימוד שלם:
- **Lesson 1:** הגדרת סביבה, Python ראשון, הפורטל הלך live
- **Lesson 2:** מבני נתונים, JSON, לולאות, ניתוח נתוני SEO
- **Lesson 3:** HTTP, Claude API, error handling, Git workflow
- **Lesson 4:** n8n, automation visual, workflow ראשון, Claude ב-n8n

עכשיו סוגרים את Phase 1 ב-Git.

---

### TODO list לסיום Phase 1

**1. עדכן `PROGRESS.md` עם נתוני Phase 1 הסופיים**

פתח `PROGRESS.md` בשורש הפרויקט. מלא עבור Lesson 4:
- שעות בפועל
- קושי (1-5)
- הערות

וודא ש-Phase 1 summary מלאה.

**2. וודא שכל ה-checkpoints מסומנים**

כנס לכל שיעור (lesson-01 → lesson-04) ולחץ על כל checkpoint item שהשלמת.
ה-localStorage שומר את הסימונים אוטומטית.

**3. הוסף את הסקריפטים ל-`exercises/`**

וודא שיש לך את ארבעת הסקריפטים הבאים:
```
exercises/lesson-01/hello_world.py
exercises/lesson-02/seo_data.py
exercises/lesson-03/claude_summary.py
exercises/lesson-04/n8n_test.sh
```

**4. כתוב `notes/phase-1-retro.md`**

כתוב הערה אישית קצרה. כמה שאלות להתחיל:
- מה הכי הפתיע אותי ב-Phase 1?
- מה היה הכי קשה?
- מה למדתי שאני כבר יכול להשתמש בו ב-Selected?

**5. Commit אחרון של Phase 1**

```bash
git add .
git commit -m "[Phase 1] Completed — Foundations Sprint"
git push
```

**6. Push ל-GitHub**

```bash
git push origin main
```

וודא שהפורטל עלה ב-GitHub Pages — פתח `https://YOUR-USERNAME.github.io/vibe-master-academy/`.

---

### הערה על הפורטל עצמו

ה-`lesson-04.html` שאתה קורא עכשיו — הוא כבר חלק מהפורטל שבנינו יחד. אין צורך לשנות אותו ידנית. Phase 2 יכלול הוספת sections חדשים לפורטל — לא עריכת קבצי Phase 1.

---

## חלק 5: Phase 1 Review + Self-Check (30 דקות)

### 5 שאלות לפני שאתה עובר ל-Phase 2

ענה לעצמך בלי לגלול חזרה:

1. מה זה Webhook ולמה הוא שימושי?
2. מתי תעדיף n8n על Python ולהיפך?
3. ספר במשפט אחד מה כל אחד מ-4 השיעורים של Phase 1 לימד.
4. מה הדבר הכי מפתיע שלמדת ב-Phase 1?
5. איזה פרויקט / אוטומציה ב-Selected אתה כבר חושב לבנות עם הסקיל הזה?

---

### Self-Rating — דרג את עצמך

פתח `PROGRESS.md` ומלא את טבלת ה-self-rating עבור Phase 1:

| קריטריון | ציון (1-5) |
|----------|-----------|
| Python syntax בסיסי | |
| קריאה ועריכה של קוד קיים | |
| מבני נתונים (list, dict) | |
| JSON — קריאה וכתיבה | |
| HTTP request בסיסי | |
| Claude API call | |
| Error handling (try/except) | |
| Git daily workflow | |
| n8n — Webhook workflow | |
| n8n — Claude integration | |

---

### סיכום Phase 1

אתה עכשיו יודע Python ברמה בסיסית, מבין APIs, מסונכרן ב-Git, ובנית workflow ראשון ב-n8n. זה לא טריוויאלי. שווה את העוגה.

Phase 2 — Music Radar — יבנה על הכל: Python + API + n8n + Claude → מוצר שיכול לעבוד ב-Selected.

---

## Checkpoint לסוף שיעור 4 (ולסוף Phase 1)

- [ ] n8n.cloud account פתוח
- [ ] Hello workflow רץ ושלח מייל
- [ ] Claude workflow רץ ושלח סיכום
- [ ] PROGRESS.md מעודכן מלא
- [ ] 4 הסקריפטים ב-exercises/
- [ ] notes/phase-1-retro.md נכתב
- [ ] Phase 1 commit + push לGitHub
- [ ] מוכן ל-Phase 2 — Music Radar

**כשכל אלה ✅ — Phase 1 סגור. נתראה ב-Phase 2.**
