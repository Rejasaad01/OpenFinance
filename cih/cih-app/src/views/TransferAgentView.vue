<template>
  <div class="ml-0 md:ml-72 flex-1 flex flex-col min-h-screen bg-background relative pb-32">
    <TopBar />
    
    <!-- Canvas Area -->
    <main class="flex-1 p-8 md:p-12 lg:p-16 flex flex-col items-center justify-center max-w-5xl mx-auto w-full">
      <!-- Contextual Header -->
      <div class="w-full mb-12 text-center">
        <h2 class="font-headline text-primary font-extrabold text-4xl md:text-5xl tracking-tight mb-4">Transfer Agent</h2>
        <p class="text-on-surface-variant font-body text-lg max-w-2xl mx-auto">I'm ready to help you securely move funds. Describe your request below.</p>
      </div>

      <!-- Central AI Interaction Area -->
      <div class="w-full max-w-3xl flex flex-col space-y-8">
        <!-- AI Message Bubble -->
        <div class="flex items-start gap-6 self-start max-w-[85%]">
          <div class="w-12 h-12 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center flex-shrink-0 shadow-sm mt-1">
            <span class="material-symbols-outlined text-2xl" style="font-variation-settings: 'FILL' 1;">smart_toy</span>
          </div>
          <div class="bg-surface-container-lowest p-6 rounded-2xl rounded-tl-sm shadow-sm">
            <p class="font-body text-on-surface leading-relaxed mb-6">I understand you want to initiate a transfer. Here are the details I've gathered. Please review them before proceeding.</p>
            
            <!-- AI Insight / Confirmation Card -->
            <div class="bg-primary-fixed bg-opacity-30 border border-primary-fixed rounded-xl p-6 relative overflow-hidden">
              <div class="absolute top-0 right-0 p-4 opacity-10">
                <span class="material-symbols-outlined text-6xl" style="font-variation-settings: 'FILL' 1;">security</span>
              </div>
              <div class="relative z-10">
                <h3 class="font-headline font-bold text-primary mb-4 flex items-center gap-2">
                  <span class="material-symbols-outlined text-secondary-container">check_circle</span>
                  Ready for review
                </h3>
                
                <div class="space-y-3 font-body text-sm">
                  <div class="flex justify-between border-b border-white border-opacity-40 pb-2">
                    <span class="text-on-surface-variant font-medium">Recipient</span>
                    <span class="font-bold text-primary">Mohammed</span>
                  </div>
                  <div class="flex justify-between border-b border-white border-opacity-40 pb-2">
                    <span class="text-on-surface-variant font-medium">Amount</span>
                    <span class="font-headline font-extrabold text-xl text-primary">500 DH</span>
                  </div>
                </div>
                
                <div class="mt-6 flex flex-col sm:flex-row gap-4">
                  <button class="flex-1 bg-secondary-container text-on-secondary-container font-semibold py-3 px-6 rounded-xl hover:bg-opacity-90 transition-all shadow-sm">
                    Review Transfer
                  </button>
                  <button class="flex-1 bg-transparent text-primary font-semibold py-3 px-6 rounded-xl hover:bg-surface-container-low transition-all">
                    Edit Details
                  </button>
                </div>
                <p class="text-xs text-on-surface-variant mt-4 flex items-center gap-1 justify-center">
                  <span class="material-symbols-outlined text-[14px]">lock</span> Secure cognitive verification active
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Input Area (Fixed Bottom or contextual) -->
      <div class="fixed bottom-0 left-0 md:left-72 right-0 p-8 bg-gradient-to-t from-background via-background to-transparent pointer-events-none flex justify-center z-30">
        <div class="w-full max-w-3xl pointer-events-auto flex flex-col gap-4">
          <!-- Suggestion Chips -->
          <div class="flex flex-wrap gap-3 mb-2 px-2">
            <button class="bg-surface-container-highest text-on-surface text-sm font-medium py-2 px-4 rounded-full hover:bg-surface-variant transition-colors flex items-center gap-2">
              <span class="material-symbols-outlined text-[18px]">contacts</span>
              Send money to a saved contact
            </button>
            <button class="bg-surface-container-highest text-on-surface text-sm font-medium py-2 px-4 rounded-full hover:bg-surface-variant transition-colors flex items-center gap-2">
              <span class="material-symbols-outlined text-[18px]">history</span>
              Review recent beneficiaries
            </button>
          </div>
          
          <!-- Main Input -->
          <div class="bg-surface-container-lowest rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-2 flex items-center relative group">
            <div class="pl-4 pr-2 text-primary-container">
              <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">graphic_eq</span>
            </div>
            <input class="flex-1 bg-transparent border-none focus:ring-0 text-on-surface font-body placeholder:text-outline py-4 px-2 w-full outline-none" placeholder="Type a transfer request, e.g. Send 500 DH to Mohammed" type="text"/>
            <button class="bg-primary-container text-on-primary w-12 h-12 rounded-xl flex items-center justify-center hover:bg-primary transition-colors shadow-sm absolute right-2 top-2">
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
import TopBar from '../components/TopBar.vue'
</script>
