import Node from './Node';
import { Bodies } from 'matter-js';
import { GAME_ITEM } from '../constants';
import { setStyles } from './utils';

class Enemy extends Node {
  constructor(options){
    super(options);
    this.body = this.createPhysicsBody(options);
  }
  createPhysicsBody(options){
    const body = Bodies.circle(Math.random()*800,100, options.size/2);
    body.friction = 0.08;
    body.kind = GAME_ITEM.ENEMY;
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

export default Enemy;