import {World, Engine, Composite, Bodies, Render } from 'matter-js';

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
  }
  
  testing(){

    var render = Render.create({
      element: document.getElementById("entry"),
      engine: this.engine
    });

    Engine.run(this.engine);
    Render.run(render);
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
    
    this.testing();

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

}

export default CustomRender;