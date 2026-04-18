<template>
  <div class="bg-surface-container-lowest rounded-[2rem] p-8">
    <h3 class="font-headline text-lg font-bold text-primary-container mb-6">Spending Breakdown</h3>
    
    <div class="relative w-48 h-48 mx-auto flex items-center justify-center">
      <!-- CSS Donut Chart Approximation -->
      <div class="absolute inset-0 rounded-full border-[16px] border-surface-container"></div>
      <div class="absolute inset-0 rounded-full border-[16px] border-primary-container border-t-transparent border-r-transparent transform -rotate-45"></div>
      <div class="absolute inset-0 rounded-full border-[16px] border-secondary-container border-b-transparent border-l-transparent border-r-transparent transform rotate-45"></div>
      <div class="text-center">
        <span class="block font-headline text-2xl font-bold text-primary-container">${{ store.spendingBreakdown.total.toLocaleString() }}</span>
        <span class="text-xs text-outline">Total Spent</span>
      </div>
    </div>
    
    <div class="mt-8 space-y-3">
      <div v-for="category in store.spendingBreakdown.categories" :key="category.id" class="flex justify-between items-center text-sm">
        <div class="flex items-center gap-2">
          <span class="w-3 h-3 rounded-full" :class="category.color"></span>
          <span class="font-body text-on-surface">{{ category.label }}</span>
        </div>
        <span class="font-medium">${{ category.amount.toLocaleString() }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useFinanceStore } from '../stores/financeStore'

const store = useFinanceStore()
</script>
