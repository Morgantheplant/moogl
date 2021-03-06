import { setStyles, setTranslation } from "./utils";

class Node {
  constructor(options) {
    this.game = options.game;
    this.size = options.size || 50;
    this.parent = options.parent;
    this.animationLoop = options.animationLoop;
    this.node = options.node || document.createElement("div");
    this.removeSelf = this.removeSelf.bind(this);
    this.getBodyBase = this.getBodyBase.bind(this);
    this.body = this.createPhysicsBody(this.getBodyBase(options));
    setStyles(this.node, options.styles);
  }
  removeSelf() {
    this.game && this.game.removeItem(this);
    this.game = null;
    this.node = null;
    this.animationLoop = null;
    this.parent = null;
    this.body = null;
  }
  createPhysicsBody(body) {
    body.updateSelf = () => {
      setTranslation(this.node, body.position.x, body.position.y);
    };
    body.player = this;
    return body;
  }

  getBodyBase() {
    // extend this
    console.warn(`extend "getBodyBase" in ${this.constructor.name}`);
  }

}

export default Node;
