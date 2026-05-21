# Mac Sync — איך להוריד את הקורס למאק

(נכתב מהמחשב Windows; הוראות לביצוע במאק)

## 1. וודא שהכלים מותקנים

```bash
git --version
gh --version
```

אם משהו חסר:

```bash
brew install git gh
gh auth login    # אם עוד לא חיברת
```

## 2. קלון של הריפו

```bash
cd ~
mkdir -p projects
cd projects
gh repo clone selectedsem-stack/vibe-master-academy
cd vibe-master-academy
ls
```

צריך לראות את כל הקבצים — index.html, README.md, phase-1/, וכו'.

## 3. הקצב היומי-יומי

**לפני שעובדים על הקורס:**
```bash
cd ~/projects/vibe-master-academy
git pull
```

**אחרי שעבדת:**
```bash
git add .
git commit -m "[Phase X Week Y] תיאור קצר של מה שעשיתי"
git push
```

## 4. אם יש קונפליקט

אם `git pull` מודיע על קונפליקט (סביר רק אם עבדת על אותו קובץ משני מחשבים בלי לדחוף ביניהם):

1. אל תיכנס לפניקה
2. הרץ `git status` כדי לראות מה
3. צור קשר איתי — נפתור יחד

## 5. פתיחת הפורטל מקומית

לעבודה offline:

```bash
cd ~/projects/vibe-master-academy
open index.html
```

לעבודה online (כל מקום בעולם):

`https://selectedsem-stack.github.io/vibe-master-academy/`
