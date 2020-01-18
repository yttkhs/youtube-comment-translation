<template>
  <nav>
    <ul>
      <li>
        <button>a</button>
        <button>b</button>
      </li>
      <li>
        <button @click="openLangList">c</button>
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
