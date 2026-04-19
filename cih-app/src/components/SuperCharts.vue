<template>
  <div class="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
    <!-- Time Toggle Bar -->
    <div class="flex justify-end scale-90 origin-right">
       <div class="bg-white/40 backdrop-blur-xl p-1.5 rounded-2xl border border-white/50 flex gap-2">
          <button 
            v-for="t in ['Daily', 'Weekly', 'Monthly']" 
            :key="t"
            @click="activeTime = t"
            class="px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
            :class="activeTime === t ? 'bg-primary text-white shadow-lg' : 'text-on-surface-variant hover:text-on-surface'"
          >
            {{ t }}
          </button>
       </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <!-- 1. Area Spline: Balance Over Time -->
      <div class="lg:col-span-8 bg-white/40 backdrop-blur-2xl border border-white/50 p-10 rounded-[3rem] shadow-sm relative overflow-hidden group">
        <div class="absolute -z-10 top-0 left-0 w-full h-full bg-gradient-to-b from-primary/5 to-transparent"></div>
        <header class="flex justify-between items-center mb-8">
          <div>
            <h3 class="text-2xl font-headline font-black text-on-surface">Wealth Momentum</h3>
            <p class="text-xs font-bold text-outline">Real-time assets vs liabilities spline analysis</p>
          </div>
          <div class="flex items-center gap-2 text-emerald-500 bg-emerald-500/10 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
            <span class="material-symbols-outlined text-sm font-bold">trending_up</span>
            Stable Grow
          </div>
        </header>

        <div class="h-[350px]">
          <apexchart 
            type="area" 
            height="350" 
            :options="lineOptions" 
            :series="lineSeries"
          ></apexchart>
        </div>
      </div>

      <!-- 2. Doughnut Chart: Categories -->
      <div class="lg:col-span-4 bg-white/40 backdrop-blur-2xl border border-white/50 p-10 rounded-[3rem] shadow-sm flex flex-col items-center justify-between">
        <h3 class="text-xl font-headline font-black text-on-surface text-center w-full mb-8">Expense Fingerprint</h3>
        <div class="w-full h-[280px] flex items-center justify-center">
          <apexchart 
            type="donut" 
            width="100%"
            height="300"
            :options="donutOptions" 
            :series="store.categoryChartData.series"
          ></apexchart>
        </div>
        <div class="mt-4 pt-4 border-t border-white/50 w-full text-center">
           <p class="text-[10px] font-black uppercase tracking-widest text-outline">Hover for Deep Category Analysis</p>
        </div>
      </div>

      <!-- 3. Radar Chart: Financial Health -->
      <div class="lg:col-span-12 bg-on-surface p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center gap-12">
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(65,105,225,0.1),transparent)] pointer-events-none"></div>
        
        <div class="lg:w-1/3">
           <h3 class="text-3xl font-headline font-black text-white mb-6">Financial<br/><span class="text-primary-fixed">DNA Analysis</span></h3>
           <p class="text-white/60 text-sm leading-relaxed mb-10">
             Our AI engine measures your stability across 6 key metrics. You are currently over-performing in <strong>Budget Adherence</strong>.
           </p>
           <ul class="space-y-4">
              <li v-for="(v, i) in store.financialHealth.categories.slice(0, 3)" :key="i" class="flex items-center gap-4">
                 <div class="w-2 h-2 rounded-full bg-primary"></div>
                 <span class="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">{{ v }}</span>
                 <span class="ml-auto text-sm font-black text-white">{{ store.financialHealth.values[i] }}%</span>
              </li>
           </ul>
        </div>

        <div class="lg:w-2/3 h-[400px] w-full flex items-center justify-center">
            <apexchart 
              type="radar" 
              width="100%"
              height="400"
              :options="radarOptions" 
              :series="radarSeries"
            ></apexchart>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useFinanceStore } from '../stores/financeStore'

const store = useFinanceStore()
const activeTime = ref('Monthly')

// LINE CHART (AREA SPLINE)
const lineSeries = computed(() => [{
  name: 'Total Balance',
  data: store.balanceHistory.map(d => d.y)
}])

const lineOptions = computed(() => ({
  chart: {
    toolbar: { show: false },
    animations: { enabled: true, easing: 'easeinout', speed: 800 },
    dropShadow: { enabled: true, top: 10, left: 0, blur: 5, color: '#4f46e5', opacity: 0.15 }
  },
  colors: ['#4f46e5'],
  fill: {
    type: 'gradient',
    gradient: { shadeIntensity: 1, opacityFrom: 0.45, opacityTo: 0.05, stops: [20, 100] }
  },
  stroke: { curve: 'smooth', width: 4 },
  xaxis: {
    categories: store.balanceHistory.map(d => d.x),
    axisBorder: { show: false },
    axisTicks: { show: false },
    labels: { style: { colors: '#94a3b8', fontWeight: 600 } }
  },
  yaxis: { labels: { show: false } }, // Keeping it minimal as requested
  grid: { borderColor: 'rgba(0,0,0,0.03)', strokeDashArray: 5 },
  tooltip: {
    theme: 'dark',
    x: { show: false },
    y: { formatter: (v) => `${v.toLocaleString()} DH` }
  }
}))

// DONUT CHART
const donutOptions = computed(() => ({
  chart: { animations: { enabled: true, speed: 1000 } },
  labels: store.categoryChartData.labels,
  colors: ['#3b82f6', '#10b981', '#ef4444', '#f59e0b', '#8b5cf6'],
  stroke: { show: false },
  plotOptions: {
    pie: {
      donut: {
        size: '75%',
        labels: {
          show: true,
          total: {
            show: true,
            label: 'EXPENSES',
            color: '#94a3b8',
            fontSize: '10px',
            fontWeight: 800,
            formatter: () => `${store.monthlySpending.toLocaleString()} DH`
          }
        }
      }
    }
  },
  legend: { show: false },
  dataLabels: { enabled: false },
  tooltip: { theme: 'dark' }
}))

// RADAR CHART
const radarSeries = computed(() => [{
  name: 'Health Score',
  data: store.financialHealth.values
}])

const radarOptions = computed(() => ({
  chart: {
    toolbar: { show: false },
    dropShadow: { enabled: true, top: 0, left: 0, blur: 5, color: '#4f46e5', opacity: 0.2 }
  },
  colors: ['#3b82f6'],
  stroke: { width: 3 },
  fill: { opacity: 0.25 },
  markers: { size: 4, colors: ['#fff'], strokeColor: '#3b82f6', strokeWidth: 2 },
  xaxis: {
    categories: store.financialHealth.categories,
    labels: { style: { colors: ['#ffffff66', '#ffffff66', '#ffffff66', '#ffffff66', '#ffffff66', '#ffffff66'], fontSize: '10px', fontWeight: 700 } }
  },
  yaxis: { show: false },
  plotOptions: { radar: { polygons: { strokeColors: 'rgba(255,255,255,0.08)', fill: { colors: 'transparent' } } } }
}))

// SIMULATE TIME CHANGE (Aesthetic Only for Demo)
watch(activeTime, () => {
    // Just force a redraw/update if needed by the component
    // In a real app we would update the store
})
</script>

<style scoped>
.apexcharts-canvas {
  filter: drop-shadow(0 0 10px rgba(79, 70, 229, 0.05));
}
</style>
