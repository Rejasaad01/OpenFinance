<template>
  <div class="bg-surface-container-low p-12 rounded-[3.5rem] border border-outline-variant/10">
    <div class="flex items-center gap-4 mb-10">
      <div class="w-12 h-12 rounded-2xl bg-primary text-on-primary flex items-center justify-center shadow-lg">
        <span class="material-symbols-outlined font-bold" style="font-variation-settings: 'FILL' 1;">bolt</span>
      </div>
      <div>
        <h3 class="text-2xl font-headline font-black text-on-surface tracking-tight">Financial Intelligence</h3>
        <p class="text-[10px] font-black uppercase tracking-widest text-primary">Automated insights from your transaction history</p>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <div 
        v-for="(insight, idx) in store.insights" 
        :key="idx"
        class="bg-white p-8 rounded-[2.5rem] border border-outline-variant/5 hover:shadow-2xl transition-all group cursor-default"
      >
        <div class="w-10 h-10 rounded-xl mb-6 flex items-center justify-center transition-transform group-hover:scale-110" :class="getInsightColor(insight.type)">
          <span class="material-symbols-outlined text-xl">{{ getInsightIcon(insight.type) }}</span>
        </div>
        <p class="text-on-surface-variant font-medium leading-relaxed">
          {{ insight.text }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useFinanceStore } from '../stores/financeStore'

const store = useFinanceStore()

const getInsightColor = (type) => {
  const map = {
    'warning': 'bg-red-100 text-red-600',
    'info': 'bg-blue-100 text-blue-600',
    'success': 'bg-green-100 text-green-600',
    'primary': 'bg-indigo-100 text-indigo-600'
  }
  return map[type] || 'bg-outline-variant/20'
}

const getInsightIcon = (type) => {
  const map = {
    'warning': 'warning',
    'info': 'analytics',
    'success': 'verified',
    'primary': 'auto_awesome'
  }
  return map[type] || 'info'
}
</script>
