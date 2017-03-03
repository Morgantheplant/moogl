
export const ACTION_TYPES = {
  IDLE: 'idle',
  IDLE_LEFT: 'idleLeft',
  MOVE_RIGHT: 'moveRight',
  MOVE_LEFT: 'moveLeft',
  JUMP_RIGHT: 'jumpRight',
  JUMP_LEFT: 'jumpLeft',
  SHOOT_RIGHT: 'shootRight',
  SHOOT_LEFT: 'shootLeft',
  JUMP_SHOOT_RIGHT: 'jumpShootRight',
  JUMP_SHOOT_LEFT: 'jumpShoopLeft',
  IDLE_JUMP_RIGHT: 'idleJumpRight',
  IDLE_JUMP_LEFT: 'idleJumpLeft'
}

export const GAME_ITEM = {
  PLAYER: 'player',
  BULLET: 'bullet',
  ENEMY: 'enemy',
  GROUND: 'ground'
}

function playerEnemyAction(body1, body2){

}

function bulletEnemyAction(body1, body2){
  body1.player.removeSelf();
  body2.player.removeSelf();
}

function playerGroundAction(body1,body2){
  if(body1.player && body1.player.sprite){
    body1.player.sprite.land();
    body1.player.sprite.isJumping = false
    return;
  }
  if(body2.player && body2.player.sprite){
    body2.player.sprite.land();
    body2.player.sprite.isJumping = false
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


export const DIRECTION = {
  LEFT: 'left',
  RIGHT: 'right'
}

export const SPRITE_DATA = {
   IDLE: {
    type: ACTION_TYPES.IDLE,
    width: 96.21,
    dir: -1,
    img: 'idle.png',
    steps: 14,
    mask:[96.21,96.21],
    offset:[-55, -65]
  },
  IDLE_LEFT:{
    type: ACTION_TYPES.IDLE_LEFT,
    width:96.21,
    dir: 1,
    img: 'idleLeft.png',
    steps: 14,
    mask:[96.21,96.21],
    offset:[-55, -65]
  },
  MOVE_RIGHT: {
    type: ACTION_TYPES.MOVE_RIGHT,
    width: 96,
    dir: -1,
    img: 'moveRight.png',
    steps: 14,
    mask:[96,96],
    offset:[-55, -65],
  },
  MOVE_LEFT: {
    type: ACTION_TYPES.MOVE_LEFT,
    width: 96,
    dir: 1,
    img: 'moveLeft.png',
    steps: 14,
    mask:[96,96],
    offset:[-55, -65],
  },
  JUMP_RIGHT: {
    type: ACTION_TYPES.JUMP_RIGHT,
    width: 96,
    dir: -1,
    img: 'jumpRight.png',
    steps: 8,
    mask: [96,96],
    offset:[-55, -65],
  },
  JUMP_LEFT: {
    type: ACTION_TYPES.JUMP_LEFT,
    width: 96,
    dir: 1,
    img: 'jumpLeft.png',
    steps: 8,
    mask:[96,96],
    offset:[-55, -65],
  },
  JUMP_SHOOT_RIGHT: {
    type: ACTION_TYPES.JUMP_SHOOT_RIGHT,
    width: 180.57,
    dir: 1,
    img: 'jumpShootRight.png',
    steps: 7,
    mask:[180.57, 100],
    offset:[-55, -65],
  },
   JUMP_SHOOT_LEFT: {
    type: ACTION_TYPES.JUMP_SHOOT_LEFT,
    width: 180.57,
    dir: -1,
    img: 'jumpShootLeft.png',
    steps:7,
    mask:[180.57,100],
    offset:[-50, -65],
  },
  SHOOT_RIGHT: {
    type: ACTION_TYPES.SHOOT_RIGHT,
    width: 166.875,
    dir: -1,
    img: 'shootRight.png',
    steps: 7,
    mask:[166.875,96],
    offset:[-50, -65],
  },
   SHOOT_LEFT: {
    type: ACTION_TYPES.SHOOT_LEFT,
    width: 166.875,
    dir: 1,
    img: 'shootLeft.png',
    steps: 7,
    mask:[166.875,96],
    offset:[-63, -65],
  },
  IDLE_JUMP_RIGHT: {
    type: ACTION_TYPES.IDLE_JUMP_RIGHT,
    width:96,
    dir:1,
    img:'idleJumpRight.png',
    mask: [96,96],
    steps:1,
    offset:[-50,-65]
  },
  IDLE_JUMP_LEFT: {
    type: ACTION_TYPES.IDLE_JUMP_LEFT,
    width:96,
    dir:1,
    img:'idleJumpLeft.png',
    mask: [96,96],
    steps:1,
    offset:[-50,-65]
  },
  LAND_RIGHT: {
    type: ACTION_TYPES.JUMP_RIGHT,
    width: 96,
    dir: -1,
    img: 'jumpRight.png',
    steps: 14,
    beginStep:8,
    mask: [96,96],
    offset:[-50, -65],
  },
  LAND_LEFT: {
    type: ACTION_TYPES.JUMP_LEFT,
    width: 96,
    dir: 1,
    img: 'jumpLeft.png',
    steps: 13,
    beginStep:8,
    mask:[96,96],
    offset:[-50, -65],
  }
}

export const KEYCODE = {
  UP: 38,
  DOWN: 40,
  LEFT: 37,
  RIGHT: 39,
  SPACE: 32
}

export const BULLETS = {
  REGULAR: {
    styles: {
      position: 'absolute',
      background: 'rgba(255, 255, 255, 0.85)',
      borderRadius: '50%',
      height: '8px',
      width: '8px',
      boxShadow: 'white 0px 0px 10px',
      top: '100px',
      border: '2px solid rgb(96, 128, 192)',
      left: '100px'
    },
    shootingRate: 200
  }
}
