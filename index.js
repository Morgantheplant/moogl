import Player from './src/Player';
import CustomRender from './src/CustomRender';
import AnimationLoop from 'simple_animation_loop';
import { Engine } from 'matter-js';
import { VECTORMAN } from './constants';

const initGame = (animationLoop) => {
  // single animation loop passed into each body in the game
  // possibly refactor into singleton 
  const player = new Player(Object.assign({}, { 
    animationLoop: animationLoop  
  }, VECTORMAN));

  const renderGame = new CustomRender({
    entry: document.getElementById('entry'),
    engine: Engine.create(),
    animationLoop: animationLoop,
    player: player
  });

}

const INTRO_MESSAGE = "Hello! This game is using pure DOM, requestAnimationFrame, and MatterJS..."

const initIntro = ()=> {
 const animationLoop = new AnimationLoop();
 animationLoop.start();
 const searchField = document.getElementById('search');
 animationLoop.setAnimationTimeout(()=>{
  typeMessage(INTRO_MESSAGE.split("").reverse(), animationLoop, searchField, initGame);
 }, 3000)
}

const typeMessage = (message, loop, node, cb)=>{
  if(message.length){
    const nextLetter = message.pop();
    loop.setAnimationTimeout(()=>{
      node.value = node.value += nextLetter;
      typeMessage(message, loop, node, cb);
    }, Math.random()*200);
  } else {
    loop.setAnimationTimeout(()=>{
      node.value = "";
    },1000)
    loop.setAnimationTimeout(()=>{
      cb(loop);
    }, 2000)
  }
}

document.addEventListener("DOMContentLoaded",initIntro);