import { Bodies } from "matter-js";
import { GAME_ITEM } from "../constants";
import Node from "./Node";
import { setStyles } from "./utils";

class Enemy extends Node {
  getBodyBase() {
    const body = Bodies.circle(Math.random() * 800, 100, this.size / 2);
    body.friction = 0.08;
    body.kind = GAME_ITEM.ENEMY;
    return body;
  }
  removeSelf() {
    var explode = document.createElement('img');
    explode.src = "static/images/explosion.gif";

    this.node.appendChild(explode);
    setStyles(this.node, {
      backgroundImage: "url('/static/images/enemy-dead.png')"
    });
    this.animationLoop.setAnimationTimeout(() => {
      Node.prototype.removeSelf.call(this);
    }, 200);
  }
}

export default Enemy;
