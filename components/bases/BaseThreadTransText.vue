<template>
  <section class="ThreadTramsText">
    <h3 class="ThreadTramsText__title">
      <fa :icon="['fas', 'sync-alt']" />Translation
    </h3>
    <p
      ref="text"
      v-html="translatedText"
      :class="{ 'close-text': openText }"
      class="ThreadTramsText__cmt"
    />
    <button
      v-if="longText"
      @click="toggleLongText"
      class="ThreadTramsText__cont"
    >
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
      translatedText: "",
      longText: false,
      openText: false
    };
  },
  watch: {
    translatedText() {
      this.judgeLongText();
    }
  },
  mounted() {
    this.translateText();
  },
  methods: {
    translateText() {
      if (this.text.length) {
        this.$axios
          .get(
            "https://script.google.com/macros/s/AKfycbwdZFQgTfb8XwnHBeMrcYs7qL4tXF_jo743iRlUqX-RRpx0dVg/exec",
            {
              params: {
                text: `${this.text}`,
                source: "",
                target: "zh"
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
.ThreadTramsText {
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
