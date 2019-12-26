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
  --color-text: #{$COLOR_BLACK};
  --color-gray: #606060;
  --color-blue: #065fd4;
  font-size: 10px;

  @media (prefers-color-scheme: dark) {
    --color-header: #{$COLOR_DARK_GRAY};
    --color-base: #{$COLOR_BLACK};
    --color-text: #{$COLOR_WHITE};
    --color-gray: #888888;
    --color-blue: #3ea6ff;
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
  background-color: var(--color-base);
  color: var(--color-text);
}
</style>
