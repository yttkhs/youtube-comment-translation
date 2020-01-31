<template>
  <v-dialog v-model="error" persistent max-width="600">
    <v-alert prominent type="error" class="ma-0">
      <v-row align="center">
        <v-col class="grow">
          URLが間違っているか、正しく入力されていません。<br />
          もう一度、URLを入力してください。
        </v-col>
        <v-col class="shrink">
          <v-btn @click="closeDialog">OK</v-btn>
        </v-col>
      </v-row>
    </v-alert>
  </v-dialog>
</template>

<script>
export default {
  name: "BaseUrlErrorDialog",
  data: () => ({
    error: false
  }),
  mounted() {
    this.$nuxt.$on("EVENT_URL_ERROR", value => {
      this.error = value;
    });
  },
  methods: {
    closeDialog() {
      this.error = false;
    }
  }
};
</script>
