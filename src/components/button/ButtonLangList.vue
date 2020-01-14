<template>
  <button @click="changeTransLang">{{ name }}</button>
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
