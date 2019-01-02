import Vue from 'vue'
import { store } from './_store/'
import router from './router'
import App from './app/App.vue'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import Vuetify from 'vuetify'
import '@fortawesome/fontawesome-free/css/all.css' // Ensure you are using css-loader
import theme from './app/theme'
import icons from './app/icons'
import VeeValidate from 'vee-validate';
import VueI18n from 'vue-i18n';
import validationMessagesEn from 'vee-validate/dist/locale/en';
import { TrinityRingsSpinner } from 'epic-spinners'
import ApiService from "./api";

// Vue.use(VueAxios, axios)
Vue.use(VueI18n);
Vue.component('TrinityRingsSpinner', TrinityRingsSpinner)
Vue.use(Vuetify, { theme: theme })

//import { CHECK_AUTH } from "./_store/actions.type";


const i18n = new VueI18n({
  locale: 'en' // set locale
});

Vue.use(VeeValidate, {
  i18nRootKey: 'validations', // customize the root path for validation messages.
  i18n,
  dictionary: {
    en: validationMessagesEn
  }
});

Vue.config.productionTip = false
ApiService.init();
// redirect to login page if not logged in and trying to access a restricted page
router.beforeEach((to, from, next) => {
  const publicPages = ['login', 'register', 'index', 'forgotpw', 'passwordreset'];
  const authRequired = !publicPages.includes(to.name);
  const loggedIn = localStorage.getItem('user');
  if (authRequired && !loggedIn) {
    return next('/login');
  }
  next()
  // Promise.all([store.dispatch(CHECK_AUTH)]).then(next)
})

new Vue({
  el: '#app',
  router: router,
  store,
  i18n,
  iconfont: 'fa',
  template: '<App/>',
  components: { App },
  render: h => h(App),
  icons: icons
});
