export function setStyles(node, styles){
  if(styles){
    Object.keys(styles).forEach((key) => {
      node.style[key] = styles[key];
    });
  }
}
