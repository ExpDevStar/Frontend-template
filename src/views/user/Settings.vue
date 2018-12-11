<template>
  <v-flex xs2>
    User Settings
      <v-list>
        <v-list-tile v-for="user in users" :key="user.id" avatar>
          <v-list-tile-content>
            <v-list-tile-title v-text="user.name"></v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-avatar>
            <img :src="user.avatar">
          </v-list-tile-avatar>
        </v-list-tile>
      </v-list>
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