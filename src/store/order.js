export const state = () => ({
  isOrder: "relevance"
});

export const getters = {
  isOrder: state => state.isOrder
};

export const mutations = {
  changeOrder(state, order) {
    state.isOrder = order;
  }
};
