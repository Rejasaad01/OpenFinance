<template>
  <nav class="hidden md:flex bg-background h-screen w-72 fixed left-0 top-0 flex-col py-8 z-50 rounded-r-[1.5rem] border-r border-[#e3edf2]/70 shadow-[10px_0_32px_-24px_rgba(6,51,70,0.32)]">
    <div class="px-8 mb-10 flex items-center gap-3">
      <div class="w-10 h-10 rounded-full bg-[#13a8d8] flex items-center justify-center text-white font-headline font-bold">CV</div>
      <div>
        <h1 class="font-headline text-2xl font-black tracking-tighter text-[#063346]">Cognitive Vault</h1>
        <p class="text-xs text-[#4f6874]">Premium AI Banking</p>
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
               class="flex items-center gap-4 text-[#536b78] px-8 py-4 hover:bg-[#f4f9fc] hover:text-[#13a8d8] transition-colors duration-300 font-headline font-semibold tracking-tight text-sm scale-95 active:scale-90"
            >
              <span class="material-symbols-outlined" :data-icon="item.icon">{{ item.icon }}</span>
              {{ item.label }}
            </a>
            <a v-else
               :href="href"
               @click="navigate"
               class="flex items-center gap-4 bg-[#e8f7fb] text-[#13a8d8] rounded-l-full ml-4 font-bold shadow-sm px-8 py-4 font-headline tracking-tight text-sm scale-95 active:scale-90 transition-all"
            >
              <span class="material-symbols-outlined" :data-icon="item.icon">{{ item.icon }}</span>
              {{ item.label }}
            </a>
          </router-link>
        </li>
      </ul>
    </div>
    
    <div class="px-8 mt-auto">
      <button class="w-full bg-[#ff7900] text-[#2b1600] font-headline font-bold py-4 rounded-full flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
        <span class="material-symbols-outlined" data-icon="add">add</span>
        New Transaction
      </button>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const menuItems = ref([
  { label: 'Banking Agent', icon: 'smart_toy', path: '/ai-assistant' },
  { label: 'Dashboard', icon: 'dashboard', path: '/dashboard' },
  { label: 'Budget Manager', icon: 'account_balance_wallet', path: '/planning-and-goals' },
  { label: 'Loan Advisor', icon: 'account_balance', path: '/loan-advisor' },
])
</script>
