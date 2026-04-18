<template>
  <div class="bg-surface-container-highest rounded-[2rem] p-8 flex flex-col justify-between">
    <div>
      <div class="flex justify-between items-center mb-6">
        <h3 class="font-headline text-lg font-bold text-primary-container">Savings Goals</h3>
        <button class="text-primary font-bold text-sm hover:text-secondary-container transition-colors">View All</button>
      </div>
      
      <div class="space-y-6">
        <div v-for="goal in store.savingsGoals" :key="goal.id">
          <div class="flex justify-between text-sm mb-2">
            <span class="font-medium text-on-surface">{{ goal.label }}</span>
            <span class="text-outline">${{ goal.current / 1000 }}k / ${{ goal.target / 1000 }}k</span>
          </div>
          <div class="h-2 w-full bg-surface-container-lowest rounded-full overflow-hidden">
            <div class="h-full rounded-full" :class="goal.colorClass" :style="`width: ${(goal.current / goal.target) * 100}%`"></div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="mt-8 bg-primary-fixed/50 rounded-xl p-4 flex items-start gap-3">
      <span class="material-symbols-outlined text-primary-container mt-0.5">lightbulb</span>
      <p class="text-sm font-body text-primary-container">
        You're on track to hit your Emergency Fund goal by October. 
        <a class="font-semibold underline hover:text-primary transition-colors" href="#">Accelerate it</a>.
      </p>
    </div>
  </div>
</template>

<script setup>
import { useFinanceStore } from '../stores/financeStore'

const store = useFinanceStore()
</script>
