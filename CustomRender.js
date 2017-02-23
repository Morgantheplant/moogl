import {World, Engine, Composite, Bodies, Render, Events } from 'matter-js';
import { GAME_ITEM } from './src/constants';

class CustomRender {
  constructor(options){
    this.entry = options.entry;
    this.engine = options.engine;
    this.bodies = options.bodies || [];
    this.entry.appendChild(options.player.node);
    this.updateEngine = this.updateEngine.bind(this);
    this.updateBodies = this.updateBodies.bind(this);
    this.init(options);
    this.count = false;
    this.addEvents();
  }
  
  testing(){
    var render = Render.create({
      element: document.getElementById("entry"),
      engine: this.engine
    });

    Engine.run(this.engine);
    Render.run(render);
  }

  addEvents(){
    Events.on(this.engine, 'collisionStart', function(event) {
      var pairs = event.pairs;
      // change object colours to show those starting a collision
      for (var i = 0; i < pairs.length; i++) {
          var pair = pairs[i];
          const collision = (pair.bodyA.kind === GAME_ITEM.BULLET && pair.bodyB.kind === GAME_ITEM.PLAYER)
          const collision2 = (pair.bodyB.kind === GAME_ITEM.BULLET && pair.bodyA.kind === GAME_ITEM.PLAYER)
          if(collision || collision2){
            console.log('yeow') 
          }          
      }
  });
  }

  init(options){
    this.bodies = this.bodies.concat([
        Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
        // floor
        Bodies.rectangle(400, 600, 800, 50, { isStatic: true }),
        //right
        Bodies.rectangle(800, 300, 50, 600, { isStatic: true }),
        // left
        Bodies.rectangle(0, 300, 50, 600, { isStatic: true }) 
    ]);
    World.add(this.engine.world, this.bodies)
    
    // remove this later
    this.testing();

    this.engine.world.gravity.y = 0.08;
    this.animationLoop = options.animationLoop
    this.animationLoop.start();
    this.animationLoop.addAnimation(this.updateEngine);
    this.animationLoop.addAnimation(this.updateBodies);
  }
  updateEngine(){
    Engine.update(this.engine, 1000 / 60);
  }
  updateBodies(){
    const bodies = Composite.allBodies(this.engine.world);
    this.bodies = bodies.slice();
    while(bodies.length){
      let body = bodies.pop()
      body.updateSelf && body.updateSelf();
    }
  }
  addBodies(bodies){
    if(Array.isArray(bodies)){
      this.bodies = this.bodies.concat(bodies); 
    }
  }
  addBody(body){
    World.addBody(this.engine.world, body); 
  }

  removeBody(body){
    World.remove(this.engine.world, body)

  }

}

export default CustomRender;