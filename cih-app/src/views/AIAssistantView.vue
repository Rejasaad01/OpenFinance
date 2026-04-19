<template>
  <div class="flex-1 ml-0 md:ml-72 flex flex-col h-screen bg-surface relative overflow-hidden font-body">
    
    <!-- Demo Header -->
    <header class="h-20 bg-white/80 backdrop-blur-xl border-b border-outline-variant/10 px-8 flex items-center justify-between z-40 shrink-0">
      <div class="flex items-center gap-4">
        <div class="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-on-primary shadow-xl shadow-primary/20">
          <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">smart_toy</span>
        </div>
        <div>
          <h2 class="font-headline font-black text-on-surface leading-none tracking-tight">AI Demo Environment</h2>
          <div class="flex items-center gap-1.5 mt-1">
            <span class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            <span class="text-[9px] font-black uppercase tracking-widest text-outline">System Online</span>
          </div>
        </div>
      </div>

      <div class="flex items-center gap-4">
        <!-- New Chat Button (only visible when chatting) -->
        <button 
          v-if="store.isChatting"
          @click="store.resetChat"
          class="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container-high text-on-surface text-[10px] font-black uppercase tracking-widest border border-outline-variant/10 hover:bg-primary/10 hover:text-primary transition-all active:scale-95"
        >
          <span class="material-symbols-outlined text-lg">add_comment</span>
          New Conversation
        </button>

        <!-- Quick Context Switcher (hidden on small screens) -->
        <div class="hidden lg:flex bg-surface-container-low p-1 rounded-2xl border border-outline-variant/10">
          <button 
            v-for="mode in primaryModes" 
            :key="mode.name"
            @click="handleModeSelect(mode.name)"
            class="px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
            :class="store.activeMode === mode.name ? 'bg-white text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'"
          >
            {{ mode.name.split(' ')[0] }}
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content Area -->
    <div ref="historyRef" class="flex-1 overflow-y-auto custom-scrollbar pt-8 flex flex-col items-center">
      
      <!-- State 1: Welcome Screen -->
      <transition name="fade-scale" mode="out-in">
        <div v-if="!store.isChatting" class="w-full h-full flex flex-col items-center justify-center p-12 lg:px-24">
          <div class="flex flex-col items-center text-center max-w-2xl mx-auto mb-16 animate-in fade-in slide-in-from-top-6 duration-700">
            <div class="w-24 h-24 rounded-[2.5rem] bg-gradient-to-br from-primary to-primary-container flex items-center justify-center text-on-primary shadow-2xl mb-8 group hover:rotate-6 transition-transform">
              <span class="material-symbols-outlined text-5xl group-hover:scale-110 transition-transform" style="font-variation-settings: 'FILL' 1;">psychology</span>
            </div>
            <h1 class="font-headline text-5xl lg:text-7xl font-black text-on-surface tracking-tighter mb-6 leading-none">
              Financial <span class="text-primary italic">Intelligence</span>
            </h1>
            <p class="text-on-surface-variant text-xl font-medium max-w-lg leading-relaxed opacity-80">
              Your AI partner for budgeting, goals, and deep spending analysis. Pick a path to see the demo in action.
            </p>
          </div>

          <!-- Interactive Suggestion Cards -->
          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 w-full max-w-6xl animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            <button 
              v-for="(card, idx) in suggestionCards" 
              :key="idx"
              @click="store.startWithPrompt(card.prompt, card.mode)"
              class="bg-white p-10 rounded-[3rem] border border-outline-variant/10 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)] transition-all group text-left flex flex-col gap-6 relative overflow-hidden h-64 active:scale-95"
            >
              <div class="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-bl-full transition-transform group-hover:scale-110"></div>
              <div class="w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm" :class="card.color">
                <span class="material-symbols-outlined text-3xl" style="font-variation-settings: 'FILL' 1;">{{ card.icon }}</span>
              </div>
              <h3 class="font-headline font-black text-on-surface text-2xl group-hover:text-primary transition-colors leading-tight">{{ card.title }}</h3>
              <div class="mt-auto flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                Simulate <span class="material-symbols-outlined text-sm">arrow_right_alt</span>
              </div>
            </button>
          </div>
        </div>

        <!-- Active Chat -->
        <div v-else class="w-full h-full flex flex-col px-6 md:px-12 lg:px-48 py-20 gap-10">
          <div 
            v-for="(msg, idx) in store.messages" 
            :key="idx"
            class="flex w-full animate-in fade-in slide-in-from-bottom-4 duration-500"
            :class="msg.role === 'user' ? 'justify-end' : 'justify-start'"
          >
            <div 
              class="max-w-[85%] lg:max-w-[80%] p-8 rounded-[3rem] shadow-sm transition-all relative"
              :class="msg.role === 'user' 
                ? 'bg-primary text-on-primary rounded-tr-none' 
                : 'bg-white text-on-surface border border-outline-variant/10 rounded-tl-none pb-14'"
            >
              <div v-if="msg.role === 'system'" class="absolute -top-3 -left-3 w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-on-primary shadow-lg">
                <span class="material-symbols-outlined text-xl" style="font-variation-settings: 'FILL' 1;">bolt</span>
              </div>
              <p class="text-base font-medium leading-relaxed whitespace-pre-wrap">{{ msg.content }}</p>

              <div v-if="msg.role === 'system' && msg.actions?.length" class="mt-6 flex flex-wrap gap-2">
                <button
                  v-for="action in msg.actions"
                  :key="action"
                  @click="handleAction(action)"
                  class="px-4 py-2 rounded-xl border border-primary/10 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-all active:scale-95"
                >
                  {{ action }}
                </button>
              </div>
              
              <!-- Message Footer (Actionable feel) -->
              <div v-if="msg.role === 'system'" class="absolute bottom-4 left-8 flex gap-6 opacity-30 hover:opacity-100 transition-opacity border-t border-outline-variant/10 pt-3 w-[calc(100%-4rem)]">
                <button class="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest hover:text-primary">
                   <span class="material-symbols-outlined text-sm">thumb_up</span> Helpful
                </button>
                <button class="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest hover:text-primary">
                   <span class="material-symbols-outlined text-sm">content_copy</span> Copy
                </button>
                <button class="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest hover:bg-error/10 hover:text-error ml-auto">
                   <span class="material-symbols-outlined text-sm">flag</span> Report
                </button>
              </div>
            </div>
          </div>

          <!-- Typing Indicator -->
          <div v-if="store.isTyping" class="flex justify-start mb-4">
            <div class="bg-white flex items-center gap-5 p-8 rounded-[3rem] rounded-tl-none border border-outline-variant/10 shadow-sm relative overflow-hidden">
               <div class="absolute left-0 top-0 w-1 h-full bg-primary/20"></div>
              <div class="flex gap-2">
                <div class="w-2.5 h-2.5 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div class="w-2.5 h-2.5 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div class="w-2.5 h-2.5 bg-primary rounded-full animate-bounce"></div>
              </div>
              <span class="text-xs font-black text-primary uppercase tracking-[0.2em] opacity-60">Modeling Data...</span>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <!-- Bottom Action Bar -->
    <div class="pb-12 pt-6 px-6 md:px-12 lg:px-48 bg-gradient-to-t from-surface via-surface to-transparent relative z-30">
      <div class="max-w-4xl mx-auto space-y-4">
        
        <!-- Mobile/Compact Mode Toggles -->
        <div class="flex lg:hidden items-center gap-2 overflow-x-auto no-scrollbar py-2">
          <button 
            v-for="mode in modes" 
            :key="mode.name"
            @click="handleModeSelect(mode.name)"
            class="px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest whitespace-nowrap transition-all border"
            :class="store.activeMode === mode.name 
              ? 'bg-primary text-on-primary border-primary shadow-lg shadow-primary/20' 
              : 'bg-white text-on-surface-variant border-outline-variant/20'"
          >
            {{ mode.name }}
          </button>
        </div>

        <div class="bg-white/90 backdrop-blur-3xl p-3 pl-8 rounded-[2.5rem] border border-outline-variant/20 shadow-2xl flex items-center gap-4 transition-all focus-within:ring-8 focus-within:ring-primary/5 overflow-hidden group">
          <button class="text-outline hover:text-primary transition-colors flex-shrink-0 group-hover:rotate-12 duration-300">
            <span class="material-symbols-outlined text-3xl">attach_file</span>
          </button>
          
          <form @submit.prevent="handleSend" class="flex-1 flex items-center gap-4">
            <input 
              v-model="userInput"
              type="text" 
              :placeholder="currentPlaceholder"
              class="flex-1 bg-transparent border-none outline-none focus:ring-0 text-on-surface font-semibold text-lg py-5"
              :disabled="store.isTyping"
            >
            <button 
              type="submit"
              class="w-16 h-16 rounded-[1.5rem] bg-primary text-on-primary flex items-center justify-center shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:grayscale shrink-0"
              :disabled="!userInput.trim() || store.isTyping"
            >
              <span class="material-symbols-outlined text-3xl font-bold" style="font-variation-settings: 'FILL' 1;">arrow_upward</span>
            </button>
          </form>
        </div>
        
        <!-- Helpful Footer -->
        <div v-if="!store.isChatting" class="text-center animate-in fade-in duration-1000">
            <span class="text-[9px] font-black uppercase tracking-[0.2em] text-outline opacity-40">AI Demo Environment • Persistent Interaction Simulation</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import { useChatStore } from '../stores/chatStore'

