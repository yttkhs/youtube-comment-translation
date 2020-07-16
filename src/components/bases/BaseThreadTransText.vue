<template>
  <v-expansion-panels flat>
    <v-expansion-panel>
      <v-expansion-panel-header v-slot="{ open }">
        <div class="text-truncate pr-1">
          <v-icon class="mr-2">mdi-translate</v-icon>
          <v-fade-transition>
            <span v-if="open" class="font-weight-bold">TRANSLATION</span>
            <span v-else>{{ headingText }}</span>
          </v-fade-transition>
        </div>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <div v-html="letterBody" />
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "BaseThreadTransText",
  props: {
    commentText: {
      type: String,
      default: ""
    }
  },
  data: () => ({
    headingText: "Translated Comment...",
    letterBody: "Translated Comment..."
  }),
  computed: {
    ...mapGetters({
      langCode: "language/langCode"
    })
  },
  mounted() {
    this.translateText(this.langCode);
  },
  methods: {
    async translateText(lang) {
      const params = new URLSearchParams({
        text: this.$unEscapeText(this.commentText),
        source: "",
        target: lang
      });

      await fetch(
        `https://script.google.com/macros/s/AKfycbwdZFQgTfb8XwnHBeMrcYs7qL4tXF_jo743iRlUqX-RRpx0dVg/exec?${params}`,
        {
          origin: "https://youtube-comment-translation.netlify.app/",
          method: "GET",
          headers: {
            "Content-Type": "text/plain; charset=utf-8"
          }
        }
      )
        .then(res => {
          console.log(res);
          this.headingText = this.$deleteHtmlTags(res.body);
          this.letterBody = res.body;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
