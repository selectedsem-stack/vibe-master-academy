# safe_researcher.py — אותו topic_researcher אבל עם error handling אמיתי
# הרץ אותו עם:  python3 safe_researcher.py
#
# מה הוא מטפל בו (שלא טופל בקודם):
#   - שגיאות רשת (אין אינטרנט) → ConnectionError
#   - השרת לא עונה בזמן → Timeout
#   - Wikipedia מחזיר 404 → נושא לא קיים, חוזר None ולא קורס
#   - Claude API נכשל → APIError מטופל בעדינות
#   - retry פשוט: אם רשת נופלת, ננסה עוד פעמיים אחרי המתנה

# מאפשר את התחביר dict | None גם ב-Python 3.9
from __future__ import annotations

import os
import time
import requests
from urllib.parse import quote
from dotenv import load_dotenv
from anthropic import Anthropic, APIError

load_dotenv("../lesson-01/.env")
claude = Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])


def fetch_wiki_summary(topic: str, retries: int = 2) -> dict | None:
    """
    מביא תקציר Wikipedia עם retry על שגיאות רשת.

    מקבל:
        topic (str): שם הנושא
        retries (int): כמה ניסיונות חוזרים אם הרשת נופלת (ברירת מחדל: 2)

    מחזיר:
        dict עם הנתונים, או None אם הנושא לא נמצא או הכל נכשל.
    """
    encoded = quote(topic)
    url = f"https://en.wikipedia.org/api/rest_v1/page/summary/{encoded}"

    # לולאת retry — מנסה עד retries+1 פעמים
    for attempt in range(retries + 1):
        try:
            response = requests.get(url, timeout=10)

            # 404 = נושא לא קיים. זו לא שגיאת רשת — אין טעם לנסות שוב.
            if response.status_code == 404:
                return None

            # raise_for_status() זורק שגיאה אם הסטטוס הוא 4xx או 5xx
            response.raise_for_status()

            data = response.json()
            return {
                "title": data["title"],
                "extract": data["extract"],
                "url": data["content_urls"]["desktop"]["page"],
            }

        except requests.exceptions.ConnectionError:
            print(f"   ⚠️  בעיית רשת בניסיון {attempt + 1}. ממתין 2 שניות...")
            time.sleep(2)

        except requests.exceptions.Timeout:
            print(f"   ⚠️  Timeout בניסיון {attempt + 1}. מנסה שוב...")
            time.sleep(2)

        except requests.exceptions.HTTPError as e:
            print(f"   ❌ שגיאת HTTP מהשרת: {e}")
            return None

    print(f"   ❌ נכשלו {retries + 1} ניסיונות. ויתרתי.")
    return None


def suggest_related_topics(summary: str) -> str:
    """
    שולח תקציר ל-Claude. אם משהו משתבש בצד של Claude — מחזיר הודעת שגיאה
    קריאה למשתמש במקום לקרוס.
    """
    try:
        response = claude.messages.create(
            model="claude-haiku-4-5",
            max_tokens=512,
            system="אתה חוקר סקרן. עונה בעברית, בצורה ממוקדת.",
            messages=[{
                "role": "user",
                "content": f"""קראתי את התקציר:

{summary}

הצע 3 נושאים קשורים שכדאי לחקור.
מבנה: 1. [נושא] — [למה] (שורה לכל נושא)."""
            }]
        )
        return response.content[0].text
    except APIError as e:
        return f"❌ Claude API נכשל: {e}\n(בדוק שה-API key שלך תקין, או נסה שוב מאוחר יותר.)"


# === הרצה ===

topic = input("איזה נושא לחקור? ")

print(f"\n📖 מביא תקציר מ-Wikipedia...")
wiki = fetch_wiki_summary(topic)
if wiki is None:
    print(f"❌ לא הצלחתי להביא את התקציר עבור '{topic}'.")
    print("   ייתכן שהנושא לא קיים ב-Wikipedia, או שהרשת לא יציבה.")
    exit()

print(f"\n📚 {wiki['title']}\n")
print(wiki["extract"])

print(f"\n🤖 שואל את Claude על נושאים קשורים...")
suggestions = suggest_related_topics(wiki["extract"])
print(f"\n💡 נושאים שכדאי לחקור הלאה:\n\n{suggestions}")
