<template>
  <v-container>
    <BaseUrlErrorDialog />
    <BaseFetchErrorDialog />
    <v-layout class="Container">
      <v-flex v-if="!videoId.length" class="Explanation">
        <TheExplanationScreen />
      </v-flex>
      <v-flex v-else class="Comments">
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
        <infinite-loading ref="InfiniteLoading" @infinite="fetchCmtsData">
          <div slot="no-more" />
          <div slot="no-results" />
        </infinite-loading>
      </v-flex>
      <v-flex v-show="history.length" class="Sidebar">
        <BaseDescription
          v-if="videoId.length"
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
import TheExplanationScreen from "../components/globals/TheExplanationScreen";
import BaseUrlErrorDialog from "../components/bases/BaseUrlErrorDialog";
import BaseFetchErrorDialog from "../components/bases/BaseFetchErrorDialog";

const API_URL = "https://www.googleapis.com/youtube/v3";
const API_KEY = process.env.API_KEY;
const STORAGE_KEY = "YOUTUBE_TRANS_COMMENT";

export default {
  components: {
    BaseFetchErrorDialog,
    BaseUrlErrorDialog,
    TheExplanationScreen,
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
    error: false,
    videoId: ""
  }),
  computed: {
    ...mapGetters({
      langCode: "language/langCode",
      isOrder: "order/isOrder",
      isDisplay: "display/isDisplay"
    })
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
    this.$nuxt.$on("EVENT_SEND_URL", videoId => {
      this.videoId = videoId;
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
        .catch(() => {
          $state.complete();
          this.$nuxt.$emit("EVENT_FETCH_ERROR", true);
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
        videoId: this.videoId,
        videoTitle: this.details.videoTitle,
        videoThumb: this.details.videoThumb,
        postTime: this.details.postTime,
        viewCount: this.details.viewCount
      };
      const existSameHistory = historyData.some(item => {
        return item.videoId === this.videoId;
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
.Container {
  @include MQ("xs") {
    flex-wrap: wrap;
  }
}

.CommentsThread {
  &:not(:first-of-type) {
    margin-top: 10px;
  }
}

.Explanation {
  order: 1;

  @include MQ("xs") {
    margin: 0 0 10px 0;
  }
}

.Comments {
  width: calc((100% / 12) * 8);
  order: 2;

  @include MQ("xs") {
    margin: 10px 0 0 0;
    order: 3;
  }
}

.Sidebar {
  width: calc(((100% / 12) * 4) - 10px);
  margin: 0 0 0 10px;
  order: 3;

  @include MQ("xs") {
    width: 100%;
    margin: 0;
    order: 2;
  }
}
</style>
