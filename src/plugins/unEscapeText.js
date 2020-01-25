export default (str, inject) => {
  const unEscapeText = str =>
    str
      .replace(/(&lt;)/g, "<")
      .replace(/(&gt;)/g, ">")
      .replace(/(&quot;)/g, '"')
      .replace(/(&#39;)/g, "'")
      .replace(/(&amp;)/g, "&");

  inject("unEscapeText", unEscapeText);
};
