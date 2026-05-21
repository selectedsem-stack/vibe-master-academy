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

משתנה הוא "תיבה" שמכילה ערך. ב-Python:

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

**כשכל אלה ✅ — אתה מוכן ל-Week 2.**
