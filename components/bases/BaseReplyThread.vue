<template>
  <section class="ReplyThread">
    <div class="ReplyThread__thumb">
      <a :href="data.authorChannelUrl">
        <img :src="data.authorProfileImageUrl" :alt="data.authorDisplayName" />
      </a>
    </div>
    <div class="ReplyThread__container">
      <BaseThreadHeader
        :url="data.authorChannelUrl"
        :name="data.authorDisplayName"
        :time="data.publishedAt"
      />
      <div class="ReplyThread__contents">
        <BaseThreadText :text="data.textDisplay">
          <template v-slot:title>原文</template>
        </BaseThreadText>
        <BaseThreadText :text="data.textDisplay">
          <template v-slot:title>翻訳</template>
        </BaseThreadText>
      </div>
    </div>
  </section>
</template>

<script>
import BaseThreadHeader from "./BaseThreadHeader";
import BaseThreadText from "./BaseThreadText";

export default {
  name: "BaseReplyThread",
  components: { BaseThreadHeader, BaseThreadText },
  props: {
    data: {
      type: Object,
      default: null
    },
    id: {
      type: String,
      default: ""
    }
  }
};
</script>

<style scoped lang="scss">
.ReplyThread {
  display: flex;

  &:not(:first-child) {
    margin-top: 40px;
  }

  &__thumb {
    width: 30px;
    margin-right: 15px;

    a {
      display: block;

      img {
        width: 100%;
        height: auto;
        border-radius: 50%;
        vertical-align: middle;
      }
    }
  }

  &__container {
    flex: 1;
  }

  &__contents {
    margin-top: 10px;
  }

  &__button {
    padding: 0;
    margin-top: 15px;
    background-color: transparent;
    font-size: 1.4rem;
    line-height: 2rem;
    color: var(--color-blue);
  }
}
</style>
