export const state = () => ({
  isHistory: []
});

export const getters = {
  isHistory: state => state.isHistory
};

export const mutations = {
  updateHistory(state, history) {
    state.isHistory = history;
  }
};
