import {World, Engine, Composite, Bodies, Render, Events } from 'matter-js';
import { GAME_ITEM, COLLSION_MAP } from './src/constants';
import Enemy from './src/Enemy';
import { ALIEN } from './constants';

class CustomRender {
  constructor(options){
    this.entry = options.entry;
    this.engine = options.engine;
    this.bodies = options.bodies || [];
    this.updateEngine = this.updateEngine.bind(this);
    this.updateBodies = this.updateBodies.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.addEnemies = this.addEnemies.bind(this);
    this.init(options);
    this.addPlayer(options);
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
          const action = COLLSION_MAP[pair.bodyA.kind + pair.bodyB.kind];
          if(action){
            action(pair.bodyA, pair.bodyB);
          }
      }
  });
  }

  addPlayer({player}){
    this.addItem(player);
    this.player = player;
    this.player.game = this;
  }

  init(options){
    const floor =  Bodies.rectangle(400, 600, 800, 50, { isStatic: true });
    const right =  Bodies.rectangle(800, 300, 50, 600, { isStatic: true });
    const left = Bodies.rectangle(0, 300, 50, 600, { isStatic: true });
    const top = Bodies.rectangle(400, 0, 800, 50, { isStatic: true });
    this.bodies = this.bodies.concat([ floor, right, left, top ]);
    floor.kind = GAME_ITEM.GROUND;
       
   
    World.add(this.engine.world, this.bodies)
    
    // remove this later
    this.testing();

    this.engine.world.gravity.y = 0.09;
    this.animationLoop = options.animationLoop
    this.animationLoop.start();
    this.animationLoop.addAnimation(this.updateEngine);
    this.animationLoop.addAnimation(this.updateBodies);
    this.addEnemies();
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
  addItem({ node, body }){
    this.entry.appendChild(node);
    World.addBody(this.engine.world, body); 
  }
  removeItem({body, node}){
    World.remove(this.engine.world, body)
    this.entry.removeChild(node);
  }
  addEnemies(){
    const enemy = new Enemy(Object.assign({}, {
      node: document.createElement('div'),
      game: this,
      animationLoop: this.animationLoop  
    }, ALIEN));
    this.addItem(enemy);

    this.animationLoop.setAnimationTimeout(()=>{
      this.addEnemies()
    }, Math.max(Math.random()*4000,500))
  }
}

export default CustomRender;