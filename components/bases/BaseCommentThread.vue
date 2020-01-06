<template>
  <section class="CmtThread">
    <div class="CmtThread__thumb">
      <a :href="data.authorChannelUrl" target="_blank" rel="noopener">
        <img :src="data.authorProfileImageUrl" :alt="data.authorDisplayName" />
      </a>
    </div>
    <div class="CmtThread__container">
      <BaseThreadHeader
        :url="data.authorChannelUrl"
        :name="data.authorDisplayName"
        :time="data.publishedAt"
      />
      <div class="CmtThread__contents">
        <BaseThreadText :text="data.textDisplay" />
        <BaseThreadTransText :text="data.textDisplay" />
      </div>
      <button
        v-if="reply"
        @click="displayReplyContents"
        class="CmtThread__button"
      >
        <template v-if="replyContents">返信を非表示</template>
        <template v-else>{{ reply }}件の返信を表示</template>
      </button>
      <BaseReplyContents v-if="replyContents" :parentId="id" />
    </div>
  </section>
</template>

<script>
import BaseThreadText from "./BaseThreadText";
import BaseThreadTransText from "./BaseThreadTransText";
import BaseThreadHeader from "./BaseThreadHeader";
import BaseReplyContents from "./BaseReplyContents";

export default {
  name: "BaseCommentThread",
  components: {
    BaseReplyContents,
    BaseThreadHeader,
    BaseThreadText,
    BaseThreadTransText
  },
  props: {
    data: {
      type: Object,
      default: null
    },
    id: {
      type: String,
      default: ""
    },
    reply: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      replyContents: false,
      translatedText: ""
    };
  },
  methods: {
    displayReplyContents() {
      this.replyContents = !this.replyContents;
    }
  }
};
</script>

<style scoped lang="scss">
.CmtThread {
  display: flex;
  padding: 20px 15px;
  box-shadow: var(--box-shadow);
  border-radius: 3px;
  margin-top: 20px;

  &__thumb {
    width: 40px;
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
    margin-top: 12px;
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
