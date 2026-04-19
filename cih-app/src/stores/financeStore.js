import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { financialApi } from '../services/financialApi'

const categoryLabels = {
  salary: 'Income',
  freelance: 'Income',
  investment: 'Income',
  refund: 'Income',
  housing: 'Housing',
  food: 'Food',
  utilities: 'Bills',
  entertainment: 'Entertainment',
  transport: 'Transport',
  health: 'Health',
  transfer: 'Transfer',
  shopping: 'Shopping',
  subscriptions: 'Subscriptions',
  other: 'Other',
}

const categoryColors = {
  Food: 'bg-orange-500',
  Transport: 'bg-blue-500',
  Bills: 'bg-red-500',
  Housing: 'bg-primary',
  Entertainment: 'bg-indigo-500',
  Health: 'bg-emerald-500',
  Transfer: 'bg-cyan-500',
  Shopping: 'bg-pink-500',
  Subscriptions: 'bg-violet-500',
  Other: 'bg-outline',
}

const normalizeCategory = (category, type) => {
  if (!category) return type === 'income' ? 'Income' : 'Other'
  return categoryLabels[String(category).toLowerCase()] || category
}

const normalizeTransaction = (transaction) => ({
  id: transaction.id,
  date: transaction.date,
  description: transaction.description,
  amount: Number(transaction.amount || 0),
  type: transaction.type,
  category: normalizeCategory(transaction.category, transaction.type),
  message: transaction.message,
})

const buildAdvisorPayload = (income, expenses, savings, foodSpending) => ({
  monthly_income: Math.max(Number(income) || 1, 1),
  monthly_expenses: Math.max(Number(expenses) || 0, 0),
  savings: Math.max(Number(savings) || 0, 0),
  food_spending: Math.max(Number(foodSpending) || 0, 0),
})

const buildLoanPayload = (income, expenses, savings, debt = 0) => ({
  income: Math.max(Number(income) || 1, 1),
  expenses: Math.max(Number(expenses) || 0, 0),
  savings: Math.max(Number(savings) || 0, 0),
  debt: Math.max(Number(debt) || 0, 0),
})

