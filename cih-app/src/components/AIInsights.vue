<template>
  <div class="glass-panel rounded-[3rem] p-8 border border-white/40 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] relative overflow-hidden">
    <div class="absolute top-0 right-0 w-32 h-32 bg-primary-fixed blur-3xl -z-10 rounded-full opacity-50"></div>
    
    <div class="flex items-center gap-3 mb-6">
      <div class="bg-primary-container text-on-primary w-10 h-10 rounded-full flex items-center justify-center">
        <span class="material-symbols-outlined" data-icon="smart_toy">smart_toy</span>
      </div>
      <h3 class="font-headline text-xl font-bold text-primary-container">Cognitive Insights</h3>
    </div>
    
    <div class="space-y-4">
      <div v-for="insight in store.aiInsights" :key="insight.id" 
           class="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/20 transition-colors group cursor-pointer"
           :class="insight.type === 'warning' ? 'hover:border-secondary/30' : 'hover:border-primary/30'">
        <div class="flex items-start gap-3">
          <span class="material-symbols-outlined mt-1" :class="insight.type === 'warning' ? 'text-secondary' : 'text-primary-container'">
            {{ insight.type === 'warning' ? 'trending_down' : 'account_balance' }}
          </span>
          <div>
            <h4 class="font-headline font-semibold text-on-surface text-sm">{{ insight.title }}</h4>
            <p class="text-xs font-body text-on-surface-variant mt-1 leading-relaxed">{{ insight.description }}</p>
            <button class="mt-3 text-xs font-bold transition-colors"
                    :class="insight.type === 'warning' ? 'text-secondary group-hover:text-secondary-container' : 'text-primary-container group-hover:text-primary'">
              {{ insight.actionText }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useFinanceStore } from '../stores/financeStore'

const store = useFinanceStore()
</script>
