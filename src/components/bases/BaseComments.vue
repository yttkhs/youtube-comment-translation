<template>
  <div class="Comments">
    <BaseCommentThread
      v-for="comment in comments"
      :key="comment.id"
      :displayName="comment.displayName"
      :thumbUrl="comment.thumbUrl"
      :postTime="comment.postTime"
      :commentText="comment.commentText"
      :replyCount="comment.replyCount"
      class="CommentsThread"
    />
  </div>
</template>

<script>
import BaseCommentThread from "./BaseCommentThread";
export default {
  name: "BaseComments",
  components: { BaseCommentThread },
  props: {
    comments: {
      type: Array,
      default: Array
    }
  }
};
</script>

<style scoped lang="scss">
.CommentsThread {
  &:not(:first-of-type) {
    margin-top: 10px;
  }
}
</style>
