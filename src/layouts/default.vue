<template>
  <v-app color="black" dark>
    <TheDrawerMenu :value="drawer" @input="drawer = $event" />
    <TheHeader @openDrawerMenu="openDrawerMenu" />
    <v-content>
      <nuxt />
    </v-content>
    <v-footer />
  </v-app>
</template>

<script>
import TheDrawerMenu from "../components/globals/TheDrawerMenu";
import TheHeader from "../components/globals/TheHeader";

export default {
  components: { TheHeader, TheDrawerMenu },
  data: () => ({
    drawer: null
  }),
  created() {
    this.$vuetify.theme.dark = true;
  },
  methods: {
    openDrawerMenu() {
      this.drawer = !this.drawer;
    }
  }
};
</script>
