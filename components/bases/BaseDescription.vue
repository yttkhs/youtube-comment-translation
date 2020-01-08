<template>
  <div v-if="dataExists" class="Description">
    <div class="Description__thumb">
      <a :href="url" target="_blank" rel="noopener">
        <img
          :src="data.snippet.thumbnails.high.url"
          :alt="data.snippet.title"
        />
      </a>
    </div>
    <div class="Description__contents">
      <a :href="url" class="Description__title" target="_blank" rel="noopener">
        {{ data.snippet.title }}
      </a>
      <div class="Description__top">
        <time class="Description__time">
          <fa :icon="['fas', 'clock']" />{{
            $moment.utc(data.snippet.publishedAt).format("YYYY/MM/DD HH:mm")
          }}
        </time>
        <div class="Description__views">
          <fa :icon="['far', 'eye']" />
          {{ data.statistics.viewCount | toLocaleString }} Views
        </div>
      </div>
      <div class="Description__bottom">
        <a
          :href="url"
          class="Description__channel"
          target="_blank"
          rel="noopener"
        >
          {{ data.snippet.channelTitle }}
        </a>
        <div class="Description__comments">{{ data.snippet.description }}</div>
      </div>
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
  padding: 20px 15px;
  box-shadow: var(--box-shadow);
  border-radius: 3px;

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

  &__top {
    display: flex;
    margin-top: 10px;
  }

  &__time {
    color: var(--color-gray);
    font-size: 1.3rem;
    line-height: 1.8rem;

    svg {
      margin-right: 5px;
    }
  }

  &__views {
    color: var(--color-gray);
    font-size: 1.3rem;
    line-height: 1.8rem;
    margin-left: 15px;

    svg {
      margin-right: 5px;
    }
  }

  &__bottom {
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px dashed var(--color-gray);
  }

  &__channel {
    color: var(--color-text);
    font-size: 1.3rem;
    line-height: 1.8rem;
    text-decoration: none;
  }

  &__comments {
    margin-top: 5px;
    color: var(--color-gray);
    font-size: 1.2rem;
    line-height: 1.6rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
}
</style>
