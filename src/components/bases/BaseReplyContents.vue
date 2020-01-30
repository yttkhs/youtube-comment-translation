<template>
  <v-expansion-panels flat>
    <v-expansion-panel>
      <v-divider />
      <v-expansion-panel-header v-slot="{ open }">
        <div class="text-truncate pr-1">
          <v-icon class="mr-2">mdi-reply</v-icon>
          <v-fade-transition>
            <span v-if="open" class="font-weight-bold">REPLIES</span>
            <span v-else>{{ replyCount }} 件のリプライを表示</span>
          </v-fade-transition>
        </div>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <BaseReplyThread
          v-for="comment in comments"
          :key="comment.id"
          :displayName="comment.displayName"
          :thumbUrl="comment.thumbUrl"
          :postTime="comment.postTime"
          :commentText="comment.commentText"
          :commentId="comment.commentId"
          class="CommentsThread"
        />
        <infinite-loading
          ref="InfiniteLoading"
          v-if="commentId.length"
          @infinite="fetchCmtsData"
        >
          <div slot="no-more" />
          <div slot="no-results" />
        </infinite-loading>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import InfiniteLoading from "vue-infinite-loading";
import BaseReplyThread from "./BaseReplyThread";

const API_URL = "https://www.googleapis.com/youtube/v3";
const API_KEY = process.env.API_KEY;

export default {
  name: "BaseReplyContents",
  components: { BaseReplyThread, InfiniteLoading },
  props: {
    replyCount: {
      type: Number,
      default: 0
    },
    commentId: {
      type: String,
      default: ""
    }
  },
  data: () => ({
    comments: [],
    nextToken: ""
  }),
  methods: {
    /**
     * @property {Array} snippet
     * @property {Array} topLevelComment
     * @property {string} totalReplyCount
     * @property {string} authorChannelUrl
     * @property {string} authorDisplayName
     * @property {string} authorProfileImageUrl
     * @property {string} publishedAt
     * @property {string} textDisplay
     * @property {string} nextPageToken
     */
    fetchCmtsData($state) {
      this.$axios
        .get(`${API_URL}/comments`, {
          params: {
            part: "snippet",
            parentId: this.commentId,
            maxResults: "10",
            key: API_KEY,
            pageToken: this.nextToken
          }
        })
        .then(res => {
          const commentData = this.comments;
          const items = res.data.items.map((item, index) => {
            const A = item.snippet;
            return {
              id: commentData.length + index,
              commentId: item.id,
              postTime: A.publishedAt,
              displayName: A.authorDisplayName,
              thumbUrl: A.authorProfileImageUrl,
              commentText: A.textDisplay,
              channelUrl: A.authorChannelUrl,
              likeCount: A.likeCount
            };
          });

          this.comments = commentData.concat(items);
          this.nextToken = res.data.nextPageToken;

          if (this.nextToken) {
            $state.loaded();
          } else {
            $state.complete();
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    resetData() {
      if (this.$refs.InfiniteLoading) {
        this.$refs.InfiniteLoading.stateChanger.reset();
      }
      this.nextToken = "";
      this.comments = [];
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
