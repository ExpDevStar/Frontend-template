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
        users: [
          { name: 'Travis Howard', avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
          { name: 'Ali Connors', avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
          { name: 'Cindy Baker', avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' }
        ]
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