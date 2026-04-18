<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
    <div v-for="card in cards" :key="card.label" 
      class="bg-white p-6 rounded-2xl border border-outline-variant/10 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
      <div class="absolute -right-2 -top-2 w-16 h-16 opacity-5 group-hover:scale-110 transition-transform">
        <span class="material-symbols-outlined text-6xl text-on-surface">{{ card.icon }}</span>
      </div>
      <div class="flex flex-col">
        <span class="text-[10px] font-black uppercase tracking-widest text-outline mb-1">{{ card.label }}</span>
        <div class="flex items-end gap-2">
          <span class="text-2xl font-headline font-black text-on-surface">{{ card.value }}</span>
          <div :class="['flex items-center text-[10px] font-bold pb-1', card.trendUp ? 'text-green-600' : 'text-error']">
            <span class="material-symbols-outlined text-sm">{{ card.trendUp ? 'trending_up' : 'trending_down' }}</span>
            {{ card.trendValue }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useFinanceStore } from '../stores/financeStore'

const store = useFinanceStore()

const formatCurrency = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val)

const cards = computed(() => [
  { 
    label: 'Total Balance', 
    value: formatCurrency(store.totalBalance), 
    trendUp: true, 
    trendValue: '4.2%', 
    icon: 'account_balance_wallet' 
  },
  { 
    label: 'Monthly Spending', 
    value: formatCurrency(store.monthlySpending), 
    trendUp: false, 
    trendValue: '12%', 
    icon: 'shopping_cart' 
  },
  { 
    label: 'Total Income', 
    value: formatCurrency(store.monthlyIncome), 
    trendUp: true, 
    trendValue: '2.5%', 
    icon: 'payments' 
  },
  { 
    label: 'Savings Rate', 
    value: `${store.savingsRate.toFixed(1)}%`, 
    trendUp: store.savingsRate > 20, 
    trendValue: '1.2%', 
    icon: 'monitoring' 
  },
  { 
    label: 'Active Goals', 
    value: store.activeGoalsCount, 
    trendUp: true, 
    trendValue: '+1', 
    icon: 'ads_click' 
  }
])
</script>
