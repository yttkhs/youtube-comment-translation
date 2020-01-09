<template>
  <div @click.self="closeModal" v-show="open" class="LangList">
    <ul>
      <li v-for="item in lang">
        <ButtonLangList :name="item.name" :code="item.code" :key="item.id" />
      </li>
    </ul>
  </div>
</template>

<script>
import ButtonLangList from "../button/ButtonLangList";
export default {
  name: "ModalTransLangList",
  components: { ButtonLangList },
  data() {
    return {
      lang: [
        { id: 1, name: "日本語", code: "ja" },
        { id: 2, name: "スペイン", code: "es" },
        { id: 3, name: "中国語", code: "zh" },
        { id: 4, name: "英語", code: "en" },
        { id: 5, name: "フランス語", code: "fr" },
        { id: 6, name: "ドイツ語", code: "de" },
        { id: 7, name: "ヒンディー語", code: "hi" },
        { id: 8, name: "ハンガリー語", code: "hu" },
        { id: 9, name: "イタリア語", code: "it" },
        { id: 10, name: "韓国語", code: "ko" },
        { id: 11, name: "ラテン語", code: "la" },
        { id: 12, name: "モンゴル語", code: "mn" },
        { id: 12, name: "トルコ語", code: "tr" }
      ],
      open: false
    };
  },
  mounted() {
    this.$nuxt.$on("EVENT_OPEN_LANG_LIST", val => {
      this.open = val;
    });
  },
  beforeDestroy() {
    this.$nuxt.$off("EVENT_OPEN_LANG_LIST");
  },
  methods: {
    closeModal() {
      this.open = false;
    }
  }
};
</script>

<style scoped lang="scss">
.LangList {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;

  ul {
    position: absolute;
    top: $HEIGHT_HEADER + 20px;
    right: 20px;
    width: 200px;
    background-color: var(--color-header);
    box-shadow: var(--box-shadow);
    border-radius: 2px;
    height: 300px;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      width: 10px;
    }

    &::-webkit-scrollbar-track {
      background: var(--color-header);
      border-left: solid 1px var(--color-base);
    }

    &::-webkit-scrollbar-thumb {
      background: var(--color-gray);
      border-radius: 10px;
      border: 1px solid var(--color-header);
    }

    li {
      &:not(:first-of-type) {
        border-top: 1px solid var(--color-base);
      }
    }
  }
}
</style>
