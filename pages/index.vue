<template>
  <main>
    <BaseDescription />
    <BaseComments />
  </main>
</template>

<script>
import BaseComments from "../components/bases/BaseComments";
import BaseDescription from "../components/bases/BaseDescription";

export default {
  components: { BaseDescription, BaseComments }
};
</script>

<style scoped lang="scss">
main {
  max-width: $WIDTH_CONTENTS;
  width: 100%;
  min-height: 100vh;
  margin-top: $HEIGHT_HEADER;
  margin-left: auto;
  margin-right: auto;
  padding: 20px;
}
</style>
