<template>
  <button @click="changeTransLang" class="ButtonLang">{{ name }}</button>
</template>

<script>
export default {
  name: "ButtonLangList",
  props: {
    code: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: ""
    }
  },
  methods: {
    changeTransLang() {
      this.$store.commit(`language/changeLang`, this.code);
      this.$nuxt.$emit("EVENT_OPEN_LANG_LIST", false);
    }
  }
};
</script>

<style scoped lang="scss">
.ButtonLang {
  width: 100%;
  padding: 10px;
  text-align: left;
  font-size: 1.4rem;
  line-height: 2rem;
  color: var(--color-text);
}
</style>
