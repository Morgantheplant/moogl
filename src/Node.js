import { setStyles } from './utils';

class Node {
  constructor(options){
    this.node = options.node || document.createElement('div');
    this.animationLoop = options.animationLoop;
    this.game = options.game
    this.parent = options.parent;
    this.removeSelf = this.removeSelf.bind(this);
    setStyles(this.node, options.styles);
  }
  removeSelf(){
    this.game && this.game.removeItem(this);
    this.game = null;
    this.node = null;
    this.animationLoop = null;
    this.parent = null;
    this.body = null;
  }
}

export default Node;