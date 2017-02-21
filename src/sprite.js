import { DIRECTION, TYPES, KEYCODE, SPRITE_DATA } from './constants';
import { setStyles } from './utils';

class Sprite {
  constructor(options){
    this.currentStep = 0;
    this.isJumping = false;
    this.direction = DIRECTION.RIGHT;
    this.node = options.node;
    this.currentAnimation;
    this.currentAnimationType; 
    this.animationLoop = options.animationLoop;
    this.spriteStep = this.spriteStep.bind(this);
    this.endCurrentAnimation = this.endCurrentAnimation.bind(this);
    this.startCurrentAnimation = this.startCurrentAnimation.bind(this);
    this.idle = this.idle.bind(this);
  }
  endCurrentAnimation(){
    this.animationLoop.removeAnimation(this.currentAnimation);
    this.returnToInitialFrame();
    this.currentAnimation = null;
    this.currentAnimationType = null;
    this.currentStep = 0;
  }
  returnToInitialFrame(){
    // clean this up
    this.node.style.transform =  "translate(-40%, -60%)";
    let resetStep, resetImage;
    if(this.direction === DIRECTION.RIGHT){
      resetImage = 'idle.png';
    }
    if(this.direction === DIRECTION.LEFT){
      resetImage = 'moveLeft.png';
    }
    this.node.style.backgroundImage = ['url("/static/images/',resetImage,'")'].join('');
    this.node.style.height = '96px';
    this.node.style.width = '96px';
    this.node.style.backgroundPosition = 0;
    
  }
  startCurrentAnimation(sprite){
    if(!this.currentAnimationType || this.currentAnimationType.type !== sprite.type){
      this.endCurrentAnimation();
      this.currentAnimationType = sprite;
      this.currentStep = 0;
      this.node.style.backgroundImage = ['url("/static/images/',sprite.img,'")'].join("");
      this.node.style.width = [sprite.mask[0],"px"].join("");
      this.node.style.height = [sprite.mask[1],"px"].join("");
      this.currentAnimation = this.animationLoop.setAnimationInterval(this.spriteStep, 100);
    }
  }
  spriteStep(){
    const sprite = this.currentAnimationType;
    if(sprite && this.currentStep < sprite.steps){
      this.currentStep++;
      let position = sprite.dir * sprite.width * this.currentStep;
      this.node.style.backgroundPosition = [position,'px'].join('');
    } else {
      this.endCurrentAnimation();
      // randomly set idle animation
      this.currentAnimation = this.animationLoop.setAnimationTimeout(() => {
        this.idle();
      }, Math.random() * 10000)
      
    }
  }
  jump(){
    this.isJumping = true;
    let delay = 100;
    if(this.direction === DIRECTION.RIGHT){
      this.startCurrentAnimation(SPRITE_DATA.JUMP_RIGHT)
      delay *= SPRITE_DATA.JUMP_RIGHT.steps - 1;
    }
    if(this.direction === DIRECTION.LEFT) {
      this.startCurrentAnimation(SPRITE_DATA.JUMP_LEFT)
      delay *= SPRITE_DATA.JUMP_LEFT.steps - 1;
    }
    this.animationLoop.setAnimationTimeout(() => {
      this.isJumping = false;
    }, delay);

  }
  left(){
    this.direction = DIRECTION.LEFT;
    if(!this.isJumping){
      this.startCurrentAnimation(SPRITE_DATA.MOVE_LEFT);
    }
  }
  right(){
    this.direction = DIRECTION.RIGHT;
    if(!this.isJumping){
      this.startCurrentAnimation(SPRITE_DATA.MOVE_RIGHT);  
    }
  }
  shoot(){
    if(this.isJumping){
      if(this.direction === DIRECTION.RIGHT){
        this.startCurrentAnimation(SPRITE_DATA.JUMP_SHOOT_RIGHT)
        return;
      }
      if(this.direction === DIRECTION.LEFT) {
        this.startCurrentAnimation(SPRITE_DATA.JUMP_SHOOT_LEFT)
        return;
      }       
    }
    if(!this.isJumping){
       if(this.direction === DIRECTION.RIGHT){
        this.startCurrentAnimation(SPRITE_DATA.SHOOT_RIGHT)
        return;
      }
      if(this.direction === DIRECTION.LEFT) {
        this.startCurrentAnimation(SPRITE_DATA.SHOOT_LEFT)
        this.node.style.transform =  "translate(-55%, -62%)";
        return;
      }       

    }

  }
  idle(){
    if(this.direction === DIRECTION.RIGHT){
      this.startCurrentAnimation(SPRITE_DATA.IDLE)
    }
  }

}

export default Sprite;
