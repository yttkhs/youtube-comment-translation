<template>
  <header class="TheHeader">
    <h1 class="TheHeader__logo">YOUTUBE<br />COMMENT<br />TRANSLATION</h1>
    <form @submit.prevent="sendURL" class="TheHeader__form">
      <label>
        <input v-model="url" type="text" placeholder="Search..." />
        <button type="submit"><fa :icon="['fas', 'search']" /></button>
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
    sendURL() {
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
  box-shadow: var(--box-shadow);

  &__logo {
    font-size: 10px;
    letter-spacing: 0.2em;
    line-height: 140%;
    color: $COLOR_YOUTUBE;
  }

  &__form {
    margin-left: auto;
    margin-right: auto;

    label {
      display: flex;
    }

    input[type="text"] {
      width: 250px;
      border: 1px solid var(--color-gray);
      background-color: var(--color-base);
      color: var(--color-text);
      font-size: 16px;
      line-height: 20px;
      appearance: none;
      padding: 5px 10px;
      -webkit-font-smoothing: antialiased;
      border-radius: 3px 0 0 3px;
      outline: none;

      &:focus {
        border: 1px solid var(--color-blue);
      }
    }

    button {
      text-align: center;
      width: 50px;
      color: var(--color-base);
      background-color: var(--color-gray);
      border-radius: 0 3px 3px 0;
      font-size: 14px;
    }
  }
}
</style>
