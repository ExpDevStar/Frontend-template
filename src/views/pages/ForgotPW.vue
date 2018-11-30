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
                <v-toolbar-title>Forgot Password</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field v-validate="'required|email'" v-model="email" :error-messages="errors.collect('email')" prepend-icon="person" required name="email" label="Email" type="email"></v-text-field>
                </v-form>
                <v-alert dismissible :value="alert.message" icon="new_releases">{{alert.message}}</v-alert>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="handleSubmit">Reset</v-btn>
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
      } else{
        let data = {
          email: this.email
        }
        this.$store.dispatch('authentication/forgotPWRequest', data);
      }
    });
    }
  }
}
</script>
