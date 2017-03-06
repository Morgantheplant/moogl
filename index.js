import Player from './src/Player';
import CustomRender from './src/CustomRender';
import AnimationLoop from 'simple_animation_loop';
import { Engine } from 'matter-js';
import { VECTORMAN } from './constants/players';

const initGame = () => {
  
  // single animation loop passed into each body in the game
  // possibly refactor into singleton 
  const animationLoop = new AnimationLoop();
  const player = new Player(Object.assign({}, { 
    //node: document.createElement('div'),
    animationLoop: animationLoop  
  }, VECTORMAN));

  const renderGame = new CustomRender({
    entry: document.getElementById('entry'),
    engine: Engine.create(),
    animationLoop: animationLoop,
    player: player
  });

}

document.addEventListener("DOMContentLoaded",initGame);