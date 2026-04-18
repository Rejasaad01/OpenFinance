def categorize(desc):
    desc = str(desc).lower()

    if any(x in desc for x in ["restaurant", "cafe", "food"]):
        return "Food"
    if any(x in desc for x in ["uber", "taxi", "transport"]):
        return "Transport"
    if any(x in desc for x in ["electric", "water", "bill"]):
        return "Bills"
    if any(x in desc for x in ["salary", "income"]):
        return "Income"
    return "Other"


def apply_categories(df):
    df["Category"] = df["Description"].apply(categorize)
    return df