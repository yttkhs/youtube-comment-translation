<template>
  <section class="ThreadText">
    <h3 class="ThreadText__title">原文</h3>
    <p v-html="text" class="ThreadText__cmt" />
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
  }
};
</script>

<style scoped lang="scss">
.ThreadText {
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