const store = useChatStore()
const userInput = ref('')
const historyRef = ref(null)

const suggestionCards = [
  { title: 'Analyze my spending this month', prompt: 'Show me my spending breakdown for April.', icon: 'insights', mode: 'Spending Coach', color: 'bg-primary-container text-white' },
  { title: 'Help me save for a car', prompt: 'I want to save for a new car.', icon: 'directions_car', mode: 'Goal Planner', color: 'bg-secondary-container text-white' },
  { title: 'Build a monthly budget', prompt: 'How should I allocate my income this month?', icon: 'pie_chart', mode: 'Budget Manager', color: 'bg-surface-tint text-white' },
  { title: 'Make a secure transfer', prompt: 'I want to send money', icon: 'payments', mode: 'Transfer Agent', color: 'bg-primary text-white' }
]

const modes = [
  { name: 'General Banking Help', placeholder: 'Ask Cognitive Vault anything about your finances...' },
  { name: 'Spending Coach', placeholder: 'How is my spending looking this week?' },
  { name: 'Goal Planner', placeholder: 'Help me set a new savings goal...' },
  { name: 'Loan Advisor', placeholder: 'Tell me about loan options available to me...' },
  { name: 'File Analyst', placeholder: 'Analyze my uploaded documents...' },
  { name: 'Transfer Agent', placeholder: 'Send 500 DH to Mohammed' }
]

