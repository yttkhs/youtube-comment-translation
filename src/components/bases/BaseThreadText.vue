<template>
  <section>
    <h3>Original</h3>
    <p ref="text" v-html="text" :class="{ 'close-text': openText }" />
    <button v-if="longText" @click="toggleLongText">
      <template v-if="openText">[ ... ]</template>
      <template v-else>[ close ]</template>
    </button>
  </section>
</template>

<script>
export default {
  name: "BaseThreadText",
  props: {
    text: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      longText: false,
      openText: false
    };
  },
  mounted() {
    this.judgeLongText();
  },
  methods: {
    judgeLongText() {
      this.$nextTick(() => {
        if (this.$refs.text.clientHeight >= 100) {
          this.longText = true;
          this.openText = true;
        }
      });
    },
    toggleLongText() {
      this.openText = !this.openText;
    }
  }
};
</script>
