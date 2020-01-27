export const state = () => ({
  langCode: "ja"
});

export const getters = {
  langCode: state => state.langCode
};

export const mutations = {
  changeLang(state, lang) {
    state.langCode = lang;
  }
};
