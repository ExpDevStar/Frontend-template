import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/pages/Home.vue'
import Login from './views/pages/Login.vue'
import Logout from './views/user/Logout.vue'
import Settings from './views/user/Settings.vue'
import AdminUsers from './views/admin/Users.vue'
import Register from './views/pages/Register.vue'
import Dashboard from './views/dashboard/Dashboard.vue'
import DefaultContainer from './containers/DefaultContainer'
import ForgotPW from './views/pages/ForgotPW.vue'
import ForgotPWReset from './views/pages/ForgotPWReset.vue'


Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [{
      name: 'index',
      path: '/',
      component: Home
    },
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'register',
      path: '/register',
      component: Register
    },
    {
      name: 'passwordreset',
      path: '/passwordreset/:token',
      component: ForgotPWReset,
      props: true
    },
    {
      name: 'forgotpw',
      path: '/forgotpw',
      component: ForgotPW
    },
    {
      path: '/admin',
      name: 'admin',
      component: DefaultContainer,
      children: [{
        path: 'users',
        name: 'adminusers',
        component: AdminUsers,
        meta: {
          requiresAuth: true
        },
      }]
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
          path: '/logout',
          name: 'logout',
          component: Logout,
          meta: {
            requiresAuth: true
          },
        },
        {
          path: '/settings',
          name: 'settings',
          component: Settings,
          meta: {
            requiresAuth: true
          },
        }
      ]
    }
  ]
});
