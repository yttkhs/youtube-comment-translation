<template>
  <section class="ThreadTransText">
    <h3 class="ThreadTransText__title">
      <fa :icon="['fas', 'sync-alt']" />Translation
    </h3>
    <p
      ref="text"
      v-html="translatedText"
      :class="{ 'close-text': openText }"
      class="ThreadTransText__cmt"
    />
    <button
      v-if="longText"
      @click="toggleLongText"
      class="ThreadTransText__cont"
    >
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

<style scoped lang="scss">
.ThreadTransText {
  &:not(:first-of-type) {
    border-top: 1px dashed var(--color-gray);
    padding-top: 12px;
    margin-top: 12px;
  }

  &__title {
    display: flex;
    align-items: baseline;
    color: var(--color-gray);
    font-size: 1.3rem;
    line-height: 1.8em;

    svg {
      margin-right: 5px;
    }
  }

  &__cmt {
    margin-top: 5px;
    font-size: 1.4rem;
    line-height: 2rem;
    word-break: break-all;

    /deep/ a {
      text-decoration: none;
      color: var(--color-blue);
    }
  }

  .close-text {
    max-height: 80px;
    overflow: hidden;
  }

  &__cont {
    margin-top: 10px;
    font-size: 1.4rem;
    line-height: 2rem;
    color: var(--color-gray);

    &:hover {
      opacity: 0.8;
    }
  }
}
</style>
