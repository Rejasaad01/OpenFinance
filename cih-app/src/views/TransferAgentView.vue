<template>
  <div class="ml-0 md:ml-72 flex-1 flex flex-col min-h-screen bg-background relative pb-52 md:pb-32">
    <!-- Canvas Area -->
    <main class="flex-1 px-4 pt-24 pb-6 sm:px-6 md:p-12 lg:p-16 flex flex-col items-center justify-center max-w-5xl mx-auto w-full">
      <!-- Contextual Header -->
      <div class="w-full mb-8 md:mb-12 text-center">
        <h2 class="font-headline text-primary font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight mb-3 md:mb-4">Transfer Agent</h2>
        <p class="text-on-surface-variant font-body text-base sm:text-lg max-w-2xl mx-auto">I'm ready to help you securely move funds. Describe your request below.</p>
      </div>

      <!-- Central AI Interaction Area -->
      <div class="w-full max-w-3xl flex flex-col space-y-6 md:space-y-8">
        <!-- AI Message Bubble -->
        <div class="flex items-start gap-3 md:gap-6 self-start max-w-full sm:max-w-[85%]">
          <div class="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center flex-shrink-0 shadow-sm mt-1">
            <span class="material-symbols-outlined text-2xl" style="font-variation-settings: 'FILL' 1;">smart_toy</span>
          </div>
          <div class="bg-surface-container-lowest p-4 md:p-6 rounded-2xl rounded-tl-sm shadow-sm min-w-0">
            <p class="font-body text-on-surface leading-relaxed mb-6">I understand you want to initiate a transfer. Here are the details I've gathered. Please review them before proceeding.</p>
            
            <!-- AI Insight / Confirmation Card -->
            <div class="bg-primary-fixed bg-opacity-30 border border-primary-fixed rounded-xl p-4 md:p-6 relative overflow-hidden">
              <div class="absolute top-0 right-0 p-4 opacity-10">
                <span class="material-symbols-outlined text-6xl" style="font-variation-settings: 'FILL' 1;">security</span>
              </div>
              <div class="relative z-10">
                <h3 class="font-headline font-bold text-primary mb-4 flex items-center gap-2">
                  <span class="material-symbols-outlined text-secondary-container">check_circle</span>
                  Ready for review
                </h3>
                
                <div class="space-y-3 font-body text-sm">
                  <div class="flex justify-between gap-4 border-b border-white border-opacity-40 pb-2">
                    <span class="text-on-surface-variant font-medium">Recipient</span>
                    <span class="font-bold text-primary">{{ recipient }}</span>
                  </div>
                  <div class="flex justify-between gap-4 border-b border-white border-opacity-40 pb-2">
                    <span class="text-on-surface-variant font-medium">Amount</span>
                    <span class="font-headline font-extrabold text-xl text-primary">{{ amount || 500 }} DH</span>
                  </div>
                </div>
                
                <div class="mt-6 flex flex-col sm:flex-row gap-4">
                  <button 
                    @click="executeTransfer"
                    :disabled="store.isExecutingTransaction"
                    class="flex-1 bg-secondary-container text-on-secondary-container font-semibold py-3 px-6 rounded-xl hover:bg-opacity-90 transition-all shadow-sm disabled:opacity-60"
                  >
                    {{ store.isExecutingTransaction ? 'Processing...' : 'Review Transfer' }}
                  </button>
                  <button @click="clearForm" class="flex-1 bg-transparent text-primary font-semibold py-3 px-6 rounded-xl hover:bg-surface-container-low transition-all">
                    Edit Details
                  </button>
                </div>
                <p v-if="store.transactionError" class="text-xs text-error mt-4 text-center font-bold">{{ store.transactionError }}</p>
                <p v-else-if="transferResult" class="text-xs text-green-700 mt-4 text-center font-bold">
                  {{ transferResult.message }} ID: {{ transferResult.transaction_id }}
                </p>
                <p class="text-xs text-on-surface-variant mt-4 flex items-center gap-1 justify-center">
                  <span class="material-symbols-outlined text-[14px]">lock</span> Secure cognitive verification active
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Input Area (Fixed Bottom or contextual) -->
      <div class="fixed bottom-20 md:bottom-0 left-0 md:left-72 right-0 p-4 md:p-8 bg-gradient-to-t from-background via-background to-transparent pointer-events-none flex justify-center z-30">
        <div class="w-full max-w-3xl pointer-events-auto flex flex-col gap-4">
          <!-- Suggestion Chips -->
          <div class="flex gap-2 md:gap-3 mb-2 px-1 md:px-2 overflow-x-auto no-scrollbar">
            <button class="bg-surface-container-highest text-on-surface text-xs sm:text-sm font-medium py-2 px-3 md:px-4 rounded-full hover:bg-surface-variant transition-colors flex items-center gap-2 shrink-0">
              <span class="material-symbols-outlined text-[18px]">contacts</span>
              Send money to a saved contact
            </button>
            <button class="bg-surface-container-highest text-on-surface text-xs sm:text-sm font-medium py-2 px-3 md:px-4 rounded-full hover:bg-surface-variant transition-colors flex items-center gap-2 shrink-0">
              <span class="material-symbols-outlined text-[18px]">history</span>
              Review recent beneficiaries
            </button>
          </div>
          
          <!-- Main Input -->
          <div class="bg-surface-container-lowest rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-2 flex items-center gap-1 relative group">
            <div class="hidden sm:block pl-4 pr-2 text-primary-container">
              <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">graphic_eq</span>
            </div>
            <input 
              v-model="requestText"
              @input="parseRequest"
              class="flex-1 min-w-0 bg-transparent border-none focus:ring-0 text-on-surface font-body placeholder:text-outline py-3 md:py-4 px-2 w-full outline-none text-sm sm:text-base" 
              placeholder="Type a transfer request, e.g. Send 500 DH to Mohammed" 
              type="text"
            />
            <input
              v-model="pin"
              class="w-16 sm:w-20 bg-surface-container rounded-xl border border-outline-variant/20 text-center font-bold outline-none py-3"
              placeholder="PIN"
              type="password"
            />
            <button 
              @click="executeTransfer"
              :disabled="store.isExecutingTransaction"
              class="bg-primary-container text-on-primary w-12 h-12 rounded-xl flex items-center justify-center hover:bg-primary transition-colors shadow-sm shrink-0 disabled:opacity-60"
            >
              <span class="material-symbols-outlined">send</span>
            </button>
            <div class="absolute -inset-[1px] rounded-2xl border-2 border-transparent group-focus-within:border-secondary/30 pointer-events-none transition-colors"></div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useFinanceStore } from '../stores/financeStore'

const store = useFinanceStore()
const requestText = ref('Send 500 DH to Mohammed')
const recipient = ref('Mohammed')
const amount = ref(500)
const pin = ref('')
const transferResult = ref(null)

const parseRequest = () => {
  const amountMatch = requestText.value.match(/(\d+(?:[.,]\d+)?)/)
  const recipientMatch = requestText.value.match(/\bto\s+([a-zA-Z\s]+)$/i)
  amount.value = amountMatch ? Number(amountMatch[1].replace(',', '.')) : null
  recipient.value = recipientMatch ? recipientMatch[1].trim() : 'Beneficiary'
}

const executeTransfer = async () => {
  transferResult.value = null
  try {
    transferResult.value = await store.executeBankTransaction({
      amount: amount.value || 500,
      type: 'transfer',
      pin: pin.value,
    })
  } catch {
    // The store exposes the API error inside the confirmation card.
  }
}

const clearForm = () => {
  requestText.value = ''
  recipient.value = 'Beneficiary'
  amount.value = null
  pin.value = ''
  transferResult.value = null
}
</script>
