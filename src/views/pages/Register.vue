<template>
  <v-app id="inspire">
    <v-toolbar class="white">
      <v-toolbar-title><router-link to="/"><img src="assets/logo/logo_transparent.png" alt="logo" height="90"></router-link></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat to="/login">Login</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Register
                </v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field  :error-messages="errors.collect('firstName')" v-model="firstName" prepend-icon="person" required name="firstName" label="First Name" type="text"></v-text-field>
                  <v-text-field v-validate="'required|alpha_spaces'" data-vv-name="lastName" :error-messages="errors.collect('lastName')" v-model="lastName" required prepend-icon="person" name="lastName" label="Last Name" type="text"></v-text-field>
                  <v-text-field v-validate="'required|email'" v-model="email" :error-messages="errors.collect('email')" prepend-icon="person" required name="email" label="Email" type="email"></v-text-field>
                  <v-text-field v-validate="{required:true, regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,100}$/ }" v-model="password" :error-messages="errors.collect('password')" id="password" prepend-icon="lock" required name="password" label="Password" type="password"></v-text-field>
                  <v-text-field v-validate="{is: password}" v-model="passwordConfirm" :error-messages="errors.collect('password-confirm')" id="passwordConfirm" required prepend-icon="lock" name="password-confirm" label="Password Confirm" type="password"></v-text-field>
                </v-form>
                <v-alert dismissible :value="alert.message" icon="new_releases">{{alert.message}}</v-alert>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="handleRegister" :disabled="isRegistering.registering == true">Register</v-btn>
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
    data(){
      return {
        firstName : "James",
        lastName : "Hetfield",
        email : "rukamo@daabox.com",
        password : "Mock123456",
        passwordConfirm : "Mock123456",
        dictionary: {
          custom: {
            password: {
              required: () => 'Password cannot be empty',
              regex: "Must be minimum eight characters, have least one uppercase letter, one lowercase letter, and a number"
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
      handleRegister: function () {
        this.$store.dispatch('alert/clear')
        this.$validator.validateAll().then(result => {
          if (!result) {
            console.log(result)
            return false;
          } else{
            let data = {
              firstName: this.firstName,
              lastName: this.lastName,
              email: this.email,
              password: this.password,
              passwordConfirm: this.passwordConfirm
            }
            this.$store.dispatch('authentication/register', data);
          }
        });
      }
    }
  }
</script>