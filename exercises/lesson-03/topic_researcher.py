# topic_researcher.py — חוקר נושא חדש דרך Wikipedia + Claude
# הרץ אותו עם:  python3 topic_researcher.py
#
# מה הוא עושה:
#   1. שואל אותך נושא
#   2. מביא תקציר מ-Wikipedia
#   3. שולח את התקציר ל-Claude ומבקש 3 נושאים קשורים שכדאי לחקור
#   4. מציג הכל יחד
#
# דורש:
#   pip3 install requests anthropic python-dotenv

# השורה הבאה מאפשרת תחביר מודרני של type hints (dict | None) גם ב-Python 3.9.
from __future__ import annotations

import os
import requests
from urllib.parse import quote
from dotenv import load_dotenv
from anthropic import Anthropic

# טוען את ה-API key מ-.env של שיעור 1
load_dotenv("../lesson-01/.env")
claude = Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])


def fetch_wiki_summary(topic: str) -> dict | None:
    """
    מביא תקציר מ-Wikipedia עבור נושא נתון.

    מקבל:
        topic (str): שם הנושא (באנגלית)

    מחזיר:
        dict עם title, extract, url — או None אם הנושא לא נמצא.
    """
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
    """
    שולח תקציר ל-Claude ומקבל 3 נושאים קשורים מעמיקים שכדאי לחקור.

    מקבל:
        summary (str): התקציר מ-Wikipedia.

    מחזיר:
        str: 3 הצעות, אחת בכל שורה, במבנה "[נושא] — [למה זה חשוב]"
    """
    response = claude.messages.create(
        model="claude-haiku-4-5",
        max_tokens=512,
        system="אתה חוקר סקרן וחכם. עונה בעברית, בצורה ברורה וממוקדת.",
        messages=[{
            "role": "user",
            "content": f"""קראתי את התקציר הזה מ-Wikipedia:

{summary}

הצע 3 נושאים קשורים שכדאי לחקור הלאה כדי להעמיק את ההבנה.
לכל נושא — שורה אחת שמסבירה למה הוא חשוב.

מבנה:
1. [נושא] — [למה]
2. [נושא] — [למה]
3. [נושא] — [למה]"""
        }]
    )
    return response.content[0].text


# === הרצה ===

topic = input("איזה נושא לחקור? ")

print(f"\n📖 מביא תקציר מ-Wikipedia...")
wiki = fetch_wiki_summary(topic)
if wiki is None:
    print(f"❌ לא נמצא דף Wikipedia עבור '{topic}'. נסה איות אחר באנגלית.")
    exit()

print(f"\n📚 {wiki['title']}\n")
print(wiki["extract"])
print(f"\n🔗 {wiki['url']}")

print(f"\n🤖 שואל את Claude על נושאים קשורים...")
suggestions = suggest_related_topics(wiki["extract"])

print(f"\n💡 3 נושאים שכדאי לחקור הלאה:\n")
print(suggestions)
