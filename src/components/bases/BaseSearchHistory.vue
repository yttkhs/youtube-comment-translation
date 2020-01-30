<template>
  <div class="SearchHistory">
    <v-card
      @click="sendURL(item.url)"
      v-for="item in history"
      :key="item.id"
      class="SearchHistoryItem"
    >
      <v-layout>
        <v-flex md4 sm4>
          <v-img :src="item.videoThumb" />
        </v-flex>
        <v-flex class="pa-2 d-block text-truncate">
          <div class="body-2 d-block text-truncate">
            {{ item.videoTitle }}
          </div>
          <div class="caption d-block text-truncate">
            {{ item.viewCount | toLocaleString }} 回視聴・{{
              $moment.utc(`${item.postTime}`).format("YYYY/MM/DD")
            }}
          </div>
        </v-flex>
      </v-layout>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "BaseSearchHistory",
  props: {
    history: {
      type: Array,
      default: Array
    }
  },
  methods: {
    sendURL(url) {
      this.$nuxt.$emit("EVENT_SEND_URL", url);
    }
  }
};
</script>

<style lang="scss" scoped>
.SearchHistory {
  margin-top: 10px;
}

.SearchHistoryItem {
  &:not(:first-of-type) {
    margin-top: 10px;
  }
}
</style>
