# greet.py — סקריפט Python ראשון שמדבר איתך
# הרץ אותו עם:  python3 greet.py

# שואלים את המשתמש שאלה. input() תמיד מחזיר טקסט (str).
name = input("מה השם שלך? ")
age_text = input("בן כמה אתה? ")

# input החזיר מחרוזת. בשביל לעשות חשבון — צריך להמיר ל-int.
age = int(age_text)

# f-string — בונה הודעה כשמשתנים בתוך {} מוחלפים בערכים שלהם.
print(f"שלום {name}!")
print(f"בעוד 10 שנים תהיה בן {age + 10}.")
