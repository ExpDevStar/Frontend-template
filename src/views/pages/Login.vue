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
                    browser-autocomplete="off"
                    v-model="email"
                    v-validate="'required|email'"
                    :error-messages="errors.collect('email')"
                    prepend-icon="person"
                    name="email"
                    v-bind:label="$t('email')"
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

                <v-alert
                  :value="true"
                  type="error"
                  v-for="item in authErrors" :key="item.code"
                >
                  {{ item.title }}
                </v-alert>
              </v-card-text>
              <v-card-actions>
                <router-link to="/forgotpw">{{ $t("forgotpassword") }}</router-link>
                <v-spacer></v-spacer>
                <div id="loading" v-if="loginStatus == 'loggingin'">
                  <trinity-rings-spinner
                    :animation-duration="1500"
                    :size="40"
                    color="#76FF03"
                  />
                </div>

                <v-btn color="primary" @click="handlelogin" :disabled="loginStatus == 'loggingin'">{{ $t("login") }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>

import { mapState } from "vuex";

export default {

  data () {
    return {
      email: 'sicumecubo@veanlo.com',
      password: 'Mock123456',
      submitted: false,
      loginError: null,
      loggingIn: false,
    }
  },
  computed: {
    ...mapState({
      authErrors: state => state.auth.errors,
      loginStatus: state => state.auth.status,

    })
  },
  mounted(){
    this.$store.dispatch('resetState')
  },
  methods: {
    handlelogin: function () {
      this.$validator.validateAll().then(result => {
        if (!result) {
          console.log(result)
          return false;
        } else {
          this.loggingIn = true;
          let data = {
            email: this.email,
            password: this.password,
          }
          this.$store.dispatch("auth/login", data).then(() =>
            this.$router.push({ name: "dashboard" }),
            this.loggingIn = false
          );
        }
      });
    }
  },
  i18n: { // `i18n` option, setup locale info for component
    messages: {
      en: {
        email: 'Email',
        register: 'Register',
        password: 'Password',
        forgotpassword: 'Forgot password'
      }
    }
  }
}
</script>
