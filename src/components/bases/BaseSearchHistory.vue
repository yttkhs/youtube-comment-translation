<template>
  <div class="SearchHistory">
    <v-card
      @click="sendURL(item.videoId)"
      v-for="item in isHistory"
      :key="item.id"
      class="SearchHistoryItem"
      style="overflow: hidden"
    >
      <v-layout>
        <v-flex xs4 class="SearchHistoryItem__thumb">
          <v-img :src="item.videoThumb" />
        </v-flex>
        <v-flex xs8 class="pa-2 d-block text-truncate">
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
import { mapGetters } from "vuex";

export default {
  name: "BaseSearchHistory",
  computed: {
    ...mapGetters({
      isHistory: "history/isHistory"
    })
  },
  methods: {
    sendURL(videoId) {
      this.$nuxt.$emit("EVENT_SEND_URL", videoId);
    }
  }
};
</script>

<style lang="scss" scoped>
.SearchHistoryItem {
  &:not(:first-of-type) {
    margin-top: 10px;
  }

  &__thumb {
    border-radius: 10px 0 0 10px;
  }
}
</style>
