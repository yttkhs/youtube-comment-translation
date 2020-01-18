<template>
  <section>
    <h3>Translation</h3>
    <p ref="text" v-html="translatedText" :class="{ 'close-text': openText }" />
    <button v-if="longText" @click="toggleLongText">
      <template v-if="openText">[ ... ]</template>
      <template v-else>[ close ]</template>
    </button>
  </section>
</template>

<script>
export default {
  name: "BaseThreadTransText",
  props: {
    text: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      translatedText: "",
      longText: false,
      openText: false
    };
  },
  computed: {
    langCode() {
      return this.$store.state.language.langCode;
    }
  },
  watch: {
    translatedText() {
      this.judgeLongText();
    },
    langCode() {
      this.translateText(this.langCode);
    }
  },
  mounted() {
    this.translateText(this.langCode);
  },
  methods: {
    translateText(lang) {
      if (this.text.length) {
        this.$axios
          .get(
            "https://script.google.com/macros/s/AKfycbwdZFQgTfb8XwnHBeMrcYs7qL4tXF_jo743iRlUqX-RRpx0dVg/exec",
            {
              params: {
                text: `${this.text}`,
                source: "",
                target: `${lang}`
              }
            }
          )
          .then(res => {
            this.translatedText = res.data;
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
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
