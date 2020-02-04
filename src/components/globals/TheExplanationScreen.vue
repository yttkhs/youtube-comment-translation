<template>
  <v-card>
    <v-card-subtitle>このサイトについて</v-card-subtitle>
    <v-card-text>
      YouTubeのコメントを変換するだけのWEBサイトです。<br />
      変換したいYouTubeの動画のURLを検索してください。（※動画の共有用URLでは検索できません。）<br />
    </v-card-text>
    <v-card-subtitle>設定について</v-card-subtitle>
    <v-card-text>
      左の歯車のアイコンから各種設定ができます。<br />
      「言語」と「並び替え」の設定を変更すると、コメントを再度読み込みます。
    </v-card-text>
    <v-card-subtitle>その他</v-card-subtitle>
    <v-card-text>
      不具合や要望はこちらまで
      <a href="https://twitter.com/imatchapro" target="_blank" rel="noopener">
        @imatchapro
      </a>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "TheExplanationScreen"
};
</script>
