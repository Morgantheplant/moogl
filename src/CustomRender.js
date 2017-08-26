import { World, Engine, Composite, Bodies, Render, Events } from "matter-js";
import { GAME_ITEM, ALIEN, MAX_ENEMIES } from "../constants";
import { COLLSION_MAP } from "../collisions";
import ScoreBoard from "./ScoreBoard";
import Enemy from "./Enemy";

class CustomRender {
  constructor(options) {
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

  testing() {
    const render = Render.create({
      element: document.getElementById("entry"),
      engine: this.engine
    });
    Engine.run(this.engine);
    Render.run(render);
    const canvas = document.getElementsByTagName("canvas")[0];
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
  }

  addEvents() {
    Events.on(this.engine, "collisionStart", (event) => {
      const pairs = event.pairs;
      // change object colours to show those starting a collision
      for (let i = 0; i < pairs.length; i++) {
        const pair = pairs[i];
        const action = COLLSION_MAP[pair.bodyA.kind + pair.bodyB.kind];
        if (action) {
          action(pair.bodyA, pair.bodyB);
        }
      }
    });
  }

  addPlayer({ player }) {
    this.addItem(player);
    this.player = player;
    this.player.game = this;
  }

  init(options) {
    const height = window.innerHeight;
    const width = window.innerWidth;
    const floor = Bodies.rectangle(width / 2, height, width, 77, { isStatic: true });
    const right = Bodies.rectangle(width, height / 2, 50, height, { isStatic: true });
    const left = Bodies.rectangle(0, height / 2, 50, height, { isStatic: true });
    const top = Bodies.rectangle(width / 2, 0, width, 50, { isStatic: true });
    const logoRect = document.getElementsByClassName("logo")[0].getBoundingClientRect();
    const logo = Bodies.rectangle(logoRect.left + 265 / 2, logoRect.top + 109 + 106 / 2, 265, 106, { isStatic: true });
    this.enemyCount = 0;
    this.bodies = this.bodies.concat([floor, right, left, top, logo]);
    floor.kind = GAME_ITEM.GROUND;
    

    World.add(this.engine.world, this.bodies);

    // remove this later
    // this.testing();

    this.engine.world.gravity.y = 0.09;
    this.animationLoop = options.animationLoop;
    this.animationLoop.addAnimation(this.updateEngine);
    this.animationLoop.addAnimation(this.updateBodies);
    this.addEnemies();
    this.addScoreboard();
    this.animationLoop.setAnimationTimeout(this.backgroundIntro, 6000);
  }
  updateEngine() {
    Engine.update(this.engine, 1000 / 60);
  }
  updateBodies() {
    const bodies = Composite.allBodies(this.engine.world);
    this.bodies = bodies.slice();
    while (bodies.length) {
      const body = bodies.pop();
      body.updateSelf && body.updateSelf();
    }
  }
  addBodies(bodies) {
    if (Array.isArray(bodies)) {
      this.bodies = this.bodies.concat(bodies);
    }
  }
  addItem({ node, body }) {
    this.entry.appendChild(node);
    World.addBody(this.engine.world, body);
  }

  addScoreboard() {
    this.scoreBoard = new ScoreBoard({ entry: this.entry });
  }

  backgroundIntro(){
    document.getElementById('bg-color').style.opacity = 1
    document.getElementById('frame').style.backgroundColor = 'rgba(255,255,255,0)';
  }

  removeItem({ body, node }) {
    if (body && node) {
      World.remove(this.engine.world, body);
      this.entry.removeChild(node);
    }
  }
  addEnemies() {

    if(this.enemyCount < MAX_ENEMIES){
      const enemy = new Enemy(Object.assign({}, {
        node: document.createElement("div"),
        game: this,
        animationLoop: this.animationLoop
      }, ALIEN));
      this.addItem(enemy);
      this.enemyCount++;
    }

    this.animationLoop.setAnimationTimeout(() => {
        this.addEnemies();
    }, Math.max(Math.random() * 4000, 500));
  }
}

export default CustomRender;
