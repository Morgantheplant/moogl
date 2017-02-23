import Player from './src/Player';
import CustomRender from './CustomRender';
import AnimationLoop from 'simple_animation_loop';
import { Engine } from 'matter-js';

const initGame = () => {

  const animationLoop = new AnimationLoop();
  const player = new Player({
    node: document.createElement('div'),
    animationLoop: animationLoop,
    size: 40,
    styles: {
      position: "absolute",
      width: "96px",
      height: "96px",
      backgroundImage: "url('/static/images/idle.png')",
      transform: "translate(-40%, -60%)"
    }  
  });

  const renderGame = new CustomRender({
    entry: document.getElementById('entry'),
    engine: Engine.create(),
    animationLoop: animationLoop,
    player: player,
    bodies: [player.body]
  });

  player.game = renderGame;

}

document.addEventListener("DOMContentLoaded",initGame);