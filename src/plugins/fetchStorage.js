export default ({ app }, inject) => {
  const fetchStorage = key => JSON.parse(localStorage.getItem(key) || "{}");
  inject("fetchStorage", fetchStorage);
};
