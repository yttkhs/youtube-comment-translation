<template>
  <main>
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
