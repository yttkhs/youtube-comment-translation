<template>
  <v-card outlined>
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
  </v-card>
</template>

<script>
import BaseThreadOrigText from "./BaseThreadOrigText";
import BaseThreadTransText from "./BaseThreadTransText";

export default {
  name: "BaseReplyThread",
  components: { BaseThreadTransText, BaseThreadOrigText },
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
    commentId: {
      type: String,
      default: ""
    }
  }
};
</script>
