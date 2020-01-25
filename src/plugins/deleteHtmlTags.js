export default (str, inject) => {
  const deleteHtmlTags = str => str.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, "");
  inject("deleteHtmlTags", deleteHtmlTags);
};
