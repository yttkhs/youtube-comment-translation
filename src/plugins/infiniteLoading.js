import Vue from "vue";
import InfiniteLoading from "vue-infinite-loading";

Vue.component("infinite-loading", InfiniteLoading);

Vue.use(InfiniteLoading, {
  props: {
    spinner: "spiral"
  },
  slots: {
    noResults: "",
    noMore: ""
  },
  system: {
    throttleLimit: 50
  }
});
