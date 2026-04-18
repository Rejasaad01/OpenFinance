def analyze(df):
    income = df[df["Amount"] > 0]["Amount"].sum()
    expenses = abs(df[df["Amount"] < 0]["Amount"].sum())

    by_category = df.groupby("Category")["Amount"].sum()

    return income, expenses, by_category