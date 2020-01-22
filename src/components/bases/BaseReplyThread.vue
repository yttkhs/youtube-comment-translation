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
    </div>
  </section>
</template>

<script>
import BaseThreadHeader from "./BaseThreadHeader";
import BaseThreadText from "./BaseThreadOrigText";
import BaseThreadTransText from "./BaseThreadTransText";

export default {
  name: "BaseReplyThread",
  components: { BaseThreadHeader, BaseThreadText, BaseThreadTransText },
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
