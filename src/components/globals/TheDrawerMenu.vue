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

      <!-- 並び替え -->
      <v-list-group prepend-icon="mdi-swap-vertical">
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>並び替え</v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item-group v-model="order" mandatory>
          <v-list-item value="eval">
            <template v-slot:default="{ active }">
              <v-list-item-action>
                <v-checkbox v-model="active" />
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>評価順</v-list-item-title>
              </v-list-item-content>
            </template>
          </v-list-item>
          <v-list-item value="new">
            <template v-slot:default="{ active }">
              <v-list-item-action>
                <v-checkbox v-model="active" />
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>新しい順</v-list-item-title>
              </v-list-item-content>
            </template>
          </v-list-item>
        </v-list-item-group>
      </v-list-group>

      <v-divider />

      <!-- 言語 -->
      <v-list-group prepend-icon="mdi-translate">
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>言語</v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item-group v-model="language" mandatory>
          <v-list-item v-for="val in langData" :key="val.id" :value="val.lang">
            <template v-slot:default="{ active }">
              <v-list-item-action>
                <v-checkbox v-model="active" />
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ val.name }}</v-list-item-title>
              </v-list-item-content>
            </template>
          </v-list-item>
        </v-list-item-group>
      </v-list-group>

      <v-divider />

      <!-- 表示切り替え -->
      <v-list-group prepend-icon="mdi-dip-switch" value="true">
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>表示切り替え</v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item-group v-model="display" mandatory>
          <v-list-item value="all">
            <template v-slot:default="{ active }">
              <v-list-item-action>
                <v-checkbox v-model="active" />
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>全て</v-list-item-title>
              </v-list-item-content>
            </template>
          </v-list-item>
          <v-list-item value="orig">
            <template v-slot:default="{ active }">
              <v-list-item-action>
                <v-checkbox v-model="active" />
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>原文</v-list-item-title>
              </v-list-item-content>
            </template>
          </v-list-item>
          <v-list-item value="trans">
            <template v-slot:default="{ active }">
              <v-list-item-action>
                <v-checkbox v-model="active" />
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>翻訳</v-list-item-title>
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
      { id: "0", lang: "ja", name: "日本語" },
      { id: "1", lang: "en", name: "英語" }
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
