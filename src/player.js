import { Bodies, Body } from 'matter-js';
import { KEYCODE } from './constants';
import Sprite from './sprite';
class Player {
  constructor(options){
    this.node = options.node || document.createElement('div');
    this.health = options.health || 50;
    this.size = options.size;
    this.setStyles(options.styles);
    this.body = this.createPhysicsBody(options);
    this.sprite = this.createSpriteAnimations(options);
    this.addListeners();
  }

  createPhysicsBody(options){
    const body = Bodies.circle(100,100, options.size/2);
    body.friction = 0.08;
    body.updateSelf = () => {
      this.setStyles({
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

  setStyles(styles){
    Object.keys(styles).forEach((key) => {
      this.node.style[key] = styles[key];
    });
  }

  jump(){
    this.sprite.jump();
    Body.setVelocity(this.body, {x:this.body.velocity.x,y:-12});
  }

  left(){
     this.sprite.left();
     Body.setVelocity(this.body, {x:-4,y:this.body.velocity.y});
  }

  right(){
    this.sprite.right();
    Body.setVelocity(this.body, {x:+4,y:this.body.velocity.y});

  }

  shoot(){
    this.sprite.shoot();
    console.log('pew')
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