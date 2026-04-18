import pandas as pd


def load_data(file):
    df = pd.read_csv(file.file)
    df.columns = ["Date", "Description", "Amount"]
    df["Amount"] = pd.to_numeric(df["Amount"], errors="coerce")
    return df
