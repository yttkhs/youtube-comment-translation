<template>
  <header class="TheHeader">
    <h1 class="TheHeader__logo">YOUTUBE<br />COMMENT<br />TRANSLATION</h1>
    <form @submit.prevent="sendYouTubeURL" class="TheHeader__form">
      <label>
        <input v-model="url" type="text" />
        <button @click="sendYouTubeURL">FETCH</button>
      </label>
    </form>
  </header>
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
    sendYouTubeURL() {
      if (this.url.length === 0) return;
      this.$nuxt.$emit("EVENT_SEND_URL", this.url);
    }
  }
};
</script>

<style scoped lang="scss">
.TheHeader {
  background-color: var(--color-header);
  padding: 0 20px;
  display: flex;
  align-items: center;
  height: $HEIGHT_HEADER;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;

  &__logo {
    font-size: 10px;
    letter-spacing: 0.2em;
    line-height: 140%;
    color: $COLOR_YOUTUBE;
  }
}
</style>
