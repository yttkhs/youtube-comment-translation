<template>
  <v-card>
    <v-list-item>
      <v-list-item-avatar>
        <v-img :src="channelThumb" />
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title v-text="channelName" />
        <v-list-item-subtitle>
          チャンネル登録者 {{ subscribe | toLocaleString }}人
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-img :src="videoThumb" aspect-ratio="2" />
    <v-card-title class="d-block text-truncate">
      {{ videoTitle }}
    </v-card-title>
    <v-card-subtitle>
      {{ viewCount | toLocaleString }} 回視聴・{{
        $moment.utc(`${postTime}`).format("YYYY/MM/DD")
      }}
    </v-card-subtitle>
    <v-card-text class="d-flex align-center">
      <v-icon small class="mr-2">mdi-thumb-up</v-icon>
      <span class="mr-3 body-2">{{ likeCount | toLocaleString }}</span>
      <v-icon small class="mr-2">mdi-thumb-down</v-icon>
      <span class="body-2">{{ dislikeCount | toLocaleString }}</span>
      <v-spacer />
      <v-btn @click="show = !show" icon>
        <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
      </v-btn>
    </v-card-text>
    <v-expand-transition>
      <div v-show="show">
        <v-divider />
        <v-card-text v-html="description" />
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  name: "BaseDescription",
  props: {
    videoThumb: {
      type: String,
      default: ""
    },
    videoTitle: {
      type: String,
      default: "Video Title"
    },
    viewCount: {
      type: String,
      default: "0"
    },
    channelName: {
      type: String,
      default: "Channel Name"
    },
    channelThumb: {
      type: String,
      default: ""
    },
    description: {
      type: String,
      default: "Description"
    },
    postTime: {
      type: String,
      default: ""
    },
    subscribe: {
      type: String,
      default: "0"
    },
    commentCount: {
      type: String,
      default: "0"
    },
    likeCount: {
      type: String,
      default: "0"
    },
    dislikeCount: {
      type: String,
      default: "0"
    }
  },
  data: () => ({
    show: false
  })
};
</script>
