<template>
  <main>
    <form @submit.prevent="fetchYouTubeCommentsData">
      <label>
        <input v-model="url" type="text" />
        <button @click="fetchYouTubeCommentsData">FETCH</button>
      </label>
    </form>
    <ul v-if="data">
      <li v-for="item in data">{{ item.authorDisplayName }}</li>
    </ul>
  </main>
</template>

<script>
export default {
  data() {
    return {
      data: null,
      url: ""
    };
  },
  computed: {
    videoId() {
      const tgtString = "?v=";
      return this.url.substring(
        this.url.indexOf(tgtString) + tgtString.length,
        this.url.length
      );
    }
  },
  methods: {
    async fetchYouTubeCommentsData() {
      const api = await this.$axios.get(
        `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${this.videoId}&key=${process.env.API_KEY}`
      );
      this.data = api.data.items.map(
        (item) => item.snippet.topLevelComment.snippet
      );
    }
  }
};
</script>

<style scoped lang="scss">
main {
  background-color: var(--color-base);
  margin-top: $HEIGHT_HEADER;
  height: 100vh;
}
</style>
