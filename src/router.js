import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/pages/Home.vue'
import Login from './views/pages/Login.vue'
import Register from './views/pages/Register.vue'
import Dashboard from './views/dashboard/Dashboard.vue'
import DefaultContainer from './containers/DefaultContainer'
import CapacityEntry from './views/capacityplanning/CapacityEntry'

Vue.use(Router);

export default new Router({
  // mode: 'history',
  routes: [{
      path: '/',
      component: Home
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/default',
      name: 'default',
      component: DefaultContainer,
      children: [{
          path: '/dashboard',
          name: 'dashboard',
          component: Dashboard,
          meta: {
            requiresAuth: true
          },
        },
        {
          path: '/capacityplanning',
          name: 'capacityplanning',
          component: CapacityEntry,
          meta: {
            requiresAuth: true
          },
        }
      ]
    }
  ]
});
