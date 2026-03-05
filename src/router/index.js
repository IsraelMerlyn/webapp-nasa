import { createRouter, createWebHistory } from 'vue-router';
import DashboardView from '../views/DashboardView.vue';
import AmenazasView from '../views/AmenazasView.vue';
import PlanetasView from '../views/PlanetasView.vue';
import PlanetaDetalleView from '../views/PlanetaDetalleView.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/amenazas',
      name: 'amenazas',
      component: AmenazasView 
    },
    {
      path: '/planetas',
      name: 'planetas',
      component: PlanetasView // Tu nueva vista principal
    },
    {
      // El ":id" es dinámico, por ejemplo: /planeta/mars
      path: '/planeta/:id',
      name: 'planeta-detalle',
      component: PlanetaDetalleView,
      props: true // Permite pasar el ID como prop al componente
    }

  ]
});

export default router;