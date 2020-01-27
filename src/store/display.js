export const state = () => ({
  isDisplay: "all"
});

export const getters = {
  isDisplay: state => state.isDisplay
};

export const mutations = {
  changeDisplay(state, display) {
    state.isDisplay = display;
  }
};