const primaryModes = computed(() => (
  modes.filter(mode => ['General Banking Help', 'Spending Coach', 'Transfer Agent'].includes(mode.name))
))

const currentPlaceholder = computed(() => {
  if (store.pendingTransfer?.stage === store.transferSteps.WAITING_FOR_RECIPIENT) {
    return 'Type the exact full name, e.g. Mohammed Amine El Idrissi'
  }

  if (store.pendingTransfer?.stage === store.transferSteps.WAITING_FOR_AMOUNT) {
    return 'Type the amount only, e.g. 500 DH'
  }

  if (store.pendingTransfer?.stage === store.transferSteps.WAITING_FOR_PIN) {
    return 'Enter PIN to validate, demo PIN is 1234'
  }

  return modes.find(m => m.name === store.activeMode)?.placeholder || 'Type here...'
})

const handleModeSelect = (modeName) => {
  if (modeName === 'Transfer Agent') {
    store.startWithPrompt('I want to send money', modeName)
    return
  }

  store.activeMode = modeName
}

const handleAction = (action) => {
  if (store.isTyping) return
  store.sendMessage(action, store.activeMode)
}

const handleSend = () => {
  if (!userInput.value.trim() || store.isTyping) return
  store.sendMessage(userInput.value)
  userInput.value = ''
}

// Auto-scroll logic
watch(() => store.messages.length, async () => {
  await nextTick()
  if (historyRef.value) {
    historyRef.value.scrollTo({
      top: historyRef.value.scrollHeight,
      behavior: 'smooth'
    })
  }
}, { deep: true })

watch(() => store.isTyping, async (val) => {
  if (val) {
    await nextTick()
    if (historyRef.value) {
      historyRef.value.scrollTo({
        top: historyRef.value.scrollHeight,
        behavior: 'smooth'
      })
    }
  }
})
</script>

<style scoped>
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.98);
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: theme('colors.outline-variant');
  border-radius: 10px;
}

/* Ensure material symbols are correctly rendered */
.material-symbols-outlined {
  font-display: block;
}
</style>
