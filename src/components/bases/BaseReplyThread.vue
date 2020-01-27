<template>
  <v-card outlined>
    <v-list-item>
      <v-list-item-avatar>
        <v-img :src="thumbUrl" />
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>{{ displayName }}</v-list-item-title>
        <v-list-item-subtitle>
          {{ $moment.utc(`${postTime}`).format("YYYY/MM/DD") }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <BaseThreadOrigText v-show="display.origText" :commentText="commentText" />
    <BaseThreadTransText
      v-show="display.transText"
      :commentText="commentText"
    />
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import BaseThreadOrigText from "./BaseThreadOrigText";
import BaseThreadTransText from "./BaseThreadTransText";

export default {
  name: "BaseReplyThread",
  components: { BaseThreadTransText, BaseThreadOrigText },
  props: {
    displayName: {
      type: String,
      default: "User Name"
    },
    thumbUrl: {
      type: String,
      default: ""
    },
    postTime: {
      type: String,
      default: "0000-00-00T00:00:00.000Z"
    },
    commentText: {
      type: String,
      default: ""
    },
    commentId: {
      type: String,
      default: ""
    }
  },
  data: () => ({
    display: {
      origText: true,
      transText: true
    }
  }),
  computed: {
    ...mapGetters({
      isDisplay: "display/isDisplay"
    })
  },
  watch: {
    isDisplay() {
      this.displayText();
    }
  },
  mounted() {
    this.displayText();
  },
  methods: {
    displayText() {
      switch (this.isDisplay) {
        case "all":
          this.display.origText = true;
          this.display.transText = true;
          break;
        case "orig":
          this.display.origText = true;
          this.display.transText = false;
          break;
        case "trans":
          this.display.origText = false;
          this.display.transText = true;
          break;
      }
    }
  }
};
</script>
