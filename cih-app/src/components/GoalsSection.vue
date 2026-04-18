<template>
  <div class="animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
      <div>
        <h2 class="text-3xl font-headline font-extrabold text-on-surface">Saving Milestones</h2>
        <p class="text-on-surface-variant text-sm">Track and celebrate your progress toward big dreams.</p>
      </div>
      <button 
        @click="showAdd = true"
        class="bg-secondary-container text-on-secondary-container px-6 py-3.5 rounded-2xl font-bold flex items-center gap-2 hover:bg-secondary hover:text-on-secondary transition-all shadow-sm active:scale-95"
      >
        <span class="material-symbols-outlined">rocket_launch</span>
        Set New Goal
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div 
        v-for="goal in store.savingsGoals" 
        :key="goal.id"
        class="group relative bg-surface-container-lowest border border-outline-variant/10 rounded-[2.5rem] p-8 transition-all hover:shadow-xl hover:-translate-y-1 flex flex-col"
        :class="{ 'opacity-60 grayscale-[0.5]': goal.completed }"
      >
        <!-- Completed Badge -->
        <div v-if="goal.completed" class="absolute -top-3 -right-3 bg-green-500 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg animate-bounce">
          <span class="material-symbols-outlined text-xl">check</span>
        </div>

        <div class="flex justify-between items-start mb-10">
          <div 
            class="w-16 h-16 rounded-3xl flex items-center justify-center transition-transform group-hover:scale-110"
            :class="goal.colorClass || 'bg-primary-container text-on-primary-container'"
          >
            <span class="material-symbols-outlined text-3xl font-bold">{{ goal.icon || 'savings' }}</span>
          </div>
          <button 
            @click="store.toggleGoalCompleted(goal.id)"
            class="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border transition-all"
            :class="goal.completed ? 'bg-green-100 text-green-700 border-green-200' : 'bg-surface-container border-outline-variant/10 hover:bg-primary-container hover:text-white'"
          >
            {{ goal.completed ? 'Re-open' : 'Mark Done' }}
          </button>
        </div>

        <h3 class="text-2xl font-headline font-extrabold text-on-surface mb-2 tracking-tight">{{ goal.label }}</h3>
        <div class="flex justify-between text-sm font-bold text-on-surface-variant mb-6">
          <span>{{ formatCurrency(goal.current) }}</span>
          <span class="opacity-40">Target: {{ formatCurrency(goal.target) }}</span>
        </div>

        <div class="mt-auto">
          <!-- Multi-step Progress Bar -->
          <div class="w-full h-5 bg-surface-container-low rounded-full overflow-hidden p-1 relative border border-outline-variant/5">
            <div 
              class="h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(0,0,0,0.1)] relative"
              :class="goal.completed ? 'bg-green-500' : (goal.colorClass || 'bg-primary')"
              :style="{ width: `${Math.min(100, (goal.current / goal.target) * 100)}%` }"
            >
              <div class="absolute inset-0 bg-white/20 animate-[pulse_2s_infinite]"></div>
            </div>
          </div>
          
          <div class="flex justify-between items-center mt-3">
            <span class="text-[10px] font-black uppercase tracking-widest text-primary">
              {{ Math.round((goal.current / goal.target) * 100) }}% Progress
            </span>
            <span v-if="!goal.completed" class="text-[10px] font-bold text-on-surface-variant italic">
               Est. {{ Math.round((goal.target - goal.current) / 500) }} months left
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal for adding goal -->
    <div v-if="showAdd" class="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <div class="absolute inset-0 bg-on-background/30 backdrop-blur-sm" @click="showAdd = false"></div>
      <div class="relative bg-white w-full max-w-md rounded-[3rem] p-10 shadow-2xl animate-in zoom-in-95 duration-200">
        <h2 class="text-3xl font-headline font-extrabold mb-8 text-on-background">New Savings Target</h2>
        <form @submit.prevent="handleGoalSubmit" class="space-y-6">
          <div>
            <label class="block text-xs font-black uppercase tracking-widest text-outline mb-2 ml-1">What are you saving for?</label>
            <input 
              v-model="goalForm.label"
              type="text" 
              placeholder="e.g. World Cruise 2027"
              class="w-full px-5 py-4 rounded-2xl bg-surface border border-outline-variant/30 focus:border-primary outline-none font-medium"
              required
            >
          </div>
          <div>
            <label class="block text-xs font-black uppercase tracking-widest text-outline mb-2 ml-1">Target Amount</label>
            <div class="relative">
              <span class="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-xs text-outline">DH</span>
              <input 
                v-model="goalForm.target"
                type="number" 
                placeholder="5000"
                class="w-full pl-5 pr-12 py-4 rounded-2xl bg-surface border border-outline-variant/30 focus:border-primary outline-none font-black text-lg"
                required
              >
            </div>
          </div>
          
          <div class="flex gap-4 pt-4">
            <button @click="showAdd = false" type="button" class="flex-1 py-4 font-bold text-on-surface-variant hover:bg-surface-container rounded-2xl transition-colors">Cancel</button>
            <button type="submit" class="flex-1 bg-primary text-on-primary py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">Create Goal</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useFinanceStore } from '../stores/financeStore'

const store = useFinanceStore()
const showAdd = ref(false)

const goalForm = reactive({
  label: '',
  target: null
})

const handleGoalSubmit = () => {
  store.addGoal({
    label: goalForm.label,
    target: Number(goalForm.target)
  })
  showAdd.value = false
  goalForm.label = ''
  goalForm.target = null
}

const formatCurrency = (val) => {
  return new Intl.NumberFormat('en-MA', { style: 'currency', currency: 'MAD' }).format(val).replace('MAD', 'DH')
}
</script>
