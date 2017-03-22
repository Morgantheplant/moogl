import { GAME_ITEM } from '../constants';

function playerEnemyAction(body1, body2){
   body1.player.game.scoreBoard.loseHealth();
}

function bulletEnemyAction(body1, body2){
  body1.player.removeSelf();
  body2.player.removeSelf();
}

function playerGroundAction(body1,body2){
  if(body1.player && body1.player.sprite){
    body1.player.sprite.land();
    body1.player.sprite.isJumping = false; 
    return;
  }
  if(body2.player && body2.player.sprite){
    body2.player.sprite.land();
    body2.player.sprite.isJumping = false;
    return;
  }
}

export const COLLSION_ACTIONS = [
  [[GAME_ITEM.PLAYER, GAME_ITEM.ENEMY], playerEnemyAction],
  [[GAME_ITEM.BULLET, GAME_ITEM.ENEMY], bulletEnemyAction],
  [[GAME_ITEM.PLAYER, GAME_ITEM.GROUND], playerGroundAction] 
];

export const COLLSION_MAP = (function creatCollisionMap(COLLSION_ACTIONS, COLLSION_MAP){
  COLLSION_ACTIONS.forEach((bodiesActionTuple)=>{
    const COMBO1 = bodiesActionTuple[0].slice().join('');
    const COMBO2 = bodiesActionTuple[0].slice().reverse().join('');
    const ACTION = bodiesActionTuple[1]
    // collision is stored for both collision permutations
    COLLSION_MAP[COMBO1] = ACTION;
    COLLSION_MAP[COMBO2] = ACTION;
  });
  return COLLSION_MAP;
}(COLLSION_ACTIONS, {}));