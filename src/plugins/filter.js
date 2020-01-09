import Vue from "vue";

Vue.filter("toLocaleString", function(value) {
  return Number(value).toLocaleString();
});
