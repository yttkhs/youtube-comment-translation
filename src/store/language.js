export const state = () => ({
  langCode: "en"
});

export const mutations = {
  changeLang(state, lang) {
    state.langCode = lang;
  }
};
