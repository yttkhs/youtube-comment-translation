<template>
  <header>
    <h1>YOUTUBE<br />COMMENT<br />TRANSLATION</h1>
    <form @submit.prevent="sendURL">
      <label>
        <input v-model="url" type="text" placeholder="Search..." />
        <button type="submit"><fa :icon="['fas', 'search']" /></button>
      </label>
    </form>
    <BaseHeaderNav />
  </header>
</template>

<script>
import BaseHeaderNav from "../bases/BaseHeaderNav";
export default {
  name: "TheHeader",
  components: { BaseHeaderNav },
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
