# Lesson 1 — Python יום ראשון

**זמן צפוי:** 3 שעות
**גישה:** Vibe coder — קוראים סקריפטים מוכנים, מבינים, ומשנים. לא כותבים מאפס.
**שלוש דוגמאות:** `greet.py`, `domain_extractor.py`, `ask_claude.py` (זה שמדבר עם Claude API).

---

## חלק 1: Setup (45 דקות)

### מה זה Python בכלל?

Python היא שפת תכנות. כשאתה כותב קוד Python, אתה כותב הוראות למחשב בשפה שיחסית קלה לבני אדם לקרוא. קובץ Python מסתיים ב-`.py` ומריצים אותו מה-Terminal.

```python
print("Hello, Shai!")
```

זאת שורה אחת — היא מבקשת מהמחשב להדפיס את המילים האלה למסך.

### Terminal — שלוש פקודות שתשתמש בהן כל הזמן

| פקודה | מה היא עושה |
|--------|--------------|
| `pwd` | מציגה את התיקייה הנוכחית |
| `ls` | מציגה את הקבצים בתיקייה |
| `cd <תיקייה>` | נכנסת לתיקייה. `cd ~` חוזר לתיקיית הבית. |

### 3 הצעדים

#### צעד 1 — התקנת Python

פתח את ה-Terminal (Cmd+Space → "Terminal"):

```bash
brew install python@3.12
```

אם brew לא מותקן, התקן קודם:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

בדיקה:

```bash
python3 --version
```

צריך להופיע: `Python 3.12.x`.

#### צעד 2 — VS Code

```bash
brew install --cask visual-studio-code
```

אחרי ההתקנה: פתח את VS Code, לחץ על סמל ה-extensions בצד שמאל, חפש "Python", התקן את ה-extension של Microsoft.

**הפעלת פקודת `code`:**
1. VS Code → Cmd+Shift+P
2. הקלד `shell command` ובחר "Shell Command: Install 'code' command in PATH"
3. סגור את חלון ה-Terminal הפתוח ופתח חדש
4. `code --version` — צריך לראות גרסה.

#### צעד 3 — הסקריפט הראשון

```bash
cd ~/projects/vibe-master-academy
mkdir -p exercises/lesson-01
cd exercises/lesson-01
code hello.py
```

ב-VS Code:

```python
print("Hello, Shai!")
print("This is my first Python script.")
```

שמור (Cmd+S). הרץ:

```bash
python3 hello.py
```

צריך לראות את שתי השורות מודפסות. 🎉

---

## חלק 2: דוגמה 1 — `greet.py` (30 דקות)

הקובץ `exercises/lesson-01/greet.py` כבר נמצא בריפו. פתח אותו:

```bash
code exercises/lesson-01/greet.py
```

**התוכן:**

```python
# greet.py — סקריפט Python ראשון שמדבר איתך

name = input("מה השם שלך? ")
age_text = input("בן כמה אתה? ")

age = int(age_text)

print(f"שלום {name}!")
print(f"בעוד 10 שנים תהיה בן {age + 10}.")
```

### קוראים שורה־שורה

- **שורה 1:** הערה (`#`). Python מתעלם.
- **שורות 3-4:** `input(...)` שואל את המשתמש, מחזיר טקסט (str). שומרים במשתנה.
- **שורה 6:** `int(age_text)` ממיר מחרוזת למספר. בלי זה — שגיאה כשנעשה `age + 10` (כי str+int לא עובד).
- **שורות 8-9:** `f-string` — בתוך `{}` Python שם את הערך של המשתנה. אפשר גם חישובים: `{age + 10}`.

**העיקרון:** כל ערך ב-Python יש לו טיפוס (str, int, float, bool). לא חשוב לזכור את הסינטקס — חשוב לזהות שגיאות טיפוס כשהן צצות.

### הרצה

```bash
python3 greet.py
```

### המשימה

פתח את `greet.py`, שנה את "10" ל-"25", שמור, הרץ שוב.

---

## חלק 3: דוגמה 2 — `domain_extractor.py` (30 דקות)

```bash
code exercises/lesson-01/domain_extractor.py
```

**התוכן:**

```python
# domain_extractor.py — מקבל URL ומחזיר רק את הדומיין

url = input("הכנס URL: ")

url = url.replace("https://", "").replace("http://", "")
url = url.replace("www.", "")

domain = url.split("/")[0]

print(f"הדומיין הוא: {domain}")
```

### קוראים שורה־שורה

- **שורה 3:** קלט מהמשתמש.
- **שורה 5:** `.replace(X, "")` — מסיר את X מהמחרוזת. שרשור של שתי קריאות כדי להסיר גם https וגם http.
- **שורה 6:** מסירים `www.` באותה דרך.
- **שורה 8:** `url.split("/")` חותך את המחרוזת לרשימה לפי "/". `[0]` לוקח את האיבר הראשון — הדומיין.

**העיקרון:** `.replace(X, "")` = "תסיר את X". זה דפוס שתפגוש בכל פעם שתעבד טקסט.

### על slicing (לא לזכור)

תחביר כמו `s[0:5]` או `s[-4:]` הוא slicing — לקיחת חתיכה ממחרוזת. **לא צריך לזכור.** כשתצטרך, Claude יכתוב.

### הרצה

```bash
python3 domain_extractor.py
```

נסה עם:
- `https://www.beatport.com/genre/techno` → `beatport.com`
- `http://example.com/about` → `example.com`
- `https://selected.co.il` → `selected.co.il`

### המשימה

