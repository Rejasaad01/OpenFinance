<template>
  <nav class="hidden md:flex bg-background h-screen w-72 fixed left-0 top-0 flex-col py-8 z-50 rounded-r-[1.5rem] border-r border-[#e3edf2]/70 shadow-[10px_0_32px_-24px_rgba(6,51,70,0.32)]">
    <div class="px-8 mb-10 flex items-center gap-3">
      <div class="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm border border-[#e3edf2]/80 overflow-hidden">
        <img :src="vfLogo" alt="VF logo" class="w-10 h-10 object-contain" />
      </div>
      <div>
        <h1 class="font-headline text-2xl font-black tracking-tighter text-[#063346]">mo7assib</h1>
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
      <div class="w-full bg-[#f4f9fc] text-[#063346] font-headline font-bold py-4 px-4 rounded-2xl flex items-center gap-3 border border-[#e3edf2]/80 cursor-default select-none">
        <div class="w-10 h-10 rounded-xl bg-white text-[#13a8d8] flex items-center justify-center shadow-sm shrink-0">
          <span class="material-symbols-outlined" data-icon="person">person</span>
        </div>
        <div class="min-w-0 text-left">
          <p class="text-sm leading-tight truncate">Profile</p>
          <p class="text-[10px] text-[#4f6874] font-semibold leading-tight truncate">Demo user</p>
        </div>
      </div>
    </div>
  </nav>

  <header class="md:hidden fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-[#e3edf2]/80 px-4 py-3 flex items-center justify-between">
    <router-link to="/ai-assistant" class="flex items-center gap-3 min-w-0">
      <div class="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm border border-[#e3edf2]/80 overflow-hidden shrink-0">
        <img :src="vfLogo" alt="VF logo" class="w-8 h-8 object-contain" />
      </div>
      <div class="min-w-0">
        <h1 class="font-headline text-xl font-black tracking-tight text-[#063346] leading-none">mo7assib</h1>
        <p class="text-[10px] text-[#4f6874] font-semibold truncate">{{ activeLabel }}</p>
      </div>
    </router-link>

    <div class="w-10 h-10 rounded-xl bg-[#f4f9fc] text-[#13a8d8] flex items-center justify-center shadow-sm border border-[#e3edf2]/80 cursor-default select-none" aria-label="Profile">
      <span class="material-symbols-outlined" data-icon="person">person</span>
    </div>
  </header>

  <nav class="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-[#e3edf2]/80 px-2 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] shadow-[0_-14px_34px_-28px_rgba(6,51,70,0.45)]">
    <ul class="grid grid-cols-4 gap-1">
      <li v-for="item in menuItems" :key="item.label">
        <router-link
          :to="item.path"
          class="min-h-14 rounded-lg px-1 py-2 flex flex-col items-center justify-center gap-1 text-[10px] font-headline font-black leading-tight transition-all active:scale-95"
          :class="$route.path === item.path ? 'bg-[#e8f7fb] text-[#13a8d8]' : 'text-[#536b78]'"
        >
          <span class="material-symbols-outlined text-[22px]" :data-icon="item.icon">{{ item.icon }}</span>
          <span class="w-full truncate text-center">{{ item.shortLabel }}</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import vfLogo from '../assets/vf-logo.png'

const menuItems = ref([
  { label: 'Banking Agent', shortLabel: 'Agent', icon: 'smart_toy', path: '/ai-assistant' },
  { label: 'Dashboard', shortLabel: 'Home', icon: 'dashboard', path: '/dashboard' },
  { label: 'Budget Manager', shortLabel: 'Budget', icon: 'account_balance_wallet', path: '/planning-and-goals' },
  { label: 'Loan Advisor', shortLabel: 'Loans', icon: 'account_balance', path: '/loan-advisor' },
])

const route = useRoute()
const activeLabel = computed(() => menuItems.value.find(item => item.path === route.path)?.label || 'Premium AI Banking')
</script>
