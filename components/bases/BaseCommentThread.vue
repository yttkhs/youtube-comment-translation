<template>
  <section class="CmtThread">
    <div class="CmtThread__thumb">
      <a :href="data.authorChannelUrl">
        <img :src="data.authorProfileImageUrl" :alt="data.authorDisplayName" />
      </a>
    </div>
    <div class="CmtThread__contents">
      <div class="CmtThread__header">
        <a :href="data.authorChannelUrl" class="CmtThread__name">
          {{ data.authorDisplayName }}
        </a>
        <time class="CmtThread__time">
          {{ $moment.utc(data.publishedAt).format("YYYY/MM/DD HH:mm:ss") }}
        </time>
      </div>
      <p v-html="data.textDisplay" class="CmtThread__cmt" />
    </div>
  </section>
</template>

<script>
export default {
  name: "BaseCommentThread",
  props: {
    data: {
      type: Object,
      default: null
    }
  }
};
</script>

<style scoped lang="scss">
.CmtThread {
  display: flex;

  &:not(:first-child) {
    margin-top: 40px;
  }

  &__thumb {
    width: 50px;
    margin-right: 15px;

    a {
      display: block;

      img {
        border-radius: 50%;
        vertical-align: middle;
      }
    }
  }

  &__contents {
    flex: 1;
  }

  &__header {
    display: flex;
  }

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