הסקריפט לא מסיר UTM params (`?utm_source=...`). הוסף שורה אחת לפני `split("/")[0]`:

```python
url = url.split("?")[0]
```

---

## חלק 4: דוגמה 3 — Python מדבר עם Claude ⭐ (45 דקות)

זה החלק הכי חשוב בשיעור. מכאן והלאה Python שלך לא רק מדפיס טקסט — הוא מדבר עם Claude.

### 4.1 קבלת API key

1. `console.anthropic.com` → הירשם.
2. Settings → Billing → הוסף $5 קרדיט (מינימום).
3. Settings → API Keys → Create Key. **העתק מיד** (יוצג רק פעם אחת).

⚠️ **אל תפרסם את ה-key.** הקובץ `.env` ב-`.gitignore` של הריפו — שם הוא ישב.

### 4.2 התקנת חבילות

```bash
pip3 install anthropic python-dotenv
```

- `anthropic` — ה-SDK הרשמי לדבר עם Claude.
- `python-dotenv` — קוראת את ה-key מהקובץ `.env`.

### 4.3 קובץ `.env`

```bash
cd ~/projects/vibe-master-academy/exercises/lesson-01
code .env
```

הדבק (החלף את ה-X-ים ב-key האמיתי):

```
ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxxxxxxxxxxxxxxxxxxxx
```

ללא מרכאות, ללא רווחים סביב ה-`=`.

### 4.4 הקוד

```bash
code exercises/lesson-01/ask_claude.py
```

**התוכן:**

```python
import os
from dotenv import load_dotenv
from anthropic import Anthropic

load_dotenv()

client = Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])

question = input("מה לשאול את Claude? ")

response = client.messages.create(
    model="claude-haiku-4-5",
    max_tokens=1024,
    system="אתה עוזר ידידותי שעונה בעברית, בצורה קצרה וברורה.",
    messages=[
        {"role": "user", "content": question}
    ]
)

answer = response.content[0].text
print("\nClaude עונה:\n")
print(answer)
```

### 4.5 קוראים את הקוד (לזיהוי, לא לזיכרון)

- **שורות 1-3:** `import` — מביאים כלים. `os` קורא משתני סביבה. `dotenv` ו-`anthropic` הן החבילות שהתקנו.
- **שורה 5:** `load_dotenv()` טוענת את `.env` לזיכרון.
- **שורה 7:** יוצרים `client` — אובייקט שיודע לדבר עם Claude. ה-key נשלף ממשתני הסביבה.
- **שורות 11-18:** הקריאה עצמה. ארבעה דברים לזהות:
  - `model` — איזה מודל (`claude-haiku-4-5` = זול ומהיר).
  - `max_tokens` — אורך תשובה מקסימלי.
  - `system` — "האישיות" של Claude לשיחה הזו.
  - `messages` — השיחה עצמה. כאן הודעה אחת מהמשתמש.
- **שורה 20:** `response.content[0].text` — מחלצים את הטקסט מהאובייקט שחזר.

### 4.6 הרצה

```bash
python3 ask_claude.py
```

שאל משהו — Claude יענה.

### המשימה

שנה את `system` ל:

```python
system="אתה יועץ SEO בכיר עם 15 שנות ניסיון. אתה עונה בעברית, בצורה ישירה, ותמיד נותן 3 צעדים פרקטיים שאפשר לבצע מיד.",
```

הרץ שוב את אותה שאלה. שים לב איך התשובה שונה.

**העיקרון:** שינוי system prompt = 90% מבניית AI agents. כל סוכן AI שתבנה בקורס יתבסס על זה.

---

## חלק 5: Review (15 דקות)

### 3 שאלות "מה הקוד הזה עושה?"

**שאלה 1:** אם המשתמש הקליד `"  SHAI  "` בקוד הבא, מה יודפס?

```python
name = input("שם: ")
print(f"שלום {name.strip().lower()}")
```

<details>
<summary>תשובה</summary>

`שלום shai`. `.strip()` הסיר רווחים בקצוות. `.lower()` הפך לאותיות קטנות.
</details>

**שאלה 2:** מה ההבדל בין השורות?

```python
age = input("גיל: ")
age = int(input("גיל: "))
```

<details>
<summary>תשובה</summary>

הראשונה — `age` הוא str. השנייה — `age` הוא int אחרי המרה. בלי המרה לא ניתן לעשות חשבון.
</details>

**שאלה 3:** מה הופך את הקריאה ל-Claude ל"יועץ SEO" ולא לסתם תשובה?

<details>
<summary>תשובה</summary>

ה-`system` prompt. הוא מגדיר את ההתנהגות והפרספקטיבה של Claude לשיחה.
</details>

### עדכן את PROGRESS.md

מלא: שעות בפועל, קושי (1-5), הערות.

### Git commit

```bash
cd ~/projects/vibe-master-academy
git add exercises/lesson-01 PROGRESS.md
git commit -m "Lesson 1 — Python setup + 3 demo scripts (incl. Claude API)"
git push
```

---

## Checkpoint

- [ ] Python 3.12 + VS Code מותקנים, `hello.py` רץ
- [ ] `greet.py` רץ + עדכנתי את ההודעה האחרונה
- [ ] `domain_extractor.py` רץ עם 3 URLs שונים
- [ ] `ask_claude.py` שלח שאלה ל-Claude וקיבל תשובה אמיתית
- [ ] שיניתי את ה-system prompt וראיתי איך התשובה השתנתה
- [ ] `PROGRESS.md` מעודכן + git commit + push
