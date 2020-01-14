<template>
  <nav>
    <ul>
      <li>
        <button><fa :icon="['fas', 'file-alt']" /></button>
        <button><fa :icon="['fas', 'sync-alt']" /></button>
      </li>
      <li>
        <button @click="openLangList">
          <fa :icon="['fas', 'language']" />
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "BaseHeaderNav",
  methods: {
    openLangList() {
      this.$nuxt.$emit("EVENT_OPEN_LANG_LIST", true);
    }
  }
};
</script>
