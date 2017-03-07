import { Bodies, Body } from 'matter-js';
import { setStyles } from './utils';
import Node from './Node';
import { GAME_ITEM } from '../constants';

class Bullet extends Node {
  getBodyBase({ position, isJumping }){
    const offset = isJumping ? 7 : 5;
    const body = Bodies.circle(position.x,position.y-offset, 8);
    Body.set(body, {
      frictionAir:0,
      frictionStatic:0,
      desity:0.001
    })
    body.kind = GAME_ITEM.BULLET;
    return body;
  }
}

export default Bullet;