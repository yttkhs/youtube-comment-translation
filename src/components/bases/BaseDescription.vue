<template>
  <v-container>
    <v-row>
      <v-col :cols="8">
        <v-sheet dark elevation="5">
          <v-container>
            <v-row align="start">
              <v-col :cols="5">
                <v-img :src="videoThumb" aspect-ratio="1.4" />
              </v-col>
              <v-col :cols="7">comment</v-col>
            </v-row>
          </v-container>
        </v-sheet>
      </v-col>
      <v-col :cols="4">
        <v-sheet dark elevation="5">name</v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "BaseDescription",
  props: {
    videoThumb: {
      type: String,
      default: String
    }
  }
};
</script>
