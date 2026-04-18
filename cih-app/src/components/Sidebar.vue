<template>
  <nav class="hidden md:flex bg-[#e4e9ed] dark:bg-slate-900 rounded-r-[3rem] h-screen w-72 fixed left-0 top-0 flex-col py-8 z-50">
    <div class="px-8 mb-10 flex items-center gap-3">
      <div class="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary font-headline font-bold">CV</div>
      <div>
        <h1 class="font-headline text-2xl font-black tracking-tighter text-primary-container dark:text-white">Cognitive Vault</h1>
        <p class="text-xs text-on-surface-variant">Premium AI Banking</p>
      </div>
    </div>
    
    <div class="flex-1 overflow-y-auto">
      <ul class="space-y-2">
        <li v-for="item in menuItems" :key="item.label">
          <router-link 
             :to="item.path"
             custom
             v-slot="{ href, navigate, isActive }"
          >
            <a v-if="!isActive"
               :href="href"
               @click="navigate"
               class="flex items-center gap-4 text-slate-600 dark:text-slate-400 px-8 py-4 hover:bg-surface dark:hover:bg-slate-700 transition-colors duration-300 font-headline font-semibold tracking-tight text-sm scale-95 active:scale-90"
            >
              <span class="material-symbols-outlined" :data-icon="item.icon">{{ item.icon }}</span>
              {{ item.label }}
            </a>
            <a v-else
               :href="href"
               @click="navigate"
               class="flex items-center gap-4 bg-white dark:bg-slate-800 text-primary-container dark:text-blue-300 rounded-l-full ml-4 font-bold shadow-sm px-8 py-4 font-headline tracking-tight text-sm scale-95 active:scale-90 transition-all"
            >
              <span class="material-symbols-outlined" :data-icon="item.icon">{{ item.icon }}</span>
              {{ item.label }}
            </a>
          </router-link>
        </li>
      </ul>
    </div>
    
    <div class="px-8 mt-auto">
      <button class="w-full bg-secondary-container text-on-secondary-container font-headline font-bold py-4 rounded-full flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
        <span class="material-symbols-outlined" data-icon="add">add</span>
        New Transaction
      </button>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const menuItems = ref([
  { label: 'AI Assistant', icon: 'smart_toy', path: '/ai-assistant' },
  { label: 'Dashboard', icon: 'dashboard', path: '/dashboard' },
  { label: 'Planning & Goals', icon: 'flag', path: '/planning-and-goals' },
  { label: 'Spending Insights', icon: 'insights', path: '/spending-insights' },
  { label: 'File Analysis', icon: 'description', path: '/file-analysis' },
  { label: 'Loan Advisor', icon: 'account_balance', path: '/loan-advisor' },
  { label: 'Transfer Agent', icon: 'compare_arrows', path: '/transfer-agent' },
  { label: 'Alerts', icon: 'notifications', path: '/alerts' },
  { label: 'Profile', icon: 'person', path: '/profile' },
])
</script>
