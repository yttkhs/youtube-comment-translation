<template>
  <div class="Description">
    <div class="Description__thumb">
      <img :src="data.snippet.thumbnails.high.url" :alt="data.snippet.title" />
    </div>
  </div>
</template>

<script>
const API_URL = "https://www.googleapis.com/youtube/v3";
const API_KEY = process.env.API_KEY;

export default {
  name: "BaseDescription",
  data() {
    return {
      data: {},
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
      this.fetchDescData();
    });
  },
  methods: {
    async fetchDescData() {
      await Promise.all([
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
          this.data.snippet = res[0].data.items[0].snippet;
          this.data.statistics = res[1].data.items[0].statistics;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped lang="scss">
.Description {
  display: flex;

  &__thumb {
    max-width: 200px;
    width: 100%;

    img {
      width: 100%;
      height: auto;
      vertical-align: middle;
    }
  }

  &__info {
    flex: 1;
    margin-left: 20px;
  }

  &__title {
    font-size: 1.6rem;
    line-height: 2.4rem;
    text-decoration: none;
    color: var(--color-text);
  }
}
</style>
