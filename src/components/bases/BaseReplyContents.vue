<template>
  <v-expansion-panels flat>
    <v-expansion-panel>
      <v-divider />
      <v-expansion-panel-header v-slot="{ open }">
        <div class="text-truncate pr-1">
          <v-icon class="mr-2">mdi-reply</v-icon>
          <v-fade-transition>
            <span v-if="open" class="font-weight-bold">
              {{ replyCount }} REPLIES
            </span>
            <span v-else>{{ replyCount }} 件のリプライを表示</span>
          </v-fade-transition>
        </div>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        コンテンツ
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  name: "BaseReplyContents",
  props: {
    replyCount: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      data: [],
      nextToken: ""
    };
  }
};
</script>
