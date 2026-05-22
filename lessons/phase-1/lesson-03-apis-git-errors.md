# Lesson 3 — APIs + Git + Errors

**זמן צפוי:** 5 שעות
**מטרה:** בסוף השיעור Shai יודע: HTTP/APIs ברמה מעשית, `requests` ב-Python, error handling בסיסי, Git workflow.

---

## חלק 1: HTTP ו-APIs — איך תוכנות מדברות (1.5 שעות)

### רענון מ-Lesson 2

ב-Lesson 2 השתמשנו בנתונים JSON מקובץ מקומי. עכשיו נראה איך לקבל JSON מאתר אחר באינטרנט — כלומר, לקרוא API.

---

### מה זה API באמת?

API (Application Programming Interface) הוא "תפריט הזמנות" של שירות אינטרנטי.

הדמיון: כשאתה הולך למסעדה, יש לך תפריט. אתה לא נכנס למטבח בעצמך — אתה מבקש דרך המלצר. המלצר הוא ה-API: שולחים בקשה מסוימת, מקבלים תגובה מסוימת.

- **אתה (הלקוח)** = Python שלך
- **המלצר** = ה-API
- **המטבח** = שרת Claude/GitHub/Google
- **האוכל** = JSON עם המידע שביקשת

---

### GET לעומת POST

שתי הדרכים הנפוצות לשלוח HTTP request:

| Method | מה הוא עושה | דוגמה |
|--------|------------|-------|
| `GET` | מבקש מידע מהשרת | שלוף לי את פרטי המשתמש |
| `POST` | שולח מידע לשרת + מבקש תגובה | שלח הודעה ל-Claude |

```http
GET  https://api.github.com/users/shaiberdugo
POST https://api.anthropic.com/v1/messages
```

**חוק האגודל:** קריאה בלבד → GET. שליחת נתונים / פעולה → POST.

---

### Status Codes — מה קורה עם הבקשה שלך?

כל תגובה מ-API כוללת מספר תלת-ספרתי:

| קוד | משמעות | מה לעשות |
|-----|--------|----------|
| `200` | הצלחה — הכל עבד | תמשיך |
| `201` | נוצר — (POST שיצר משאב חדש) | הצלחה גם כן |
| `400` | Bad Request — הבקשה שלך שגויה | בדוק את הפרמטרים |
| `401` | Unauthorized — מפתח API שגוי/חסר | בדוק את ה-API key |
| `403` | Forbidden — אין לך הרשאה | הרשאות שגויות |
| `404` | Not Found — הנתיב לא קיים | בדוק את ה-URL |
| `429` | Too Many Requests — חרגת ממגבלת קריאות | המתן לפני ניסיון חוזר |
| `500` | Server Error — שגיאה בצד השרת | לא אשמתך, נסה שוב |

```
2xx = הצלחה
4xx = טעות שלך
5xx = טעות של השרת
```

---

### Headers — המידע שנוסע עם הבקשה

Headers הם "מטה-מידע" שנשלח עם כל בקשה. שני החשובים ביותר:

```http
Authorization: Bearer sk-ant-...     (מי אתה — מפתח ה-API)
Content-Type: application/json        (פורמט הנתונים שאתה שולח)
```

**חשוב מאוד:** מפתח ה-API הוא כמו סיסמה. **לעולם** אל תכניס אותו ישירות בקוד.
תמיד שמור אותו ב-environment variable.

---

## חלק 2: Python `requests` — הקריאה הראשונה שלך (1.5 שעות)

### התקנת ספריית requests

`requests` היא ספרייה חיצונית של Python — לא מובנית. צריך להתקין עם pip:

```bash
pip3 install requests
```

אחרי ההתקנה, מייבאים בתוך הקוד:

```python
import requests
```

---

### Hello World: קריאת GET פשוטה

```python
import requests

# קריאה ל-GitHub API — מחזיר JSON עם מידע על ה-API
response = requests.get("https://api.github.com")

print(response.status_code)    # 200
print(type(response))          # <class 'requests.models.Response'>
```

ה-`response` הוא אובייקט עם מספר שדות שימושיים:

