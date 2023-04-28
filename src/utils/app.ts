const addMaximumScaleToMetaViewport = () => {
  const el = document.querySelector("meta[name='viewport']");

  if (!el) return null;

  let content = el.getAttribute("content");

  if (!content) return null;

  const re = /maximum-scale=[0-9.]+/g;

  if (re.test(content)) {
    content = content.replace(re, "maximum-scale=1.0");
  } else {
    // content += ", maximum-scale=1.0"
    content = [content, "maximum-scale=1.0"].join(", ");
  }

  el.setAttribute("content", content);
};

export const disableIosTextFieldZoom = addMaximumScaleToMetaViewport;

export const checkIsIOS = () =>
  [
    "iPad Simulator",
    "iPhone Simulator",
    "iPod Simulator",
    "iPad",
    "iPhone",
    "iPod",
  ].includes(navigator.platform) ||
  (navigator.userAgent.includes("Mac") && "ontouchend" in document);
