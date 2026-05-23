# Lesson 2 — Data + AI

**זמן צפוי:** 3.5 שעות
**גישה:** Vibe coder — קוראים סקריפטים מוכנים, מבינים, ומשנים.
**הפרויקט:** advisor SEO שמשלב נתוני לקוחות עם Claude לקבלת המלצות מותאמות אישית.

---

## חלק 1: רקע — איך data נראה ב-Python (30 דקות)

### List — רשימה

```python
clients = ["מנגו", "סופר ביץ'", "קליניקת רימון"]
print(clients[0])      # 'מנגו' — ספירה מ-0!
print(clients[-1])     # 'קליניקת רימון'
print(len(clients))    # 3
```

### Dict — מילון

```python
client = {
    "name": "מנגו",
    "traffic": 45000,
    "industry": "fashion",
    "has_blog": True,
}
print(client["name"])      # 'מנגו'
print(client["traffic"])   # 45000
```

### list של dicts — הצורה הנפוצה ביותר

```python
clients = [
    {"name": "מנגו",      "traffic": 45000, "industry": "fashion"},
    {"name": "סופר ביץ'",  "traffic": 32000, "industry": "ecommerce"},
]
clients[1]["name"]      # 'סופר ביץ''
clients[0]["traffic"]   # 45000
```

**העיקרון:** כמעט כל data ב-Python ובכל APIs (כולל Claude) הוא list של dicts.

---

## חלק 2: דוגמה 1 — read_clients.py (45 דקות)

הקובץ `exercises/lesson-02/clients.json` כבר בריפו — 8 לקוחות עם 8 שדות לכל אחד.

```python
import json

with open("clients.json", encoding="utf-8") as f:
    clients = json.load(f)

sorted_clients = sorted(clients, key=lambda c: c["traffic"], reverse=True)
top_5 = sorted_clients[:5]

print(f"🏆 Top 5 (מתוך {len(clients)}):\n")
for client in top_5:
    print(f"  {client['name']:<20} {client['traffic']:>8,} ביקורים  ·  {client['industry']}")
```

### קוראים שורה־שורה

- `with open(...) as f:` — context manager. נסגר אוטומטית.
- `json.load(f)` — קורא JSON, מחזיר list/dict של Python.
- `sorted(..., key=lambda c: c["traffic"], reverse=True)` — ממיין לפי שדה. lambda = פונקציה מקוצרת. **לזהות, לא לזכור.**
- `sorted_clients[:5]` — slicing.
- `for client in top_5:` — איטרציה.

### הרצה

```bash
cd ~/projects/vibe-master-academy/exercises/lesson-02
python3 read_clients.py
```

### המשימה
1. שנה ל-Top 3.
2. מיין לפי `conversion_rate` במקום `traffic`.

---

## חלק 3: דוגמה 2 — analyze_client.py + פונקציות (45 דקות)

```python
def analyze_client(client: dict) -> dict:
    """מנתח לקוח אחד ומחזיר דוח SEO מבוסס-כללים."""
    score = 50
    recommendations = []

    if client["traffic"] >= 50000:
        score += 25
    elif client["traffic"] >= 20000:
        score += 15
    else:
        recommendations.append("תנועה נמוכה — נדרשת אסטרטגיית תוכן")

    if not client["has_blog"]:
        recommendations.append("אין בלוג. בלוג יכול להעלות תנועה ב-30-50%")

    return {
        "client_name": client["name"],
        "score": min(score, 100),
        "recommendations": recommendations,
    }
```

### חתימת הפונקציה — 4 דברים לזהות

- `def analyze_client` — שם
- `(client: dict)` — מקבלת dict
- `-> dict` — מחזירה dict
- `"""..."""` = docstring (תיעוד)

### גוף הפונקציה

- `if / elif / else` — סדר חשוב, Python עוצר בראשון שמתקיים.
- `score += 25` = `score = score + 25`.
- `recommendations.append(...)` — מוסיף איבר לסוף list.
- `min(score, 100)` — שומר את הציון בטווח.

