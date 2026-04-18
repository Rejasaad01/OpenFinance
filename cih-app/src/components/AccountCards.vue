<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <!-- Checking -->
    <div class="hero-gradient rounded-[2rem] p-8 text-on-primary relative overflow-hidden group">
      <div class="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all duration-500"></div>
      
      <div class="flex justify-between items-start mb-8 relative z-10">
        <div>
          <h3 class="font-body text-sm font-medium text-on-primary/80 uppercase tracking-wider">{{ store.accounts[0].type }}</h3>
          <p class="text-xs text-on-primary/60 mt-1">{{ store.accounts[0].label }}</p>
        </div>
        <span class="material-symbols-outlined text-on-primary/80">{{ store.accounts[0].icon }}</span>
      </div>
      
      <div class="relative z-10">
        <span class="font-headline text-5xl font-extrabold tracking-tight">{{ store.formattedCheckingBalance }}</span>
        <div class="mt-4 flex items-center gap-2 text-sm text-primary-fixed">
          <span class="material-symbols-outlined text-sm">trending_up</span>
          <span>+${{ store.accounts[0].monthlyChange }} this month</span>
        </div>
      </div>
    </div>

    <!-- Savings -->
    <div class="bg-surface-container-lowest rounded-[2rem] p-8 text-on-surface relative">
      <div class="flex justify-between items-start mb-8">
        <div>
          <h3 class="font-body text-sm font-medium text-on-surface-variant uppercase tracking-wider">{{ store.accounts[1].type }}</h3>
          <p class="text-xs text-outline mt-1">{{ store.accounts[1].label }}</p>
        </div>
        <span class="material-symbols-outlined text-secondary">{{ store.accounts[1].icon }}</span>
      </div>
      
      <div>
        <span class="font-headline text-4xl font-extrabold text-primary-container tracking-tight">{{ store.formattedSavingsBalance }}</span>
        <div class="mt-4 flex items-center gap-2 text-sm text-secondary">
          <span class="material-symbols-outlined text-sm">trending_up</span>
          <span>+${{ store.accounts[1].interestYtd }} interest YTD</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useFinanceStore } from '../stores/financeStore'

const store = useFinanceStore()
</script>
