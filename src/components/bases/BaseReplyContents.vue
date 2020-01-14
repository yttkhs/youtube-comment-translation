<template>
  <div>
    <BaseReplyThread
      v-for="{ id, snippet, uid } in data"
      :data="snippet"
      :id="id"
      :key="uid"
    />
    <InfiniteLoading @infinite="fetchReplyData" spinner="circles">
      <span slot="no-more" />
      <span slot="no-results" />
    </InfiniteLoading>
  </div>
</template>

<script>
import InfiniteLoading from "vue-infinite-loading";
import BaseReplyThread from "./BaseReplyThread";

const API_URL = "https://www.googleapis.com/youtube/v3";
const API_KEY = process.env.API_KEY;

export default {
  name: "BaseReplyContents",
  components: { BaseReplyThread, InfiniteLoading },
  props: {
    parentId: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      data: [],
      nextToken: ""
    };
  },
  methods: {
    async fetchReplyData($state) {
      const params = () => {
        const obj = {
          part: "snippet",
          parentId: `${this.parentId}`,
          maxResults: "10",
          key: `${API_KEY}`
        };

        if (this.nextToken !== undefined) obj.pageToken = `${this.nextToken}`;
        return obj;
      };

      await this.$axios
        .get(`${API_URL}/comments`, {
          params: params()
        })
        .then(res => {
          if (this.nextToken !== undefined) {
            const data = res.data.items.map((item, index) => {
              const obj = item;
              obj.uid = this.data.length + index;
              return obj;
            });
            data.forEach(item => {
              this.data.push(item);
            });
            this.nextToken = res.data.nextPageToken;
            $state.loaded();
          } else {
            $state.complete();
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
