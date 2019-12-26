<template>
  <main>
    <div class="container">
      <div v-if="data" class="comments">
        <BaseCommentThread v-for="obj in data" :data="obj" :key="obj.id" />
      </div>
    </div>
  </main>
</template>

<script>
import BaseCommentThread from "../components/bases/BaseCommentThread";
export default {
  components: { BaseCommentThread },
  data() {
    return {
      data: null,
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
      this.fetchYouTubeCommentsData();
    });
  },
  beforeDestroy() {
    this.$nuxt.$off("EVENT_SEND_URL");
  },
  methods: {
    async fetchYouTubeCommentsData() {
      const api = await this.$axios.get(
        `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${this.videoId}&maxResults=100&key=${process.env.API_KEY}`
      );
      this.data = api.data.items.map((item, index) => {
        const obj = item.snippet.topLevelComment.snippet;
        obj.id = index;
        return obj;
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
