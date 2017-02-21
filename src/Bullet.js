import { Bodies, Body } from 'matter-js';
import { setStyles } from './utils';

class Bullet{
  constructor(options){
    this.node = document.createElement('div');
    setStyles(this.node, options.styles);
    this.body = this.createPhysicsBody(options);
  }
  createPhysicsBody({ parentPosition, position }){
    const body = Bodies.circle(position.x,position.y, 10);
    body.updateSelf = () => {
       setStyles(this.node, {
        top:[Math.round(body.position.y), "px"].join(""),
        left:[Math.round(body.position.x), "px"].join("")
      });
    }
    body.player = this;
    return body;

  }

}

export default Bullet;