<template>
  <div>
    <a :href="url" target="_blank" rel="noopener">
      {{ name }}
    </a>
    <time>
      {{ $moment.utc(time).format("YYYY/MM/DD HH:mm") }}
    </time>
  </div>
</template>

<script>
export default {
  name: "BaseThreadHeader",
  props: {
    url: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: ""
    },
    time: {
      type: String,
      default: ""
    }
  }
};
</script>
