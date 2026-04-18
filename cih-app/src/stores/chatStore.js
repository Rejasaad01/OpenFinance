import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useChatStore = defineStore('chat', () => {
  const isChatting = ref(false)
  const isTyping = ref(false)
  const activeMode = ref('General Banking Help')
  
  const messages = ref([])

  const responses = {
    'General Banking Help': [
      { pattern: /hi|hello|hey/i, response: "Hello! I'm Cognitive Vault AI. I can assist you with your finances today. You currently have 12,450.00 DH in your checking account and 45,000.00 DH in savings. What would you like to explore?" },
      { pattern: /balance/i, response: "Your total available liquidity is **57,450.00 DH**. This is distributed between your Checking (**** 4592) and High-Yield Savings (4.25% APY). You're up 2.4% this month." },
      { pattern: /transfer/i, response: "I can help with that. To whom would you like to send money? You can also use the 'Transfer Agent' mode for a more guided Moroccan local transfer experience." }
    ],
    'Spending Coach': [
      { pattern: /how|spending|look/i, response: "Your spending this April is **8% lower** than March. Great job! Your biggest expense so far was 'Rent Payment' (2,100 DH). You have about 600 DH left in your 'Variable' budget for the week. 📉" },
      { pattern: /food|eat|restaurant/i, response: "You've spent 650 DH on 'Food & Dining' this month. This accounts for about 14% of your total expenses. You usually spend closer to 800 DH, so you're on track to save some extra cash here. 🥗" },
      { pattern: /breakdown|categories/i, response: "Here is your April breakdown:\n- Housing: 2,100 DH (52%)\n- Food: 650 DH (16%)\n- Transport: 450 DH (11%)\n- Other: 840 DH (21%)" }
    ],
    'Goal Planner': [
      { pattern: /car|save|goal/i, response: "Saving for a car is a smart move! 🚗 If you allocate 500 DH monthly to your 'Car Fund', you'll hit your 10,000 DH down payment target in 20 months. Would you like to set up a recurring 'Goal' rule?" },
      { pattern: /trip|europe|travel/i, response: "You're at **2,500 DH** of your 5,000 DH Europe Trip goal! Checking your current pace, you'll reach it by mid-June. Keep up the momentum! ✈️" },
      { pattern: /laptop/i, response: "Congratulations again on finishing your 'New Laptop' goal! That 1,500 DH is now ready for withdrawal or reinvestment." }
    ],
    'Loan Advisor': [
      { pattern: /options|loan|rate/i, response: "I've analyzed your credit profile (Excellent). You qualify for a **Fixed-Rate Personal Loan at 4.5% APR** for up to $30,000. For home equity, rates start at **6.45%**. Which should we explore? 🏦" },
      { pattern: /credit/i, response: "Your current credit health is strong. Your debt-to-income ratio is 18%, which places you in the 'Top Preferred' tier for all our lending products." }
    ],
    'File Analyst': [
      { pattern: /analyze|pdf|doc/i, response: "I'm ready to digest your documents. 📄 I can read PDF bank statements, utility bills, or investment reports. Once you upload, I'll extract hidden fees or spending patterns for you." }
    ],
    'Transfer Agent': [
      { pattern: /send|transfer|pay/i, response: "I've analyzed your typical transfers. Would you like to send 500 DH to Mohammed (ending in ...892) via Instant RIB transfer? It's free and immediate. 📲" }
    ]
  }

  const sendMessage = async (content) => {
    isChatting.value = true
    messages.value.push({ role: 'user', content })
    
    isTyping.value = true
    await new Promise(r => setTimeout(r, 1200))
    
    let reply = "That's an interesting financial question. Based on your current data, I'd recommend reviewing your 'Spending Insights' or checking your 'Asset Allocation' in the dashboard. Is there anything specific you want me to deep-dive into? 🤖"
    
    const categoryResponses = responses[activeMode.value] || responses['General Banking Help']
    
    for (const item of categoryResponses) {
      if (item.pattern.test(content)) {
        reply = item.response
        break
      }
    }

    messages.value.push({ role: 'system', content: reply })
    isTyping.value = false
  }

  const startWithPrompt = (prompt, mode) => {
    if (mode) activeMode.value = mode
    isChatting.value = true
    sendMessage(prompt)
  }

  const resetChat = () => {
    messages.value = []
    isChatting.value = false
    activeMode.value = 'General Banking Help'
  }

  return {
    isChatting,
    isTyping,
    activeMode,
    messages,
    sendMessage,
    startWithPrompt,
    resetChat
  }
})
