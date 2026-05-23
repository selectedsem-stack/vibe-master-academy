# seo_advisor.py — מערכת SEO מלאה: לקוחות + Claude + שמירה לקובץ
# הרץ אותו עם:  python3 seo_advisor.py
#
# דורש:
#   1. clients.json בתיקייה הנוכחית
#   2. ה-.env מ-lesson-01 (load_dotenv מוצא אותו דרך הנתיב היחסי למטה)
#   3. pip3 install anthropic python-dotenv (בוצע בשיעור 1)
#
# המוצר:
#   recommendations.json — קובץ JSON עם המלצות SEO ספציפיות מ-Claude לכל לקוח

import json
import os
from dotenv import load_dotenv
from anthropic import Anthropic

# טוען .env מתיקיית lesson-01 (כאן יושב ה-API key מהשיעור הקודם)
load_dotenv("../lesson-01/.env")

# שים לב: שיניתי את שם המשתנה ל-"claude" כדי שלא יתנגש עם המשתנה client בלולאה
claude = Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])


def get_seo_advice(client_data: dict) -> str:
    """
    שולח את נתוני הלקוח ל-Claude ומחזיר 3 המלצות SEO ספציפיות בעברית.

    מקבל:
        client_data (dict): לקוח אחד עם כל השדות מ-clients.json.

    מחזיר:
        str: טקסט עם 3 המלצות, אחת בכל שורה.
    """
    # f-string רב-שורתי — בונה prompt עשיר ל-Claude
    prompt = f"""נתוני לקוח SEO:
- שם: {client_data['name']}
- דומיין: {client_data['domain']}
- תנועה אורגנית חודשית: {client_data['traffic']:,} ביקורים
- תעשייה: {client_data['industry']}
- אחוז המרה: {client_data['conversion_rate']}%
- יש בלוג: {'כן' if client_data['has_blog'] else 'לא'}
- מילת מפתח עיקרית: {client_data['top_keyword']}

תן 3 המלצות SEO ספציפיות לעסק הזה — ממוקדות, פרקטיות, מבוססות על הנתונים.
שורה אחת לכל המלצה. בלי הקדמות, בלי תרגומים, רק 3 שורות עם המלצות."""

    response = claude.messages.create(
        model="claude-haiku-4-5",
        max_tokens=512,
        system="אתה יועץ SEO בכיר עם 15 שנות ניסיון בשוק הישראלי. אתה עונה בעברית, בצורה תכליתית.",
        messages=[{"role": "user", "content": prompt}]
    )
    return response.content[0].text


# === הרצה: עובר על כל הלקוחות ושומר את ההמלצות לקובץ ===

with open("clients.json", encoding="utf-8") as f:
    clients = json.load(f)

print(f"🚀 מנתח {len(clients)} לקוחות עם Claude API...\n")

all_recommendations = []
for c in clients:
    print(f"⏳ {c['name']}...")
    advice = get_seo_advice(c)
    all_recommendations.append({
        "client": c["name"],
        "domain": c["domain"],
        "industry": c["industry"],
        "advice": advice,
    })

# כותב את התוצאות לקובץ JSON. ensure_ascii=False = שמור עברית כעברית.
with open("recommendations.json", "w", encoding="utf-8") as f:
    json.dump(all_recommendations, f, ensure_ascii=False, indent=2)

print(f"\n✅ שמרתי המלצות ל-{len(all_recommendations)} לקוחות בקובץ recommendations.json")
print("פתח את הקובץ ב-VS Code (code recommendations.json) כדי לקרוא את התוצאות.")
