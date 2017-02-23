import { Bodies, Body } from 'matter-js';
import { KEYCODE } from './constants';
import Sprite from './Sprite';
import { setStyles } from './utils';
import Bullet from './Bullet';
import {DIRECTION, BULLETS, GAME_ITEM} from './constants';
import Node from './Node';

class Player extends Node {
  constructor(options){
    super(options);
    this.health = options.health || 50;
    this.size = options.size || 50;
    this.body = this.createPhysicsBody(options);
    this.sprite = this.createSpriteAnimations(options);
    this.addListeners();
  }

  createPhysicsBody(options){
    const body = Bodies.circle(100,100, options.size/2);
    body.friction = 0.08;
    body.kind = GAME_ITEM.PLAYER;
    console.log(body.kind, 'thi sis a player')
    body.updateSelf = () => {
       setStyles(this.node, {
        top:[Math.round(body.position.y), "px"].join(""),
        left:[Math.round(body.position.x), "px"].join("")
      });
    }
    body.player = this;
    return body;
  }

  createSpriteAnimations(options){
    const sprite = new Sprite(options);
    return sprite;
  }

  jump(){
    this.sprite.jump();
    Body.setVelocity(this.body, {x:this.body.velocity.x,y:-2});
  }

  left(){
    this.sprite.left();
    Body.setVelocity(this.body, {x:-2,y:this.body.velocity.y});
  }

  right(){
    this.sprite.right();
    Body.setVelocity(this.body, {x:2,y:this.body.velocity.y});

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
      position: this.body.position,
      direction: this.direction,
      isJumping: this.sprite.isJumping
    });
    this.node.parentElement.appendChild(bullet.node);
    this.game.addBody(bullet.body);
    const x = this.sprite.direction === DIRECTION.RIGHT ? 12 : -12;
    Body.setVelocity(bullet.body, {x:x, y:bullet.body.velocity.y});
    this.animationLoop.setAnimationTimeout(() => {
     // this.destroyBullet(bullet);
    }, delay || 1000);
    // control shooting rate 
    this.shootingDisabled = true;
    this.animationLoop.setAnimationTimeout(()=>{
       this.shootingDisabled = false;
    }, bulletType.shootingRate);
  }

  destroyBullet(bullet){
    this.game.removeBody(bullet.body);
    this.node.parentElement.removeChild(bullet.node); 
  }

  addListeners(){
    document.addEventListener('keydown',(e) => {
      switch (e.keyCode){
        case KEYCODE.UP:
          this.jump();
          break;
        case KEYCODE.LEFT:
          this.left();
          break;
        case KEYCODE.RIGHT:
          this.right();
          break; 
        case KEYCODE.SPACE:
          this.shoot()
          break;       
      }
    });
  }

}



export default Player;