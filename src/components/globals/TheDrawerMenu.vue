<template>
  <v-navigation-drawer
    :value="value"
    @input="$emit('input', $event)"
    app
    clipped
  />
</template>

<script>
export default {
  name: "TheDrawerMenu",
  props: {
    value: {
      type: null,
      default: null
    }
  }
};
</script>
