<template>
  <div class="ThreadHeader">
    <a :href="url" class="ThreadHeader__name">{{ name }}</a>
    <time class="ThreadHeader__time">
      {{ $moment.utc(time).format("YYYY/MM/DD HH:mm:ss") }}
    </time>
  </div>
</template>

<script>
export default {
  name: "BaseThreadHeader",
  props: {
    url: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: ""
    },
    time: {
      type: String,
      default: ""
    }
  }
};
</script>

<style scoped lang="scss">
.ThreadHeader {
  display: flex;

  &__name {
    color: var(--color-text);
    text-decoration: none;
    font-size: 1.3rem;
    line-height: 1.8rem;
  }

  &__time {
    margin-left: 10px;
    font-size: 1.3rem;
    line-height: 1.8rem;
    color: var(--color-gray);
  }
}
</style>
