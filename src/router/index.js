import { createRouter, createWebHistory } from 'vue-router';

import CalculatorPage from '../pages/CalculatorPage.vue';
import CharacterInfoPage from '../pages/CharacterInfoPage.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/calculator'
    },
    {
      path: '/calculator',
      component: CalculatorPage,
    },
    {
      path: '/character-info',
      component: CharacterInfoPage ,
    },
  ]
});

export default router;