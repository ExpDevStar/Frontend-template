<template>
  <v-flex xs2>

    <div id="loading" v-if="loggingout">
      <trinity-rings-spinner
        :animation-duration="1500"
        :size="40"
        color="#76FF03"
      />
    </div>

    You are being logged out
  </v-flex>
</template>

<script>

  import { mapState, mapActions } from 'vuex'

  export default {
    data () {
      return {
      }
    },
    computed: {
      ...mapState({
        alert: state => state.alert,
        loggingout: state => state.authentication.status
      })
    },
    ...mapActions({
        clearAlert: 'alert/clear'
    }),
    mounted () {
      this.logout()
    },
    methods: {
      logout: function () {
        this.$store.dispatch('authentication/logout')
        .then(() => {
          this.$router.push('/')
        })
      }
    }
  }

</script>