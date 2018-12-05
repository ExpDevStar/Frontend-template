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
import validationMessagesEs from 'vee-validate/dist/locale/es';

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'en' // set locale
});

Vue.use(VeeValidate, {
  i18nRootKey: 'validations', // customize the root path for validation messages.
  i18n,
  dictionary: {
    en: validationMessagesEn,
    es: validationMessagesEs
  }
});

Vue.use(Vuetify)

const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

Vue.config.productionTip = false

// redirect to login page if not logged in and trying to access a restricted page
router.beforeEach((to, from, next) => {
  const publicPages = ['login', 'register', 'index', 'forgotpw', 'passwordreset'];
  const authRequired = !publicPages.includes(to.name);
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
  i18n,
  iconfont: 'fa',
  template: '<App/>',
  components: { App },
  render: h => h(App),
  theme: theme,
  icons: icons
});
