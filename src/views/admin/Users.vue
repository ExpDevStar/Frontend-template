<template>
  <v-flex xs10>
    <h1>Admin User Settings</h1>
    <v-list two-line>
      <v-list-tile color="primary">
        <v-list-tile-content>
          <v-list-tile-title>Name</v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-content>
          <v-list-tile-title>Role</v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-content>
          <v-list-tile-title>Status</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile v-for="user in users" :key="user.id" avatar>
        <v-list-tile-content>
          <v-list-tile-title v-text="user.name"></v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-content>
          <v-list-tile-title>
            <div class="text-xs-center">
              {{user.role}}
            </div>
          </v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-content>
          <v-list-tile-title>
            <div class="text-xs-center">
              {{user.status}}
            </div>
          </v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-avatar>
          <img :src="user.avatar">
        </v-list-tile-avatar>
      </v-list-tile>
    </v-list>
    <v-form>
      <v-text-field
        browser-autocomplete="off"
        v-model="newUserEmail"
        v-validate="'required|email'"
        :error-messages="errors.collect('newUserEmail')"
        prepend-icon="person"
        name="new_user_email"
        v-bind:label="$t('invitenewuser')"
        type="text">
      </v-text-field>
    </v-form>
  </v-flex>
</template>

<script>

  import { mapState, mapActions } from 'vuex'

  export default {
    data () {
      return {
        users: [
          { name: 'Travis Howard', avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg', role: "admin", status: "active" },
          { name: 'Ali Connors', avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg', role: "user", status:"invited" },
          { name: 'Cindy Baker', avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg', role: "owner", status: "active" }
        ],
        newUserEmail : ""
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

    },
    i18n: { // `i18n` option, setup locale info for component
      messages: {
        en: {
          invitenewuser: 'Invite new user',
        }
      }
    }
  }

</script>