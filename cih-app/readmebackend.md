# Financial MVP Backend

Rule-based financial API built with FastAPI. Four modules: Accountant, Financial Advisor, Bank Transaction Agent, and Loan Advisor.

## Quick Start

```bash
cd backend
python -m venv venv && source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Interactive docs → http://localhost:8000/docs

---

## API Examples

### Accountant

**Record a transaction**
```bash
curl -X POST http://localhost:8000/accountant/record \
  -H "Content-Type: application/json" \
  -d '{"date":"2024-02-01","description":"Monthly salary","amount":4500,"type":"auto"}'
```

**Income statement**
```bash
curl http://localhost:8000/accountant/income-statement
```

**Cash flow**
```bash
curl http://localhost:8000/accountant/cashflow
```

---

### Financial Advisor

```bash
curl -X POST http://localhost:8000/advisor/analyze \
  -H "Content-Type: application/json" \
  -d '{"monthly_income":5000,"monthly_expenses":3500,"savings":800,"food_spending":600}'
```

Response:
```json
{
  "score": 50,
  "status": "Moderate — some areas need attention",
  "recommendations": ["Your expenses are 70% of income — reduce spending below 80%.", ...],
  "breakdown": {...}
}
```

---

### Bank Transaction Agent

```bash
curl -X POST http://localhost:8000/transactions/execute \
  -H "Content-Type: application/json" \
  -d '{"amount":500,"type":"transfer","pin":"1234"}'
```

Response (success):
```json
{
  "status": "success",
  "message": "Transaction successful.",
  "transaction_id": "TXN-XXXXXXXX",
  "amount": 500,
  "type": "transfer"
}
```

**Hardcoded values:**
| Setting | Value |
|---------|-------|
| Valid PIN | `1234` |
| Starting Balance | `10,000.00` |
| Daily Limit | `5,000.00` |

---

### Loan Advisor

```bash
curl -X POST http://localhost:8000/loan/analyze \
  -H "Content-Type: application/json" \
  -d '{"income":5000,"expenses":3000,"savings":500,"debt":1000}'
```

Response:
```json
{
  "eligibility_score": 65,
  "eligible_loans": ["personal"],
  "rejected_loans": ["car", "home"],
  "recommendations": ["Savings rate is 10%. Aim to save at least 20% of income."],
  "metrics": {...}
}
```

---

## Module Overview

| Module | Rule engine | Key inputs | Key output |
|--------|-------------|-----------|------------|
| Accountant | keyword categorisation | date, description, amount | income statement, cash flow |
| Advisor | ratio thresholds | income, expenses, savings | score 0-100, recommendations |
| Transactions | PIN + limit checks | amount, type, pin | status, transaction_id |
| Loan | DTI + savings rate | income, expenses, savings, debt | eligibility score, eligible loans |

## Project Structure

```
backend/
├── app/
│   ├── main.py               # FastAPI app + startup CSV loader
│   ├── routes/               # Thin HTTP layer (validation only)
│   │   ├── accountant.py
│   │   ├── advisor.py
│   │   ├── transactions.py
│   │   └── loan.py
│   ├── services/             # All business logic lives here
│   │   ├── accountant_service.py
│   │   ├── advisor_service.py
│   │   ├── transaction_service.py
│   │   └── loan_service.py
│   ├── models/
│   │   └── schemas.py        # Pydantic request/response models
│   └── utils/
│       └── rules.py          # All thresholds and rule constants
└── data/
    └── sample_transactions.csv
```
