import Vue from 'vue'
import { store } from './_store/'
import router from './router'
import App from './app/App.vue'
import Axios from 'axios'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import Vuetify from 'vuetify'
import '@fortawesome/fontawesome-free/css/all.css' // Ensure you are using css-loader
import theme from './app/theme'
import icons from './app/icons'
import VeeValidate from 'vee-validate';

Vue.use(VeeValidate);
Vue.use(Vuetify)

Vue.prototype.$http = Axios;
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/register', '/', '/forgotpw'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
})


new Vue({
  el: '#app',
  router: router,
  store,
  iconfont: 'fa',
  template: '<App/>',
  components: { App },
  render: h => h(App),
  theme: theme,
  icons: icons
});
