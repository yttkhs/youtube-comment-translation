<template>
  <div v-if="data.length" class="Comments">
    <BaseCommentThread
      v-for="{ id, snippet, reply, uid } in data"
      :data="snippet"
      :reply="reply"
      :id="id"
      :key="uid"
    />
    <InfiniteLoading ref="InfiniteLoading" @infinite="fetchCmtsData" />
  </div>
</template>

<script>
import InfiniteLoading from "vue-infinite-loading";
import BaseCommentThread from "./BaseCommentThread";

const API_URL = "https://www.googleapis.com/youtube/v3";
const API_KEY = process.env.API_KEY;

export default {
  name: "BaseComments",
  components: { BaseCommentThread, InfiniteLoading },
  data() {
    return {
      data: [],
      nextToken: "",
      url: ""
    };
  },
  computed: {
    videoId() {
      const pattern = new RegExp("(\\?v=)(.*?)(&|$)");
      return this.url.match(pattern)[2];
    }
  },
  mounted() {
    this.$nuxt.$on("EVENT_SEND_URL", url => {
      this.url = url;
      this.resetCmtsData();
      this.fetchCmtsData();
    });
  },
  beforeDestroy() {
    this.$nuxt.$off("EVENT_SEND_URL");
  },
  methods: {
    async fetchCmtsData($state) {
      const params = () => {
        const obj = {
          part: "snippet",
          videoId: `${this.videoId}`,
          maxResults: "10",
          key: `${API_KEY}`
        };

        if (this.nextToken !== undefined) obj.pageToken = `${this.nextToken}`;
        return obj;
      };

      await this.$axios
        .get(`${API_URL}/commentThreads`, {
          params: params()
        })
        .then(res => {
          if (this.nextToken !== undefined) {
            const data = res.data.items.map((item, index) => {
              const obj = item.snippet.topLevelComment;
              obj.reply = item.snippet.totalReplyCount;
              obj.uid = this.data.length + index;
              return obj;
            });
            data.forEach(item => {
              this.data.push(item);
            });
            this.nextToken = res.data.nextPageToken;
            $state.loaded();
          } else {
            $state.complete();
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    resetCmtsData() {
      if (this.$refs.InfiniteLoading) {
        this.$refs.InfiniteLoading.stateChanger.reset();
      }
      this.nextToken = "";
      this.data = [];
    }
  }
};
</script>

<style scoped lang="scss">
.Comments {
  margin-top: 50px;
}
</style>
