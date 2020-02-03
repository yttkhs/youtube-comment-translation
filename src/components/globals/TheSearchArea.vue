<template>
  <v-dialog v-model="search" fullscreen>
    <v-card tile>
      <v-container color="grey darken-3">
        <v-layout align-center="center">
          <v-flex>
            <v-btn @click="closeSearchArea" icon>
              <v-icon>mdi-keyboard-backspace</v-icon>
            </v-btn>
          </v-flex>
          <v-flex style="width: 100%;" class="ml-3">
            <form @submit.prevent="sendURL" autocomplete="off">
              <v-text-field
                v-model="url"
                label="YouTube URL"
                append-icon="mdi-magnify"
                outlined
                hide-details
                dense
                color="#fff"
              />
            </form>
          </v-flex>
        </v-layout>
      </v-container>
      <v-divider />
      <v-list dense>
        <v-list-item-group>
          <v-list-item
            @click="sendHistoryURL(item.videoId)"
            v-for="item in isHistory"
            :key="item.id"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon">mdi-history</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.videoTitle" />
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "TheSearchArea",
  data: () => ({
    search: false,
    url: ""
  }),
  computed: {
    ...mapGetters({
      isHistory: "history/isHistory"
    })
  },
  mounted() {
    this.$nuxt.$on("EVENT_OPEN_SEARCH", () => {
      this.search = true;
    });
  },
  methods: {
    sendURL() {
      const pattern = new RegExp("v=(\\w+)(&|$)");
      const result = pattern.test(this.url);
      if (result) {
        const videoId = this.url.match(pattern)[1];
        this.$nuxt.$emit("EVENT_SEND_URL", videoId);
        this.search = false;
      } else {
        this.$nuxt.$emit("EVENT_URL_ERROR", true);
      }
    },
    sendHistoryURL(videoId) {
      this.$nuxt.$emit("EVENT_SEND_URL", videoId);
      this.search = false;
    },
    closeSearchArea() {
      this.search = false;
    }
  }
};
</script>
