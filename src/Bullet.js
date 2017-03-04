import { Bodies, Body } from 'matter-js';
import { setStyles } from './utils';
import Node from './Node';
import { GAME_ITEM } from '../constants';

class Bullet extends Node {
  constructor(options){
    super(options);
    this.body = this.createPhysicsBody(options);
  }
  createPhysicsBody({ position, isJumping }){
    const offset = isJumping ? 7 : 5;
    const body = Bodies.circle(position.x,position.y-offset, 20);
    Body.set(body, {
      frictionAir:0,
      frictionStatic:0,
      desity:0.005
    })
    //Body.setDensity(body, 0);
   // Body.setMass(body, 0);
    body.kind = GAME_ITEM.BULLET;
    body.updateSelf = () => {
       setStyles(this.node, {
        top:[Math.round(body.position.y)+5, "px"].join(""),
        left:[Math.round(body.position.x)+5, "px"].join("")
      });
    }

    body.player = this;
    return body;

  }

}

export default Bullet;