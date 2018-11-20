<template>
  <v-fade-transition appear>
    <div id="app">
      <router-view />
    </div>
  </v-fade-transition>
</template>


<script>

export default {
  name: 'App',
  components: {

  },
  computed : {
    isLoggedIn : function(){ return this.$store.getters.isLoggedIn}
  },
  methods: {
    logout: function () {
      this.$store.dispatch('logout')
      .then(() => {
        this.$router.push('/login')
      })
    }
  },
  created: function () {
    this.$http.interceptors.response.use(undefined, function (err) {
      return new Promise(function () {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch('logout')
        }
        throw err;
      });
    });
  },
  data () {
    return {
      //
    }
  }
}
</script>
