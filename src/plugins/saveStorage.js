export default ({ app }, inject) => {
  const saveStorage = (key, data) =>
    localStorage.setItem(key, JSON.stringify(data));
  inject("saveStorage", saveStorage);
};
