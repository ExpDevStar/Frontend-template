<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login
                  <router-link class="white--text" to="/register">(Register)</router-link>
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

export default {
  data () {
      return {
          email: 'jhetfield@metallica.com',
          password: 'Mock123456',
          submitted: false,
          loginError: null
      }
  },
  computed: {
      loggingIn () {
        return this.$store.state.authentication.status.loggingIn;
      }
  },
  created () {
      // reset login status
     // this.$store.dispatch('authentication/logout');
  },
  methods: {
    handlelogin () {
        this.submitted = true;
        const { email, password } = this;
        const { dispatch } = this.$store;
        if (email && password) {
            dispatch('authentication/login', { email, password });
        }
    }
  }
}
</script>
