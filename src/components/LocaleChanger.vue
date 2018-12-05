<template>
  <div class="locale-changer">
    <v-menu offset-y>
      <v-btn slot="activator" color="primary" dark>
        Dropdown
      </v-btn>
      <v-list>
        <v-list-tile v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang" v-model="$i18n.locale" @click="changeLang">
          <v-list-tile-title>{{ lang }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: 'locale-changer',
  data () {
    return { langs: ['en', 'es'] }
  },
  methods: {
    changeLang() {
    }
  }
}
</script>