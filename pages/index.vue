<template>
  <main>
    <div class="container">
      <div v-if="data.length" class="comments">
        <BaseCommentThread
          v-for="{ id, snippet, reply, uid } in data"
          :data="snippet"
          :reply="reply"
          :id="id"
          :key="uid"
        />
        <InfiniteLoading @infinite="fetchCmtsData" />
      </div>
    </div>
  </main>
</template>

<script>
import InfiniteLoading from "vue-infinite-loading";
import BaseCommentThread from "../components/bases/BaseCommentThread";

const API_URL = "https://www.googleapis.com/youtube/v3";
const API_KEY = process.env.API_KEY;

export default {
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
      const s = "?v=";
      return this.url.substring(
        this.url.indexOf(s) + s.length,
        this.url.length
      );
    }
  },
  mounted() {
    this.$nuxt.$on("EVENT_SEND_URL", url => {
      this.url = url;
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

        if (this.nextToken !== undefined) {
          obj.pageToken = `${this.nextToken}`;
        }

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
              obj.uid = this.data.length + index;
              obj.reply = item.snippet.totalReplyCount;
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
    }
  }
};
</script>

<style scoped lang="scss">
main {
  max-width: $WIDTH_CONTENTS;
  width: 100%;
  min-height: 100vh;
  margin-top: $HEIGHT_HEADER;
  margin-left: auto;
  margin-right: auto;
  padding: 20px;
}
</style>
