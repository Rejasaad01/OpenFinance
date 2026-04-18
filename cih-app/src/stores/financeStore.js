import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useFinanceStore = defineStore('finance', () => {
  const user = ref({
    name: 'Sarah',
    portfolioChangePercentage: 2.4,
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUHDa-HiH_Je9ztAD66wjtuU-k91CjW_rzuqZM4TH3RupLW9nwBT6CIt7fqzLo6cw-9518-HJP3-oTkAkBCriaLLQeubwAo8SKGvmCLELh0rN8SR2cnV40DoKRjzzhdcDLa2VlIp0redjKlda54qXamkajCMl7lCHyGeucSmdZUiJpHHzCYSOhpYTQyLS-_7L81WPr6VYsPUV0t-nOAMW_epITZoBY2IqOnFbKlQe5mckMLnBnAz6vNSX02ie4OXTGWrHejKcA2dru'
  })

  const accounts = ref([
    { id: 1, type: 'Checking Account', label: 'CIH Bank - **** 4592', balance: 12450.00, monthlyChange: 450, icon: 'account_balance_wallet' },
    { id: 2, type: 'High-Yield Savings', label: 'Compte sur Carnet', balance: 45000.00, interestYtd: 125, icon: 'savings' }
  ])

  const transactions = ref([
    { id: 1, date: '2026-04-18', description: 'Marjane Supermarket', category: 'Food', amount: -650.40, type: 'expense' },
    { id: 2, date: '2026-04-17', description: 'Monthly Salary', category: 'Income', amount: 14500.00, type: 'income' },
    { id: 3, date: '2026-04-16', description: 'Lydec Bill', category: 'Bills', amount: -800.00, type: 'expense' },
    { id: 4, date: '2026-04-15', description: 'Afriquia Gas', category: 'Transport', amount: -450.00, type: 'expense' },
    { id: 5, date: '2026-04-14', description: 'Venezia Ice', category: 'Food', amount: -45.00, type: 'expense' },
    { id: 6, date: '2026-04-10', description: 'Zara Morocco', category: 'Shopping', amount: -1200.00, type: 'expense' },
    { id: 7, date: '2026-04-05', description: 'IAM Internet', category: 'Subscriptions', amount: -199.00, type: 'expense' }
  ])

  const savingsGoals = ref([
    { id: 1, label: 'Al Boraq Trip', current: 2500, target: 5000, colorClass: 'bg-primary', icon: 'train', completed: false },
    { id: 2, label: 'Emergency Fund', current: 8000, target: 10000, colorClass: 'bg-secondary', icon: 'shield', completed: false },
    { id: 3, label: 'New iPhone', current: 15000, target: 15000, colorClass: 'bg-success', icon: 'smartphone', completed: true }
  ])

  const totalBalance = computed(() => accounts.value.reduce((sum, acc) => sum + acc.balance, 0))
  
  const monthlyIncome = computed(() => transactions.value
    .filter(t => t.type === 'income' && t.date.startsWith('2026-04'))
    .reduce((sum, t) => sum + t.amount, 0))

  const monthlySpending = computed(() => transactions.value
    .filter(t => t.type === 'expense' && t.date.startsWith('2026-04'))
    .reduce((sum, t) => sum + Math.abs(t.amount), 0))

  const savingsRate = computed(() => {
    if (monthlyIncome.value === 0) return 32
    return Math.max(0, ((monthlyIncome.value - monthlySpending.value) / monthlyIncome.value) * 100)
  })

  const balanceHistory = computed(() => [
    { x: 'Week 1', y: 56200 },
    { x: 'Week 2', y: 55800 },
    { x: 'Week 3', y: 57100 },
    { x: 'Week 4', y: 57450 }
  ])

  const financialHealth = computed(() => ({
    categories: ['Savings', 'Investment', 'Budget', 'Debt', 'Control', 'Insurance'],
    values: [85, 45, 92, 78, 65, 50]
  }))

  const categoryChartData = computed(() => {
    const categories = ['Food', 'Transport', 'Bills', 'Shopping', 'Subscriptions']
    const totals = categories.map(cat => {
      return transactions.value
        .filter(t => t.category === cat)
        .reduce((sum, t) => sum + Math.abs(t.amount), 0)
    })
    return { labels: categories, series: totals }
  })

  // Compatibility computed properties
  const categoryTotals = computed(() => {
    const categories = ['Food', 'Transport', 'Bills', 'Shopping', 'Subscriptions']
    const totals = {}
    categories.forEach(cat => {
      totals[cat] = transactions.value
        .filter(t => t.type === 'expense' && t.category === cat)
        .reduce((sum, t) => sum + Math.abs(t.amount), 0)
    })
    return totals
  })

  const highestSpendingCategory = computed(() => {
    const totals = categoryTotals.value
    let max = 0
    let category = 'None'
    for (const [cat, val] of Object.entries(totals)) {
      if (val > max) {
        max = val
        category = cat
      }
    }
    return { name: category, amount: max }
  })

  const spendingBreakdown = computed(() => {
    const categories = [
      { id: 1, label: 'Food', amount: categoryTotals.value['Food'] || 0, color: 'bg-orange-500' },
      { id: 2, label: 'Transport', amount: categoryTotals.value['Transport'] || 0, color: 'bg-blue-500' },
      { id: 3, label: 'Bills', amount: categoryTotals.value['Bills'] || 0, color: 'bg-red-500' },
      { id: 4, label: 'Shopping', amount: categoryTotals.value['Shopping'] || 0, color: 'bg-pink-500' },
      { id: 5, label: 'Subscriptions', amount: categoryTotals.value['Subscriptions'] || 0, color: 'bg-indigo-500' }
    ]
    return {
      total: monthlySpending.value,
      categories: categories.sort((a,b) => b.amount - a.amount)
    }
  })

  const insights = computed(() => {
    const highest = highestSpendingCategory.value
    const total = monthlySpending.value || 1
    const percentage = ((highest.amount / total) * 100).toFixed(0)
    return [
      { text: `${highest.name} accounts for ${percentage}% of your spending this cycle.`, type: 'warning' },
      { text: `Your monthly liquidity has grown by 2.4% since March.`, type: 'info' },
      { text: `You are saving ${savingsRate.value.toFixed(0)}% of your income.`, type: 'success' },
      { text: `Your 'Compte sur Carnet' generated 125 DH in interest this month.`, type: 'primary' }
    ]
  })

  return {
    user,
    accounts,
    transactions,
    savingsGoals,
    totalBalance,
    monthlyIncome,
    monthlySpending,
    savingsRate,
    balanceHistory,
    financialHealth,
    categoryChartData,
    highestSpendingCategory,
    spendingBreakdown,
    insights
  }
})
