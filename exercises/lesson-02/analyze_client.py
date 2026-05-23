# analyze_client.py — פונקציה שמקבלת לקוח אחד ומחזירה ציון SEO + המלצות
# הרץ אותו עם:  python3 analyze_client.py

import json


def analyze_client(client: dict) -> dict:
    """
    מנתח לקוח אחד ומחזיר דוח SEO מבוסס-כללים.

    מקבל:
        client (dict): לקוח אחד עם שדות name, traffic, conversion_rate,
                       has_blog, last_audit_days, וכו'.

    מחזיר:
        dict עם:
            - client_name (str)
            - score (int 0-100)
            - recommendations (list של strings)
    """
    score = 50  # נקודת התחלה ניטרלית
    recommendations = []

    # כלל 1: תנועה אורגנית
    if client["traffic"] >= 50000:
        score += 25
    elif client["traffic"] >= 20000:
        score += 15
    elif client["traffic"] >= 10000:
        score += 5
    else:
        recommendations.append("תנועה אורגנית נמוכה — נדרשת אסטרטגיית תוכן + בניית סמכות תחומית")

    # כלל 2: בלוג פעיל
    if client["has_blog"]:
        score += 10
    else:
        recommendations.append("אין בלוג. הקמת בלוג עם 2-4 פוסטים בחודש יכולה להעלות תנועה אורגנית ב-30-50% תוך 6 חודשים")

    # כלל 3: conversion rate
    if client["conversion_rate"] >= 3.5:
        score += 15
    elif client["conversion_rate"] < 1.5:
        recommendations.append(f"אחוז המרה נמוך ({client['conversion_rate']}%) — בחן UX, CTAs ו-trust signals")

    # כלל 4: ביקרת SEO לאחרונה?
    if client["last_audit_days"] > 90:
        recommendations.append(f"לא בוצעה ביקרת SEO ב-{client['last_audit_days']} ימים — בקרת technical SEO חיונית")
    elif client["last_audit_days"] <= 30:
        score += 5

    return {
        "client_name": client["name"],
        "score": min(score, 100),
        "recommendations": recommendations,
    }


# === הרצה: פותח את clients.json ומריץ את הפונקציה על כל לקוח ===

with open("clients.json", encoding="utf-8") as f:
    clients = json.load(f)

for c in clients:
    report = analyze_client(c)
    print(f"\n📊 {report['client_name']:<20} ציון: {report['score']}/100")
    if report["recommendations"]:
        for rec in report["recommendations"]:
            print(f"   • {rec}")
    else:
        print("   ✓ אין המלצות — הלקוח במצב טוב")
