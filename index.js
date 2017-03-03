import Player from './src/Player';
import CustomRender from './CustomRender';
import AnimationLoop from 'simple_animation_loop';
import { Engine } from 'matter-js';
import { VECTORMAN } from './constants';

const initGame = () => {

  const animationLoop = new AnimationLoop();

  const player = new Player(Object.assign({}, { 
    node: document.createElement('div'),
    animationLoop: animationLoop  
  }, VECTORMAN));

  const renderGame = new CustomRender({
    entry: document.getElementById('entry'),
    engine: Engine.create(),
    animationLoop: animationLoop,
    player: player
  });

  player.game = renderGame;

}

document.addEventListener("DOMContentLoaded",initGame);