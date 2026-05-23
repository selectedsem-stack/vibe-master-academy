# wiki_summary.py — קורא ל-Wikipedia API ומחזיר תקציר על כל נושא
# הרץ אותו עם:  python3 wiki_summary.py
#
# דורש:
#   pip3 install requests
#
# מה זה מדגים:
#   - שליחת בקשת HTTP GET דרך הספרייה requests
#   - בדיקת status code בתגובה
#   - חילוץ JSON וניווט במבנה מקונן
#   - URL encoding של תווים מיוחדים

import requests
from urllib.parse import quote

topic = input("איזה נושא לחקור? (באנגלית, למשל: Python, Beatport, SEO): ")

# quote() מצפינה תווים מיוחדים ב-URL — חובה לנושאים עם רווחים או תווים לא-אנגליים.
# למשל "machine learning" → "machine%20learning"
encoded_topic = quote(topic)

# Wikipedia REST API — endpoint לתקציר עמוד.
# התשובה מחזירה JSON עם title, extract, content_urls, ועוד.
url = f"https://en.wikipedia.org/api/rest_v1/page/summary/{encoded_topic}"

# requests.get() שולח בקשה ומחזיר אובייקט Response.
# timeout=10 = תוותר אם השרת לא ענה תוך 10 שניות.
response = requests.get(url, timeout=10)

print(f"\nHTTP Status: {response.status_code}")

if response.status_code == 200:
    # .json() ממיר את גוף התשובה (string) ל-Python dict
    data = response.json()
    print(f"\n📚 {data['title']}\n")
    print(data["extract"])
    print(f"\n🔗 Read more: {data['content_urls']['desktop']['page']}")
elif response.status_code == 404:
    print(f"❌ לא נמצא דף Wikipedia עבור '{topic}'.")
    print("   טיפ: נסה איות מדויק יותר באנגלית.")
else:
    print(f"❌ שגיאה לא צפויה: HTTP {response.status_code}")
