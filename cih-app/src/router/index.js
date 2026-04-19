import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import AIAssistantView from '../views/AIAssistantView.vue'
import PlanningAndGoalsView from '../views/PlanningAndGoalsView.vue'
import LoanAdvisorView from '../views/LoanAdvisorView.vue'
import TransferAgentView from '../views/TransferAgentView.vue'

// Define a placeholder component for unimplemented routes
const PlaceholderView = {
  template: `
    <div class="flex-1 ml-0 md:ml-72 min-h-screen px-4 pt-24 pb-28 md:p-8 lg:p-12 flex items-center justify-center">
      <h2 class="font-headline text-3xl font-bold text-outline">{{ $route.name }}</h2>
    </div>
  `
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/ai-assistant'
    },
    {
      path: '/ai-assistant',
      name: 'AI Assistant',
      component: AIAssistantView
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: DashboardView
    },
    {
      path: '/planning-and-goals',
      name: 'Planning & Goals',
      component: PlanningAndGoalsView
    },
    {
      path: '/spending-insights',
      name: 'Spending Insights',
      component: PlaceholderView
    },
    {
      path: '/file-analysis',
      name: 'File Analysis',
      component: PlaceholderView
    },
    {
      path: '/loan-advisor',
      name: 'Loan Advisor',
      component: LoanAdvisorView
    },
    {
      path: '/transfer-agent',
      name: 'Transfer Agent',
      component: TransferAgentView
    },
    {
      path: '/alerts',
      name: 'Alerts',
      component: PlaceholderView
    },
    {
      path: '/profile',
      name: 'Profile',
      component: PlaceholderView
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/ai-assistant'
    }
  ]
})

export default router
