<template>
  <header class="TheHeader">
    <h1 class="TheHeader__logo">YOUTUBE COMMENT TRANSLATION</h1>
  </header>
</template>

<script>
export default {
  name: "TheHeader"
};
</script>

<style scoped lang="scss">
.TheHeader {
  background-color: var(--color-header);
  padding: 10px 20px;
  display: flex;
  align-items: center;
  height: $HEIGHT_HEADER;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;

  &__logo {
    font-size: 12px;
    letter-spacing: 0.1em;
    line-height: 100%;
    color: $COLOR_YOUTUBE;
  }
}
</style>
