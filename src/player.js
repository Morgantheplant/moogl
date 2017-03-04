import { Bodies, Body } from 'matter-js';
import Sprite from './Sprite';
import { setStyles } from './utils';
import Bullet from './Bullet';
import {DIRECTION, BULLETS, GAME_ITEM, KEYCODE } from '../constants';
import Node from './Node';

class Player extends Node {
  constructor(options){
    super(options);
    this.health = options.health || 50;
    this.size = options.size || 60;
    this.body = this.createPhysicsBody(options);
    this.sprite = this.createSpriteAnimations(options);
    this.addListeners();
  }

  createPhysicsBody(options){
    const body = Bodies.circle(100,100, options.size/2);
    body.friction = 0.08;
    body.kind = GAME_ITEM.PLAYER;
    body.updateSelf = () => {
       setStyles(this.node, {
        top:[Math.round(body.position.y), "px"].join(""),
        left:[Math.round(body.position.x), "px"].join("")
      });
    }
    Body.set(body, {
      frictionAir:0.0001,
      frictionStatic: 0.001

    })
    body.player = this;
    return body;
  }

  createSpriteAnimations(options){
    const settings = Object.assign(options, {node:this.node})
    const sprite = new Sprite(settings);
    return sprite;
  }

  jump(){
    this.sprite.jump();
    Body.setVelocity(this.body, {x:this.body.velocity.x,y:-2});
  }

  left(){
    this.sprite.left();
    Body.setVelocity(this.body, {x:-4,y:this.body.velocity.y});
  }

  right(){
    this.sprite.right();
    Body.setVelocity(this.body, {x:4,y:this.body.velocity.y});

  }

  shoot(){
    if(!this.shootingDisabled){
      this.sprite.shoot();
      if(this.sprite.isJumping){
        // delay bullet if jumping
        this.animationLoop.setAnimationTimeout(() => {
          this.createBullet()
        }, 500);
      } else {
        this.createBullet(500);
      }
    }
  }

  createBullet(delay){
    const bulletType = BULLETS.REGULAR;
    const bullet = new Bullet({
      styles: bulletType.styles,
      game: this.game,
      position: this.body.position,
      direction: this.direction,
      isJumping: this.sprite.isJumping
    });
   
    this.game.addItem(bullet);
    const x = this.sprite.direction === DIRECTION.RIGHT ? 15 : -15;
    Body.setVelocity(bullet.body, {x:x, y:bullet.body.velocity.y});
    this.animationLoop.setAnimationTimeout(() => {
      bullet && bullet.removeSelf();
    }, delay || 1000);
    // control shooting rate 
    this.shootingDisabled = true;
    this.animationLoop.setAnimationTimeout(() => {
       this.shootingDisabled = false;
    }, bulletType.shootingRate);
  }

  addListeners(){
    document.addEventListener('keydown',(e) => {
      switch (e.keyCode){
        case KEYCODE.UP:
          e.preventDefault()
          this.jump();
          break;
        case KEYCODE.LEFT:
          e.preventDefault()
          this.left();
          break;
        case KEYCODE.RIGHT:
          e.preventDefault()
          this.right();
          break; 
        case KEYCODE.SPACE:
          e.preventDefault()
          this.shoot()
          break;       
      }
    });
  }

}



export default Player;