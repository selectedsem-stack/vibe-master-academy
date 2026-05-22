# Lesson 1 — Python יום ראשון

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

### Terminal — לפני שמתחילים

ה-Terminal הוא חלון שבו אתה מקליד פקודות ישירות למחשב. **5 פקודות שתשתמש בהן בלי הפסקה:**

| פקודה | מה היא עושה | דוגמה |
|--------|--------------|--------|
| `pwd` | מציג את התיקייה הנוכחית | `pwd` → `/Users/shai` |
| `ls` | מציג את הקבצים בתיקייה | `ls` |
| `cd <תיקייה>` | נכנס לתיקייה | `cd projects` |
| `cd ~` | חוזר לתיקיית הבית שלך | `~` = home directory |
| `mkdir <שם>` | יוצר תיקייה חדשה | `mkdir my-folder` |

**טיפ חשוב:** הסימן `~` תמיד מצביע על תיקיית הבית של המשתמש שלך (במאק: `/Users/SHEMSHELCHA`). אז `cd ~/projects` = "לך לתיקיית projects שבתוך הבית שלי".

**אם פקודה לא עובדת:** קרא את הודעת השגיאה. `command not found` = הכלי לא מותקן. `Permission denied` = חסרות הרשאות (נסה להוסיף `sudo` לפני הפקודה, יבקש סיסמה).

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

אם אין לך VS Code — בחר אפשרות אחת:

**אפשרות א' (מומלץ):** דרך Homebrew:

```bash
brew install --cask visual-studio-code
```

**אפשרות ב':** הורד מ-[code.visualstudio.com/download](https://code.visualstudio.com/download) וגרור את האפליקציה ל-Applications.

אחרי ההתקנה — פתח את VS Code. בצד שמאל יש סמל של אפליקציות (extensions). לחץ עליו, חפש **Python**, ולחץ Install על ה-extension של **Microsoft**.

#### הפעלת פקודת `code` ב-Terminal

כדי שתוכל להריץ `code <קובץ>` מה-Terminal ולפתוח קובץ ב-VS Code, צריך להוסיף את הפקודה ל-**PATH** (משתנה הסביבה שאומר ל-shell איפה לחפש פקודות). **בלי הצעד הזה — תקבל `command not found: code`**.

1. בתוך VS Code, לחץ **Cmd+Shift+P** (Command Palette).
2. הקלד: `shell command`
3. בחר ברשימה: **Shell Command: Install 'code' command in PATH**
4. **סגור ופתח מחדש את ה-Terminal** (שינוי PATH לא תופס בחלון פתוח).
5. בדוק שזה עובד:

```bash
code --version
```

אמור להופיע מספר גרסה (למשל `1.95.x`). ✅

**אם `code` עדיין לא נמצא**, הוסף ידנית ל-PATH:

```bash
echo 'export PATH="$PATH:/Applications/Visual Studio Code.app/Contents/Resources/app/bin"' >> ~/.zprofile
source ~/.zprofile
code --version
```

---

### שלב 3: יוצרים את הסקריפט הראשון

ב-Terminal:

```bash
cd ~/projects/vibe-master-academy
mkdir -p exercises/lesson-01
cd exercises/lesson-01
code hello.py
```

זה יפתח את VS Code עם קובץ חדש בשם `hello.py`.

> **אם `code hello.py` לא עובד:** חזור לשלב 2 ובצע את ההפעלה של הפקודה `code`. חלופה זמנית: פתח את VS Code ידנית, **File → Open Folder** → בחר את `~/projects/vibe-master-academy/exercises/lesson-01`, ואז **File → New File** → שמור בשם `hello.py`.

הכנס לתוכו:

```python
print("Hello, Shai!")
print("This is my first Python script.")
```

שמור (Cmd+S).

חזור ל-Terminal, וב-`exercises/lesson-01/` הרץ:

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

**הערה על print:** הפסיק בין הארגומנטים (`"שלום", name`) גורם ל-Python להוסיף רווח אוטומטית בין הערכים.

### f-strings — הדרך המודרנית להדפיס

יש דרך יותר נקייה לשלב משתנים בטקסט — **f-string**:

```python
name = "Shai"
print(f"שלום, {name}!")            # שלום, Shai!
print(f"השם שלך הוא {name}, נכון?")  # השם שלך הוא Shai, נכון?
```

ה-`f` לפני הגרשיים אומר ל-Python: "זה לא טקסט רגיל, תחפש משתנים בתוך `{}` והחלף אותם בערכים שלהם". זה הסטנדרט המודרני — תשתמש בו לאורך הקורס.

### הערות

הערות הן טקסט בקוד שה-Python מתעלם ממנו. הן בשבילך, לזכור מה הקוד עושה:

```python
# זאת הערה — לא משפיעה על ההרצה
name = "Shai"   # זאת גם הערה, אחרי קוד
```

**הרגל מצוין:** הוסף הערה לפני כל שורה לא טריוויאלית. עוד שנה תודה לעצמך.

### אינדנטציה — הסוד של Python

ב-Python, **רווחים בתחילת השורה הם משמעותיים**. שלא כמו בשפות אחרות שמשתמשות ב-`{ }`, Python מסתמך על אינדנטציה כדי להבין מה שייך לאן.

לדוגמה, ב-`if`:

```python
age = 18
if age >= 18:
    print("מבוגר")          # 4 רווחים בהתחלה
    print("יכול להצביע")     # אותם 4 רווחים — באותו הבלוק
print("זה לא תלוי בגיל")    # אין רווחים — מחוץ לבלוק
```

**שגיאה ראשונה של כל מתחיל ב-Python:** `IndentationError`. אם תקבל את זה — תבדוק את הרווחים. השתמש תמיד ב-4 רווחים, לא tabs.

ב-VS Code, אם תלחץ Tab, הוא יהפוך אותו לרווחים אוטומטית (זה הסטנדרט).

---

## חלק 3: תרגול (1.5 שעות)

### תרגיל: מה הדומיין של URL?

צור קובץ חדש: `exercises/lesson-01/domain_extractor.py`

המטרה: סקריפט שמקבל URL מהמשתמש ומדפיס רק את הדומיין.

**דוגמה לתפעול:**
```
הכנס URL: https://www.beatport.com/genre/techno
הדומיין הוא: beatport.com
```

**רמז 1:** חשוב על השלבים. ה-URL הוא `https://www.beatport.com/genre/techno`. מה צריך להסיר כדי להישאר עם `beatport.com`?

**רמז 2:** מחרוזות ב-Python יש להן מתודה `.replace(old, new)` שמחליפה חלק אחד באחר. אם רוצים *להסיר* משהו — מחליפים אותו במחרוזת ריקה `""`.

**רמז 3:** אחרי שהסרת את `https://` ו-`www.`, נשארת לך מחרוזת כמו `beatport.com/genre/techno`. מתודה `.split("/")` מחזירה רשימה כשהיא חותכת בסלאש. האיבר הראשון ברשימה (אינדקס `[0]`) הוא הדומיין.

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

## checkpoint לסוף שיעור 1

- [ ] Python 3.12 מותקן על המאק
- [ ] VS Code עם extension של Python
- [ ] `hello.py` רץ והדפיס שלום
- [ ] `domain_extractor.py` עובד עם 3 URLs לפחות
- [ ] PROGRESS.md מעודכן
- [ ] git commit + push

**כשכל אלה ✅ — אתה מוכן ל-Lesson 2.**
