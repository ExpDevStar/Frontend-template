<template>
  <v-flex xs2>
    User Settings
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
      })
    },
    ...mapActions({
        clearAlert: 'alert/clear'
    }),
    mounted () {
    },
    methods: {

    }
  }

</script>