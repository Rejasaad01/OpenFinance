<template>
  <div class="ml-0 md:ml-72 flex-1 flex flex-col min-h-screen bg-background relative">
    <!-- Main Canvas Area -->
    <main class="pt-8 px-12 pb-24 max-w-[1600px] mx-auto w-full flex-1">
      <!-- Page Header -->
      <div class="mb-12 max-w-3xl">
        <h2 class="font-headline text-5xl font-extrabold text-primary tracking-tight mb-4 leading-tight">Curated Funding Strategies</h2>
        <p class="text-on-surface-variant text-lg leading-relaxed max-w-2xl font-body">Based on your recent 'Home Renovation' goal and steady cash flow, our AI has modeled optimal paths to leverage your equity without disturbing your core investments.</p>
      </div>

      <!-- Asymmetric Grid Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <!-- Left Column: Personalized Loan Cards (Bento style) -->
        <div class="lg:col-span-7 xl:col-span-8 flex flex-col gap-8">
          <!-- Primary Offer Card -->
          <div class="bg-surface-container-lowest rounded-xl p-8 relative overflow-hidden transition-transform duration-500 hover:shadow-[0_20px_60px_-15px_rgba(0,65,130,0.05)] group border border-outline-variant/10">
            <!-- Top Row: Badge & Context -->
            <div class="flex justify-between items-start mb-8">
              <div class="bg-primary-fixed text-on-primary-fixed-variant px-4 py-1.5 rounded-full text-sm font-semibold flex items-center gap-2">
                <span class="material-symbols-outlined text-[18px]">verified</span>
                Pre-Approved Candidate
              </div>
              <span class="text-on-surface-variant font-medium text-sm flex items-center gap-1">
                <span class="material-symbols-outlined text-[16px]">history</span> Exp. in 14 days
              </span>
            </div>
            
            <!-- Main Info -->
            <div class="grid grid-cols-2 gap-8 mb-8">
              <div>
                <h3 class="font-headline text-2xl font-bold text-on-surface mb-2">Tailored Home Equity Line</h3>
                <p class="text-on-surface-variant text-sm leading-relaxed mb-6">Access flexible capital based on the accrued value of your primary residence.</p>
                <div class="flex flex-col gap-1">
                  <span class="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Estimated APR</span>
                  <span class="font-headline text-4xl font-extrabold text-primary tracking-tighter">6.45% <span class="text-lg font-medium text-on-surface-variant tracking-normal">Variable</span></span>
                </div>
              </div>
              <div class="flex items-center justify-end">
                <!-- Abstract graphical element representing growth/equity -->
                <div class="w-32 h-32 rounded-full border-8 border-surface-container-high relative flex items-center justify-center">
                  <div class="absolute inset-0 rounded-full border-8 border-secondary-container rounded-r-none rounded-b-none border-t-secondary-container border-l-secondary-container transform rotate-45"></div>
                  <div class="text-center">
                    <span class="block text-xs font-medium text-on-surface-variant uppercase tracking-widest">Limit Up To</span>
                    <span class="font-headline font-bold text-xl text-primary">$150k</span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Explainability Section -->
            <div class="bg-surface rounded-lg p-6 flex gap-4 items-start">
              <div class="mt-1 w-8 h-8 rounded-full bg-primary-fixed-dim flex items-center justify-center text-primary-container shrink-0">
                <span class="material-symbols-outlined text-[20px]">psychology</span>
              </div>
              <div>
                <h4 class="font-headline font-bold text-primary-container mb-1">Why this matches you</h4>
                <p class="text-sm text-on-surface-variant leading-relaxed mb-3">Your 'Goal Planner' indicates a $45,000 renovation project in Q3. Given your current LTV ratio of 62% and excellent payment history, drawing from equity is statistically 3.2% more cost-effective than liquidating your active stock portfolio.</p>
                <a class="text-secondary-container font-semibold text-sm hover:underline flex items-center gap-1" href="#">View Full Analysis <span class="material-symbols-outlined text-[16px]">arrow_forward</span></a>
              </div>
            </div>
          </div>
          
          <!-- Secondary Offer Card -->
          <div class="bg-surface-container-lowest rounded-xl p-8 relative overflow-hidden border border-outline-variant/10">
            <div class="flex justify-between items-center mb-6">
              <h3 class="font-headline text-xl font-bold text-on-surface">Fixed-Rate Personal Loan</h3>
              <div class="bg-surface-container text-on-surface-variant px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                <span class="material-symbols-outlined text-[14px]">check_circle</span>
                High Eligibility
              </div>
            </div>
            <div class="flex items-end justify-between">
              <div>
                <p class="text-on-surface-variant text-sm mb-2">For immediate, one-time capital needs.</p>
                <div class="font-headline text-2xl font-bold text-primary">8.15% <span class="text-sm font-medium text-on-surface-variant">APR Fixed</span></div>
              </div>
              <button class="text-primary font-semibold text-sm flex items-center gap-1 hover:text-primary-container transition-colors">
                Explore Terms <span class="material-symbols-outlined text-[18px]">chevron_right</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Right Column: Interactive Simulator (Glassmorphism) -->
        <div class="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-8">
          <div class="bg-surface-container-lowest/90 backdrop-blur-3xl rounded-xl p-8 shadow-[0_40px_60px_-15px_rgba(0,0,0,0.02)] border border-white/50 relative overflow-hidden">
            <!-- Subtle ambient glow behind the card -->
            <div class="absolute top-0 right-0 w-64 h-64 bg-primary-fixed rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
            <div class="relative z-10">
              <div class="flex items-center gap-3 mb-8">
                <span class="material-symbols-outlined text-secondary-container text-3xl">tune</span>
                <h3 class="font-headline text-2xl font-bold text-primary">Payment Simulator</h3>
              </div>
              
              <!-- Big Output Display -->
              <div class="bg-surface rounded-lg p-6 mb-8 text-center border border-outline-variant/20">
                <span class="block text-sm font-medium text-on-surface-variant uppercase tracking-wider mb-2">Estimated Monthly Payment</span>
                <div class="font-headline text-5xl font-black text-primary tracking-tighter mb-1">$485<span class="text-2xl font-medium text-on-surface-variant tracking-normal">.00</span></div>
                <span class="text-xs text-on-surface-variant">Based on 6.45% APR for 120 months</span>
              </div>
              
              <!-- Sliders -->
              <div class="space-y-8 mb-10">
                <div>
                  <div class="flex justify-between items-end mb-4">
                    <label class="font-semibold text-sm text-on-surface">Borrowing Amount</label>
                    <span class="font-headline font-bold text-lg text-primary">$45,000</span>
                  </div>
                  <input class="w-full custom-range" max="150000" min="10000" type="range" value="45000"/>
                  <div class="flex justify-between text-xs text-on-surface-variant mt-2 font-medium">
                    <span>$10k</span>
                    <span>$150k</span>
                  </div>
                </div>
                <div>
                  <div class="flex justify-between items-end mb-4">
                    <label class="font-semibold text-sm text-on-surface">Term Length</label>
                    <span class="font-headline font-bold text-lg text-primary">10 Years</span>
                  </div>
                  <input class="w-full custom-range" max="30" min="5" step="5" type="range" value="10"/>
                  <div class="flex justify-between text-xs text-on-surface-variant mt-2 font-medium">
                    <span>5 Yrs</span>
                    <span>30 Yrs</span>
                  </div>
                </div>
              </div>
              
              <!-- Primary CTA -->
              <button class="w-full bg-secondary-container text-on-secondary-container hover:bg-[#ff952a] rounded-xl py-4 font-headline font-bold text-base shadow-lg shadow-secondary-container/20 transition-all active:scale-95 flex items-center justify-center gap-2">
                Start Application <span class="material-symbols-outlined text-[20px]">arrow_forward</span>
              </button>
              <p class="text-center text-xs text-on-surface-variant mt-4">Checking rates will not affect your credit score.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
/* Custom range slider styling for the simulator */
input[type=range].custom-range {
    -webkit-appearance: none;
    width: 100%;
    background: transparent;
}
input[type=range].custom-range::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 24px;
    width: 24px;
    border-radius: 50%;
    background: theme('colors.secondary-container');
    cursor: pointer;
    margin-top: -10px;
    box-shadow: 0 4px 12px rgba(253, 129, 0, 0.3);
}
input[type=range].custom-range::-webkit-slider-runnable-track {
    width: 100%;
    height: 4px;
    cursor: pointer;
    background: theme('colors.surface-variant');
    border-radius: theme('borderRadius.DEFAULT');
}
</style>
