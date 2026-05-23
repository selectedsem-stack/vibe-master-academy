# Lesson 3 — APIs + Errors + Git

**זמן צפוי:** 4 שעות
**גישה:** Vibe coder — קוראים סקריפטים מוכנים, מבינים, ומשנים.
**הפרויקט:** Topic Researcher — Wikipedia + Claude pipeline + error handling אמיתי.

---

## חלק 1: HTTP & APIs (30 דקות)

### מבנה בקשת HTTP

- **Method:** GET (קריאה), POST (יצירה/עדכון), PUT, DELETE
- **URL:** הכתובת
- **Headers:** מטא-מידע (למשל `Authorization`)
- **Body:** הנתונים (רק ב-POST/PUT)

### Status codes

- `2xx` = הצלחה (200 OK)
- `4xx` = הבקשה לא טובה (401, 404, 429)
- `5xx` = השרת דפוק (500, 503)

**העיקרון:** תמיד תבדוק `response.status_code` לפני שמשתמשים בתשובה.

---

## חלק 2: דוגמה 1 — wiki_summary.py (45 דקות)

### התקנה

```bash
pip3 install requests
```

### הקוד

```python
import requests
from urllib.parse import quote

topic = input("איזה נושא לחקור? (באנגלית): ")
encoded_topic = quote(topic)
url = f"https://en.wikipedia.org/api/rest_v1/page/summary/{encoded_topic}"

response = requests.get(url, timeout=10)

if response.status_code == 200:
    data = response.json()
    print(f"\n📚 {data['title']}\n")
    print(data["extract"])
elif response.status_code == 404:
    print(f"❌ לא נמצא: {topic}")
```

### קוראים שורה-שורה

- `requests.get(url, timeout=10)` — בקשת GET עם timeout (תמיד!)
- `response.status_code` — המספר התלת-ספרתי
- `response.json()` — ממיר JSON ל-Python dict
- `quote()` — URL encoding לתווים מיוחדים

### הרצה

```bash
cd ~/projects/vibe-master-academy/exercises/lesson-03
python3 wiki_summary.py
```

נסה: `Python`, `Beatport`, `SEO`, `Tel Aviv`.

### המשימה

הדפס רק 200 תווים ראשונים של ה-extract: `data["extract"][:200] + "..."`.

---

## חלק 3: ⭐ topic_researcher.py — Wikipedia + Claude (60 דקות)

```python
from __future__ import annotations
import os
import requests
from urllib.parse import quote
from dotenv import load_dotenv
from anthropic import Anthropic

load_dotenv("../lesson-01/.env")
claude = Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])


def fetch_wiki_summary(topic: str) -> dict | None:
    encoded = quote(topic)
    url = f"https://en.wikipedia.org/api/rest_v1/page/summary/{encoded}"
    response = requests.get(url, timeout=10)
    if response.status_code != 200:
        return None
    data = response.json()
    return {
        "title": data["title"],
        "extract": data["extract"],
        "url": data["content_urls"]["desktop"]["page"],
    }


def suggest_related_topics(summary: str) -> str:
    response = claude.messages.create(
        model="claude-haiku-4-5",
        max_tokens=512,
        system="אתה חוקר סקרן וחכם. עונה בעברית.",
        messages=[{
            "role": "user",
            "content": f"קראתי:\n\n{summary}\n\nהצע 3 נושאים קשורים."
        }]
    )
    return response.content[0].text


topic = input("איזה נושא לחקור? ")
wiki = fetch_wiki_summary(topic)
if wiki is None:
    print(f"❌ לא נמצא: {topic}")
    exit()

print(f"\n📚 {wiki['title']}\n{wiki['extract']}")
suggestions = suggest_related_topics(wiki["extract"])
print(f"\n💡 נושאים קשורים:\n{suggestions}")
```

### הארכיטקטורה

- `fetch_wiki_summary(topic)` — אחראית רק על Wikipedia
- `suggest_related_topics(summary)` — אחראית רק על Claude
- בתחתית: pipeline שמחבר אותן

**העיקרון:** הפרדה בין שכבות. כל פונקציה אחראית לדבר אחד.

### המשימה

שדרג את ה-system prompt כך ש-Claude יחזיר גם קישורי Wikipedia לכל הצעה.

---

## חלק 4: Error Handling (45 דקות)

### תבנית try/except

