<template>
  <div class="animate-in fade-in slide-in-from-bottom-4 duration-700">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <!-- Insights Cards -->
      <div class="lg:col-span-4 space-y-6">
        <div class="bg-white/40 backdrop-blur-2xl border border-white/50 p-10 rounded-[3rem] shadow-sm relative overflow-hidden group">
          <div class="absolute -right-4 -top-4 w-32 h-32 bg-primary/5 rounded-full blur-3xl transition-transform group-hover:scale-125"></div>
          
          <h3 class="text-xl font-headline font-black mb-10 flex items-center gap-4 text-on-surface">
             <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <span class="material-symbols-outlined font-bold">lightbulb</span>
             </div>
             Spending Pulse
          </h3>
          
          <div class="space-y-6">
            <div class="p-6 rounded-[2rem] bg-white/60 border border-white/40 shadow-sm">
              <span class="text-[10px] font-black uppercase tracking-[0.2em] text-outline block mb-4">Core Alert</span>
              <div class="flex items-center gap-4">
                <div class="w-14 h-14 rounded-2xl bg-primary text-on-primary flex items-center justify-center shadow-lg shadow-primary/20">
                  <span class="material-symbols-outlined text-2xl" style="font-variation-settings: 'FILL' 1;">{{ getIcon(store.highestSpendingCategory.name) }}</span>
                </div>
                <div>
                  <h4 class="font-black text-lg text-on-surface leading-none">{{ store.highestSpendingCategory.name }}</h4>
                  <p class="text-primary font-black text-xs mt-2 uppercase tracking-widest">{{ formatCurrency(store.highestSpendingCategory.amount) }} Spent</p>
                </div>
              </div>
            </div>

            <div class="p-6 rounded-[2rem] bg-indigo-50 border border-indigo-100 shadow-sm translate-y-2">
              <span class="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500 block mb-3">AI Optimization</span>
              <p class="text-xs font-bold text-indigo-900 leading-relaxed uppercase tracking-tighter">
                Your <span class="text-indigo-600">Behavioral Pattern</span> suggests you could save <span class="text-indigo-600">$105.00</span> by shifting 'Food' spend to 'Grocery' prepping.
              </p>
            </div>
          </div>
        </div>

        <div class="bg-on-surface p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
          <div class="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-bl-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <span class="material-symbols-outlined text-5xl mb-8 text-primary opacity-80" style="font-variation-settings: 'FILL' 1;">verified</span>
          <h3 class="text-3xl font-headline font-black mb-4 leading-tight">Insight<br/>Platinum</h3>
          <p class="text-white/40 text-sm font-medium mb-10 leading-relaxed">Level up to institutional grade forecasting and direct bank orchestration.</p>
          <button class="w-full py-5 bg-primary text-on-primary font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">Go Platinum</button>
        </div>
      </div>

      <!-- Chart / Visuals -->
      <div class="lg:col-span-8">
        <div class="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-[3rem] p-12 shadow-sm h-full relative overflow-hidden group">
          <div class="absolute -z-10 bottom-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl"></div>
          
          <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div>
              <div class="flex items-center gap-2 mb-2">
                <span class="w-1 h-4 bg-primary rounded-full"></span>
                <span class="text-[10px] font-black uppercase tracking-widest text-primary">Volume Distribution</span>
              </div>
              <h2 class="text-4xl font-headline font-black text-on-surface tracking-tighter leading-none">Deep Analytics</h2>
            </div>
            <div class="text-left md:text-right bg-white/60 p-4 rounded-3xl border border-white/80 shadow-sm shrink-0">
              <span class="text-[9px] font-black uppercase tracking-[0.2em] text-outline block mb-1">Cycle Volume</span>
              <div class="text-3xl font-headline font-black text-on-surface tracking-tighter leading-none">{{ formatCurrency(store.spendingBreakdown.total) }}</div>
            </div>
          </div>

          <div class="space-y-12 mb-16">
            <div v-for="cat in store.spendingBreakdown.categories" :key="cat.id" class="group/bar">
              <div class="flex items-center justify-between mb-4 px-1">
                <div class="flex items-center gap-4">
                  <div class="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm" :class="cat.color + '/10'">
                    <span class="material-symbols-outlined text-lg" :class="cat.color.replace('bg-', 'text-')">{{ getIcon(cat.label) }}</span>
                  </div>
                  <span class="font-black text-on-surface text-lg tracking-tight">{{ cat.label }}</span>
                </div>
                <div class="flex items-center gap-6">
                  <span class="font-headline font-black text-xl text-on-surface">{{ formatCurrency(cat.amount) }}</span>
                  <span class="text-[10px] font-black text-primary bg-primary/5 px-2.5 py-1 rounded-lg border border-primary/10">
                    {{ Math.round((cat.amount / Math.max(1, store.spendingBreakdown.total)) * 100) }}%
                  </span>
                </div>
              </div>
              
              <!-- Premium Progress Bar -->
              <div class="w-full h-4 bg-surface-container-high rounded-full overflow-hidden relative p-0.5 border border-white/50">
                <div 
                  class="h-full rounded-full transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] relative"
                  :class="cat.color"
                  :style="{ width: `${(cat.amount / Math.max(1, store.spendingBreakdown.total)) * 100}%` }"
                >
                  <div class="absolute inset-x-0 bottom-0 bg-white/20 h-0.5 rounded-full mx-1"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Bottom Summary Tiles -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 p-2 bg-on-surface/5 rounded-[2.5rem] border border-white/40">
            <div v-for="tile in summaryTiles" :key="tile.label" class="text-center p-6 border-r border-on-surface/5 last:border-0">
              <span class="text-[9px] font-black uppercase tracking-[0.3em] text-outline block mb-3">{{ tile.label }}</span>
              <div class="text-2xl font-headline font-black tracking-tighter leading-none" :class="tile.color">{{ tile.value }}</div>
            </div>
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
const formatCurrency = (val) => new Intl.NumberFormat('en-MA', { style: 'currency', currency: 'MAD', maximumFractionDigits: 0 }).format(val).replace('MAD', 'DH')

const getIcon = (cat) => {
  const icons = {
    'Food': 'restaurant',
    'Housing': 'home',
    'Transport': 'directions_car',
    'Bills': 'payments',
    'Shopping': 'shopping_bag',
    'Subscriptions': 'shield',
    'Other': 'category'
  }
  return icons[cat] || 'category'
}

const summaryTiles = computed(() => [
  { label: 'Health', value: '82/100', color: 'text-emerald-500' },
  { label: 'Daily', value: '$108', color: 'text-on-surface' },
  { label: 'Subs', value: '$89', color: 'text-on-surface' },
  { label: 'Savings', value: '22%', color: 'text-primary' }
])
</script>
