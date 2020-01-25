<template>
  <v-expansion-panels flat>
    <v-expansion-panel>
      <v-expansion-panel-header v-slot="{ open }">
        <div class="text-truncate pr-1">
          <v-icon class="mr-2">mdi-translate</v-icon>
          <v-fade-transition>
            <span v-if="open" class="font-weight-bold">TRANSLATION</span>
            <span v-else>{{ translatedText }}</span>
          </v-fade-transition>
        </div>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <div v-html="translatedText" />
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  name: "BaseThreadTransText",
  props: {
    commentText: {
      type: String,
      default: ""
    }
  },
  data: () => ({
    translatedText: "Translated Comment..."
  }),
  mounted() {
    this.translateText("ja");
  },
  methods: {
    async translateText(lang) {
      await this.$axios
        .get(
          "https://script.google.com/macros/s/AKfycbwdZFQgTfb8XwnHBeMrcYs7qL4tXF_jo743iRlUqX-RRpx0dVg/exec",
          {
            params: {
              text: this.commentText,
              source: "",
              target: lang
            }
          }
        )
        .then(res => {
          this.translatedText = res.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
