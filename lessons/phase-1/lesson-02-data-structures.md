# Lesson 2 — מבני נתונים + JSON

**זמן צפוי:** 5 שעות
**מטרה:** בסוף השיעור Shai יודע: רשימות (lists), מילונים (dicts), פונקציות פשוטות, ויודע לקרוא ולכתוב JSON.

---

## חלק 1: Lists & Dicts (1.5 שעות)

### רענון מ-Lesson 1

למדנו על משתנים — `name = 'Shai'`. עכשיו נראה איך לאחסן **הרבה ערכים יחד**.

---

### מה זה List (רשימה)?

List היא אוסף סדור של ערכים, בסוגריים מרובעים:

```python
clients = ["מנגו", "סופר ביץ'", "קליניקת רימון"]
```

#### אינדקסים — Python מתחיל מ-0

```python
print(clients[0])   # מנגו
print(clients[1])   # סופר ביץ'
print(clients[2])   # קליניקת רימון
```

#### הוספת איברים

```python
clients.append("לקוח חדש")
print(len(clients))   # 4 — אורך הרשימה
```

#### Slicing — חיתוך רשימה

```python
first_two = clients[:2]     # ["מנגו", "סופר ביץ'"]
last_one  = clients[-1]     # הפריט האחרון
```

---

### מה זה Dict (מילון)?

Dict הוא אוסף של זוגות key-value, בסוגריים מסולסלים:

```python
client = {"name": "מנגו", "traffic": 45000, "industry": "fashion"}
```

#### גישה לפי key

```python
print(client["name"])       # מנגו
print(client["traffic"])    # 45000
```

#### .get() — גישה בטוחה

```python
# אם הkey לא קיים, מחזיר None במקום לזרוק שגיאה
print(client.get("conversion_rate"))        # None
print(client.get("conversion_rate", 0.0))   # 0.0 — ערך ברירת מחדל
```

---

### List לעומת Dict

| מבנה | סוגריים | גישה לפי | מתי משתמשים |
|------|---------|----------|------------|
| `list` | `[...]` | אינדקס מספרי | רשימת ערכים סדורים |
| `dict` | `{...}` | שם (key) | אובייקט עם שדות בשם |

---

## חלק 2: Functions (1 שעה)

### למה צריך פונקציות? (עיקרון DRY)

DRY = Don't Repeat Yourself. במקום לכתוב את אותו קוד 10 פעמים, כותבים אותו פעם אחת בפונקציה.

### syntax בסיסי

```python
def שם_הפונקציה(פרמטר1, פרמטר2):
    # קוד כאן
    return תוצאה
```

### דוגמה: חישוב ציון לקוח SEO

```python
def calculate_score(traffic, cvr):
    """מחשב ציון לקוח לפי תנועה ורייט המרה."""
    return traffic * cvr

# קריאה לפונקציה
score = calculate_score(45000, 2.3)
print(score)   # 103500.0
```

### פונקציה שמדפיסה תוצאה

```python
def print_client(client):
    name = client["name"]
    traffic = client["traffic"]
    print(f"{name}: {traffic:,} ביקורים")

client = {"name": "מנגו", "traffic": 45000}
print_client(client)   # מנגו: 45,000 ביקורים
```

---

## חלק 3: JSON (1 שעה)

### מה זה JSON?

JSON (JavaScript Object Notation) הוא פורמט טקסט לחילופי מידע. **כל ה-APIs בעולם כמעט מדברים JSON.**

JSON נראה כמו dict ב-Python, אבל הוא טקסט רגיל — ולכן עובד בכל שפה.

```json
{
  "name": "מנגו",
  "traffic": 45000,
  "conversion_rate": 2.3
}
```

### קריאת JSON מקובץ

```python
import json

# json.load מקבל file object — לכן צריך לפתוח קובץ קודם
with open("clients.json", "r", encoding="utf-8") as f:
    clients = json.load(f)

print(type(clients))   # <class 'list'>
print(clients[0])      # {'name': 'מנגו', 'traffic': 45000, ...}
```

### כתיבת Python → JSON string

```python
import json

data = {"name": "Shai", "role": "Head of SEO"}
json_string = json.dumps(data, ensure_ascii=False, indent=2)
print(json_string)
```

פלט:
```json
{
  "name": "Shai",
  "role": "Head of SEO"
}
```

---

## חלק 4: תרגול — Top Clients (1 שעה)

### רענון מחלקים 1-3

נשתמש ב-list, dict, ו-json יחד עכשיו.

### המטרה

צור קובץ: `exercises/lesson-02/top_clients.py`

בתיקיה `exercises/lesson-02/` יש קובץ `clients.json` עם 8 לקוחות SEO. קרא אותו, מיין לפי תנועה, והדפס את 5 הטובים.

**תוצאה צפויה:**
```
קוסמטיקה ננו: 67,000 ביקורים
מנגו: 45,000 ביקורים
סטודיו דיו: 22,000 ביקורים
סופר ביץ': 32,000 ביקורים
אגד נדל"ן: 15,000 ביקורים
```

**אל תפתח את Claude עדיין.** נסה לבד 30 דקות לפחות.

---

**רמז 1:** השתמש ב-`with open(...) as f:` + `json.load(f)` כדי לקרוא את הקובץ.

**רמז 2:** `sorted(clients, key=lambda c: c["traffic"], reverse=True)` ממיין רשימה של dicts לפי שדה.

**רמז 3:** השתמש ב-slicing `[:5]` כדי לקבל את החמישה הראשונים.

---

### פתרון (אחרי שניסית!)

```python
import json

# קריאת הקובץ
with open("clients.json", "r", encoding="utf-8") as f:
    clients = json.load(f)

# מיון לפי תנועה — מהגבוה לנמוך
top_5 = sorted(clients, key=lambda c: c["traffic"], reverse=True)[:5]

# הדפסת התוצאות
for client in top_5:
    print(f"{client['name']}: {client['traffic']:,} ביקורים")
```

הרץ מתיקיית `exercises/lesson-02/`.

---

## חלק 5: Review (30 דקות)

### 3 שאלות לפני שאתה ממשיך

ענה לעצמך (בלי לגלול חזרה):

1. מה ההבדל בין list לdict?
2. למה משתמשים ב-`.get()` במקום `[...]` כשניגשים למפתח בdict?
3. למה `json.load` דורש קובץ פתוח (file object) ולא רק שם של קובץ?

---

### עדכן את PROGRESS.md

פתח `PROGRESS.md` בשורש הפרויקט. סמן ✅ ליד הסעיפים של Lesson 2. מלא:
- **שעות בפועל:** כמה זמן זה לקח באמת
- **קושי (1-5):** סובייקטיבי
- **הערות:** מה הפתיע, מה לא היה ברור, מה רצית עוד

---

## checkpoint לסוף שיעור 2

- [ ] list בפעולה — נגשת לפי אינדקס והוספת עם append
- [ ] dict בפעולה — נגשת לפי key והשתמשת ב-.get()
- [ ] פונקציה ראשונה — כתבת def משלך עם return
- [ ] קריאת JSON — json.load רץ בהצלחה
- [ ] התרגיל top_clients רץ ומדפיס 5 לקוחות
- [ ] git commit + push

**כשכל אלה ✅ — אתה מוכן ל-Lesson 3 (APIs + Git + Errors).**
