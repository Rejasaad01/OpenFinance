<template>
  <div class="bg-surface-container-lowest rounded-[2rem] p-8">
    <h3 class="font-headline text-lg font-bold text-primary-container mb-6">Upcoming Bills</h3>
    
    <div class="space-y-6">
      <div v-for="bill in store.upcomingBills" :key="bill.id" class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center">
            <span class="material-symbols-outlined text-on-surface-variant">{{ bill.icon }}</span>
          </div>
          <div>
            <h4 class="font-body font-semibold text-sm text-on-surface">{{ bill.title }}</h4>
            <p class="text-xs text-outline mt-0.5">{{ bill.dueDate }}</p>
          </div>
        </div>
        <span class="font-headline font-bold" :class="bill.isUrgent ? 'text-error' : 'text-on-surface'">
          ${{ bill.amount.toFixed(2) }}
        </span>
      </div>
    </div>
    
    <button class="w-full mt-6 py-3 border-2 border-surface-container-high rounded-full font-headline font-semibold text-sm text-on-surface-variant hover:bg-surface-container-high transition-colors">
      Manage Auto-Pay
    </button>
  </div>
</template>

<script setup>
import { useFinanceStore } from '../stores/financeStore'

const store = useFinanceStore()
</script>
