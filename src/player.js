import { Bodies, Body } from 'matter-js';
import { KEYCODE } from './constants';
import Sprite from './sprite';
import { setStyles } from './utils';
import Bullet from './Bullet';
import {DIRECTION} from './constants';

class Player {
  constructor(options){
    this.node = options.node || document.createElement('div');
    this.health = options.health || 50;
    this.size = options.size;
    setStyles(this.node, options.styles);
    this.body = this.createPhysicsBody(options);
    this.sprite = this.createSpriteAnimations(options);
    this.addListeners();
  }

  createPhysicsBody(options){
    const body = Bodies.circle(100,100, options.size/2);
    body.friction = 0.08;
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
    this.sprite.shoot();
    const bullet = new Bullet({
      styles: {
        position: 'absolute',
        backgroundColor: '',
        borderRadius: '50%',
        height: '20px',
        width: '20px',
        boxShadow:'5px 5px 5px rgba(100,100,260,0.6)'
      },
      position: this.body.position,
      direction: this.direction
    })
    this.node.parentElement.appendChild(bullet.node);
    this.game.addBody(bullet.body);
    const x = this.sprite.direction === DIRECTION.RIGHT ? 10 : -10;
    Body.setVelocity(bullet.body, {x:x, y:bullet.body.velocity.y})
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