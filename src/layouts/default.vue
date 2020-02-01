<template>
  <v-app color="black" dark>
    <TheDrawerMenu :value="drawer" @input="drawer = $event" />
    <TheHeader @openDrawerMenu="openDrawerMenu" />
    <v-content>
      <nuxt />
    </v-content>
    <TheFooter />
  </v-app>
</template>

<script>
import TheDrawerMenu from "../components/globals/TheDrawerMenu";
import TheHeader from "../components/globals/TheHeader";
import TheFooter from "../components/globals/TheFooter";

export default {
  components: { TheFooter, TheHeader, TheDrawerMenu },
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
