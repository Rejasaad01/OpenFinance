import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useFinanceStore } from './financeStore'

const formatCurrency = (value) => {
  const amount = Number(value) || 0
  const formatted = new Intl.NumberFormat('en-MA', {
    maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount)

  return `${formatted} DH`
}

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const transferSteps = {
  IDLE: 'idle',
  WAITING_FOR_RECIPIENT: 'waiting_for_recipient_full_name',
  CHECKING_RECIPIENT: 'checking_recipient',
  WAITING_FOR_AMOUNT: 'waiting_for_amount',
  TRANSFER_PREPARED: 'transfer_prepared',
  WAITING_FOR_PIN: 'waiting_for_pin',
  TRANSFER_SENT: 'transfer_sent',
  RECIPIENT_NOT_SAVED: 'recipient_not_saved',
}

const DEMO_TRANSFER_PIN = '1234'

const registeredBeneficiaries = [
  { name: 'Mohammed Amine El Idrissi', bank: 'CIH Bank', alias: 'Saved beneficiary' },
  { name: 'Yassine Alaoui', bank: 'CIH Bank', alias: 'Saved friend' },
  { name: 'Salma Bennani', bank: 'CIH Bank', alias: 'Saved contact' },
]

const formatBeneficiaryExamples = (beneficiaries) => beneficiaries
  .map((beneficiary) => beneficiary.name)
  .slice(0, 3)
  .join(', ')

const getTopCategory = (finance) => {
  return finance.highestSpendingCategory?.name && finance.highestSpendingCategory.name !== 'None'
    ? finance.highestSpendingCategory
    : { name: 'Food', amount: 0 }
}

const normalizeName = (value = '') => value.trim().toLowerCase().replace(/\s+/g, ' ')

const toTitleCase = (value = '') => (
  value
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
)

const extractAmount = (content = '') => {
  const amountMatch = content.match(/(\d+(?:[.,]\d+)?)/)
  return amountMatch ? Number(amountMatch[1].replace(',', '.')) : null
}

const extractPin = (content = '') => {
  const pinMatch = content.match(/\b(\d{4,6})\b/)
  return pinMatch ? pinMatch[1] : ''
}

const isPinSubmission = (content = '') => (
  /^\s*(?:pin\s*(?:is|:)?\s*)?\d{4,6}\s*$/i.test(content) ||
  /^\s*use demo pin\s+\d{4,6}\s*$/i.test(content)
)

const isRecipientCandidate = (value = '') => {
  const cleaned = value.trim().replace(/\s+/g, ' ')
  if (!cleaned || !/^[a-zA-ZÀ-ÿ\s]+$/.test(cleaned)) return false

  const commandWordsOnly = cleaned
    .replace(/\b(send|transfer|pay|money|virement|wire|please|i want|want to|make|making|a|to|for|add|yes|confirm|user|beneficiary|recipient|someone|somebody)\b/gi, '')
    .trim()

  return Boolean(commandWordsOnly)
}

const extractRecipient = (content = '') => {
  const recipientMatch = content.match(/\b(?:to|for|beneficiary|recipient|name is|called|add)\s+([a-zA-ZÀ-ÿ\s]+?)(?:\s+(?:for|with|amount|and)\b|$)/i)
  if (recipientMatch?.[1]) {
    const candidate = recipientMatch[1].replace(/\b(dh|mad|dirham|dirhams)\b/gi, '').trim()
    return isRecipientCandidate(candidate) ? toTitleCase(candidate) : ''
  }

  const cleaned = content
    .replace(/(\d+(?:[.,]\d+)?)\s*(dh|mad|dirham|dirhams)?/gi, '')
    .replace(/\b(send|transfer|pay|money|virement|wire|please|i want|want to|make|making|a|to|for|add|yes|confirm|user|beneficiary)\b/gi, '')
    .trim()

  return isRecipientCandidate(cleaned) ? toTitleCase(cleaned) : ''
}

const isTransferIntent = (text) => /send|transfer|pay|beneficiary|virement|wire|money/.test(text)

const isPositiveIntent = (text) => /\b(yes|yeah|yep|ok|okay|add|confirm|send|continue|do it|valid|validate)\b/i.test(text)

const isCancelIntent = (text) => /\b(cancel|stop|abort|never mind|nevermind|not now)\b/i.test(text)

const isRecipientChangeIntent = (text) => /\b(another recipient|different recipient|change recipient|new recipient|someone else)\b/i.test(text)

const hasFullNameShape = (name = '') => name.trim().split(/\s+/).length >= 2

const findBeneficiary = (name, beneficiaries) => {
  const normalized = normalizeName(name)
  return beneficiaries.find((beneficiary) => normalizeName(beneficiary.name) === normalized)
}

const findPartialBeneficiary = (name, beneficiaries) => {
  const normalized = normalizeName(name)
  if (!normalized) return null

  return beneficiaries.find((beneficiary) => {
    const beneficiaryName = normalizeName(beneficiary.name)
    return beneficiaryName.startsWith(normalized) || beneficiaryName.includes(` ${normalized}`)
  })
}

const buildDemoReply = (content, mode, finance) => {
  const text = content.toLowerCase()
  const topCategory = getTopCategory(finance)
  const income = finance.monthlyIncome || 0
  const expenses = finance.monthlySpending || 0
  const savingsRate = finance.savingsRate || 0
  const advisorScore = finance.advisorAnalysis?.score || Math.round(Math.min(100, savingsRate + 45))
  const loanScore = finance.loanAnalysis?.eligibility_score || advisorScore

  if (mode === 'Loan Advisor' || /loan|credit|borrow|debt|rate/.test(text)) {
    return {
      content: `I ran a demo lending read on your current profile.\n\nYour eligibility signal is strong at ${loanScore}/100. Based on the live finance summary in this app, your income is ${formatCurrency(income)}, your expenses are ${formatCurrency(expenses)}, and your estimated savings rate is ${savingsRate.toFixed(0)}%.\n\nDemo recommendation: start with a personal loan scenario for flexible funding, then compare it against a car or home product if the goal is asset-backed.`,
      actions: ['Compare loan options', 'Explain eligibility', 'Estimate monthly payment'],
      confidence: 'High',
    }
  }

  if (mode === 'Budget Manager' || /goal|save|saving|car|trip|fund|budget|allocate/.test(text)) {
    const monthlySurplus = Math.max(income - expenses, 0)
    return {
      content: `Here is a demo savings plan based on your current cash flow.\n\nYou have an estimated monthly surplus of ${formatCurrency(monthlySurplus)}. A balanced plan would reserve 50% for goals, 30% for liquidity, and 20% for flexible spending.\n\nIf you want a simple rule: move ${formatCurrency(monthlySurplus * 0.5)} into your priority goal at the start of each month.`,
      actions: ['Create goal plan', 'Adjust monthly amount', 'Show goal timeline'],
      confidence: 'High',
    }
  }

  if (/spend|spending|category|expenses|food/.test(text)) {
    return {
      content: `I reviewed your demo spending pattern.\n\nYour current expenses are ${formatCurrency(expenses)}. The largest category is ${topCategory.name}, at ${formatCurrency(topCategory.amount)}. Your savings rate is around ${savingsRate.toFixed(0)}%, which is a healthy signal.\n\nSuggested move: set a soft cap on ${topCategory.name} and redirect the difference into your next savings goal.`,
      actions: ['Show category breakdown', 'Set spending cap', 'Find saving opportunity'],
      confidence: 'High',
    }
  }

  return {
    content: `I checked your financial workspace.\n\nYour dashboard shows ${formatCurrency(income)} in income, ${formatCurrency(expenses)} in expenses, and a financial health signal of ${advisorScore}/100. This demo assistant can walk through spending, budgeting, goals, loans, and transfer preparation using the app data.\n\nAsk me things like “How is my spending?”, “Can I afford a loan?”, or “Help me save for a car.”`,
    actions: ['Analyze spending', 'Plan savings', 'Check loan readiness'],
    confidence: 'High',
  }
}

export const useChatStore = defineStore('chat', () => {
  const isChatting = ref(false)
  const isTyping = ref(false)
  const thinkingLabel = ref('')
  const activeMode = ref('Banking Agent')
  const messages = ref([])
  const beneficiaries = ref([...registeredBeneficiaries])
  const pendingTransfer = ref(null)

  const resetTransfer = () => {
    pendingTransfer.value = null
  }

  const askForRecipientFullName = (amount = null) => {
    pendingTransfer.value = {
      stage: transferSteps.WAITING_FOR_RECIPIENT,
      amount,
    }

    return {
      content: `Welcome to secure transfer.\n\nWho would you like to send money to? Please choose a saved beneficiary below, or type the recipient’s full name.\n\nTo avoid mistakes, use the exact saved beneficiary name. Suggestions: ${formatBeneficiaryExamples(beneficiaries.value)}.`,
      actions: beneficiaries.value.map((beneficiary) => beneficiary.name).slice(0, 3),
      confidence: 'Medium',
    }
  }

  const blockUnsavedRecipient = (recipient) => {
    pendingTransfer.value = {
      stage: transferSteps.RECIPIENT_NOT_SAVED,
      recipient,
    }

    return {
      content: 'For security reasons, please add this user first before making a transfer.',
      actions: ['Use another recipient', 'Cancel transfer'],
      confidence: 'High',
    }
  }

  const prepareTransfer = ({ recipient, amount, beneficiary }) => {
    pendingTransfer.value = {
      stage: transferSteps.WAITING_FOR_PIN,
      recipient,
      amount,
      beneficiary,
    }

    return {
      content: `Yes, we can send it. Your transfer to ${recipient} for ${formatCurrency(amount)} has been prepared.\n\nFor security, please enter your PIN to validate and complete the transfer.`,
      actions: ['Use demo PIN 1234', 'Change amount', 'Cancel transfer'],
      confidence: 'High',
    }
  }

  const validateTransferPin = ({ pin, recipient, amount, beneficiary }) => {
    if (pin !== DEMO_TRANSFER_PIN) {
      pendingTransfer.value = {
        stage: transferSteps.WAITING_FOR_PIN,
        recipient,
        amount,
        beneficiary,
      }

      return {
        content: `PIN validation failed. For this demo, use PIN ${DEMO_TRANSFER_PIN} to complete the secure transfer.`,
        actions: [`Use demo PIN ${DEMO_TRANSFER_PIN}`, 'Change amount', 'Cancel transfer'],
        confidence: 'Medium',
      }
    }

    pendingTransfer.value = {
      stage: transferSteps.TRANSFER_SENT,
      recipient,
      amount,
      beneficiary,
    }

    return {
      content: `Success. Your transfer to ${recipient} for ${formatCurrency(amount)} has been sent successfully and securely.`,
      actions: ['Send another transfer', 'Show balance'],
      confidence: 'High',
    }
  }

  const askForAmount = (beneficiary, requestedAmount = null) => {
    if (requestedAmount) {
      return prepareTransfer({
        recipient: beneficiary.name,
        amount: requestedAmount,
        beneficiary,
      })
    }

    pendingTransfer.value = {
      stage: transferSteps.WAITING_FOR_AMOUNT,
      recipient: beneficiary.name,
      beneficiary,
      amount: null,
    }

    return {
      content: `How much money would you like to send to ${beneficiary.name}?\n\nTip: enter only the amount, for example “500 DH” or “500 MAD”.`,
      actions: ['Send 500 DH', 'Send 1000 DH', 'Cancel transfer'],
      confidence: 'High',
    }
  }

  const handleRecipientName = (recipient, amount = null) => {
    if (!recipient || !hasFullNameShape(recipient)) {
      return {
        content: `Who would you like to send money to?\n\nPlease choose a saved beneficiary below, or type the recipient’s full name. To avoid mistakes, type the complete saved name, for example “Mohammed Amine El Idrissi”.`,
        actions: beneficiaries.value.map((beneficiary) => beneficiary.name).slice(0, 3),
        confidence: 'Medium',
      }
    }

    pendingTransfer.value = {
      stage: transferSteps.CHECKING_RECIPIENT,
      recipient,
      amount,
    }

    const beneficiary = findBeneficiary(recipient, beneficiaries.value)
    if (!beneficiary) {
      const partialBeneficiary = findPartialBeneficiary(recipient, beneficiaries.value)
      if (partialBeneficiary) {
        pendingTransfer.value = {
          stage: transferSteps.WAITING_FOR_RECIPIENT,
          amount,
        }

        return {
          content: `Please provide the recipient’s full name as it appears in your saved beneficiaries.\n\nSuggestion: ${partialBeneficiary.name}`,
          actions: [partialBeneficiary.name, 'Cancel transfer'],
          confidence: 'Medium',
        }
      }

      return blockUnsavedRecipient(recipient)
    }

    return askForAmount(beneficiary, amount)
  }

  const restartTransfer = () => {
    resetTransfer()
    return askForRecipientFullName()
  }

  const cancelTransfer = () => {
    resetTransfer()
    return {
      content: 'Transfer cancelled. Nothing was sent.',
      actions: ['Start new transfer', 'Analyze spending', 'Check loan readiness'],
      confidence: 'High',
    }
  }

  const buildTransferReply = async (content) => {
    const text = content.toLowerCase()
    const current = pendingTransfer.value
    const amount = extractAmount(content)
    const recipient = extractRecipient(content)

    if (isCancelIntent(text)) {
      return cancelTransfer()
    }

    if (current?.stage === transferSteps.WAITING_FOR_RECIPIENT) {
      return handleRecipientName(recipient || extractRecipient(`to ${content}`), current.amount || amount)
    }

    if (current?.stage === transferSteps.RECIPIENT_NOT_SAVED) {
      if (text.includes('another') || text.includes('recipient') || text.includes('change')) {
        return askForRecipientFullName()
      }

      return {
        content: 'For security reasons, please add this user first before making a transfer.',
        actions: ['Use another recipient', 'Cancel transfer'],
        confidence: 'High',
      }
    }

    if (current?.stage === transferSteps.WAITING_FOR_AMOUNT) {
      if (isRecipientChangeIntent(text)) {
        return askForRecipientFullName()
      }

      if (recipient && hasFullNameShape(recipient) && normalizeName(recipient) !== normalizeName(current.recipient)) {
        return handleRecipientName(recipient, amount)
      }

      if (text.includes('change') && !amount) {
        return {
          content: `How much money would you like to send to ${current.recipient}?\n\nTip: enter only the amount, for example “500 DH”.`,
          actions: ['Send 500 DH', 'Send 1000 DH', 'Cancel transfer'],
          confidence: 'Medium',
        }
      }

      const nextAmount = amount || (isPositiveIntent(text) ? current.amount : null)
      if (!nextAmount || nextAmount <= 0) {
        return {
          content: `How much money would you like to send to ${current.recipient}? Please enter a valid amount like “500 DH”.`,
          actions: ['Send 500 DH', 'Send 1000 DH', 'Cancel transfer'],
          confidence: 'Medium',
        }
      }

      return prepareTransfer({
        recipient: current.recipient,
        amount: nextAmount,
        beneficiary: current.beneficiary,
      })
    }

    if (current?.stage === transferSteps.WAITING_FOR_PIN) {
      const pin = isPinSubmission(content) ? extractPin(content) : ''
      if (pin) {
        return validateTransferPin({
          pin,
          recipient: current.recipient,
          amount: current.amount,
          beneficiary: current.beneficiary,
        })
      }

      if (/send another|new transfer|start new|another transfer/i.test(text)) {
        return restartTransfer()
      }

      if (isRecipientChangeIntent(text)) {
        return askForRecipientFullName(current.amount)
      }

      if (recipient && hasFullNameShape(recipient) && normalizeName(recipient) !== normalizeName(current.recipient)) {
        return handleRecipientName(recipient, amount || current.amount)
      }

      if (amount && !recipient) {
        return prepareTransfer({
          recipient: current.recipient,
          amount,
          beneficiary: current.beneficiary,
        })
      }

      if (text.includes('change')) {
        pendingTransfer.value = {
          stage: transferSteps.WAITING_FOR_AMOUNT,
          recipient: current.recipient,
          beneficiary: current.beneficiary,
          amount: null,
        }

        return {
          content: `Okay, what amount should I use for ${current.recipient}?\n\nTip: enter only the amount, for example “500 DH”.`,
          actions: ['Send 500 DH', 'Send 1000 DH', 'Cancel transfer'],
          confidence: 'Medium',
        }
      }

      return {
        content: `For security, please enter your PIN to validate the transfer to ${current.recipient} for ${formatCurrency(current.amount)}.`,
        actions: [`Use demo PIN ${DEMO_TRANSFER_PIN}`, 'Change amount', 'Cancel transfer'],
        confidence: 'Medium',
      }
    }

    if (current?.stage === transferSteps.TRANSFER_SENT) {
      if (/send another|new transfer|start new|another transfer/i.test(text)) {
        return restartTransfer()
      }

      return {
        content: `Your secure transfer to ${current.recipient} for ${formatCurrency(current.amount)} is complete.`,
        actions: ['Send another transfer', 'Show balance'],
        confidence: 'High',
      }
    }

    if (!recipient || !hasFullNameShape(recipient)) {
      return askForRecipientFullName(amount)
    }

    return handleRecipientName(recipient, amount)
  }

  const sendMessage = async (content, mode = activeMode.value) => {
    const cleanContent = content.trim()
    if (!cleanContent) return

    const finance = useFinanceStore()
    activeMode.value = mode
    isChatting.value = true
    const shouldMaskPin = pendingTransfer.value?.stage === transferSteps.WAITING_FOR_PIN && isPinSubmission(cleanContent)
    messages.value.push({
      role: 'user',
      content: shouldMaskPin ? '••••' : cleanContent,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    })

    isTyping.value = true
    const steps = ['Reading account context', 'Checking spending patterns', 'Composing demo response']

    for (const step of steps) {
      thinkingLabel.value = step
      await wait(420)
    }

    const reply = (
      activeMode.value === 'Transfer Agent' ||
      pendingTransfer.value ||
      isTransferIntent(cleanContent.toLowerCase())
    )
      ? await buildTransferReply(cleanContent)
      : buildDemoReply(cleanContent, activeMode.value, finance)

    messages.value.push({
      role: 'system',
      content: reply.content,
      actions: reply.actions,
      confidence: reply.confidence,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    })

    thinkingLabel.value = ''
    isTyping.value = false
  }

  const startWithPrompt = (prompt, mode) => {
    if (mode) activeMode.value = mode
    return sendMessage(prompt, activeMode.value)
  }

  const resetChat = () => {
    messages.value = []
    isChatting.value = false
    isTyping.value = false
    thinkingLabel.value = ''
    activeMode.value = 'Banking Agent'
    resetTransfer()
  }

  return {
    isChatting,
    isTyping,
    thinkingLabel,
    activeMode,
    messages,
    beneficiaries,
    pendingTransfer,
    transferSteps,
    sendMessage,
    startWithPrompt,
    resetChat,
  }
})
