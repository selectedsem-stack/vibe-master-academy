# domain_extractor.py — מקבל URL ומחזיר רק את הדומיין
# הרץ אותו עם:  python3 domain_extractor.py
#
# דוגמת הרצה:
#   הכנס URL: https://www.beatport.com/genre/techno
#   הדומיין הוא: beatport.com

url = input("הכנס URL: ")

# .replace(old, new) מחליפה כל מופע של old ב-new. כשהחלפה היא במחרוזת ריקה — זה מסיר.
url = url.replace("https://", "").replace("http://", "")
url = url.replace("www.", "")

# .split("/") חותכת את המחרוזת לפי "/" ומחזירה רשימה. [0] לוקח את האיבר הראשון.
domain = url.split("/")[0]

print(f"הדומיין הוא: {domain}")
