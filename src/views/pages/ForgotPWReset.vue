<template>
  <v-app id="inspire">
    <v-toolbar class="white">
      <v-toolbar-title><router-link to="/"><img src="assets/logo/logo_transparent.png" alt="logo" height="90"></router-link></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat to="/login">Login</v-btn>
        <v-btn flat to="/register">Register</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Password Reset</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>3wsdF
                  <v-text-field v-validate="'required'" v-model="password" :error-messages="errors.collect('password')" prepend-icon="lock" required name="password" label="Password" type="password"></v-text-field>
                  <v-text-field v-validate="'required'" v-model="passwordConfirm" :error-messages="errors.collect('passwordConfirm')" prepend-icon="lock" required name="password-confirm" label="Confirm" type="password"></v-text-field>
                </v-form>
                <v-alert dismissible :value="alert.message" icon="new_releases">{{alert.message}}</v-alert>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="handleSubmit">Submit</v-btn>
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
      password: '',
      passwordConfirm: '',
      tokenValid : false,
      submitted: false,
      submitError: null,
      dictionary: {
        custom: {
          password: {
            required: () => 'Password cannot be empty',
          },
          passwordComfirm: {
            required: () => 'Password confirm cannot be empty',
          }
        }
      }
    }
  },
  props: {
    token: {
      type: String,
      default: ''
    }
  },
  $_veeValidate: {
    validator: 'new'
  },
  mounted () {
    console.log(this.token)
    if(this.token && this.token !== null) {
      this.checkToken();
    }
    this.$validator.localize('en', this.dictionary)
    this.$store.dispatch('alert/clear')
  },
  computed: {
    ...mapState({
        alert: state => state.alert,
        isRegistering: state => state.authentication.status
    })
  },
  methods: {
    ...mapActions({
        clearAlert: 'alert/clear'
    }),
    handleSubmit () {
      this.$store.dispatch('alert/clear')
      this.$validator.validateAll().then(result => {
        if (!result) {
          console.log(result)
          return false;
        } else {
          const data = {
            password: this.password,
            passwordConfirm: this.passwordConfirm,
            token: this.token
          }
          this.$store.dispatch('authentication/resetPWRequest', data);
        }
      });
    },
    checkToken() {
      const data = {
        token: this.token
      }
      this.$store.dispatch('authentication/checkTokenRequest', data);
    }
  }

}
</script>
