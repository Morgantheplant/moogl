import { setStyles } from './utils';

class Node {
  constructor(options){
    this.node = options.node || document.createElement('div');
    this.animationLoop = options.animationLoop;
    this.game = options.game
    this.parent = options.parent;
    setStyles(this.node, options.styles);
  }
}

export default Node;