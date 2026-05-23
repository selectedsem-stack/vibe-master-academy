# read_clients.py — קורא את clients.json ומציג top 5 לפי תנועה אורגנית
# הרץ אותו עם:  python3 read_clients.py

import json

# open() פותח קובץ. encoding="utf-8" קריטי לטקסט עברי.
# json.load(f) קורא את התוכן וממיר list/dict של Python.
with open("clients.json", encoding="utf-8") as f:
    clients = json.load(f)

# clients עכשיו הוא list של dicts — כל איבר הוא לקוח אחד.

# sorted() ממיין רשימה. key=lambda c: c["traffic"] = "מיין לפי השדה traffic של כל איבר".
# reverse=True = מהגדול לקטן.
sorted_clients = sorted(clients, key=lambda c: c["traffic"], reverse=True)

# slicing — לוקח את 5 הראשונים. [:5] = "מההתחלה עד אינדקס 5 (לא כולל)".
top_5 = sorted_clients[:5]

print(f"🏆 Top 5 לקוחות לפי תנועה אורגנית (מתוך {len(clients)}):\n")

# loop פשוט — עובר על כל איבר ברשימה
for client in top_5:
    # f-string עם format specifiers:
    #   :<20  = רוחב 20, מיושר לשמאל
    #   :>8,  = רוחב 8, מיושר לימין, עם פסיקים בין אלפים (45,000)
    print(f"  {client['name']:<20} {client['traffic']:>8,} ביקורים  ·  {client['industry']}")
