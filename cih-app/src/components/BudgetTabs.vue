<template>
  <div class="flex items-center gap-1 bg-surface-container-low p-1.5 rounded-2xl border border-outline-variant/10 shadow-sm w-fit">
    <button 
      v-for="tab in tabs" 
      :key="tab.id"
      @click="$emit('update:activeTab', tab.id)"
      class="px-5 py-2.5 rounded-xl font-headline font-bold text-sm transition-all duration-300 flex items-center gap-2"
      :class="[
        activeTab === tab.id 
          ? 'bg-primary text-on-primary shadow-md active:scale-95' 
          : 'text-on-surface-variant hover:bg-surface-variant/50 hover:text-on-surface'
      ]"
    >
      <span class="material-symbols-outlined text-[18px]">{{ tab.icon }}</span>
      <span class="hidden sm:inline">{{ tab.name }}</span>
    </button>
  </div>
</template>

<script setup>
defineProps({
  activeTab: String
})

defineEmits(['update:activeTab'])

const tabs = [
  { id: 'budget', name: 'Budget Manager', icon: 'account_balance_wallet' },
  { id: 'goals', name: 'Goal Setter', icon: 'ads_click' },
  { id: 'spending', name: 'Spending Features', icon: 'analytics' }
]
</script>
