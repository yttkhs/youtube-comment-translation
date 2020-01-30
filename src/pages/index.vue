<template>
  <v-container>
    <v-layout>
      <v-flex md8 sm8>
        <BaseCommentThread
          v-for="comment in comments"
          :key="comment.id"
          :displayName="comment.displayName"
          :thumbUrl="comment.thumbUrl"
          :postTime="comment.postTime"
          :commentText="comment.commentText"
          :replyCount="comment.replyCount"
          :commentId="comment.commentId"
          class="CommentsThread"
        />
        <infinite-loading
          ref="InfiniteLoading"
          v-if="url.length"
          @infinite="fetchCmtsData"
        >
          <div slot="no-more" />
          <div slot="no-results" />
        </infinite-loading>
      </v-flex>
      <v-flex md4 sm4 class="pl-3">
        <BaseDescription
          :videoThumb="details.videoThumb"
          :videoTitle="details.videoTitle"
          :viewCount="details.viewCount"
          :channelName="details.channelName"
          :channelThumb="details.channelThumb"
          :description="details.description"
          :postTime="details.postTime"
          :subscribe="details.subscribe"
          :commentCount="details.commentCount"
          :likeCount="details.likeCount"
          :dislikeCount="details.dislikeCount"
        />
        <BaseSearchHistory :history="history" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import InfiniteLoading from "vue-infinite-loading";
import { mapGetters } from "vuex";
import BaseCommentThread from "../components/bases/BaseCommentThread";
import BaseDescription from "../components/bases/BaseDescription";
import BaseSearchHistory from "../components/bases/BaseSearchHistory";

const API_URL = "https://www.googleapis.com/youtube/v3";
const API_KEY = process.env.API_KEY;
const STORAGE_KEY = "YOUTUBE_TRANS_COMMENT";

export default {
  components: {
    BaseSearchHistory,
    BaseDescription,
    BaseCommentThread,
    InfiniteLoading
  },
  data: () => ({
    details: {},
    comments: [],
    nextToken: "",
    history: [],
    url: ""
  }),
  computed: {
    ...mapGetters({
      langCode: "language/langCode",
      isOrder: "order/isOrder",
      isDisplay: "display/isDisplay"
    }),
    videoId() {
      const pattern = new RegExp("(\\?v=)(.*?)(&|$)");
      return this.url.match(pattern)[2];
    }
  },
  watch: {
    details() {
      if (Object.keys(this.details).length) {
        this.registerHistory();
      }
    },
    langCode() {
      this.fetchData();
    },
    isOrder() {
      this.fetchData();
    }
  },
  mounted() {
    this.$nuxt.$on("EVENT_SEND_URL", url => {
      this.url = url;
      this.fetchData();
    });
  },
  beforeMount() {
    this.fetchHistory();
  },
  beforeDestroy() {
    this.$nuxt.$off("EVENT_SEND_URL");
  },
  methods: {
    async fetchData() {
      await this.resetData();
      await this.fetchDescData();
    },
    /**
     * @property {Object} thumbnails
     * @property {Object} standard
     * @property {Object} statistics
     * @property {string} channelTitle
     */
    fetchDescData() {
      Promise.all([
        this.$axios.get(`${API_URL}/videos`, {
          params: {
            part: "snippet",
            id: this.videoId,
            key: API_KEY
          }
        }),
        this.$axios.get(`${API_URL}/videos`, {
          params: {
            part: "statistics",
            id: this.videoId,
            key: API_KEY
          }
        })
      ])
        .then(res => {
          const res01 = res[0].data.items[0].snippet;
          const res02 = res[1].data.items[0].statistics;
          this.details = {
            channelId: res01.channelId,
            channelName: res01.channelTitle,
            description: res01.description,
            videoTitle: res01.title,
            videoThumb: res01.thumbnails.standard.url,
            postTime: res01.publishedAt,
            commentCount: res02.commentCount,
            dislikeCount: res02.dislikeCount,
            likeCount: res02.likeCount,
            viewCount: res02.viewCount
          };
          this.fetchChannelData();
        })
        .catch(error => {
          console.log(error);
        });
    },
    /**
     * @property {string} channelThumb
     * @property {string} subscriberCount
     */
    fetchChannelData() {
      Promise.all([
        this.$axios.get(`${API_URL}/channels`, {
          params: {
            part: "snippet",
            id: this.details.channelId,
            key: API_KEY
          }
        }),
        this.$axios.get(`${API_URL}/channels`, {
          params: {
            part: "statistics",
            id: this.details.channelId,
            key: API_KEY
          }
        })
      ])
        .then(res => {
          const url = res[0].data.items[0].snippet.thumbnails.default.url;
          const subscribe = res[1].data.items[0].statistics.subscriberCount;
          this.$set(this.details, "channelThumb", url);
          this.$set(this.details, "subscribe", subscribe);
        })
        .catch(error => {
          console.log(error);
        });
    },
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
        .get(`${API_URL}/commentThreads`, {
          params: {
            part: "snippet",
            videoId: this.videoId,
            order: this.isOrder,
            maxResults: "10",
            key: API_KEY,
            pageToken: this.nextToken
          }
        })
        .then(res => {
          const commentData = this.comments;
          const items = res.data.items.map((item, index) => {
            const A = item.snippet.topLevelComment.snippet;
            return {
              id: commentData.length + index,
              commentId: item.id,
              postTime: A.publishedAt,
              displayName: A.authorDisplayName,
              thumbUrl: A.authorProfileImageUrl,
              commentText: A.textDisplay,
              channelUrl: A.authorChannelUrl,
              replyCount: item.snippet.totalReplyCount,
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
      this.details = {};
      this.comments = [];
    },
    fetchHistory() {
      const storageData = this.$fetchStorage(STORAGE_KEY);
      this.history = Object.keys(storageData).length ? storageData : [];
    },
    registerHistory() {
      const newHistoryData = [];
      const historyData = this.history;
      const injectData = {
        id: 0,
        url: this.url,
        videoTitle: this.details.videoTitle,
        videoThumb: this.details.videoThumb,
        postTime: this.details.postTime,
        viewCount: this.details.viewCount
      };
      const existSameHistory = historyData.some(item => {
        return item.url === this.url;
      });

      if (!existSameHistory) {
        newHistoryData.push(injectData);
      }

      if (historyData.length) {
        historyData.forEach(item => {
          newHistoryData.push(item);
        });
      }

      if (newHistoryData.length > 5) {
        newHistoryData.splice(newHistoryData.length - 1, 1);
      }

      newHistoryData.map((item, index) => {
        item.id = index;
        return item;
      });

      this.history = newHistoryData;
      this.$saveStorage(STORAGE_KEY, newHistoryData);
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
