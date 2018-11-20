<template>
  <v-app>
    <header>
        <navbar></navbar>
    </header>
    <v-content>
      <v-container fluid>
        <v-layout align-start justify-start fill-height>
          <router-view></router-view>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import navbar from '../components/Navbar.vue'

export default {
  name: 'full',
  components: {
    navbar
  },
  data () {
    return {
      //nav: nav.items
    }
  },
  computed: {
    name () {
      return this.$route.name
    },
    list () {
      return this.$route.matched.filter((route) => route.name || route.meta.label )
    }
  }
}
</script>