import VueRouter from 'vue-router'
import App from './App'
import MealPlannerView from './components/MealPlannerView'

export const routes = [
  {
    path: '/',
    component: App,
    children: [
      {path: '', component: MealPlannerView},
      {path: '/entries', component: MealPlannerView}
    ]
  }
]

export const router = new VueRouter({
  routes // short for routes: routes
})
