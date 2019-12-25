<template>
  <div>
    <TheHeader />
    <nuxt />
  </div>
</template>

<script>
import TheHeader from "../components/globals/TheHeader";
export default {
  components: { TheHeader }
};
</script>

<style lang="scss">
:root {
  --color-header: #{$COLOR_WHITE};
  --color-base: #{$COLOR_LIGHT_GRAY};

  @media (prefers-color-scheme: dark) {
    --color-header: #{$COLOR_DARK_GRAY};
    --color-base: #{$COLOR_BLACK};
  }
}

*,
*:before,
*:after {
  margin: 0;
  box-sizing: border-box;
}

body {
  -webkit-text-size-adjust: none;
}
</style>
