require("dotenv").config();
const { API_KEY, GAID } = process.env;

export default {
  mode: "universal",
  srcDir: "src/",
  /*
   ** Headers of the page
   */
  head: {
    title: "YouTube Comment Translation",
    htmlAttrs: {
      lang: "ja"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "YouTubeのコメントを翻訳するWEBサイト"
      },
      {
        hid: "og:site_name",
        property: "og:site_name",
        content: "YouTube Comment Translation"
      },
      { hid: "og:type", property: "og:type", content: "website" },
      {
        hid: "og:url",
        property: "og:url",
        content: "https://youtube-comment-translation.netlify.com/"
      },
      {
        hid: "og:title",
        property: "og:title",
        content: "YouTube Comment Translation"
      },
      {
        hid: "og:description",
        property: "og:description",
        content: "YouTubeのコメントを翻訳するWEBサイト"
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: ["reset.css"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: "~/plugins/infiniteLoading", ssr: false },
    { src: "~/plugins/vuetify.js", ssr: false },
    "~/plugins/filter.js",
    "~/plugins/unEscapeText.js",
    "~/plugins/deleteHtmlTags.js",
    "~/plugins/fetchStorage.js",
    "~/plugins/saveStorage.js"
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    "@nuxtjs/eslint-module",
    // Doc: https://github.com/nuxt-community/stylelint-module
    "@nuxtjs/stylelint-module",
    "@nuxtjs/moment",
    "@nuxtjs/vuetify"
  ],
  moment: {
    locales: ["ja"]
  },
  /*
   ** Nuxt.js modules
   */
  modules: [
    "@nuxtjs/style-resources",
    "@nuxtjs/axios",
    "@nuxtjs/dotenv",
    [
      "@nuxtjs/google-gtag",
      {
        id: GAID
      }
    ]
  ],
  styleResources: {
    scss: ["~/assets/scss/_mixins.scss", "~/assets/scss/_variables.scss"]
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },
  env: {
    API_KEY,
    GAID
  }
};
