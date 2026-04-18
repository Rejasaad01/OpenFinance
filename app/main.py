from fastapi import FastAPI, UploadFile, File
from parsCSV.parser import load_data
from parsCSV.categorazer import categorize

app = FastAPI()
global_data = None


@app.get("/")
def read_root():
    return {"hello": "world"}


@app.post("/upload")
def upload_csv(file: UploadFile = File(...)):
    global global_data

    # STEP 1: load CSV (DataFrame)
    df = load_data(file)

    # STEP 2: categorize
    df = categorize(df)

    # STEP 3: convert to ROWS format (IMPORTANT FIX)
    global_data = df.to_dict(orient="records")

    return {
        "rows": len(global_data),
        "preview": global_data[:5]
    }