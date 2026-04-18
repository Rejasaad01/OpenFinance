import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useFinanceStore = defineStore('finance', () => {
  const user = ref({
    name: 'Sarah',
    portfolioChangePercentage: 2.4,
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUHDa-HiH_Je9ztAD66wjtuU-k91CjW_rzuqZM4TH3RupLW9nwBT6CIt7fqzLo6cw-9518-HJP3-oTkAkBCriaLLQeubwAo8SKGvmCLELh0rN8SR2cnV40DoKRjzzhdcDLa2VlIp0redjKlda54qXamkajCMl7lCHyGeucSmdZUiJpHHzCYSOhpYTQyLS-_7L81WPr6VYsPUV0t-nOAMW_epITZoBY2IqOnFbKlQe5mckMLnBnAz6vNSX02ie4OXTGWrHejKcA2dru'
  })

  const accounts = ref([
    {
      id: 1,
      type: 'Checking Account',
      label: '**** 4592',
      balance: 12450.00,
      monthlyChange: 450,
      icon: 'account_balance_wallet'
    },
    {
      id: 2,
      type: 'High-Yield Savings',
      label: '4.25% APY',
      balance: 45000.00,
      interestYtd: 125,
      icon: 'savings'
    }
  ])

  const spendingBreakdown = ref({
    total: 3240,
    categories: [
      { id: 'housing', label: 'Housing', amount: 1800, color: 'bg-primary-container' },
      { id: 'food', label: 'Food & Dining', amount: 650, color: 'bg-secondary-container' },
      { id: 'other', label: 'Other', amount: 790, color: 'bg-surface-container-high' }
    ]
  })

  const savingsGoals = ref([
    { id: 1, label: 'Emergency Fund', current: 8000, target: 10000, colorClass: 'bg-primary-container' },
    { id: 2, label: 'Europe Trip', current: 2500, target: 5000, colorClass: 'bg-secondary-container' }
  ])

  const aiInsights = ref([
    {
      id: 1,
      type: 'warning',
      title: 'Subscription Alert',
      description: "You haven't used your 'FitPremium' subscription in 3 months. Cancel to save $14.99/mo.",
      actionText: 'Review Subscription'
    },
    {
      id: 2,
      type: 'opportunity',
      title: 'Optimize Cash',
      description: 'Move $2,000 from Checking to High-Yield Savings to earn an estimated $85 more this year.',
      actionText: 'Transfer Now'
    }
  ])

  const upcomingBills = ref([
    { id: 1, title: 'Electric Utility', dueDate: 'Due Tomorrow', amount: 145.20, icon: 'flash_on', isUrgent: true },
    { id: 2, title: 'Auto Loan', dueDate: 'Due in 4 days', amount: 385.00, icon: 'directions_car', isUrgent: false },
    { id: 3, title: 'Internet Provider', dueDate: 'Due in 7 days', amount: 89.99, icon: 'wifi', isUrgent: false }
  ])

  // Getters
  const formattedCheckingBalance = computed(() => accounts.value[0].balance.toLocaleString('en-US', { style: 'currency', currency: 'USD' }))
  const formattedSavingsBalance = computed(() => accounts.value[1].balance.toLocaleString('en-US', { style: 'currency', currency: 'USD' }))

  return {
    user,
    accounts,
    spendingBreakdown,
    savingsGoals,
    aiInsights,
    upcomingBills,
    formattedCheckingBalance,
    formattedSavingsBalance
  }
})
