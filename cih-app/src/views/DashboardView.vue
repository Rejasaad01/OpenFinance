<template>
  <div class="flex-1 ml-0 md:ml-72 min-h-screen bg-background pb-20 md:pb-0">
    <div class="p-8 lg:p-12 max-w-7xl mx-auto space-y-8">
      <WelcomeSection />
      
      <!-- Dashboard Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <!-- Left Column: Accounts & Charts -->
        <div class="lg:col-span-8 space-y-8">
          <AccountCards />
          <CashFlowChart />
          
          <!-- Goals & Spending Categories Row -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <SpendingBreakdown />
            <SavingsGoals />
          </div>
        </div>
        
        <!-- Right Column: AI Panel & Bills -->
        <div class="lg:col-span-4 space-y-8">
          <AIInsights />
          <UpcomingBills />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import WelcomeSection from '../components/WelcomeSection.vue'
import AccountCards from '../components/AccountCards.vue'
import CashFlowChart from '../components/CashFlowChart.vue'
import SpendingBreakdown from '../components/SpendingBreakdown.vue'
import SavingsGoals from '../components/SavingsGoals.vue'
import AIInsights from '../components/AIInsights.vue'
import UpcomingBills from '../components/UpcomingBills.vue'
</script>
