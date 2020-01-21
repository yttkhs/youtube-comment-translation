<template>
  <v-container>
    <v-row>
      <v-col :cols="7">
        <BaseComments />
      </v-col>
      <v-col :cols="5">
        <BaseDescription
          :videoThumb="data.details.videoThumb"
          :videoTitle="data.details.videoTitle"
          :viewCount="data.details.viewCount"
          :channelName="data.details.channelName"
          :channelThumb="data.details.channelThumb"
          :description="data.details.description"
          :postTime="data.details.postTime"
          :subscribe="data.details.subscribe"
          :commentCount="data.details.commentCount"
          :likeCount="data.details.likeCount"
          :dislikeCount="data.details.dislikeCount"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Qs from "qs";
import BaseComments from "../components/bases/BaseComments";
import BaseDescription from "../components/bases/BaseDescription";

const API_URL = "https://www.googleapis.com/youtube/v3";
const API_KEY = process.env.API_KEY;

export default {
  components: { BaseDescription, BaseComments },
  data: () => ({
    data: {
      details: {},
      comments: [],
      nextToken: ""
    },
    url: ""
  }),
  computed: {
    videoId() {
      const pattern = new RegExp("(\\?v=)(.*?)(&|$)");
      return this.url.match(pattern)[2];
    }
  },
  mounted() {
    this.$nuxt.$on("EVENT_SEND_URL", url => {
      this.url = url;
      this.resetData();
      this.fetchData();
    });
  },
  beforeDestroy() {
    this.$nuxt.$off("EVENT_SEND_URL");
  },
  methods: {
    async fetchData() {
      await this.fetchDescData();
      await this.fetchCmtsData();
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
            id: `${this.videoId}`,
            key: `${API_KEY}`
          }
        }),
        this.$axios.get(`${API_URL}/videos`, {
          params: {
            part: "statistics",
            id: `${this.videoId}`,
            key: `${API_KEY}`
          }
        })
      ])
        .then(res => {
          const res01 = res[0].data.items[0].snippet;
          const res02 = res[1].data.items[0].statistics;
          const items = {
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

          this.$set(this.data, "details", items);
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
            id: `${this.data.details.channelId}`,
            key: `${API_KEY}`
          }
        }),
        this.$axios.get(`${API_URL}/channels`, {
          params: {
            part: "statistics",
            id: `${this.data.details.channelId}`,
            key: `${API_KEY}`
          }
        })
      ])
        .then(res => {
          const url = res[0].data.items[0].snippet.thumbnails.default.url;
          const subscribe = res[1].data.items[0].statistics.subscriberCount;
          this.$set(this.data.details, "channelThumb", url);
          this.$set(this.data.details, "subscribe", subscribe);
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
            videoId: `${this.videoId}`,
            maxResults: "10",
            key: `${API_KEY}`
          },
          paramsSerializer(params) {
            return Qs.stringify(params, {
              get pageToken() {
                if (this.data.nextToken) {
                  return `${this.data.nextToken}`;
                }
              }
            });
          }
        })
        .then(res => {
          const items = res.data.items.map((item, index) => {
            const A = item.snippet.topLevelComment.snippet;
            return {
              id: index,
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

          this.$set(this.data, "comments", items);
          this.$set(this.data, "nextToken", res.data.nextPageToken);

          if (this.data.nextToken) {
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
      this.data.nextToken = "";
      this.data.details = {};
      this.data.comments = [];
    }
  }
};
</script>
