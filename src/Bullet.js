import { Bodies, Body } from "matter-js";
import { setStyles } from "./utils";
import Node from "./Node";
import { GAME_ITEM } from "../constants";

class Bullet extends Node {
  getBodyBase({ position, isJumping }) {
    const offset = isJumping ? 7 : 5;
    const body = Bodies.circle(position.x, position.y - offset, 8);
    Body.set(body, {
      frictionAir: 0,
      frictionStatic: 0,
      desity: 0.001
    });
    body.kind = GAME_ITEM.BULLET;
    return body;
  }
  removeSelf() {
    if (this.node) {
      this.animationLoop && this.animationLoop.setAnimationTimeout(() => {
        debugger
        this.removeBullet();
      }, 100);
      setStyles(this.node, {
        background: "yellow",
        border: "2px solid orange",
        boxShadow: "0px 0px 10px red",
        height: "20px",
        width: "20px",
        borderRadius: "50%"
      });

      this.game.scoreBoard.addPoint();
      this.game.enemyCount > 0 && this.game.enemyCount--;
    }
  }

  removeBullet() {
    super.removeSelf();
  }
}

export default Bullet;
