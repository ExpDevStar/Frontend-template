<template>
  <v-app id="inspire">
    <v-toolbar class="white">
      <v-toolbar-title><router-link to="/"><img src="assets/logo/logo_transparent.png" alt="logo" height="90"></router-link></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat to="/register">{{ $t("register") }}</v-btn>
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
                  <v-text-field
                    v-model="email"
                    v-validate="'required|email'"
                    :error-messages="errors.collect('login')"
                    prepend-icon="person"
                    name="login"
                    v-bind:label="$t('login')"
                    type="text">
                  </v-text-field>

                  <v-text-field
                    v-model="password"
                    v-validate="'required'"
                    id="password"
                    prepend-icon="lock"
                    :error-messages="errors.collect('password')"
                    name="password"
                    v-bind:label="$t('password')"
                    type="password">
                  </v-text-field>

                </v-form>
                <v-alert dismissible :value="alert.message" icon="new_releases">{{alert.message}}</v-alert>
              </v-card-text>
              <v-card-actions>
                <router-link to="/forgotpw">{{ $t("forgotpassword") }}</router-link>
                <v-spacer></v-spacer>
                <div id="loading" v-if="loggingIn.loggingIn == true">
                  <trinity-rings-spinner
                    :animation-duration="1500"
                    :size="40"
                    color="#76FF03"
                  />
                </div>
                <v-btn color="primary" @click="handlelogin" :disabled="loggingIn.loggingIn == true">{{ $t("login") }}</v-btn>
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
      password: 'gfhdgfhdtrhftgh453M',
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
    this.$store.dispatch('alert/clear')
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
  },
  i18n: { // `i18n` option, setup locale info for component
    messages: {
      en: {
        login: 'Login',
        register: 'Register',
        password: 'Password',
        forgotpassword: 'Forgot password'
      }
    }
  }
}
</script>
