<template>
  <v-card>
    <v-list-item>
      <v-list-item-avatar>
        <v-img :src="thumbUrl" />
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>{{ displayName }}</v-list-item-title>
        <v-list-item-subtitle>
          {{ $moment.utc(`${postTime}`).format("YYYY/MM/DD") }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <BaseThreadOrigText :commentText="commentText" />
    <BaseThreadTransText :commentText="commentText" />
    <BaseReplyContents
      v-if="replyCount"
      :commentId="commentId"
      :replyCount="replyCount"
    />
  </v-card>
</template>

<script>
import BaseThreadOrigText from "./BaseThreadOrigText";
import BaseThreadTransText from "./BaseThreadTransText";
import BaseReplyContents from "./BaseReplyContents";

export default {
  name: "BaseCommentThread",
  components: { BaseReplyContents, BaseThreadTransText, BaseThreadOrigText },
  props: {
    displayName: {
      type: String,
      default: "User Name"
    },
    thumbUrl: {
      type: String,
      default: ""
    },
    postTime: {
      type: String,
      default: "0000-00-00T00:00:00.000Z"
    },
    commentText: {
      type: String,
      default: ""
    },
    replyCount: {
      type: Number,
      default: 0
    },
    commentId: {
      type: String,
      default: ""
    }
  }
};
</script>
