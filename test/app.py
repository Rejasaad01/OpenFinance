import streamlit as st

from data_loader import load_data
from categorizer import apply_categories
from analyzer import analyze
from advisor import generate_advice

st.set_page_config(page_title="OpenFinance MVP", layout="wide")

st.title("OpenFinance MVP")

# -----------------------
# UPLOAD
# -----------------------
file = st.file_uploader("Upload CSV", type=["csv"])

if file:
    df = load_data(file)
    df = apply_categories(df)

    income, expenses, by_category = analyze(df)
    advice = generate_advice(income, expenses, df)

    st.subheader("Summary")
    st.write("Income:", income)
    st.write("Expenses:", expenses)
    st.write("Balance:", income - expenses)

    st.subheader("Category Breakdown")
    st.write(by_category)

    st.subheader("Financial Advisor")
    for a in advice:
        st.write("•", a)
