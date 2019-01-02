<template>
  <v-flex xs2>

    <div id="loading">
      <trinity-rings-spinner
        :animation-duration="1500"
        :size="40"
        color="#76FF03"
      />
    </div>

    You are being logged out
  </v-flex>
</template>

<script>
  export default {
    data () {
      return {
      }
    },
    computed: {

    },
    mounted () {
      this.logout()
    },
    methods: {
      logout: function () {
        this.$store.dispatch("auth/logout").then(() => {
          this.$router.push({ name: "index" });
        });
      }
    }
  }

</script>