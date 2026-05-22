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

**מתי זה באמת שימושי?** דמיין שאתה מקבל נתונים מ-API חיצוני, וחלק מהלקוחות לא מילאו את כל השדות:

```python
client = {"name": "מנגו", "traffic": 45000}   # אין conversion_rate!

# גישה ישירה — תקרוס:
# print(client["conversion_rate"])   # KeyError: 'conversion_rate'

# .get() עם ערך ברירת מחדל — לא קורס:
cvr = client.get("conversion_rate", 0.0)
print(f"CVR של {client['name']}: {cvr}%")   # CVR של מנגו: 0.0%
```

**כלל אצבע:** כשאתה לא בטוח שהשדה קיים — תמיד `.get()`.

---

### List לעומת Dict

| מבנה | סוגריים | גישה לפי | מתי משתמשים |
|------|---------|----------|------------|
| `list` | `[...]` | אינדקס מספרי | רשימת ערכים סדורים |
| `dict` | `{...}` | שם (key) | אובייקט עם שדות בשם |

---

### iteration על dict — איך עוברים על כל הזוגות

לפעמים אתה רוצה לעבור על כל הזוגות key-value ב-dict. יש 3 דרכים:

```python
client = {"name": "מנגו", "traffic": 45000, "industry": "fashion"}

# 1. רק keys
for key in client.keys():
    print(key)          # name, traffic, industry

# 2. רק values
for value in client.values():
    print(value)        # מנגו, 45000, fashion

# 3. שניהם יחד — הכי שימושי
for key, value in client.items():
    print(f"{key}: {value}")
    # name: מנגו
    # traffic: 45000
    # industry: fashion
```

**הנפוץ ביותר:** `client.items()` — נותן זוגות (key, value) שאפשר לפרק ישירות לשני משתנים.

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

### `return` לעומת `print` — ההבדל הקריטי

זו אחת השאלות הראשונות שמבלבלות כל מתחיל. ההבדל פשוט אבל חשוב:

- **`print`** — *מציג* ערך על המסך. הוא לא מחזיר כלום שאפשר להשתמש בו אחר כך.
- **`return`** — *מחזיר* ערך מהפונקציה. אפשר לשמור אותו במשתנה ולהשתמש בו.

דוגמה להמחשה:

```python
def add_with_print(a, b):
    print(a + b)        # מציג על המסך — לא מחזיר כלום

def add_with_return(a, b):
    return a + b        # מחזיר את הערך

# שימוש:
add_with_print(2, 3)    # מדפיס: 5
result = add_with_print(2, 3)
print(result)           # מדפיס: None — כי אין return!

result = add_with_return(2, 3)
print(result)           # מדפיס: 5 — return החזיר את הערך
print(result * 2)       # מדפיס: 10 — אפשר להשתמש בערך הלאה
```

**כלל אצבע:** פונקציות צריכות `return`. `print` הוא רק ל-debug או להדפסה למשתמש.

---

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

### לפני התרגיל — מה זה `lambda`?

בתרגיל בעוד רגע נשתמש בפונקציה `sorted()` עם משהו שנראה כך: `key=lambda c: c["traffic"]`.

**`lambda` היא דרך מקוצרת לכתוב פונקציה קטנה בשורה אחת.**

הנה ההשוואה:

```python
# הדרך הרגילה — פונקציה מלאה
def get_traffic(client):
    return client["traffic"]

# הדרך המקוצרת — lambda
get_traffic = lambda client: client["traffic"]

# שתי הגרסאות עושות בדיוק את אותו דבר
```

**איך קוראים את זה?**
- `lambda` — מילת מפתח שמכריזה: "אני פונקציה קטנה"
- `client` — שם הפרמטר (כל שם, תבחר)
- `:` — מפריד בין הפרמטר לבין מה שמחזירים
- `client["traffic"]` — הערך שמוחזר (אין צורך לכתוב `return`)

**איפה משתמשים?** בעיקר עם פונקציות שמקבלות פונקציה אחרת כפרמטר — כמו `sorted()`, `map()`, `filter()`:

```python
clients = [
    {"name": "מנגו", "traffic": 45000},
    {"name": "סופר ביץ'", "traffic": 32000},
    {"name": "ננו", "traffic": 67000}
]

# למיין לפי traffic — צריך לציין לפי איזה שדה
sorted_clients = sorted(clients, key=lambda c: c["traffic"])

# התוצאה: ננו (32000) → סופר ביץ' → ננו (67000)
```

עכשיו אתה מוכן לתרגיל.

---

## חלק 4: תרגול — Top Clients (1 שעה)

### רענון מחלקים 1-3

נשתמש ב-list, dict, ו-json יחד עכשיו.

### המטרה

צור קובץ: `exercises/lesson-02/top_clients.py`

בתיקיה `exercises/lesson-02/` כבר יש קובץ `clients.json` עם 8 לקוחות SEO (מגיע עם הריפו של הקורס). קרא אותו, מיין לפי תנועה, והדפס את 5 הטובים.

**לפני שמתחילים — היכנס לתיקיית התרגיל:**

```bash
cd ~/projects/vibe-master-academy/exercises/lesson-02
ls       # אמור להופיע: clients.json
```

אם `clients.json` לא מופיע — עשה `git pull` בשורש הריפו ונסה שוב.

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

**רמז 1 — איך פותחים את הקובץ?** Python דורש שתפתח קובץ לקריאה לפני שאתה יכול להעביר אותו ל-`json.load()`. השתמש ב-`with open(...) as f:` — `with` מבטיח שהקובץ ייסגר אוטומטית גם אם תהיה שגיאה.

**רמז 2 — איך ממיינים רשימה לפי שדה ב-dict?** הפונקציה `sorted()` מקבלת פרמטר `key` שאומר לה לפי מה למיין. עבור רשימה של dicts, נשתמש ב-lambda (שכרגע למדנו) כדי לבחור איזה שדה לבדוק. כדי למיין מהגבוה לנמוך — תוסיף `reverse=True`.

**רמז 3 — איך לוקחים רק את 5 הראשונים?** רשימות תומכות ב-slicing. `[start:end]` מחזיר חתיכה. כדי לקבל את 5 הראשונים בלבד — `[:5]`.

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
