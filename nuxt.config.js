require("dotenv").config();
const { API_KEY } = process.env;

export default {
  mode: "universal",
  srcDir: "src/",
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
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
    "~/plugins/deleteHtmlTags.js"
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
  modules: ["@nuxtjs/style-resources", "@nuxtjs/axios", "@nuxtjs/dotenv"],
  styleResources: {
    scss: ["@/assets/scss/variable.scss"]
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
    API_KEY
  }
};
