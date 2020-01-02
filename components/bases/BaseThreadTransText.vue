<template>
  <section class="ThreadTramsText">
    <h3 class="ThreadTramsText__title">翻訳</h3>
    <p v-html="translatedText" class="ThreadTramsText__cmt" />
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
      translatedText: ""
    };
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
    }
  }
};
</script>

<style scoped lang="scss">
.ThreadTramsText {
  &:not(:first-of-type) {
    border-top: 1px solid var(--color-gray);
    padding-top: 10px;
    margin-top: 10px;
  }

  &__title {
    font-size: 1.3rem;
    line-height: 1.8rem;
    color: var(--color-gray);
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
}
</style>
