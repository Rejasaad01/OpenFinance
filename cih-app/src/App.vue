<template>
  <Sidebar />
  <router-view></router-view>
</template>

<script setup>
import { onMounted } from 'vue'
import Sidebar from './components/Sidebar.vue'
import { useFinanceStore } from './stores/financeStore'

const store = useFinanceStore()

onMounted(() => {
  store.refreshAll()
})
</script>
