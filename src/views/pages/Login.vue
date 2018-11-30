<template>
  <v-app id="inspire">
    <v-toolbar class="white">
      <v-toolbar-title><router-link to="/"><img src="assets/logo/logo_transparent.png" alt="logo" height="90"></router-link></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat to="/register">Register</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login
                </v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field v-model="email" prepend-icon="person" name="login" label="Login" type="text"></v-text-field>
                  <v-text-field v-model="password" id="password" prepend-icon="lock" name="password" label="Password" type="password"></v-text-field>
                </v-form>
                <v-alert v-if="loggingIn" v-model="loginError" dismissible type="error">
                  This is a error alert that is closable.
                </v-alert>
              </v-card-text>
              <v-card-actions>
                <router-link to="/forgotpw">Forgot Password</router-link>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="handlelogin">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>

import { mapState, mapActions } from 'vuex'

export default {
  data () {
      return {
          email: 'rukamo@daabox.com',
          password: 'Mock123456',
          submitted: false,
          loginError: null
      }
  },
  computed: {
    ...mapState({
        alert: state => state.alert,
        loggingIn: state => state.authentication.status
    })
  },
  created () {
      // reset login status
     // this.$store.dispatch('authentication/logout');
  },
  methods: {
    ...mapActions({
        clearAlert: 'alert/clear'
    }),
    handlelogin: function () {
      this.$store.dispatch('alert/clear')
      this.$validator.validateAll().then(result => {
        if (!result) {
          console.log(result)
          return false;
        } else {
          this.submitted = true;
          let data = {
            email: this.email,
            password: this.password,
          }
          const { dispatch } = this.$store;
          dispatch('authentication/login', data);
        }
      });
    }
  }
}
</script>
