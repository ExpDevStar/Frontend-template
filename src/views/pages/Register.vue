<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Register
                  <router-link class="white--text" to="/login">(Login)</router-link>
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
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="handleRegister">Register</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    data(){
      return {
        firstName : "James",
        lastName : "Hetfield",
        email : "jhetfield@metallica.com",
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
    },
    methods: {
      handleRegister: function () {
       // this.$validator.validateAll()

        let data = {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
          passwordConfirm: this.passwordConfirm
        }

        this.$store.dispatch('authentication/register', data)
        .then(() => this.$router.push('/'))
        .catch(err => console.log(err))
      }
    }
  }
</script>