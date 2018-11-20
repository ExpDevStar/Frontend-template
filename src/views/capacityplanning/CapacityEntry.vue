<template>
  <v-flex xs2>
    <v-date-picker v-model="picker" :landscape="landscape" :reactive="reactive"></v-date-picker>
  </v-flex>
</template>

<script>
  export default {
    data () {
      return {
        picker: new Date().toISOString().substr(0, 10),
        landscape: false,
        reactive: false
      }
    }
  }

</script>