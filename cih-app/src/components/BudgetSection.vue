<template>
  <div class="animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <!-- Balance & Form -->
      <div class="lg:col-span-4 space-y-6">
        <div class="bg-gradient-to-br from-primary-container to-primary p-8 rounded-[2.5rem] text-on-primary shadow-xl relative overflow-hidden">
          <div class="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
          <p class="text-xs font-black uppercase tracking-widest opacity-70 mb-1">Available Balance</p>
          <div class="text-5xl font-headline font-extrabold mb-6 tracking-tight">
            {{ formatCurrency(store.totalBalance) }}
          </div>
          <div class="flex gap-4">
            <div class="flex-1 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
              <span class="text-[10px] font-bold uppercase opacity-60 block mb-1">Monthly Income</span>
              <span class="font-headline font-bold">8,450 DH</span>
            </div>
            <div class="flex-1 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
              <span class="text-[10px] font-bold uppercase opacity-60 block mb-1">Active Budget</span>
              <span class="font-headline font-bold">3,240 DH</span>
            </div>
          </div>
        </div>

        <div class="bg-surface-container-lowest border border-outline-variant/20 p-8 rounded-[2.5rem] shadow-sm">
          <h3 class="text-xl font-headline font-bold mb-6 flex items-center gap-2">
            <span class="material-symbols-outlined text-primary">add_circle</span>
            Quick Add
          </h3>
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div class="flex gap-2 bg-surface-container-low p-1 rounded-xl">
              <button 
                type="button" 
                @click="form.type = 'expense'"
                class="flex-1 py-2 rounded-lg text-xs font-bold transition-all"
                :class="form.type === 'expense' ? 'bg-error text-on-error shadow-sm' : 'text-on-surface-variant hover:bg-surface-variant'"
              >Expense</button>
              <button 
                type="button" 
                @click="form.type = 'income'"
                class="flex-1 py-2 rounded-lg text-xs font-bold transition-all"
                :class="form.type === 'income' ? 'bg-green-600 text-white shadow-sm' : 'text-on-surface-variant hover:bg-surface-variant'"
              >Income</button>
            </div>
            
            <input 
              v-model="form.description"
              type="text" 
              placeholder="Description (e.g. Groceries)"
              class="w-full px-5 py-3.5 rounded-2xl bg-surface-container border border-outline-variant/10 focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all outline-none text-sm font-medium"
              required
            >
            
            <div class="relative">
              <span class="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant font-bold text-sm">DH</span>
              <input 
                v-model="form.amount"
                type="number" 
                step="0.01"
                placeholder="0.00"
                class="w-full pl-5 pr-12 py-3.5 rounded-2xl bg-surface-container border border-outline-variant/10 focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all outline-none font-bold"
                required
              >
            </div>

            <select 
              v-model="form.category"
              class="w-full px-4 py-3.5 rounded-2xl bg-surface-container border border-outline-variant/10 focus:border-primary transition-all outline-none text-sm font-medium"
            >
              <option disabled value="">Select Category</option>
              <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
            </select>

            <button 
              type="submit"
              class="w-full py-4 rounded-2xl bg-primary-container text-on-primary-container font-black uppercase tracking-widest text-xs hover:bg-primary hover:text-on-primary hover:shadow-lg transition-all active:scale-95"
            >
              Log Transaction
            </button>
          </form>
        </div>
      </div>

      <!-- Transactions List -->
      <div class="lg:col-span-8">
        <div class="bg-surface-container-lowest border border-outline-variant/10 rounded-[2.5rem] shadow-sm overflow-hidden">
          <div class="px-8 py-6 border-b border-outline-variant/10 flex items-center justify-between">
            <h3 class="text-xl font-headline font-bold">Recent Activity</h3>
            <div class="flex gap-2">
              <button class="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-on-surface-variant border border-outline-variant/10 hover:border-primary transition-colors">
                <span class="material-symbols-outlined text-[18px]">filter_list</span>
              </button>
            </div>
          </div>
          
          <div class="divide-y divide-outline-variant/5 max-h-[600px] overflow-y-auto custom-scrollbar">
            <div 
              v-for="tx in store.transactions" 
              :key="tx.id"
              class="px-8 py-6 flex items-center justify-between hover:bg-surface-container-low transition-colors group"
            >
              <div class="flex items-center gap-5">
                <div 
                  class="w-12 h-12 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 shadow-sm"
                  :class="tx.type === 'income' ? 'bg-green-100 text-green-600 border border-green-200' : 'bg-surface-container-high text-on-surface-variant border border-outline-variant/10'"
                >
                  <span class="material-symbols-outlined">{{ getIcon(tx.category) }}</span>
                </div>
                <div>
                  <h4 class="font-bold text-on-surface">{{ tx.description }}</h4>
                  <div class="flex items-center gap-3 mt-1">
                    <span class="text-[10px] font-black uppercase tracking-tighter px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant">
                      {{ tx.category }}
                    </span>
                    <span class="text-[10px] font-bold text-outline capitalize">{{ tx.date }}</span>
                  </div>
                </div>
              </div>
              <div 
                class="font-headline font-black text-lg"
                :class="tx.type === 'income' ? 'text-green-600' : 'text-on-surface'"
              >
                {{ tx.type === 'income' ? '+' : '-' }}{{ formatCurrency(Math.abs(tx.amount)) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useFinanceStore } from '../stores/financeStore'

const store = useFinanceStore()

const categories = ['Food & Dining', 'Housing', 'Transport', 'Entertainment', 'Income', 'Shopping', 'Other']

const form = reactive({
  description: '',
  amount: null,
  type: 'expense',
  category: ''
})

const handleSubmit = () => {
  store.addTransaction({
    description: form.description,
    amount: Number(form.amount),
    type: form.type,
    category: form.category || (form.type === 'income' ? 'Income' : 'Other')
  })
  form.description = ''
  form.amount = null
  form.category = ''
}

const formatCurrency = (val) => {
  return new Intl.NumberFormat('en-MA', { style: 'currency', currency: 'MAD' }).format(val).replace('MAD', 'DH')
}

const getIcon = (cat) => {
  const icons = {
    'Food & Dining': 'restaurant',
    'Housing': 'home',
    'Transport': 'directions_car',
    'Entertainment': 'movie',
    'Income': 'payments',
    'Shopping': 'shopping_bag',
    'Other': 'category'
  }
  return icons[cat] || 'category'
}
</script>

<style scoped>
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
</style>
