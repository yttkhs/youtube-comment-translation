<template>
  <div v-if="dataExists" class="Description">
    <div class="Description__thumb">
      <a :href="url">
        <img
          :src="data.snippet.thumbnails.high.url"
          :alt="data.snippet.title"
        />
      </a>
    </div>
    <div class="Description__contents">
      <a :href="url" class="Description__title">{{ data.snippet.title }}</a>
      <div class="Description__info">
        <time class="Description__time">
          {{ $moment.utc(data.snippet.publishedAt).format("YYYY/MM/DD HH:mm") }}
        </time>
        <div class="Description__views">
          {{ data.statistics.viewCount | toLocaleString }} Views
        </div>
      </div>
      <div class="Description__comments">{{ data.snippet.description }}</div>
    </div>
  </div>
</template>

<script>
const API_URL = "https://www.googleapis.com/youtube/v3";
const API_KEY = process.env.API_KEY;

export default {
  name: "BaseDescription",
  filters: {
    toLocaleString(value) {
      return value.toLocaleString();
    }
  },
  data() {
    return {
      data: {},
      dataExists: 0,
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
          this.dataExists = Object.keys(this.data).length;
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
  padding-bottom: 20px;
  border-bottom: 1px solid var(--color-gray);

  &__thumb {
    max-width: 200px;
    width: 100%;

    img {
      width: 100%;
      height: auto;
      vertical-align: middle;
    }
  }

  &__contents {
    flex: 1;
    margin-left: 20px;
  }

  &__title {
    font-size: 1.6rem;
    line-height: 2.4rem;
    text-decoration: none;
    color: var(--color-text);
  }

  &__info {
    display: flex;
    margin-top: 10px;
  }

  &__time {
    color: var(--color-gray);
    font-size: 1.3rem;
    line-height: 1.8rem;
  }

  &__views {
    color: var(--color-gray);
    font-size: 1.3rem;
    line-height: 1.8rem;
    margin-left: 10px;
  }

  &__comments {
    color: var(--color-text);
    font-size: 1.2rem;
    line-height: 1.6rem;
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid var(--color-gray);
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }
}
</style>
