export function setStyles(node, styles) {
  if (styles && node) {
    Object.keys(styles).forEach((key) => {
      node.style[key] = styles[key];
    });
  }
}

export function setTranslation(node, x, y) {
  const transform = [
    "translate(",
    Math.round(x), "px,",
    Math.round(y), "px",
    ")"
  ].join("");

  setStyles(node, {
    webkitTransform: transform,
    MozTransform: transform,
    msTransform: transform,
    transform
  });
}
