<template>
  <div class="ml-0 md:ml-72 flex-1 flex flex-col min-h-screen bg-surface relative overflow-x-hidden">
    <main class="flex-1 flex flex-col items-center justify-center p-6 md:p-12 max-w-5xl mx-auto w-full">
      
      <!-- Transitions for smooth state switching -->
      <transition 
        name="fade-slide" 
        mode="out-in"
      >
        <!-- State 1: IDLE (Marketing) -->
        <div v-if="status === 'idle'" class="text-center space-y-8 animate-in fade-in zoom-in-95 duration-700">
          <div class="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-xs font-black uppercase tracking-widest mb-4">
            <span class="material-symbols-outlined text-sm">auto_awesome</span>
            AI-Powered Lending
          </div>
          
          <h1 class="text-5xl md:text-7xl font-headline font-black text-on-surface tracking-tight leading-tight max-w-4xl mx-auto">
            Find the <span class="text-primary italic">Best Loan</span> for Your Financial Situation
          </h1>
          
          <p class="text-on-surface-variant text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            Discover optimized lending options tailored to your real-time financial profile. Click below to start your personalized analysis.
          </p>
          
          <div class="pt-8">
            <button 
              @click="startAnalysis"
              class="group relative bg-primary text-on-primary px-10 py-5 rounded-[2rem] font-headline font-black text-lg transition-all hover:scale-105 active:scale-95 shadow-xl shadow-primary/20 overflow-hidden"
            >
              <div class="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none"></div>
              <span class="relative flex items-center justify-center gap-3">
                Analyze My Situation
                <span class="material-symbols-outlined group-hover:translate-x-1 transition-transform">bolt</span>
              </span>
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16 opacity-60">
            <div class="flex flex-col items-center gap-2">
              <span class="material-symbols-outlined text-3xl">lock</span>
              <span class="text-xs font-bold uppercase tracking-widest">Secure & Private</span>
            </div>
            <div class="flex flex-col items-center gap-2 border-x border-outline-variant/20 px-6">
              <span class="material-symbols-outlined text-3xl">speed</span>
              <span class="text-xs font-bold uppercase tracking-widest">Instant Results</span>
            </div>
            <div class="flex flex-col items-center gap-2">
              <span class="material-symbols-outlined text-3xl">verified</span>
              <span class="text-xs font-bold uppercase tracking-widest">Best Rates Guaranteed</span>
            </div>
          </div>
        </div>

        <!-- State 2: LOADING (Analysis) -->
        <div v-else-if="status === 'loading'" class="w-full max-w-xl text-center space-y-12">
          <div class="relative w-32 h-32 mx-auto">
            <!-- Spinner -->
            <div class="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
            <div class="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
            <div class="absolute inset-0 flex items-center justify-center">
              <span class="material-symbols-outlined text-4xl text-primary animate-pulse">psychology</span>
            </div>
          </div>

          <div class="space-y-4">
            <transition name="list-fade" mode="out-in">
              <h2 :key="currentMessage" class="text-2xl font-headline font-extrabold text-on-surface">
                {{ currentMessage }}
              </h2>
            </transition>
            
            <!-- Progress Bar -->
            <div class="w-full h-2 bg-surface-container rounded-full overflow-hidden p-0 px-0.5">
              <div 
                class="h-full bg-primary rounded-full transition-all duration-300"
                :style="{ width: `${progress}%` }"
              ></div>
            </div>
          </div>

          <div class="flex flex-col gap-3">
            <div v-for="(msg, idx) in messageHistory" :key="idx" class="flex items-center justify-center gap-2 text-green-600 animate-in fade-in slide-in-from-top-2">
              <span class="material-symbols-outlined text-[18px]">check_circle</span>
              <span class="text-xs font-bold uppercase tracking-wider">{{ msg }}</span>
            </div>
          </div>
        </div>

        <!-- State 3: DONE (Results) -->
        <div v-else class="w-full space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <header class="text-center space-y-4 mb-12">
            <div class="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-black uppercase tracking-widest">
              Analysis Complete
            </div>
            <h2 class="text-4xl md:text-5xl font-headline font-black text-on-surface tracking-tight leading-tight">
              Best Loan Options for You
            </h2>
            <p class="text-on-surface-variant max-w-2xl mx-auto font-medium">
              Based on your financial profile, these options offer the best balance between cost and flexibility.
            </p>
          </header>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div 
              v-for="(loan, idx) in results" 
              :key="idx"
              class="bg-white p-8 rounded-[2.5rem] border border-outline-variant/10 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all flex flex-col group relative overflow-hidden"
            >
              <div v-if="loan.tag" class="absolute -top-3 -right-3 bg-secondary-container text-on-secondary-container px-4 py-2 pt-5 rounded-bl-3xl font-black text-[10px] uppercase tracking-widest shadow-lg">
                {{ loan.tag }}
              </div>
              
              <div class="w-14 h-14 rounded-2xl bg-surface-container-low flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform">
                <span class="material-symbols-outlined text-3xl">{{ loan.icon }}</span>
              </div>
              
              <h3 class="text-xl font-headline font-extrabold text-on-surface mb-6">{{ loan.type }}</h3>
              
              <div class="grid grid-cols-2 gap-4 mb-8">
                <div class="space-y-1">
                  <span class="text-[9px] font-black uppercase text-outline tracking-wider block">APR</span>
                  <span class="text-2xl font-headline font-black text-primary">{{ loan.apr }}%</span>
                </div>
                <div class="space-y-1 text-right">
                  <span class="text-[9px] font-black uppercase text-outline tracking-wider block">Duration</span>
                  <span class="text-2xl font-headline font-black">{{ loan.duration }}m</span>
                </div>
              </div>

              <div class="p-4 bg-surface-container-low rounded-2xl border border-outline-variant/10 mb-8">
                <span class="text-[9px] font-black uppercase text-outline tracking-wider block mb-1">Estimated Monthly</span>
                <span class="text-xl font-headline font-extrabold text-on-surface">{{ formatCurrency(loan.payment) }}</span>
              </div>

              <button class="mt-auto w-full py-4 bg-primary text-on-primary rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
                Select Option
              </button>
            </div>
          </div>

          <div class="flex justify-center pt-8">
            <button 
              @click="status = 'idle'"
              class="flex items-center gap-2 text-outline hover:text-primary font-bold text-sm transition-colors"
            >
              <span class="material-symbols-outlined text-xl">refresh</span>
              Restart Analysis
            </button>
          </div>
        </div>
      </transition>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const status = ref('idle') // idle | loading | done