```python
try:
    response = requests.get(url, timeout=10)
    data = response.json()
except requests.exceptions.ConnectionError:
    print("אין אינטרנט")
except requests.exceptions.Timeout:
    print("השרת לא ענה בזמן")
```

### הקוד המוגן — safe_researcher.py

```python
def fetch_wiki_summary(topic: str, retries: int = 2) -> dict | None:
    encoded = quote(topic)
    url = f"https://en.wikipedia.org/api/rest_v1/page/summary/{encoded}"

    for attempt in range(retries + 1):
        try:
            response = requests.get(url, timeout=10)
            if response.status_code == 404:
                return None
            response.raise_for_status()
            data = response.json()
            return {
                "title": data["title"],
                "extract": data["extract"],
                "url": data["content_urls"]["desktop"]["page"],
            }
        except requests.exceptions.ConnectionError:
            print(f"   ⚠️ בעיית רשת, ניסיון {attempt + 1}")
            time.sleep(2)
        except requests.exceptions.Timeout:
            print(f"   ⚠️ Timeout, ניסיון {attempt + 1}")
            time.sleep(2)
        except requests.exceptions.HTTPError as e:
            print(f"   ❌ HTTP Error: {e}")
            return None
    return None
```

### חמישה דברים לזהות

1. **`retries: int = 2`** — ערך ברירת מחדל
2. **`for attempt in range(retries + 1):`** — מנסה retries+1 פעמים
3. **`response.raise_for_status()`** — זורק שגיאה ל-4xx/5xx
4. **שלושה except שונים** — לכל סוג שגיאה
5. **`time.sleep(2)`** — חובה בין retries

### הדמו

הרץ את safe_researcher.py, ואז **כבה את ה-Wi-Fi מיד אחרי שלחצת Enter**. תראה את ה-retry בפעולה:

```
⚠️ בעיית רשת בניסיון 1. ממתין 2 שניות...
⚠️ בעיית רשת בניסיון 2. ממתין 2 שניות...
❌ נכשלו 3 ניסיונות.
```

תדליק את ה-Wi-Fi חזרה.

---

## חלק 5: Git workflow יומי (30 דקות)

### הגדרה חד-פעמית

```bash
git config --global user.name "Shai Berdugo"
git config --global user.email "selectedsem@gmail.com"
```

### 5 פקודות יומיות

```bash
git status              # מה השתנה
git diff                # מה בדיוק השינויים
git add <file>          # אני רוצה לכלול את זה
git commit -m "..."     # נקודת שמירה
git push                # שלח ל-GitHub
```

### כללי commit messages

- פועל בהווה ("Add X", לא "Added X")
- עד 70 תווים בשורה הראשונה
- למה, לא מה
- קומיט אחד = שינוי לוגי אחד

### מה לעולם לא לעשות

- `git push --force` ל-main
- `git commit -m "asdf"`
- קומיט של API keys / .env

---

## חלק 6: Review (15 דקות)

### 4 שאלות

1. בקוד הבא, מה יודפס אם status_code = 200?
   ```python
   if response.status_code == 200:
       user = response.json()
       print(user["name"])
   ```
   **תשובה:** שם המשתמש מהשדה `name` ב-JSON.

2. ההבדל בין GET ל-POST?
   **תשובה:** GET = קריאה (פרמטרים ב-URL). POST = פעולה/יצירה (data ב-body).

3. בקוד הבא — מה יקרה אם הרשת תיפול?
   ```python
   try:
       response = requests.get(url, timeout=10)
   except requests.exceptions.ConnectionError:
       data = None
   ```
   **תשובה:** השגיאה תיתפס, `data = None`, הסקריפט ימשיך בלי לקרוס.

4. הפקודה שמראה מה השתנה אבל עוד לא נשמר?
   **תשובה:** `git status` (רשימת קבצים) + `git diff` (השינויים עצמם).

### Git commit סופי

```bash
cd ~/projects/vibe-master-academy
git add exercises/lesson-03 PROGRESS.md
git commit -m "Lesson 3 — APIs + error handling + Git daily workflow"
git push
```

---

## Checkpoint

- [ ] אני מבין GET/POST/status code
- [ ] `wiki_summary.py` רץ עם 3 נושאים שונים
- [ ] `topic_researcher.py` משלב Wikipedia + Claude
- [ ] `safe_researcher.py` עובד גם כשמכבים Wi-Fi
- [ ] הגדרתי `git config` ומכיר status/diff/add/commit/push
- [ ] commit + push של שיעור 3 בוצעו
