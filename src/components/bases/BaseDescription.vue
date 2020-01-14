<template>
  <div v-if="dataExists">
    <div>
      <a :href="url" target="_blank" rel="noopener">
        <img
          :src="data.snippet.thumbnails.high.url"
          :alt="data.snippet.title"
        />
      </a>
    </div>
    <div>
      <a :href="url" target="_blank" rel="noopener">
        {{ data.snippet.title }}
      </a>
      <div>
        <time>
          <fa :icon="['fas', 'clock']" />{{
            $moment.utc(data.snippet.publishedAt).format("YYYY/MM/DD HH:mm")
          }}
        </time>
        <div>
          <fa :icon="['far', 'eye']" />
          {{ data.statistics.viewCount | toLocaleString }} Views
        </div>
      </div>
      <div>
        <a :href="url" target="_blank" rel="noopener">
          {{ data.snippet.channelTitle }}
        </a>
        <div>{{ data.snippet.description }}</div>
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
      this.resetDescData();
      this.fetchDescData();
    });
  },
  beforeDestroy() {
    this.$nuxt.$off("EVENT_SEND_URL");
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
    },
    resetDescData() {
      this.data = {};
      this.dataExists = 0;
    }
  }
};
</script>
