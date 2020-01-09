<template>
  <main class="Container">
    <ModalTransLangList />
    <BaseDescription />
    <BaseComments />
  </main>
</template>

<script>
import BaseComments from "../components/bases/BaseComments";
import BaseDescription from "../components/bases/BaseDescription";
import ModalTransLangList from "../components/modals/ModalTransLangList";

export default {
  components: { ModalTransLangList, BaseDescription, BaseComments }
};
</script>

<style scoped lang="scss">
.Container {
  max-width: $WIDTH_CONTENTS;
  width: 100%;
  min-height: calc(100vh - #{$HEIGHT_HEADER});
  margin-top: $HEIGHT_HEADER;
  margin-left: auto;
  margin-right: auto;
  padding: 20px;
}
</style>
