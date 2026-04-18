<template>
  <div class="flex-1 ml-0 md:ml-72 flex flex-col min-h-screen bg-background relative overflow-hidden">
    <!-- Chat Area -->
    <div class="flex-1 overflow-y-auto pt-8 pb-40 px-12 lg:px-24 xl:px-48 flex flex-col gap-8 scroll-smooth">
      <!-- Welcome Message -->
      <div class="mt-12 flex flex-col items-center text-center max-w-2xl mx-auto">
        <div class="w-16 h-16 rounded-full bg-gradient-to-br from-primary-container to-primary flex items-center justify-center text-on-primary shadow-lg mb-6 shadow-[0_20px_40px_-10px_rgba(0,65,130,0.3)]">
          <span class="material-symbols-outlined text-3xl" style="font-variation-settings: 'FILL' 1;">smart_toy</span>
        </div>
        <h1 class="font-headline text-4xl lg:text-5xl font-extrabold text-primary tracking-tight mb-4 leading-tight">
          Good morning,<br/>how can I help with your finances today?
        </h1>
        <p class="text-on-surface-variant text-lg">
          I can analyze your spending, help you set goals, or manage your transactions.
        </p>
      </div>

      <!-- Suggestion Cards (Bento style) -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 w-full max-w-4xl mx-auto">
        <!-- Card 1 -->
        <button class="bg-surface-container-lowest p-8 rounded-xl hover:shadow-[0_20px_60px_-15px_rgba(23,28,31,0.05)] transition-all group text-left border border-outline-variant/20 flex flex-col gap-4 relative overflow-hidden h-48">
          <div class="absolute top-0 right-0 w-32 h-32 bg-primary-fixed rounded-bl-full opacity-20 -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
          <div class="w-10 h-10 rounded-full bg-primary-fixed text-primary-container flex items-center justify-center mb-auto">
            <span class="material-symbols-outlined">insights</span>
          </div>
          <h3 class="font-headline font-bold text-on-surface text-lg group-hover:text-primary transition-colors">Analyze my spending this month</h3>
        </button>
        
        <!-- Card 2 -->
        <button class="bg-surface-container-lowest p-8 rounded-xl hover:shadow-[0_20px_60px_-15px_rgba(23,28,31,0.05)] transition-all group text-left border border-outline-variant/20 flex flex-col gap-4 relative overflow-hidden h-48">
          <div class="absolute top-0 right-0 w-32 h-32 bg-tertiary-fixed rounded-bl-full opacity-20 -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
          <div class="w-10 h-10 rounded-full bg-tertiary-fixed text-tertiary-container flex items-center justify-center mb-auto">
            <span class="material-symbols-outlined">directions_car</span>
          </div>
          <h3 class="font-headline font-bold text-on-surface text-lg group-hover:text-tertiary transition-colors">Help me save for a car</h3>
        </button>
        
        <!-- Card 3 -->
        <button class="bg-surface-container-lowest p-8 rounded-xl hover:shadow-[0_20px_60px_-15px_rgba(23,28,31,0.05)] transition-all group text-left border border-outline-variant/20 flex flex-col gap-4 relative overflow-hidden h-48">
          <div class="absolute top-0 right-0 w-32 h-32 bg-secondary-fixed rounded-bl-full opacity-20 -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
          <div class="w-10 h-10 rounded-full bg-secondary-fixed text-secondary-container flex items-center justify-center mb-auto">
            <span class="material-symbols-outlined">pie_chart</span>
          </div>
          <h3 class="font-headline font-bold text-on-surface text-lg group-hover:text-secondary-container transition-colors">Build a monthly budget</h3>
        </button>
      </div>

      <div class="flex items-center gap-2 mt-2 mb-8 overflow-x-auto no-scrollbar py-1 px-1 w-full max-w-4xl mx-auto">
        <button v-for="(mode, index) in modes" :key="index"
                @click="selectMode(mode)" 
                class="px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border"
                :class="activeMode === mode.name ? 'bg-primary text-white border-primary' : 'bg-white text-slate-600 border-outline-variant/30 hover:border-primary/50'">
          {{ mode.name }}
        </button>
      </div>
    </div>

    <!-- Bottom Chat Input -->
    <div class="absolute bottom-0 left-0 w-full px-12 lg:px-24 xl:px-48 pb-12 pt-8 bg-gradient-to-t from-surface via-surface to-transparent z-30">
      <div class="max-w-4xl mx-auto relative group">
        <div class="absolute -inset-1 bg-gradient-to-r from-primary-fixed to-secondary-fixed rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
        
        <div class="relative bg-surface-container-lowest rounded-xl shadow-[0_20px_60px_-15px_rgba(23,28,31,0.05)] flex items-center p-2 pl-6 border border-outline-variant/20 focus-within:border-secondary/20 focus-within:shadow-[0_20px_60px_-15px_rgba(23,28,31,0.1)] transition-all">
          <button class="text-on-surface-variant hover:text-primary p-2">
            <span class="material-symbols-outlined">attach_file</span>
          </button>
          <input class="flex-1 bg-transparent border-none outline-none focus:ring-0 text-on-surface placeholder-on-surface-variant/50 font-body text-base px-4 py-4 w-full h-full" 
                 :placeholder="activePlaceholder" 
                 type="text" />
          <button class="bg-secondary-container text-on-secondary-container w-12 h-12 rounded-full flex items-center justify-center hover:bg-secondary-fixed-dim transition-colors ml-2 shrink-0">
            <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">arrow_upward</span>
          </button>
        </div>
        
        <div class="text-center mt-4">
          <span class="text-xs text-on-surface-variant/60 font-body">Cognitive Vault AI can make mistakes. Consider verifying important information.</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const modes = ref([
  { name: 'General Banking Help', placeholder: 'Ask Cognitive Vault anything about your finances...' },
  { name: 'Spending Coach', placeholder: 'How is my spending looking this week?' },
  { name: 'Goal Planner', placeholder: 'Help me set a new savings goal...' },
  { name: 'Loan Advisor', placeholder: 'Tell me about loan options available to me...' },
  { name: 'File Analyst', placeholder: 'Analyze my uploaded documents...' },
  { name: 'Transfer Agent', placeholder: 'Send 500 DH to Mohammed' }
])

const activeMode = ref(modes.value[0].name)
const activePlaceholder = ref(modes.value[0].placeholder)

const selectMode = (mode) => {
  activeMode.value = mode.name
  activePlaceholder.value = mode.placeholder
}
</script>

<style scoped>
/* To hide the scrollbar cleanly on mobile */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>
