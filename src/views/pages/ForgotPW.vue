<template>
  <v-app id="inspire">
    <v-toolbar class="white">
      <v-toolbar-title><router-link to="/"><img src="assets/logo/logo_transparent.png" alt="logo" height="90"></router-link></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat to="/login">{{ $t("login") }}</v-btn>
        <v-btn flat to="/register">{{ $t("register") }}</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>{{ $t("forgotpassword") }}</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                  v-validate="'required|email'"
                  v-model="email"
                  :error-messages="errors.collect('email')"
                  prepend-icon="person"
                  required
                  name="email"
                  v-bind:label="$t('email')"
                  type="email">

                  </v-text-field>
                </v-form>
                <v-alert dismissible :value="alert.message" icon="new_releases">{{alert.message}}</v-alert>
                <v-alert
                  :value="requestingForgotPW.forgotPWSuccess"
                  type="success"
                  dismissible
                  v-if="requestingForgotPW.forgotPWSuccess"
                  icon="new_releases">
                  {{ $t("emailSent") }}
                </v-alert>

              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                  <div id="loading" v-if="requestingForgotPW.requestingForgotPW">
                    <trinity-rings-spinner
                      :animation-duration="1500"
                      :size="40"
                      color="#76FF03"
                    />
                  </div>
                <v-btn color="primary" @click="handleSubmit">{{ $t("reset") }}</v-btn>
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
      email: '',
      submitted: false,
      submitError: null,
      dictionary: {
        custom: {
          password: {
            required: () => 'Email cannot be empty',
          }
        }
      }
    }
  },
  $_veeValidate: {
    validator: 'new'
  },
  mounted () {
    this.$validator.localize('en', this.dictionary)
    this.$store.dispatch('alert/clear')
    this.$store.dispatch('authentication/clear')
  },
  computed: {
    ...mapState({
        alert: state => state.alert,
        requestingForgotPW: state => state.authentication.status
    })
  },
  methods: {
  ...mapActions({
      clearAlert: 'alert/clear',
  }),
  handleSubmit () {
    this.$store.dispatch('alert/clear')
    this.$validator.validateAll().then(result => {
      if (!result) {
        console.log(result)
        return false;
      } else{
        let data = {
          email: this.email
        }
        this.$store.dispatch('authentication/forgotPWRequest', data);
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
        forgotpassword: 'Forgot password',
        reset: 'Reset',
        email: 'Email',
        emailSent: 'An email has been sent with instructions on how to reset your password.'
      }
    }
  }
}
</script>
