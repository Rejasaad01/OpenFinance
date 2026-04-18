<template>
  <div class="ml-0 md:ml-72 flex-1 flex flex-col min-h-screen relative">
    <TopBar />
    
    <!-- Main Content -->
    <main class="flex-1 px-8 lg:px-12 py-8 max-w-[1600px] mx-auto w-full">
      <!-- Header Section -->
      <div class="flex flex-col xl:flex-row justify-between items-start xl:items-end mb-10 gap-6">
        <div>
          <h2 class="font-headline text-4xl lg:text-5xl font-extrabold text-primary-container tracking-tight mb-2">Master Plan</h2>
          <p class="font-body text-on-surface-variant text-lg max-w-2xl leading-relaxed">
            Balance your monthly expenses and accelerate your savings targets using AI-driven allocation.
          </p>
        </div>
        
        <div class="flex gap-4 items-center">
          <div class="bg-surface-container-lowest rounded-xl px-6 py-3 flex flex-col items-end shadow-sm border border-outline-variant/10">
            <span class="font-body text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">Total Monthly Income</span>
            <span class="font-headline text-2xl font-bold text-primary-container">$8,450.00</span>
          </div>
          
          <button class="h-full bg-secondary-container text-on-secondary-container hover:bg-secondary hover:text-on-secondary py-3 px-6 rounded-xl font-headline font-bold flex items-center gap-2 shadow-sm transition-colors">
            <span class="material-symbols-outlined">add_task</span>
            New Goal
          </button>
        </div>
      </div>
      
      <!-- Top Row: Health & AI Insights -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        <!-- AI Strategic Recommendation -->
        <div class="lg:col-span-8 bg-gradient-to-r from-primary-container to-primary rounded-[2rem] p-8 text-on-primary flex flex-col sm:flex-row items-start sm:items-center justify-between relative overflow-hidden shadow-lg">
          <div class="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 pointer-events-none" style="background-image: radial-gradient(circle at center right, white 0%, transparent 70%);"></div>
          
          <div class="relative z-10 flex gap-5 items-start">
            <div class="bg-white/20 backdrop-blur-md rounded-full text-white p-3 shrink-0">
              <span class="material-symbols-outlined text-2xl">auto_awesome</span>
            </div>
            <div>
              <div class="inline-flex items-center gap-2 text-primary-fixed-dim text-xs font-semibold mb-2 uppercase tracking-wide">
                Vault Intelligence
              </div>
              <h3 class="font-headline text-xl font-bold mb-2 text-white">Velocity Boost Available</h3>
              <p class="font-body text-on-primary/80 leading-relaxed text-sm max-w-xl">
                You are currently allocating 14% to Food & Dining. By reducing this to 10% ($845), you could increase your monthly Savings contribution and hit your 'Japan Anniversary Trip' goal 2 months earlier.
              </p>
            </div>
          </div>
          
          <div class="relative z-10 mt-6 sm:mt-0 shrink-0">
            <button class="bg-surface-container-lowest text-primary-container font-headline font-bold py-3 px-6 rounded-xl hover:bg-surface-container-low transition-colors shadow-sm whitespace-nowrap">
              Apply Suggestion
            </button>
          </div>
        </div>

        <!-- Financial Health Gauge -->
        <div class="lg:col-span-4 bg-surface-container-lowest rounded-[2rem] p-8 shadow-sm border border-outline-variant/10 flex flex-col justify-center items-center text-center">
          <div class="w-full flex justify-between items-center mb-4">
            <h3 class="font-headline text-lg font-bold text-on-surface">Financial Health</h3>
            <span class="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary transition-colors text-[20px]">info</span>
          </div>
          
          <!-- Semi-circle Gauge -->
          <div class="relative w-40 h-20 overflow-hidden mb-4">
            <div class="absolute top-0 left-0 w-40 h-40 rounded-full border-[12px] border-surface-container-highest"></div>
            <!-- Active part of gauge (Excellent) -->
            <div class="absolute top-0 left-0 w-40 h-40 rounded-full border-[12px] border-secondary-container" style="clip-path: polygon(0 50%, 100% 50%, 100% 100%, 0 100%); transform: rotate(135deg);"></div>
            <div class="absolute bottom-0 left-1/2 -translate-x-1/2 text-center pb-1">
              <span class="font-headline text-3xl font-extrabold text-primary-container block leading-none">88</span>
            </div>
          </div>
          
          <div class="flex justify-between w-full font-body text-[10px] text-on-surface-variant font-medium px-2 uppercase tracking-wide">
            <span>Risky</span>
            <span>Safe</span>
            <span class="text-secondary-container font-bold">Excellent</span>
          </div>
        </div>
      </div>

      <!-- Main Dual-Column Grid -->
      <div class="grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        <!-- Left Side: Budget Allocation -->
        <div class="bg-surface-container-lowest rounded-[2rem] p-8 shadow-sm border border-outline-variant/10">
          <div class="flex justify-between items-center mb-8">
            <div class="flex items-center gap-3">
              <span class="material-symbols-outlined text-primary text-2xl">pie_chart</span>
              <h3 class="font-headline text-2xl font-bold text-on-surface">Monthly Allocation</h3>
            </div>
            <button class="text-xs font-body font-semibold bg-surface hover:bg-surface-variant text-on-surface-variant px-3 py-1.5 rounded-full transition-colors hidden sm:block">Reset Values</button>
          </div>
          
          <div class="space-y-8">
            <!-- Category 1 -->
            <div class="group">
              <div class="flex justify-between items-end mb-3">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-primary-fixed/20 flex items-center justify-center text-primary border border-primary-fixed">
                    <span class="material-symbols-outlined text-[20px]">home</span>
                  </div>
                  <div>
                    <h4 class="font-headline font-bold text-on-surface text-sm">Housing & Utilities</h4>
                    <p class="font-body text-xs text-on-surface-variant mt-0.5">Fixed expenses</p>
                  </div>
                </div>
                <div class="text-right">
                  <span class="font-headline font-bold text-lg text-primary-container">$2,800</span>
                  <p class="font-body text-[10px] uppercase font-semibold text-on-surface-variant tracking-wider mt-0.5">33% Allocated</p>
                </div>
              </div>
              <input type="range" min="0" max="4000" value="2800" class="w-full h-2 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-primary-container custom-range"/>
            </div>
            
            <!-- Category 2 -->
            <div class="group">
              <div class="flex justify-between items-end mb-3">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-primary-fixed/20 flex items-center justify-center text-primary border border-primary-fixed">
                    <span class="material-symbols-outlined text-[20px]">restaurant</span>
                  </div>
                  <div>
                    <h4 class="font-headline font-bold text-on-surface text-sm">Food & Dining</h4>
                    <p class="font-body text-xs text-on-surface-variant mt-0.5">Groceries & Eating out</p>
                  </div>
                </div>
                <div class="text-right">
                  <span class="font-headline font-bold text-lg text-primary-container">$1,200</span>
                  <p class="font-body text-[10px] uppercase font-semibold text-error tracking-wider mt-0.5 animate-pulse">14% - Can be optimized</p>
                </div>
              </div>
              <input type="range" min="0" max="2000" value="1200" class="w-full h-2 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-primary-container custom-range"/>
            </div>
            
            <!-- Category 3 -->
            <div class="group">
              <div class="flex justify-between items-end mb-3">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-primary-fixed/20 flex items-center justify-center text-primary border border-primary-fixed">
                    <span class="material-symbols-outlined text-[20px]">directions_car</span>
                  </div>
                  <div>
                    <h4 class="font-headline font-bold text-on-surface text-sm">Transportation</h4>
                    <p class="font-body text-xs text-on-surface-variant mt-0.5">Fuel, Transit, Maintenance</p>
                  </div>
                </div>
                <div class="text-right">
                  <span class="font-headline font-bold text-lg text-primary-container">$600</span>
                  <p class="font-body text-[10px] uppercase font-semibold text-on-surface-variant tracking-wider mt-0.5">7% Allocated</p>
                </div>
              </div>
              <input type="range" min="0" max="1500" value="600" class="w-full h-2 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-primary-container custom-range"/>
            </div>
            
            <!-- Category 4: Savings (Highlighted) -->
            <div class="group p-4 bg-secondary-fixed/20 -mx-4 rounded-2xl border border-secondary/10">
              <div class="flex justify-between items-end mb-3">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container shadow-sm border border-secondary/20">
                    <span class="material-symbols-outlined text-[20px]">savings</span>
                  </div>
                  <div>
                    <h4 class="font-headline font-bold text-on-surface text-sm">Savings & Future</h4>
                    <p class="font-body text-xs text-on-surface-variant mt-0.5 pl-1 flex items-center gap-1"><span class="w-1 h-1 rounded-full bg-secondary"></span> Feeds active goals</p>
                  </div>
                </div>
                <div class="text-right">
                  <span class="font-headline font-bold text-xl text-secondary-container">$1,850</span>
                  <p class="font-body text-[10px] uppercase font-bold text-secondary-container tracking-wider mt-0.5">22% Allocated</p>
                </div>
              </div>
              <input type="range" min="0" max="3000" value="1850" class="w-full h-3 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-secondary-container shadow-inner custom-range"/>
            </div>
          </div>
        </div>

        <!-- Right Side: Savings Goals -->
        <div class="flex flex-col gap-6">
          <div class="flex justify-between items-center px-2">
            <div class="flex items-center gap-3">
              <span class="material-symbols-outlined text-primary text-2xl">track_changes</span>
              <h3 class="font-headline text-2xl font-bold text-on-surface">Active Goals</h3>
            </div>
            <span class="bg-surface-container-high text-xs font-semibold px-3 py-1 rounded-full text-on-surface">3 Tracked</span>
          </div>
          
          <!-- Primary Goal -->
          <div class="bg-surface-container-lowest rounded-[2rem] p-6 relative overflow-hidden flex flex-col group border border-outline-variant/10 shadow-sm transition-all hover:border-primary/20">
            <div class="absolute inset-0 bg-gradient-to-br from-primary-fixed/20 to-transparent opacity-50 z-0"></div>
            
            <div class="relative z-10 flex justify-between items-start mb-6">
              <div>
                <div class="bg-primary-fixed text-on-primary-fixed-variant px-3 py-1 rounded-full inline-flex items-center gap-1.5 font-body text-[10px] uppercase font-bold mb-3 tracking-wider">
                  <span class="material-symbols-outlined text-[14px]">flight_takeoff</span>
                  Primary
                </div>
                <h3 class="font-headline text-xl font-bold text-on-surface">Japan Anniversary</h3>
              </div>
              <div class="text-right flex flex-col items-end">
                <span class="font-headline text-2xl font-extrabold text-primary-container leading-none">$8,450</span>
                <span class="font-body text-on-surface-variant text-[11px] font-medium mt-1">/ $12,000</span>
              </div>
            </div>
            
            <div class="relative z-10 w-full bg-surface-container rounded-full h-2.5 overflow-hidden mb-2">
              <div class="h-full bg-gradient-to-r from-primary-container to-primary relative w-[70px]" style="width: 70%">
                <div class="absolute right-0 top-0 bottom-0 w-8 bg-white/20 skew-x-12 animate-[shimmer_2s_infinite]"></div>
              </div>
            </div>
            <div class="relative z-10 flex justify-between text-xs font-body text-on-surface-variant">
              <span class="font-semibold text-primary">70% Funded</span>
              <span>Est. Oct 2024</span>
            </div>
          </div>
          
          <!-- Secondary Goal -->
          <div class="bg-surface-container-low hover:bg-surface-container-highest transition-colors cursor-pointer rounded-[2rem] p-6 border border-transparent hover:border-outline-variant/20 flex flex-col">
            <div class="flex justify-between items-start mb-3">
              <div class="flex items-center gap-3">
                <div class="bg-error-container text-on-error-container w-10 h-10 rounded-xl flex items-center justify-center shadow-sm">
                  <span class="material-symbols-outlined text-[20px]">health_and_safety</span>
                </div>
                <div>
                  <h3 class="font-headline font-bold text-on-surface text-sm">Emergency Fund</h3>
                  <p class="font-body text-[11px] text-on-surface-variant mt-0.5">6 Months Expenses</p>
                </div>
              </div>
              <div class="text-right">
                <span class="font-headline text-lg font-bold text-on-surface block leading-none">$15,200</span>
                <span class="font-body text-[10px] text-on-surface-variant mt-1 block">/ $24k</span>
              </div>
            </div>
            <div class="w-full bg-surface-container-highest rounded-full h-2 overflow-hidden mb-2 mt-2">
              <div class="h-full bg-error rounded-full" style="width: 63%"></div>
            </div>
            <p class="font-body text-[10px] text-on-surface-variant flex items-center gap-1 justify-end font-medium">
              <span class="material-symbols-outlined text-[12px]">calendar_today</span> On track - Dec 2025
            </p>
          </div>
          
          <!-- Tertiary Goal -->
          <div class="bg-surface-container-low hover:bg-surface-container-highest transition-colors cursor-pointer rounded-[2rem] p-6 border border-transparent hover:border-outline-variant/20 flex flex-col relative overflow-hidden">
            <div class="flex justify-between items-start mb-3 relative z-10">
              <div class="flex items-center gap-3">
                <div class="bg-surface-variant text-on-surface-variant w-10 h-10 rounded-xl flex items-center justify-center shadow-sm border border-outline-variant/10">
                  <span class="material-symbols-outlined text-[20px]">directions_car</span>
                </div>
                <div>
                  <h3 class="font-headline font-bold text-on-surface text-sm">EV Down Payment</h3>
                  <span class="bg-surface-container-lowest border border-outline-variant/10 px-2 py-0.5 rounded text-[9px] font-bold text-secondary mt-1 inline-flex items-center gap-1"><span class="w-1 h-1 rounded-full bg-secondary"></span> +2% APY Yield</span>
                </div>
              </div>
              <div class="text-right">
                <span class="font-headline text-lg font-bold text-on-surface block leading-none">$3,000</span>
                <span class="font-body text-[10px] text-on-surface-variant mt-1 block">/ $8k</span>
              </div>
            </div>
            <div class="w-full bg-surface-container-highest rounded-full h-2 overflow-hidden mb-2 mt-2 relative z-10">
              <div class="h-full bg-surface-tint rounded-full" style="width: 37.5%"></div>
            </div>
          </div>

        </div>
      </div>
      
    </main>
  </div>
</template>

<script setup>
import TopBar from '../components/TopBar.vue'
</script>

<style scoped>
input[type=range].custom-range {
    -webkit-appearance: none;
    background: transparent;
}
input[type=range].custom-range::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: currentColor;
    cursor: pointer;
    margin-top: -6px;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    border: 2px solid theme('colors.surface-container-lowest');
}
input[type=range].custom-range::-webkit-slider-runnable-track {
    width: 100%;
    height: 8px;
    cursor: pointer;
    background: transparent;
    border-radius: theme('borderRadius.full');
}
</style>