const currentMessage = ref('')
const progress = ref(0)
const messageHistory = ref([])

const analysisSteps = [
  'Analyzing your income...',
  'Evaluating your expenses...',
  'Checking risk profile...',
  'Comparing loan options...'
]

const results = [
  { type: 'Personal Loan', apr: 4.5, duration: 24, payment: 450, icon: 'person', tag: 'Best Match' },
  { type: 'Car Loan', apr: 3.2, duration: 60, payment: 320, icon: 'directions_car', tag: 'Lowest Rate' },
  { type: 'Microcredit', apr: 6.8, duration: 12, payment: 150, icon: 'savings', tag: 'Fast Approval' }
]

const startAnalysis = async () => {
  status.value = 'loading'
  messageHistory.value = []
  progress.value = 0
  
  for (let i = 0; i < analysisSteps.length; i++) {
    currentMessage.value = analysisSteps[i]
    await new Promise(r => setTimeout(r, 1200))
    messageHistory.value.push(currentMessage.value)
    progress.value = ((i + 1) / analysisSteps.length) * 100
  }
  
  await new Promise(r => setTimeout(r, 500))
  status.value = 'done'
}

const formatCurrency = (val) => {
  return new Intl.NumberFormat('en-MA', { style: 'currency', currency: 'MAD' }).format(val).replace('MAD', 'DH')
}
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(30px) scale(0.98);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-30px) scale(1.02);
}

.list-fade-enter-active,
.list-fade-leave-active {
  transition: opacity 0.3s ease;
}

.list-fade-enter-from,
.list-fade-leave-to {
  opacity: 0;
}
</style>
