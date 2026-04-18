<template>
  <div class="flex-1 ml-0 md:ml-72 min-h-screen bg-slate-50 relative overflow-hidden">
    
    <!-- Background Decor -->
    <div class="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl -mr-96 -mt-96 pointer-events-none opacity-50"></div>
    <div class="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-secondary/10 to-transparent rounded-full blur-3xl -ml-64 -mb-64 pointer-events-none opacity-50"></div>

    <!-- Header Section -->
    <header class="relative p-12 lg:p-16 max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-10 z-10">
      <div class="animate-in fade-in slide-in-from-left-6 duration-700">
        <div class="flex items-center gap-2 mb-4">
           <div class="h-1.5 w-8 bg-primary rounded-full"></div>
           <span class="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Intelligence Command</span>
        </div>
        <h1 class="text-5xl lg:text-7xl font-headline font-black text-on-surface tracking-tighter leading-none mb-6">
          Portfolio <span class="text-primary italic">Pulse</span>
        </h1>
        <p class="text-on-surface-variant/60 font-medium text-lg max-w-xl">
          Aggregated financial multi-source metrics. Powered by <span class="text-on-surface font-black">Cognitive Vault V2</span>.
        </p>
      </div>

      <div class="flex items-center gap-6 animate-in fade-in slide-in-from-right-6 duration-700 delay-100">
        <div class="text-right">
           <p class="text-[10px] font-black uppercase tracking-widest text-outline mb-1">Last Synced</p>
           <p class="text-sm font-black text-on-surface">{{ currentTime }} • 18 Apr 2026</p>
        </div>
        <button class="w-16 h-16 rounded-2xl bg-on-surface text-white flex items-center justify-center hover:scale-105 transition-all shadow-xl shadow-on-surface/20">
           <span class="material-symbols-outlined text-3xl">refresh</span>
        </button>
      </div>
    </header>

    <!-- Content Grid -->
    <main class="relative px-12 lg:px-16 max-w-7xl mx-auto space-y-12 z-10 pb-32">
       <!-- 1. Top Bento Metrics -->
       <section>
          <BentoMetrics />
       </section>

       <!-- 2. Super Charts Analysis -->
       <section>
          <SuperCharts />
       </section>

       <!-- 3. Dynamic Intelligence Panel -->
       <section class="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
          <InsightsPanel />
       </section>
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import BentoMetrics from '../components/BentoMetrics.vue'
import SuperCharts from '../components/SuperCharts.vue'
import InsightsPanel from '../components/InsightsPanel.vue'

const currentTime = computed(() => {
  return new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
})
</script>

<style scoped>
.animate-in {
  animation-fill-mode: both;
}
</style>