export const useFinanceStore = defineStore('finance', () => {
  const user = ref({
    name: 'CIH Client',
    portfolioChangePercentage: 0,
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUHDa-HiH_Je9ztAD66wjtuU-k91CjW_rzuqZM4TH3RupLW9nwBT6CIt7fqzLo6cw-9518-HJP3-oTkAkBCriaLLQeubwAo8SKGvmCLELh0rN8SR2cnV40DoKRjzzhdcDLa2VlIp0redjKlda54qXamkajCMl7lCHyGeucSmdZUiJpHHzCYSOhpYTQyLS-_7L81WPr6VYsPUV0t-nOAMW_epITZoBY2IqOnFbKlQe5mckMLnBnAz6vNSX02ie4OXTGWrHejKcA2dru',
  })

  const transactions = ref([])
  const incomeStatement = ref(null)
  const cashFlow = ref(null)
  const bankBalance = ref(0)
  const transactionLog = ref([])
  const advisorAnalysis = ref(null)
  const loanAnalysis = ref(null)
  const lastSyncedAt = ref(null)
  const isLoading = ref(false)
  const isSavingTransaction = ref(false)
  const isExecutingTransaction = ref(false)
  const isAnalyzingLoan = ref(false)
  const error = ref('')
  const transactionError = ref('')
  const transactionSuccess = ref('')

  const savingsGoals = ref([
    { id: 1, label: 'Al Boraq Trip', current: 2500, target: 5000, colorClass: 'bg-primary', icon: 'train', completed: false },
    { id: 2, label: 'Emergency Fund', current: 8000, target: 10000, colorClass: 'bg-secondary', icon: 'shield', completed: false },
    { id: 3, label: 'New iPhone', current: 15000, target: 15000, colorClass: 'bg-emerald-500', icon: 'smartphone', completed: true },
  ])

  const accounts = computed(() => [
    {
      id: 1,
      type: 'Checking Account',
      label: 'CIH Bank - Simulated API',
      balance: bankBalance.value,
      monthlyChange: cashFlow.value?.closing_balance || 0,
      icon: 'account_balance_wallet',
    },
    {
      id: 2,
      type: 'Monthly Net Cash Flow',
      label: 'Accountant ledger',
      balance: cashFlow.value?.closing_balance || 0,
      interestYtd: incomeStatement.value?.net_profit || 0,
      icon: 'monitoring',
    },
  ])

  const totalBalance = computed(() => accounts.value.reduce((sum, acc) => sum + acc.balance, 0))
  const monthlyIncome = computed(() => incomeStatement.value?.total_income || 0)
  const monthlySpending = computed(() => incomeStatement.value?.total_expenses || 0)
  const netProfit = computed(() => incomeStatement.value?.net_profit || (monthlyIncome.value - monthlySpending.value))
  const savingsRate = computed(() => monthlyIncome.value > 0 ? Math.max(0, (netProfit.value / monthlyIncome.value) * 100) : 0)
  const activeGoalsCount = computed(() => savingsGoals.value.filter((goal) => !goal.completed).length)
  const monthlyTrendPercentage = computed(() => monthlyIncome.value > 0 ? ((netProfit.value / monthlyIncome.value) * 100) : 0)

  const categoryTotals = computed(() => {
    const totals = {}
    transactions.value
      .filter((transaction) => transaction.type === 'expense')
      .forEach((transaction) => {
        totals[transaction.category] = (totals[transaction.category] || 0) + Math.abs(transaction.amount)
      })
    return totals
  })

  const categoryBreakdown = computed(() => {
    const total = Math.max(monthlySpending.value, 1)
    return Object.entries(categoryTotals.value)
      .map(([name, amount], index) => ({
        id: index + 1,
        name,
        label: name,
        amount,
        percentage: (amount / total) * 100,
        color: categoryColors[name] || 'bg-outline',
      }))
      .sort((a, b) => b.amount - a.amount)
  })

  const highestSpendingCategory = computed(() => categoryBreakdown.value[0] || { name: 'None', amount: 0, percentage: 0 })

  const spendingBreakdown = computed(() => ({
    total: monthlySpending.value,
    categories: categoryBreakdown.value,
  }))

  const categoryChartData = computed(() => ({
    labels: categoryBreakdown.value.map((category) => category.name),
    series: categoryBreakdown.value.map((category) => Number(category.amount.toFixed(2))),
  }))

  const incomeVsExpenseData = computed(() => ({
    income: monthlyIncome.value,
    expense: monthlySpending.value,
    ratio: monthlyIncome.value > 0 ? Math.min(100, (monthlySpending.value / monthlyIncome.value) * 100) : 0,
  }))

  const balanceHistory = computed(() => {
    let balance = cashFlow.value?.opening_balance || 0
    const points = transactions.value.map((transaction) => {
      balance += transaction.type === 'income' ? transaction.amount : -Math.abs(transaction.amount)
      return { x: transaction.date.slice(5), y: Number(balance.toFixed(2)) }
    })
    return points.length ? points.slice(-8) : [{ x: 'Now', y: totalBalance.value }]
  })

  const trends = computed(() => balanceHistory.value.slice(-6).map((point) => ({
    label: point.x,
    value: Math.abs(point.y),
  })))

  const financialHealth = computed(() => {
    const score = advisorAnalysis.value?.score || Math.round(Math.min(100, Math.max(0, savingsRate.value + 45)))
    const expenseControl = Math.round(100 - incomeVsExpenseData.value.ratio)
    return {
      categories: ['Advisor', 'Savings', 'Budget', 'Debt', 'Control', 'Cash Flow'],
      values: [
        score,
        Math.min(100, Math.round(savingsRate.value)),
        Math.min(100, Math.round(expenseControl)),
        loanAnalysis.value?.metrics?.debt_to_income ? Math.round(100 - loanAnalysis.value.metrics.debt_to_income * 100) : 80,
        Math.max(0, expenseControl),
        Math.min(100, Math.round((netProfit.value / Math.max(monthlyIncome.value, 1)) * 100)),
      ],
    }
  })

  const insights = computed(() => {
    const backendRecommendations = advisorAnalysis.value?.recommendations || []
    if (backendRecommendations.length) {
      return backendRecommendations.slice(0, 4).map((text, index) => ({
        text,
        type: index === 0 ? 'primary' : index === 1 ? 'warning' : 'info',
      }))
    }

    const highest = highestSpendingCategory.value
    const percentage = highest.percentage ? highest.percentage.toFixed(0) : 0
    return [
      { text: `${highest.name} accounts for ${percentage}% of recorded spending.`, type: 'warning' },
      { text: `The API cash-flow endpoint reports ${cashFlow.value?.transactions_count || transactions.value.length} transactions.`, type: 'info' },
      { text: `Your current savings rate is ${savingsRate.value.toFixed(0)}%.`, type: 'success' },
      { text: `Net profit from the accountant ledger is ${netProfit.value.toFixed(2)} DH.`, type: 'primary' },
    ]
  })

  const refreshAdvisorAnalysis = async () => {
    advisorAnalysis.value = await financialApi.analyzeAdvisor(
      buildAdvisorPayload(monthlyIncome.value, monthlySpending.value, netProfit.value, categoryTotals.value.Food || 0),
    )
  }

  const refreshLoanAnalysis = async (payload) => {
    isAnalyzingLoan.value = true
    try {
      loanAnalysis.value = await financialApi.analyzeLoan(payload || buildLoanPayload(
        monthlyIncome.value,
        monthlySpending.value,
        netProfit.value,
        categoryTotals.value.Transfer || 0,
      ))
      return loanAnalysis.value
    } finally {
      isAnalyzingLoan.value = false
    }
  }

  const refreshAll = async () => {
    if (isLoading.value) return
    isLoading.value = true
    error.value = ''

    try {
      const [txPayload, statement, flow, balancePayload, logPayload] = await Promise.all([
        financialApi.listTransactions(),
        financialApi.getIncomeStatement(),
        financialApi.getCashFlow(),
        financialApi.getBankBalance(),
        financialApi.getTransactionLog(),
      ])

      transactions.value = (txPayload.transactions || []).map(normalizeTransaction)
      incomeStatement.value = statement
      cashFlow.value = flow
      bankBalance.value = Number(balancePayload.balance || 0)
      transactionLog.value = logPayload.transactions || []
      lastSyncedAt.value = new Date()

      await Promise.all([
        refreshAdvisorAnalysis(),
        refreshLoanAnalysis(),
      ])
    } catch (err) {
      error.value = err.message || 'Unable to load financial data.'
    } finally {
      isLoading.value = false
    }
  }

  const addTransaction = async ({ description, amount, type = 'expense', category }) => {
    isSavingTransaction.value = true
    transactionError.value = ''
    transactionSuccess.value = ''

    try {
      const payload = {
        date: new Date().toISOString().slice(0, 10),
        description,
        amount: Math.abs(Number(amount)),
        type,
      }
      const created = await financialApi.recordTransaction(payload)
      transactions.value.unshift(normalizeTransaction({ ...created, category: created.category || category }))
      transactionSuccess.value = created.message || 'Transaction recorded.'
      await Promise.all([
        financialApi.getIncomeStatement().then((data) => { incomeStatement.value = data }),
        financialApi.getCashFlow().then((data) => { cashFlow.value = data }),
      ])
      await refreshAdvisorAnalysis()
      return created
    } catch (err) {
      transactionError.value = err.message || 'Unable to record transaction.'
      throw err
    } finally {
      isSavingTransaction.value = false
    }
  }

  const executeBankTransaction = async ({ amount, type = 'transfer', pin }) => {
    isExecutingTransaction.value = true
    transactionError.value = ''
    transactionSuccess.value = ''

    try {
      const result = await financialApi.executeTransaction({
        amount: Math.abs(Number(amount)),
        type,
        pin,
      })
      transactionSuccess.value = result.message
      const [balancePayload, logPayload] = await Promise.all([
        financialApi.getBankBalance(),
        financialApi.getTransactionLog(),
      ])
      bankBalance.value = Number(balancePayload.balance || 0)
      transactionLog.value = logPayload.transactions || []
      return result
    } catch (err) {
      transactionError.value = err.message || 'Unable to execute transaction.'
      throw err
    } finally {
      isExecutingTransaction.value = false
    }
  }

  const addGoal = ({ label, target }) => {
    savingsGoals.value.push({
      id: crypto.randomUUID?.() || String(Date.now()),
      label,
      current: 0,
      target,
      colorClass: 'bg-primary',
      icon: 'savings',
      completed: false,
    })
  }

  const toggleGoalCompleted = (id) => {
    const goal = savingsGoals.value.find((item) => item.id === id)
    if (goal) goal.completed = !goal.completed
  }

  return {
    user,
    accounts,
    transactions,
    savingsGoals,
    incomeStatement,
    cashFlow,
    bankBalance,
    transactionLog,
    advisorAnalysis,
    loanAnalysis,
    lastSyncedAt,
    isLoading,
    isSavingTransaction,
    isExecutingTransaction,
    isAnalyzingLoan,
    error,
    transactionError,
    transactionSuccess,
    totalBalance,
    monthlyIncome,
    monthlySpending,
    netProfit,
    savingsRate,
    activeGoalsCount,
    monthlyTrendPercentage,
    balanceHistory,
    financialHealth,
    categoryChartData,
    categoryTotals,
    categoryBreakdown,
    highestSpendingCategory,
    spendingBreakdown,
    incomeVsExpenseData,
    trends,
    insights,
    refreshAll,
    refreshAdvisorAnalysis,
    refreshLoanAnalysis,
    addTransaction,
    executeBankTransaction,
    addGoal,
    toggleGoalCompleted,
  }
})
