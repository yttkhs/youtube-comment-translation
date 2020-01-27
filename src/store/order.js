export const state = () => ({
  isOrder: "eval"
});

export const getters = {
  isOrder: state => state.order
};

export const mutations = {
  changeOrder(state, order) {
    state.order = order;
  }
};
