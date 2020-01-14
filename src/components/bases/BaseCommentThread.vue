<template>
  <section>
    <div>
      <a :href="data.authorChannelUrl" target="_blank" rel="noopener">
        <img :src="data.authorProfileImageUrl" :alt="data.authorDisplayName" />
      </a>
    </div>
    <div>
      <BaseThreadHeader
        :url="data.authorChannelUrl"
        :name="data.authorDisplayName"
        :time="data.publishedAt"
      />
      <div>
        <BaseThreadText :text="data.textDisplay" />
        <BaseThreadTransText :text="data.textDisplay" />
      </div>
      <button v-if="reply" @click="displayReplyContents">
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
