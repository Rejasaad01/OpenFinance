import { apiRequest } from './api'

export const financialApi = {
  health() {
    return apiRequest('/health')
  },

  listTransactions() {
    return apiRequest('/accountant/transactions')
  },

  recordTransaction(payload) {
    return apiRequest('/accountant/record', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  },

  getIncomeStatement() {
    return apiRequest('/accountant/income-statement')
  },

  getCashFlow() {
    return apiRequest('/accountant/cashflow')
  },

  analyzeAdvisor(payload) {
    return apiRequest('/advisor/analyze', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  },

  executeTransaction(payload) {
    return apiRequest('/transactions/execute', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  },

  getBankBalance() {
    return apiRequest('/transactions/balance')
  },

  getTransactionLog() {
    return apiRequest('/transactions/log')
  },

  analyzeLoan(payload) {
    return apiRequest('/loan/analyze', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  },
}
