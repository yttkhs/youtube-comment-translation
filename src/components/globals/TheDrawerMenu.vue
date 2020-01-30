<template>
  <v-navigation-drawer
    :value="value"
    @input="$emit('input', $event)"
    app
    clipped
  >
    <v-list>
      <v-subheader>SETTING</v-subheader>

      <v-divider />

      <!-- 言語 -->
      <v-list-group prepend-icon="mdi-translate">
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>言語</v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item-group v-model="language" mandatory>
          <v-list-item
            v-for="item in langData"
            :key="item.id"
            :value="item.value"
          >
            <template v-slot:default="{ active }">
              <v-list-item-action>
                <v-checkbox v-model="active" />
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title v-text="item.label" />
              </v-list-item-content>
            </template>
          </v-list-item>
        </v-list-item-group>
      </v-list-group>

      <v-divider />

      <!-- 並び替え -->
      <v-list-group prepend-icon="mdi-swap-vertical">
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>並び替え</v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item-group v-model="order" mandatory>
          <v-list-item
            v-for="item in orderData"
            :value="item.value"
            :key="item.id"
          >
            <template v-slot:default="{ active }">
              <v-list-item-action>
                <v-checkbox v-model="active" />
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title v-text="item.label" />
              </v-list-item-content>
            </template>
          </v-list-item>
        </v-list-item-group>
      </v-list-group>

      <v-divider />

      <!-- 表示切り替え -->
      <v-list-group prepend-icon="mdi-dip-switch">
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>表示切り替え</v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item-group v-model="display" mandatory>
          <v-list-item
            v-for="item in displayData"
            :key="item.id"
            :value="item.value"
          >
            <template v-slot:default="{ active }">
              <v-list-item-action>
                <v-checkbox v-model="active" />
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title v-text="item.label" />
              </v-list-item-content>
            </template>
          </v-list-item>
        </v-list-item-group>
      </v-list-group>

      <v-divider />
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "TheDrawerMenu",
  props: {
    value: {
      type: null,
      default: null
    }
  },
  data: () => ({
    langData: [
      { id: 0, value: "ja", label: "日本語" },
      { id: 1, value: "en", label: "英語" },
      { id: 2, value: "zh", label: "中国語" },
      { id: 3, value: "ko", label: "韓国語" },
      { id: 4, value: "fr", label: "フランス語" },
      { id: 5, value: "de", label: "ドイツ語" },
      { id: 6, value: "es", label: "スペイン語" }
    ],
    orderData: [
      { id: 0, value: "relevance", label: "評価順" },
      { id: 1, value: "time", label: "新しい順" }
    ],
    displayData: [
      { id: 0, value: "all", label: "全て" },
      { id: 1, value: "orig", label: "原文" },
      { id: 2, value: "trans", label: "翻訳" }
    ]
  }),
  computed: {
    ...mapGetters({
      langCode: "language/langCode",
      isOrder: "order/isOrder",
      isDisplay: "display/isDisplay"
    }),
    language: {
      get() {
        return this.langCode;
      },
      set(value) {
        this.changeLang(value);
      }
    },
    order: {
      get() {
        return this.isOrder;
      },
      set(value) {
        this.changeOrder(value);
      }
    },
    display: {
      get() {
        return this.isDisplay;
      },
      set(value) {
        this.changeDisplay(value);
      }
    }
  },
  methods: {
    ...mapMutations({
      changeLang: "language/changeLang",
      changeOrder: "order/changeOrder",
      changeDisplay: "display/changeDisplay"
    })
  }
};
</script>
