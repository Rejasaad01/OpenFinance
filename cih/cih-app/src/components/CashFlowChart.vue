<template>
  <div class="bg-surface-container-lowest rounded-[3rem] p-8">
    <div class="flex justify-between items-center mb-8">
      <h3 class="font-headline text-xl font-bold text-primary-container">Cash Flow</h3>
      <select class="bg-surface border-none rounded-full py-2 px-4 text-sm font-body text-on-surface-variant focus:ring-0 cursor-pointer">
        <option>Last 6 Months</option>
        <option>This Year</option>
      </select>
    </div>
    
    <!-- Placeholder for Chart -->
    <div class="h-64 flex items-end justify-between gap-2 pt-4">
      <!-- Bars -->
      <div v-for="month in chartData" :key="month.id" class="flex flex-col justify-end items-center gap-1 w-full h-full relative group">
        <div class="w-full bg-primary-container rounded-t-lg hover:opacity-80 transition-opacity" :style="`height: ${month.income}%`"></div>
        <div class="w-full bg-secondary-container/80 rounded-b-lg hover:opacity-80 transition-opacity" :style="`height: ${month.expense}%`"></div>
        <span class="text-xs text-outline mt-2 absolute -bottom-6">{{ month.label }}</span>
      </div>
    </div>
    
    <div class="flex justify-center gap-6 mt-10">
      <div class="flex items-center gap-2">
        <span class="w-3 h-3 rounded-full bg-primary-container"></span>
        <span class="text-sm font-body text-on-surface-variant">Income</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="w-3 h-3 rounded-full bg-secondary-container/80"></span>
        <span class="text-sm font-body text-on-surface-variant">Expenses</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const chartData = ref([
  { id: 'jan', label: 'Jan', income: 60, expense: 40 },
  { id: 'feb', label: 'Feb', income: 70, expense: 30 },
  { id: 'mar', label: 'Mar', income: 65, expense: 50 },
  { id: 'apr', label: 'Apr', income: 80, expense: 35 },
  { id: 'may', label: 'May', income: 75, expense: 60 },
  { id: 'jun', label: 'Jun', income: 90, expense: 40 },
])
</script>
