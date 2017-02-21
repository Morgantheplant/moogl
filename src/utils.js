export function setStyles(node, styles){
  Object.keys(styles).forEach((key) => {
    node.style[key] = styles[key];
  });
}
