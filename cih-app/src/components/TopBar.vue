<template>
  <header class="flex justify-between items-center bg-[#f6fafe]/80 dark:bg-slate-950/80 backdrop-blur-xl docked full-width top-0 z-40 sticky px-12 py-6 no-line tonal shift via bg-white/50">
    <div class="flex items-center gap-8">
      <div class="md:hidden">
        <span class="font-headline text-xl font-bold text-primary-container dark:text-white">Cognitive Vault</span>
      </div>
      <nav class="hidden lg:flex gap-6 font-headline text-sm font-medium">
        <router-link v-for="link in navLinks" :key="link.label" 
           :to="link.path"
           custom
           v-slot="{ href, navigate, isActive }"
        >
          <a :href="href"
             @click="navigate"
             class="pb-2 cursor-pointer transition-all opacity-100 hover:opacity-80 whitespace-nowrap"
             :class="isActive ? 'text-primary-container dark:text-blue-400 border-b-4 border-secondary-container font-bold' : 'text-slate-500 dark:text-slate-400 hover:text-secondary-container'"
          >
            {{ link.label }}
          </a>
        </router-link>
      </nav>
    </div>
    
    <div class="flex items-center gap-4">
      <div class="relative hidden sm:block">
        <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
        <input type="text" placeholder="Search..." 
               class="bg-surface-container-lowest rounded-full py-2 pl-10 pr-4 text-sm font-body border border-transparent focus:border-outline-variant/20 focus:ring-0 w-64 placeholder-on-surface-variant"/>
      </div>
      
      <button class="text-primary-container dark:text-blue-400 cursor-pointer opacity-100 hover:opacity-80 transition-all">
        <span class="material-symbols-outlined" data-icon="settings">settings</span>
      </button>
      
      <button class="text-primary-container dark:text-blue-400 cursor-pointer opacity-100 hover:opacity-80 transition-all">
        <span class="material-symbols-outlined" data-icon="help">help</span>
      </button>
      
      <img :src="store.user.avatarUrl" alt="User Profile" class="w-10 h-10 rounded-full object-cover shadow-sm cursor-pointer hover:opacity-80 transition-opacity" />
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useFinanceStore } from '../stores/financeStore'

const store = useFinanceStore()

const navLinks = ref([
  { label: 'General Banking', path: '/dashboard' },
  { label: 'Planning & Goals', path: '/planning-and-goals' },
  { label: 'Spending Coach', path: '/spending-insights' },
  { label: 'Loan Advisor', path: '/loan-advisor' },
  { label: 'File Analyst', path: '/file-analysis' },
  { label: 'Transfer Agent', path: '/transfer-agent' },
])
</script>
