<template>
  <div>
    <v-navigation-drawer fixed clipped class="grey lighten-4" app v-model="drawer" >
      <v-list dense class="grey lighten-4" >
        <template v-for="(item, i) in items">
          <v-layout row v-if="item.heading" align-center :key="i">
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-right">
              <v-btn small flat>edit</v-btn>
            </v-flex>
          </v-layout>
          <v-divider dark v-else-if="item.divider" class="my-3" :key="i"></v-divider>
          <v-list-tile :key="i" v-else :to="item.href">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="grey--text">
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="primary" app absolute clipped-left>
      <v-toolbar-side-icon @click.native="drawer = !drawer"></v-toolbar-side-icon>
      <span class="title ml-3 mr-5">PPM</span>
      <span class="ml-3 mr-5">{{orgName}}</span>
      <v-spacer></v-spacer>
      <v-menu offset-y left>
        <v-card
          slot="activator"
          class="portrait"
          :img="this.avatar"
          height="50"
          width="50"
        ></v-card>
        <v-list>
          <v-list-tile
            v-for="(item, index) in profileItems"
            :key="index"
            :to="item.href"
          >
            <v-list-tile-title >{{ item.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>

  </div>
</template>

<script>

export default {
  data: () => ({
      avatar: "",
      orgName: "",
      drawer: null,
      profileItems: [
        {title: 'Settings', href: "settings"},
        {title: 'Logout', href: "logout"}
      ],
      items: [
        { icon: 'fas fa-home', text: 'Home', href : '/dashboard' },
        { icon: 'fas fa-stopwatch', text: 'Capacity Planning', href: '/capacityplanning' },
        { divider: true }
        // { heading: 'Labels' },
        // { icon: 'add', text: 'Create new label' },
        // { divider: true },
        // { icon: 'archive', text: 'Archive' },
        // { icon: 'delete', text: 'Trash' },
        // { divider: true },
        // { icon: 'settings', text: 'Settings' },
        // { icon: 'chat_bubble', text: 'Trash' },
        // { icon: 'help', text: 'Help' },
        // { icon: 'phonelink', text: 'App downloads' },
        // { icon: 'keyboard', text: 'Keyboard shortcuts' }
      ]
    }),
    props: {
      source: String
    },
    mounted () {
      this.getAvatar(),
      this.getOrgName()
    },
    computed : {
      isLoggedIn : function(){ return this.$store.getters.isLoggedIn}
    },
    methods: {
      getAvatar: function (){
        const tempUser = JSON.parse(localStorage.user)
        this.avatar = tempUser.avatar
      },
      getOrgName: function (){
        const tempUser = JSON.parse(localStorage.user)
        this.orgName = tempUser.orgName
      }
    },
  }
</script>