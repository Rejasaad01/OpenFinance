<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <div v-for="metric in metrics" :key="metric.label" 
      class="relative group isolate overflow-hidden bg-white/40 backdrop-blur-2xl border border-white/50 p-8 rounded-[2.5rem] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] transition-all hover:-translate-y-1 hover:shadow-2xl"
    >
      <!-- Background Glow -->
      <div 
        class="absolute -z-10 -right-4 -bottom-4 w-32 h-32 rounded-full blur-3xl opacity-20 transition-all group-hover:scale-150"
        :class="metric.glowColor"
      ></div>

      <div class="flex justify-between items-start mb-4">
        <p class="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface/50">{{ metric.label }}</p>
        <div class="w-8 h-8 rounded-xl flex items-center justify-center bg-white/80 border border-white/20 shadow-sm animate-pulse">
           <span class="material-symbols-outlined text-lg" :class="metric.textColor">{{ metric.icon }}</span>
        </div>
      </div>

      <div class="flex items-end justify-between gap-4">
        <div>
          <h3 class="text-3xl font-headline font-black text-on-surface tracking-tighter">{{ metric.value }}</h3>
          <p class="text-[11px] font-bold mt-1 flex items-center gap-1" :class="metric.trendColor">
            <span class="material-symbols-outlined text-[14px]">{{ metric.trendIcon }}</span>
            {{ metric.trend }}
          </p>
        </div>
        
        <!-- Mini Sparkline (Static Simulation) -->
        <div class="flex items-end gap-1 h-12">
           <div v-for="(v, i) in metric.spark" :key="i"
             class="w-1.5 rounded-full transition-all duration-700"
             :class="metric.sparkColor"
             :style="{ height: `${v}%`, opacity: 0.3 + (i * 0.1) }"
           ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useFinanceStore } from '../stores/financeStore'

const store = useFinanceStore()
const format = (v) => new Intl.NumberFormat('en-MA', { style: 'currency', currency: 'MAD', maximumFractionDigits: 0 }).format(v).replace('MAD', 'DH')

const metrics = computed(() => [
  { 
    label: 'Total Balance', 
    value: format(store.totalBalance), 
    trend: '+12.5%', 
    trendIcon: 'trending_up', 
    trendColor: 'text-emerald-500', 
    glowColor: 'bg-blue-500', 
    textColor: 'text-blue-600',
    icon: 'account_balance_wallet',
    spark: [20, 45, 30, 60, 40, 80, 70],
    sparkColor: 'bg-blue-500'
  },
  { 
    label: 'Monthly Savings', 
    value: format(store.monthlyIncome - store.monthlySpending), 
    trend: '+4.2%', 
    trendIcon: 'trending_up', 
    trendColor: 'text-emerald-500', 
    glowColor: 'bg-emerald-500', 
    textColor: 'text-emerald-600',
    icon: 'savings',
    spark: [40, 30, 60, 45, 90, 60, 85],
    sparkColor: 'bg-emerald-500'
  },
  { 
    label: 'AI-Predicted Spending', 
    value: format(2400), 
    trend: '-15% Predicted', 
    trendIcon: 'auto_awesome', 
    trendColor: 'text-indigo-500', 
    glowColor: 'bg-indigo-500', 
    textColor: 'text-indigo-600',
    icon: 'insights',
    spark: [80, 70, 60, 50, 40, 35, 30],
    sparkColor: 'bg-indigo-500'
  },
  { 
    label: 'Financial Score', 
    value: '84/100', 
    trend: 'Expert Tier', 
    trendIcon: 'verified', 
    trendColor: 'text-amber-500', 
    glowColor: 'bg-amber-500', 
    textColor: 'text-amber-600',
    icon: 'star',
    spark: [10, 30, 50, 70, 80, 85, 90],
    sparkColor: 'bg-amber-500'
  }
])
</script>
