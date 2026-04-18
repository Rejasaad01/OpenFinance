<template>
  <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
    <div>
      <h2 class="font-headline text-4xl md:text-5xl font-extrabold text-primary-container tracking-tight">Welcome back, {{ store.user.name }}.</h2>
      <p class="text-on-surface-variant font-body mt-2 text-lg">
        Your portfolio is up <span class="text-secondary font-semibold">+{{ store.user.portfolioChangePercentage }}%</span> this week.
      </p>
    </div>
    <div class="flex gap-3">
      <button class="bg-surface-container-lowest text-primary font-headline font-semibold py-3 px-6 rounded-full hover:bg-surface-container-low transition-colors shadow-sm">Transfer</button>
      <button class="bg-surface-container-lowest text-primary font-headline font-semibold py-3 px-6 rounded-full hover:bg-surface-container-low transition-colors shadow-sm">Save</button>
      <button class="bg-secondary-container text-on-secondary-container font-headline font-bold py-3 px-6 rounded-full hover:opacity-90 transition-opacity">Set Goal</button>
    </div>
  </div>
</template>

<script setup>
import { useFinanceStore } from '../stores/financeStore'

const store = useFinanceStore()
</script>
