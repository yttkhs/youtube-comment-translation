<template>
  <v-expansion-panels flat>
    <v-expansion-panel>
      <v-expansion-panel-header v-slot="{ open }">
        <div class="text-truncate pr-1">
          <v-icon class="mr-2">mdi-tooltip-text-outline</v-icon>
          <span v-if="open" class="font-weight-bold">ORIGINAL</span>
          <span v-else>{{ commentText }}</span>
        </div>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <div v-html="commentText" />
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  name: "BaseThreadOrigText",
  props: {
    commentText: {
      type: String,
      default: "comment text..."
    }
  }
};
</script>