### המשימה

הוסף כלל חמישי: אם `industry == "ecommerce"` ואין בלוג, הוסף המלצה מיוחדת.

```python
if client["industry"] == "ecommerce" and not client["has_blog"]:
    recommendations.append("באתרי ecommerce, בלוג עם guides ו-comparison posts הוא הכרחי")
```

---

## חלק 4: דוגמה 3 — seo_advisor.py ⭐ (75 דקות)

הפרויקט המלא: לקוחות → Claude → המלצות לקובץ.

```python
import json
import os
from dotenv import load_dotenv
from anthropic import Anthropic

load_dotenv("../lesson-01/.env")
claude = Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])


def get_seo_advice(client_data: dict) -> str:
    prompt = f"""נתוני לקוח SEO:
- שם: {client_data['name']}
- דומיין: {client_data['domain']}
- תנועה: {client_data['traffic']:,}
- תעשייה: {client_data['industry']}
- בלוג: {'כן' if client_data['has_blog'] else 'לא'}

תן 3 המלצות SEO ספציפיות, שורה לכל אחת."""

    response = claude.messages.create(
        model="claude-haiku-4-5",
        max_tokens=512,
        system="אתה יועץ SEO בכיר. עונה בעברית ממוקדת.",
        messages=[{"role": "user", "content": prompt}]
    )
    return response.content[0].text


with open("clients.json", encoding="utf-8") as f:
    clients = json.load(f)

all_recommendations = []
for c in clients:
    print(f"⏳ {c['name']}...")
    advice = get_seo_advice(c)
    all_recommendations.append({"client": c["name"], "advice": advice})

with open("recommendations.json", "w", encoding="utf-8") as f:
    json.dump(all_recommendations, f, ensure_ascii=False, indent=2)
```

### Setup לפני הרצה

```bash
pip3 install anthropic python-dotenv   # אם עוד לא מותקן
cd ~/projects/vibe-master-academy/exercises/lesson-02
python3 seo_advisor.py
```

הסקריפט ירוץ 30-60 שניות. ייווצר `recommendations.json`.

### המשימה — שדרוג ה-system prompt

```python
system="אתה יועץ SEO בכיר. החזר 3 המלצות במבנה:\n1. [המלצה] — מאמץ: נמוך/בינוני/גבוה — השפעה: נמוכה/בינונית/גבוהה\n2. ...\n3. ...",
```

הרץ שוב. הפלט הופך לשימושי בהרבה — **זה prompt engineering, 80% מהעבודה של AI builder**.

---

## חלק 5: Review (15 דקות)

### 3 שאלות

1. מה יודפס:
   ```python
   posts = [{"title": "A", "ctr": 2.1}, {"title": "B", "ctr": 4.5}]
   sorted_posts = sorted(posts, key=lambda p: p["ctr"], reverse=True)
   print(sorted_posts[0]["title"])
   ```
   **תשובה:** `"B"`.

2. מה מחזירה הפונקציה עבור `{"traffic": 80000, "has_blog": True}`?
   ```python
   def is_strong(client: dict) -> bool:
       return client["traffic"] > 50000 and client["has_blog"]
   ```
   **תשובה:** `True`.

3. הבדל בין `json.load(f)` ל-`json.dump(data, f)`?
   **תשובה:** load = קריאה לזיכרון. dump = כתיבה לקובץ.

### Git commit

```bash
cd ~/projects/vibe-master-academy
git add exercises/lesson-02 PROGRESS.md
git commit -m "Lesson 2 — SEO advisor pipeline working"
git push
```

---

## Checkpoint

- [ ] מזהה list בקוד ויודע לגשת לאיבר
- [ ] מזהה dict בקוד ויודע לגשת לערך לפי key
- [ ] `analyze_client.py` רץ + כלל חדש מתווסף
- [ ] `read_clients.py` רץ + שיניתי קריטריון מיון
- [ ] `seo_advisor.py` רץ עם Claude API ויצר `recommendations.json`
- [ ] שדרגתי system prompt + git commit + push
