# ask_claude.py — Python מדבר עם Claude API
# הרץ אותו עם:  python3 ask_claude.py
#
# דורש קודם:
#   1. קובץ .env באותה תיקייה עם השורה:   ANTHROPIC_API_KEY=sk-ant-xxx...
#   2. התקנת חבילות:  pip3 install anthropic python-dotenv

import os
from dotenv import load_dotenv
from anthropic import Anthropic

# טוען את ה-API key מתוך הקובץ .env (כדי שלא נכתוב מפתחות סודיים בקוד)
load_dotenv()

# יוצרים "לקוח" שיודע לשלוח בקשות ל-Claude
client = Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])

# שואלים את המשתמש מה לשאול את Claude
question = input("מה לשאול את Claude? ")

# שולחים את השאלה. system = "האישיות" של Claude. messages = השיחה עצמה.
response = client.messages.create(
    model="claude-haiku-4-5",
    max_tokens=1024,
    system="אתה עוזר ידידותי שעונה בעברית, בצורה קצרה וברורה.",
    messages=[
        {"role": "user", "content": question}
    ]
)

# התשובה חוזרת כאובייקט מורכב. הטקסט עצמו נמצא ב-response.content[0].text
answer = response.content[0].text
print("\nClaude עונה:\n")
print(answer)
