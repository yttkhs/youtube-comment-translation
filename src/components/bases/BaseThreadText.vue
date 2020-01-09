<template>
  <section class="ThreadText">
    <h3 class="ThreadText__title">
      <fa :icon="['fas', 'file-alt']" />Original
    </h3>
    <p
      ref="text"
      v-html="text"
      :class="{ 'close-text': openText }"
      class="ThreadText__cmt"
    />
    <button v-if="longText" @click="toggleLongText" class="ThreadText__cont">
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

<style scoped lang="scss">
.ThreadText {
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
