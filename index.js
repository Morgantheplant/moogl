import Player from './src/player';
import CustomRender from './CustomRender';
import AnimationLoop from 'simple_animation_loop';
import { Engine } from 'matter-js';

const initGame = () => {

  const animationLoop = new AnimationLoop();
  const player = new Player({
    node: document.createElement('div'),
    animationLoop: animationLoop,
    size: 55,
    styles: {
      position: "absolute",
      border: "1px solid blue",
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

}







document.addEventListener("DOMContentLoaded",initGame);