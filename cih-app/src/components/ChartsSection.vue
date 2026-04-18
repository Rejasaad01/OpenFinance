<template>
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 px-0">
    <!-- Row 1: Left Column (Major Analysis) -->
    <div class="lg:col-span-8 space-y-8">
      <!-- Spending by Category -->
      <div class="bg-white p-10 rounded-[3rem] border border-outline-variant/10 shadow-sm relative overflow-hidden">
        <header class="flex justify-between items-center mb-10">
          <div>
            <h3 class="text-2xl font-headline font-black text-on-surface">Spending by Category</h3>
            <p class="text-xs font-medium text-outline">Allocation analysis for current billing cycle</p>
          </div>
          <div class="w-12 h-12 rounded-2xl bg-surface-container flex items-center justify-center text-primary">
            <span class="material-symbols-outlined">analytics</span>
          </div>
        </header>

        <div class="space-y-8">
          <div v-for="cat in store.categoryBreakdown" :key="cat.name" class="group">
            <div class="flex justify-between items-end mb-3">
              <div class="flex items-center gap-3">
                <span class="w-2 h-2 rounded-full" :class="getCategoryColor(cat.name)"></span>
                <span class="text-sm font-bold text-on-surface tracking-tight">{{ cat.name }}</span>
                <span class="text-[10px] font-black uppercase text-outline opacity-40">{{ cat.percentage.toFixed(0) }}%</span>
              </div>
              <span class="text-sm font-black text-on-surface">{{ format(cat.amount) }}</span>
            </div>
            <div class="w-full h-3.5 bg-surface-container rounded-full overflow-hidden p-0.5 border border-outline-variant/5">
              <div 
                class="h-full rounded-full transition-all duration-1000 ease-out p-1 relative"
                :class="getCategoryColor(cat.name)"
                :style="{ width: `${cat.percentage}%` }"
              >
                <div class="absolute inset-x-0 bottom-0 bg-white/20 h-0.5 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Income vs Expense Visual -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="bg-white p-10 rounded-[3rem] border border-outline-variant/10 shadow-sm">
          <h3 class="text-xl font-headline font-black text-on-surface mb-8">Income vs Expenses</h3>
          <div class="flex items-center justify-center gap-12 h-40">
            <!-- Income Column -->
            <div class="flex flex-col items-center gap-4 group h-full justify-end">
              <span class="text-[10px] font-black text-green-600">{{ format(store.incomeVsExpenseData.income) }}</span>
              <div class="w-12 bg-green-500/20 rounded-xl relative group-hover:bg-green-500/30 transition-all flex flex-col justify-end overflow-hidden h-32">
                <div class="bg-green-500 h-[80%] rounded-t-xl"></div>
              </div>
              <span class="text-[10px] font-black uppercase tracking-widest text-outline">Income</span>
            </div>
            <!-- Expense Column -->
            <div class="flex flex-col items-center gap-4 group h-full justify-end">
              <span class="text-[10px] font-black text-red-500">{{ format(store.incomeVsExpenseData.expense) }}</span>
              <div class="w-12 bg-red-500/20 rounded-xl relative group-hover:bg-red-500/30 transition-all flex flex-col justify-end overflow-hidden h-32">
                <div class="bg-red-500 rounded-t-xl" :style="{ height: `${store.incomeVsExpenseData.ratio}%` }"></div>
              </div>
              <span class="text-[10px] font-black uppercase tracking-widest text-outline">Expenses</span>
            </div>
          </div>
          <div class="mt-8 pt-8 border-t border-outline-variant/10 text-center">
             <p class="text-xs font-bold text-outline">You spent <span class="text-on-surface font-black">{{ store.incomeVsExpenseData.ratio.toFixed(0) }}%</span> of your income this month.</p>
          </div>
        </div>

        <div class="bg-surface-container-low p-10 rounded-[3rem] border border-outline-variant/5 shadow-sm">
          <h3 class="text-xl font-headline font-black text-on-surface mb-8">Spending Evolution</h3>
          <div class="flex items-end h-40 gap-4">
             <div v-for="t in store.trends" :key="t.label" class="flex-1 flex flex-col items-center gap-4 group">
                <div 
                  class="w-full bg-primary/10 rounded-xl relative transition-all group-hover:bg-primary/20 cursor-pointer overflow-hidden p-0.5"
                  :style="{ height: `${(t.value / 2500) * 100}%` }"
                >
                  <div class="absolute inset-0 bg-primary/30 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div class="absolute bottom-0 inset-x-0 h-1 bg-primary rounded-full"></div>
                </div>
                <span class="text-[9px] font-black uppercase text-outline">{{ t.label }}</span>
             </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Column: Goals & Distribution -->
    <div class="lg:col-span-4 space-y-8">
      <!-- Goal Progress -->
      <div class="bg-white p-10 rounded-[3rem] border border-outline-variant/10 shadow-sm h-full">
        <div class="flex items-center justify-between mb-10">
          <h3 class="text-xl font-headline font-black text-on-surface">Goal Tracking</h3>
          <span class="material-symbols-outlined text-outline">target</span>
        </div>
        
        <div class="space-y-10">
          <div v-for="goal in store.savingsGoals.slice(0, 2)" :key="goal.id">
            <div class="flex justify-between items-center mb-4">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-lg flex items-center justify-center" :class="goal.colorClass + '/10'">
                  <span class="material-symbols-outlined text-sm" :class="goal.colorClass.replace('bg-', 'text-')">{{ goal.icon }}</span>
                </div>
                <span class="text-sm font-bold">{{ goal.label }}</span>
              </div>
              <span class="text-xs font-black">{{ ((goal.current / goal.target) * 100).toFixed(0) }}%</span>
            </div>
            
            <div class="w-full h-2.5 bg-surface-container rounded-full overflow-hidden">
              <div 
                class="h-full transition-all duration-1000"
                :class="goal.colorClass"
                :style="{ width: `${(goal.current / goal.target) * 100}%` }"
              ></div>
            </div>
            <div class="flex justify-between mt-2">
              <span class="text-[9px] font-black uppercase tracking-widest opacity-40">Progress</span>
              <span class="text-[9px] font-black uppercase tracking-widest opacity-40">Goal: {{ format(goal.target) }}</span>
            </div>
          </div>
        </div>

        <button class="w-full mt-10 py-5 rounded-[2rem] border-2 border-dashed border-outline-variant/30 text-outline text-[10px] font-black uppercase tracking-widest hover:border-primary hover:text-primary transition-all">
          + Add New Goal
        </button>
      </div>
      
      <!-- Expense Mosaic (Distribution) -->
      <div class="bg-on-surface p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
        <h3 class="text-xl font-headline font-black mb-8">Mosaic Insights</h3>
        <div class="flex flex-wrap gap-2 mb-6">
          <div v-for="cat in store.categoryBreakdown.slice(0, 3)" :key="cat.name" 
            class="p-4 rounded-3xl border border-white/10 grow flex flex-col gap-2"
            :style="{ width: `${cat.percentage}%`, minWidth: '40%' }"
          >
            <span class="text-[9px] font-black uppercase tracking-tighter opacity-60">{{ cat.name }}</span>
            <span class="text-lg font-black">{{ cat.percentage.toFixed(0) }}%</span>
          </div>
        </div>
        <p class="text-xs leading-relaxed text-white/50">Your top 3 categories account for 82% of your total spending profile.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useFinanceStore } from '../stores/financeStore'

const store = useFinanceStore()
const format = (v) => new Intl.NumberFormat('en-MA', { style: 'currency', currency: 'MAD', maximumFractionDigits: 0 }).format(v).replace('MAD', 'DH')

const getCategoryColor = (name) => {
  const map = {
    'Food': 'bg-orange-500',
    'Transport': 'bg-blue-500',
    'Bills': 'bg-red-500',
    'Shopping': 'bg-pink-500',
    'Subscriptions': 'bg-indigo-500'
  }
  return map[name] || 'bg-outline'
}
</script>
