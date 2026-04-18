<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
    <div v-for="item in metrics" :key="item.label" 
      class="bg-white p-8 rounded-[2.5rem] border border-outline-variant/10 shadow-sm transition-all hover:shadow-xl group relative overflow-hidden"
    >
      <!-- Background icon for aesthetic -->
      <div class="absolute -right-4 -bottom-4 opacity-5 scale-150 rotate-12 transition-transform group-hover:rotate-0">
        <span class="material-symbols-outlined text-8xl text-on-surface">{{ item.icon }}</span>
      </div>

      <p class="text-[10px] font-black uppercase tracking-[0.2em] text-outline mb-4 flex items-center gap-2">
        <span class="w-1.5 h-1.5 rounded-full" :class="item.color"></span>
        {{ item.label }}
      </p>

      <div class="flex flex-col gap-1">
        <h3 class="font-headline font-black text-3xl text-on-surface tracking-tighter">{{ item.value }}</h3>
        <div class="flex items-center gap-2">
          <span :class="['text-[11px] font-bold flex items-center', item.trendColor]">
            <span class="material-symbols-outlined text-[14px]">{{ item.trendIcon }}</span>
            {{ item.trend }}
          </span>
          <span class="text-[10px] font-medium text-outline">vs last month</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useFinanceStore } from '../stores/financeStore'

const store = useFinanceStore()
const format = (v) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(v)

const metrics = computed(() => [
  { 
    label: 'Total Balance', 
    value: format(store.totalBalance), 
    trend: '4.2%', 
    trendIcon: 'trending_up', 
    trendColor: 'text-green-600', 
    color: 'bg-primary', 
    icon: 'account_balance_wallet' 
  },
  { 
    label: 'Total Income', 
    value: format(store.monthlyIncome), 
    trend: '12%', 
    trendIcon: 'trending_up', 
    trendColor: 'text-green-600', 
    color: 'bg-green-500', 
    icon: 'payments' 
  },
  { 
    label: 'Total Expenses', 
    value: format(store.monthlySpending), 
    trend: '-5%', 
    trendIcon: 'trending_down', 
    trendColor: 'text-red-500', 
    color: 'bg-red-500', 
    icon: 'shopping_bag' 
  },
  { 
    label: 'Savings Rate', 
    value: `${store.savingsRate.toFixed(1)}%`, 
    trend: '2.4%', 
    trendIcon: 'trending_up', 
    trendColor: 'text-green-600', 
    color: 'bg-indigo-500', 
    icon: 'monitoring' 
  },
  { 
    label: 'Monthly Change', 
    value: `${store.monthlyTrendPercentage > 0 ? '+' : ''}${store.monthlyTrendPercentage.toFixed(1)}%`, 
    trend: '8.1%', 
    trendIcon: store.monthlyTrendPercentage > 0 ? 'trending_up' : 'trending_down', 
    trendColor: store.monthlyTrendPercentage > 0 ? 'text-red-500' : 'text-green-600', 
    color: 'bg-yellow-500', 
    icon: 'event_repeat' 
  }
])
</script>
