def generate_advice(income, expenses, df):
    advice = []

    ratio = expenses / income if income > 0 else 0

    if ratio > 0.8:
        advice.append("High spending vs income. Reduce non-essential expenses.")
    elif ratio > 0.5:
        advice.append("Moderate spending. Optimize for savings.")
    else:
        advice.append("Healthy financial balance.")

    food = abs(df[df["Category"] == "Food"]["Amount"].sum())
    if income > 0 and food > income * 0.3:
        advice.append("Food expenses are too high.")

    savings = income - expenses
    if income > 0 and savings < income * 0.1:
        advice.append("Low savings rate. Aim for 10%+ savings.")

    return advice