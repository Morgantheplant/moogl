import { setStyles } from './utils';

class Node {
  constructor(options){
    this.node = options.node || document.createElement('div');
    this.animationLoop = options.animationLoop;
    this.game = options.game
    this.size = options.size || 50;
    this.parent = options.parent;
    this.removeSelf = this.removeSelf.bind(this);
    this.getBodyBase = this.getBodyBase.bind(this);
    this.body = this.createPhysicsBody(this.getBodyBase(options));
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
  createPhysicsBody(body){
    body.updateSelf = () => {
      const transform =  [
        'translate(',
          Math.round(body.position.x), "px,",
          Math.round(body.position.y), "px",
        ')'].join("");
      setStyles(this.node, {
        webkitTransform: transform,
        MozTransform: transform,
        msTransform: transform,
        transform: transform
      });
    }
    body.player = this;
    return body;
  }

  getBodyBase(options){
    //extend this
    console.warn(`extend 'getBodyBase' in ${this.constructor.name}`)
  }

}

export default Node;