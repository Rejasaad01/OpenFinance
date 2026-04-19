<template>
  <div class="ml-0 md:ml-72 flex-1 flex flex-col min-h-screen bg-surface relative pb-24 md:pb-0">
    <!-- Header Section -->
    <header class="px-4 pt-24 pb-6 sm:px-6 md:px-8 lg:px-12 md:py-10 bg-surface-container-lowest border-b border-outline-variant/10">
      <div class="max-w-[1600px] mx-auto flex flex-col xl:flex-row justify-between items-start xl:items-center gap-5 md:gap-8">
        <div>
          <div class="flex items-center gap-3 mb-2">
            <div class="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-on-primary shadow-sm">
              <span class="material-symbols-outlined text-[18px]">account_balance_wallet</span>
            </div>
            <h2 class="font-headline text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">Financial Hub</h2>
          </div>
          <p class="font-body text-on-surface-variant max-w-xl text-sm leading-relaxed">
            Manage your daily flow, track long-term dreams, and analyze spending patterns all in one place.
          </p>
        </div>

        <!-- Internal Tab Navigation -->
        <BudgetTabs v-model:activeTab="activeTab" />
      </div>
    </header>

    <!-- Main Content Area -->
    <main class="flex-1 px-4 sm:px-6 md:px-8 lg:px-12 py-6 md:py-10 max-w-[1600px] mx-auto w-full overflow-x-hidden">
      <!-- Transition wrapper for smooth switching -->
      <transition 
        name="section-fade" 
        mode="out-in"
      >
        <div :key="activeTab">
          <BudgetSection v-if="activeTab === 'budget'" />
          <GoalsSection v-else-if="activeTab === 'goals'" />
          <SpendingSection v-else-if="activeTab === 'spending'" />
        </div>
      </transition>
    </main>

    <!-- Floating Quick Info (Optional aesthetic touch) -->
    <div class="fixed bottom-8 right-8 z-40 hidden sm:block">
      <div class="bg-surface-container-highest/80 backdrop-blur-xl border border-outline-variant/30 px-6 py-4 rounded-3xl shadow-2xl flex items-center gap-6">
        <div class="flex flex-col">
          <span class="text-[9px] font-black uppercase tracking-widest text-outline">Net Worth</span>
          <span class="font-headline font-extrabold text-lg text-on-surface">{{ formatCurrency(store.totalBalance + 45000) }}</span>
        </div>
        <div class="h-8 w-px bg-outline-variant/30"></div>
        <div class="flex flex-col">
          <span class="text-[9px] font-black uppercase tracking-widest text-secondary">Savings Goal</span>
          <span class="font-headline font-extrabold text-lg text-secondary">82% On Track</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useFinanceStore } from '../stores/financeStore'
import BudgetTabs from '../components/BudgetTabs.vue'
import BudgetSection from '../components/BudgetSection.vue'
import GoalsSection from '../components/GoalsSection.vue'
import SpendingSection from '../components/SpendingSection.vue'

const store = useFinanceStore()
const activeTab = ref('budget')

const formatCurrency = (val) => {
  return new Intl.NumberFormat('en-MA', { style: 'currency', currency: 'MAD' }).format(val).replace('MAD', 'DH')
}
</script>

<style scoped>
.section-fade-enter-active,
.section-fade-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.section-fade-enter-from {
  opacity: 0;
  transform: translateY(10px) scale(0.98);
}

.section-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(1.02);
}
</style>