| שדה | תוכן |
|-----|------|
| `response.status_code` | קוד המצב (200, 404, וכו') |
| `response.json()` | ה-body כ-dict Python |
| `response.text` | ה-body כ-string גולמי |
| `response.headers` | כל ה-headers של התגובה |

---

### Parse JSON מ-response

```python
import requests

response = requests.get("https://api.github.com")

# .json() הופך את ה-body ל-dict Python
data = response.json()

# עכשיו data הוא dict רגיל
print(data.get("current_user_url"))
# https://api.github.com/user
```

---

---

### שלב 0: השגת מפתח API מ-Claude Console

לפני שאתה יכול לקרוא ל-Claude, צריך מפתח API. הצעדים:

1. **היכנס ל-Console** — פתח בדפדפן: [https://platform.claude.com/](https://platform.claude.com/). אם עדיין אין לך חשבון — הירשם עם Gmail או אימייל. (החשבון נפרד מ-Claude.ai לצ'אט.)

2. **לעמוד API Keys** — פתח ישירות: [https://platform.claude.com/settings/keys](https://platform.claude.com/settings/keys). או נווט: **Settings → API Keys**.

3. **צור מפתח חדש** — לחץ **Create Key**. תן שם תיאורי (למשל `vibe-master-academy-mac`). לחץ Create.

4. **העתק את המפתח עכשיו** — **חשוב מאוד:** המפתח יוצג **פעם אחת בלבד**. ברגע שתסגור את החלון לא תוכל לראות אותו שוב — תצטרך ליצור חדש. המפתח מתחיל ב-`sk-ant-api03-` ואחריו ~95 תווים.

5. **הוסף שיטת תשלום (אם זו פעם ראשונה)** — חשבון חדש מקבל לרוב $5 קרדיט חינמי. כדי לעבור את זה — תצטרך להוסיף כרטיס אשראי דרך **Settings → Billing**. השיעורים בקורס משתמשים במעט מאוד טוקנים (גרושים בודדים בסך הכל).

**אם המפתח לא עובד:**
- הקרדיט נגמר — בדוק ב-Settings → Billing
- המפתח בוטל — בדוק שהוא עדיין מופיע ב-Settings → API Keys
- חשבון אחר — צור חדש בחשבון הנכון

---

### לפני הקריאה ל-Claude: איך מגדירים מפתח API בסביבה

ה-API key הוא **סוד**. כמו סיסמה. הוא לעולם לא צריך להופיע בקוד שלך — לא ב-`.py`, לא ב-Git, ולא ב-screenshot.

הפתרון הסטנדרטי: **environment variables** (משתני סביבה). אתה שם את המפתח פעם אחת ב-Terminal/במערכת, והקוד שולף משם.

#### דרך 1: לפעם אחת (מתאים לבדיקות)

ב-Terminal, לפני שאתה מריץ את הסקריפט:

```bash
export ANTHROPIC_API_KEY="sk-ant-..."   # שים פה את המפתח האמיתי
python3 your_script.py
```

ה-`export` תקף **רק בחלון ה-Terminal הזה**. אם תסגור אותו, המשתנה ייעלם.

#### דרך 2: קבוע (מתאים לעבודה יומיומית)

הוסף את ה-`export` ל-`~/.zshrc` (במאק) כדי שיטעון אוטומטית בכל Terminal חדש:

```bash
echo 'export ANTHROPIC_API_KEY="sk-ant-..."' >> ~/.zshrc
source ~/.zshrc
```

עכשיו בכל Terminal חדש שתפתח, המשתנה יהיה זמין.

#### בדיקה שזה עבד

```bash
echo $ANTHROPIC_API_KEY
```

אם רואה את המפתח — מצוין. אם לא רואה כלום — תחזור על השלבים.

#### בקוד Python אתה תקרא:

```python
import os
API_KEY = os.environ.get("ANTHROPIC_API_KEY")
```

**אם `API_KEY` מקבל ערך `None`** — סימן שמשתנה הסביבה לא הוגדר נכון. סגור את ה-Terminal, פתח חדש, נסה שוב.

---

### קריאת POST ל-Claude API

זו הקריאה האמיתית. שים לב למבנה:

```python
import requests
import os

API_KEY = os.environ.get("ANTHROPIC_API_KEY")

response = requests.post(
    "https://api.anthropic.com/v1/messages",
    headers={
        "x-api-key": API_KEY,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json"
    },
    json={
        "model": "claude-opus-4-7",
        "max_tokens": 500,
        "messages": [
            {"role": "user", "content": "סכם בעברית: Python היא שפה פופולרית."}
        ]
    }
)

if response.status_code == 200:
    data = response.json()
    print(data["content"][0]["text"])
else:
    print(f"שגיאה: {response.status_code}")
```

**שים לב:**
- `os.environ.get("ANTHROPIC_API_KEY")` — המפתח מגיע מהסביבה (שהגדרנו למעלה), לא מהקוד
- `json={...}` — requests אוטומטית ממיר ל-JSON ומוסיף Content-Type header
- `data["content"][0]["text"]` — זה המבנה של תגובת Claude (ראה הסבר למטה)

### מבנה תגובת Claude — למה `content[0].text`?

Claude מחזיר JSON שנראה ככה:

```json
{
  "id": "msg_abc123",
  "type": "message",
  "role": "assistant",
  "content": [
    { "type": "text", "text": "כאן הסיכום של Claude..." }
  ],
  "model": "claude-opus-4-7",
  "stop_reason": "end_turn",
  "usage": { "input_tokens": 25, "output_tokens": 87 }
}
```

`content` היא **רשימה** של "content blocks", כי תגובה יכולה לכלול יותר מבלוק טקסט אחד (למשל גם תמונה או tool call). ברוב המקרים יש בלוק אחד, ולכן `[0]`. בתוכו, `.text` הוא הטקסט עצמו.

**כלל:** הקוד `data["content"][0]["text"]` קורא: "קח את הרשימה content, קח את האיבר הראשון [0], וממנו קח את השדה text".

---

## חלק 3: Error Handling — מה קורה כשדברים נשברים (1 שעה)

### למה צריך error handling?

ב-API calls דברים נשברים **כל הזמן**:
- אין אינטרנט
- מפתח API פג תוקף
- השרת עמוס ולא עונה
- הגעת ל-rate limit

בלי error handling — הקוד קורס עם traceback מפחיד ומפסיק לרוץ.
עם error handling — הקוד מטפל בבעיה בצורה נקייה וממשיך.

---

### try / except — נתחיל פשוט

הסינטקס הבסיסי תופס **כל** שגיאה:

```python
try:
    # קוד שעלול להיכשל
    response = requests.get("https://api.github.com", timeout=5)
    data = response.json()
    print(data)
except Exception as e:
    print(f"משהו השתבש: {e}")
```

זה הצורה הפשוטה ביותר. `Exception` תופס **הכל** — Timeout, ConnectionError, KeyError, וכל שאר השגיאות. הקוד לא קורס, רק מדפיס את השגיאה וממשיך.

### עכשיו ספציפי יותר — נבחין בין סוגי שגיאות

לפעמים אתה רוצה להגיב אחרת לפי סוג השגיאה — למשל retry על Timeout, אבל לעצור על שגיאת אימות:

```python
try:
    response = requests.get("https://api.github.com", timeout=5)
    response.raise_for_status()   # זורק exception אם status code >= 400
    data = response.json()

except requests.exceptions.Timeout:
    print("פסק זמן — השרת לא ענה תוך 5 שניות")

except requests.exceptions.HTTPError as e:
    print(f"שגיאת HTTP: {e}")

except requests.exceptions.ConnectionError:
    print("שגיאת חיבור — בדוק אינטרנט")
```

**הסדר חשוב:** except ספציפי יותר תמיד לפני except כללי. Python בודק אותם מלמעלה למטה.

---

### מתי לתפוס exception ומתי לא?

**תפוס:** כשאתה יכול לטפל בזה נכון (retry, fallback, הודעת שגיאה ידידותית).

**אל תתפוס:** כשאתה לא יודע מה לעשות עם השגיאה — עדיף שהקוד יקרוס בצורה ברורה מאשר יבלע שגיאות בשקט.

```python
# לא טוב — בולע שגיאות בשקט
try:
    data = do_something()
except:
    pass    # הכי גרוע שאפשר לעשות

# טוב — תופס ספציפי ועושה משהו
try:
    data = do_something()
except ValueError as e:
    print(f"ערך שגוי: {e}")
    data = default_value
```

---

### Bonus — retry פשוט (לחקירה אישית, לא חובה)

> ⚡ הקטע הבא משתמש במושגים שעדיין לא הוסברו בשיעור (default parameters, while loop, raise). תרגיש חופשי לדלג ולחזור אליו אחרי Lesson 4 כשתתעמק יותר.

```python
import requests
import time

def call_api_with_retry(url, max_tries=3):
    for attempt in range(1, max_tries + 1):
        try:
            response = requests.get(url, timeout=10)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.HTTPError:
            if response.status_code == 429:
                print(f"Rate limit — מחכה {attempt * 2} שניות...")
                time.sleep(attempt * 2)
            else:
                raise    # שגיאה אחרת — זרוק הלאה
        except requests.exceptions.Timeout:
            print(f"Timeout בניסיון {attempt}")
    raise RuntimeError("כל הניסיונות נכשלו")
```

---

### תרגיל מהיר — תפוס שגיאה אמיתית

קח את קוד Claude API שלך, ועוטף אותו ב-try/except. אחר כך **בכוונה** קלקל את ה-API key (החלף תו אחד), והרץ שוב.

תקבל שגיאה — אבל הסקריפט שלך לא יקרוס. במקום זה הוא יציג הודעה ידידותית. **זה החוזק של try/except.**

חזור על המפתח התקין אחרי הבדיקה.

---

## חלק 4: Git Workflow היומי (30 דקות)

### הגדרה חד-פעמית — מי אתה ב-Git

Git רוצה לדעת מי עומד מאחורי כל commit. אם עוד לא הגדרת את זה, ה-commit הראשון שלך ייכשל עם "**Please tell me who you are**". הגדר פעם אחת — תקף לכל הפרויקטים בכל המחשבים:

```bash
git config --global user.name "Shai Berdugo"
git config --global user.email "selectedsem@gmail.com"

# בדיקה
git config --global --list
```

**איזה אימייל לשים?** אותו אימייל שאיתו נרשמת ל-GitHub. ככה כל ה-commits שלך יוצגו עם הפרופיל שלך. אם אתה רוצה להסתיר אימייל פרטי — GitHub נותן לך `USERNAME@users.noreply.github.com` דרך Settings → Emails.

---

### הפקודות שתשתמש בהן יום-יום

```bash
git status                              # מה השתנה?
git add lesson3-exercise.py             # הוסף לstaging
git commit -m "Lesson 3: API + error handling"  # commit עם הודעה
git push                                # שלח ל-GitHub
```

**הסדר הוא תמיד:** status → add → commit → push.

---

### commit message טוב

commit message טוב עונה על: **מה השתנה ולמה?**

```bash
# לא טוב
git commit -m "update"
git commit -m "fix"
git commit -m "asdf"

# טוב
git commit -m "Lesson 3: first Claude API call works"
git commit -m "Add error handling for timeout and 429"
git commit -m "Fix: use os.environ for API key instead of hardcode"
```

---

### git pull — לפני שאתה מתחיל לעבוד

```bash
git pull        # מושך שינויים מ-GitHub למחשב שלך
```

חשוב לעשות `git pull` לפני שאתה מתחיל לעבוד, במיוחד אם עובדים ממחשבים שונים.

---

### Branching בסיסי

Branch הוא ענף נפרד של הקוד. מאפשר לעבוד על פיצ'ר חדש בלי לשבור את main.

```bash
# יצירת ענף חדש
git checkout -b feature/lesson3-exercise

# עבוד, עשה commits...

# חזרה ל-main
git checkout main

# מיזוג הענף
git merge feature/lesson3-exercise
```

בשלב הזה, תעבוד ישירות על main — branching יהיה חשוב יותר ב-Phase 2.

---

### מה לעולם לא לעשות

**אסור לעשות commit לקבצים האלה:**

```bash
# בדוק שה-.gitignore שלך כולל:
.env                # משתני סביבה עם מפתחות API
venv/               # תיקיית virtualenv — כבדה ומיותרת
__pycache__/        # קבצי cache של Python
*.pyc               # קבצים מקומפלים
```

אם בטעות עשית commit למפתח API — **תחליף את המפתח מיד.** נחשב לגנוב גם אם ה-repo פרטי.

---

## חלק 5: Review + שאלות סיכום (30 דקות)

### 4 שאלות לפני שאתה ממשיך

ענה לעצמך (בלי לגלול חזרה):

1. מה ההבדל בין GET ל-POST?
2. למה אסור לשים מפתח API ישירות בקוד?
3. מתי אתה רוצה לתפוס exception ומתי עדיף לתת לקוד לקרוס?
4. מה זה commit message טוב?

---

### עדכן את PROGRESS.md

פתח `PROGRESS.md` בשורש הפרויקט. סמן ✅ ליד הסעיפים של Lesson 3. מלא:
- **שעות בפועל:** כמה זמן זה לקח באמת
- **קושי (1-5):** סובייקטיבי
- **הערות:** מה הפתיע, מה לא היה ברור, מה רצית עוד

---

## checkpoint לסוף שיעור 3

- [ ] קריאת API ראשונה עבדה
- [ ] Claude API החזיר תשובה בעברית
- [ ] תפסת exception לפחות פעם אחת
- [ ] git commit עם הודעה ברורה
- [ ] git push הצליח
- [ ] PROGRESS.md מעודכן
- [ ] הבנת מה ההבדל בין GET ל-POST

**כשכל אלה ✅ — אתה מוכן ל-Lesson 4 (n8n + Portal Setup).**
