<template>
  <v-app id="inspire">
    <v-toolbar class="white">
      <v-toolbar-title><router-link to="/"><img src="assets/logo/logo_transparent.png" alt="logo" height="90"></router-link></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat to="/login">{{ $t("login") }}</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>{{ $t("register") }}
                </v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>

                  <v-text-field
                    browser-autocomplete="off"
                    v-validate="'required'"
                    :error-messages="errors.collect('organizationName')"
                    v-model="organizationName"
                    prepend-icon="person"
                    required
                    name="organizationName"
                    v-bind:label="$t('organizationName')"
                    type="text"
                    maxlength="50">
                  </v-text-field>

                  <v-text-field
                    browser-autocomplete="off"
                    v-validate="'required|alpha_spaces'"
                    :error-messages="errors.collect('firstName')"
                    v-model="firstName"
                    prepend-icon="person"
                    required
                    name="firstName"
                    v-bind:label="$t('firstname')"
                    type="text"
                    maxlength="50">
                  </v-text-field>

                  <v-text-field
                    browser-autocomplete="off"
                    v-validate="'required|alpha_spaces'"
                    data-vv-name="lastName"
                    :error-messages="errors.collect('lastName')"
                    v-model="lastName"
                    required prepend-icon="person"
                    name="lastName"
                    v-bind:label="$t('lastname')"
                    type="text"
                    maxlength="50">
                  </v-text-field>

                  <v-text-field
                    browser-autocomplete="off"
                    v-validate="'required|email'"
                    v-model="email"
                    :error-messages="errors.collect('email')"
                    prepend-icon="person"
                    required
                    name="email"
                    v-bind:label="$t('email')"
                    type="email"
                    maxlength="50">
                  </v-text-field>

                  <v-text-field
                    browser-autocomplete="off"
                    v-validate="{required:true, regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,100}$/ }"
                    v-model="password"
                    :error-messages="errors.collect('password')"
                    id="password"
                    prepend-icon="lock"
                    required name="password"
                    v-bind:label="$t('password')"
                    type="password">
                  </v-text-field>

                  <v-text-field
                    browser-autocomplete="off"
                    v-validate="{is: password}"
                    v-model="passwordConfirm"
                    :error-messages="errors.collect('password-confirm')"
                    id="passwordConfirm"
                    required
                    prepend-icon="lock"
                    name="password-confirm"
                    v-bind:label="$t('passwordconfirm')"
                    type="password">
                  </v-text-field>

                </v-form>
                <ul v-if="authErrors" class="error-messages">
                  <li v-for="(v, k) in authErrors" :key="k">{{ k }} {{ v | error }}</li>
                </ul>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <div id="loading" v-if="registeringStatus == 'registering'">
                  <trinity-rings-spinner
                    :animation-duration="1500"
                    :size="40"
                    color="#76FF03"
                  />
                </div>
                <v-btn color="primary" @click="handleRegister" :disabled="registeringStatus == 'registering'">{{ $t("register") }}</v-btn>
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

  import { TrinityRingsSpinner } from 'epic-spinners'
  export default {
    components: {
      TrinityRingsSpinner
    },
    data(){
      return {
        organizationName : "",
        firstName : "",
        lastName : "",
        email : "sicumecubo@veanlo.com",
        password : "",
        passwordConfirm : "",
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
      this.$store.dispatch('auth/resetState'),
      this.$validator.localize('en', this.dictionary)
    },
    computed: {
      ...mapState({
        authErrors: state => state.auth.errors,
        registeringStatus: state => state.auth.status,
      })
    },
    methods: {
      handleRegister() {
        this.$validator.validateAll().then(result => {
          if (!result) {
            return false;
          } else {
            let xData = {
              organizationName: this.organizationName,
              firstName: this.firstName,
              lastName: this.lastName,
              email: this.email,
              password: this.password,
              passwordConfirm: this.passwordConfirm
            }
            this.$store.dispatch("auth/register", xData).then(() =>
              this.$router.push({ name: "dashboard" }),
            );
          }
        });
      }
    },
    i18n: { // `i18n` option, setup locale info for component
      messages: {
        en: {
          organizationName: 'Organization Name',
          login: 'Login',
          register: 'Register',
          firstname: 'First Name',
          lastname: 'Last Name',
          email: 'Email',
          password: 'Password',
          passwordconfirm: 'Password Confirm'
        }
      }
    }

  }
</script>

<style>


</style>