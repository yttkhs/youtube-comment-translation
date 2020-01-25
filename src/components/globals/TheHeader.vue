<template>
  <v-app-bar color="red" dark app clipped-left>
    <v-app-bar-nav-icon @click.stop="$emit('openDrawerMenu')" />
    <v-toolbar-title>LOGO</v-toolbar-title>

    <v-spacer />
    <form @submit.prevent="sendURL" class="form" autocomplete="off">
      <v-text-field
        v-model="url"
        label="URL"
        append-icon="mdi-magnify"
        outlined
        hide-details
        dense
        dark
        color="#fff"
      />
    </form>
  </v-app-bar>
</template>

<script>
export default {
  name: "TheHeader",
  data() {
    return {
      url: ""
    };
  },
  methods: {
    sendURL() {
      if (this.url.length === 0) return;
      this.$nuxt.$emit("EVENT_SEND_URL", this.url);
    }
  }
};
</script>

<style scoped lang="scss">
.form {
  display: block;
  max-width: 350px;
  width: 100%;
}
</style>
