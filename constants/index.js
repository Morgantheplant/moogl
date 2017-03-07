export {BULLETS} from './bullets';
export {VECTORMAN} from './players';
export {ALIEN} from './enemies';

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

export const DIRECTION = {
  LEFT: 'left',
  RIGHT: 'right'
}

export const KEYCODE = {
  UP: 38,
  DOWN: 40,
  LEFT: 37,
  RIGHT: 39,
  SPACE: 32
}

export const SPRITE_DATA = {
   IDLE: {
    type: ACTION_TYPES.IDLE,
    width: 96.21,
    dir: -1,
    img: 'idle.png',
    steps: 14,
    mask:[96.21,96.21],
    offset:[-50, -65]
  },
  IDLE_LEFT:{
    type: ACTION_TYPES.IDLE_LEFT,
    width:96.21,
    dir: 1,
    img: 'idleLeft.png',
    steps: 14,
    mask:[96.21,96.21],
    offset:[-50, -65]
  },
  MOVE_RIGHT: {
    type: ACTION_TYPES.MOVE_RIGHT,
    width: 96,
    dir: -1,
    img: 'moveRight.png',
    steps: 14,
    mask:[96,96],
    offset:[-50, -65],
  },
  MOVE_LEFT: {
    type: ACTION_TYPES.MOVE_LEFT,
    width: 96,
    dir: 1,
    img: 'moveLeft.png',
    steps: 14,
    mask:[96,96],
    offset:[-50, -65],
  },
  JUMP_RIGHT: {
    type: ACTION_TYPES.JUMP_RIGHT,
    width: 96,
    dir: -1,
    img: 'jumpRight.png',
    steps: 8,
    mask: [96,96],
    offset:[-50, -60],
  },
  JUMP_LEFT: {
    type: ACTION_TYPES.JUMP_LEFT,
    width: 96,
    dir: 1,
    img: 'jumpLeft.png',
    steps: 8,
    mask:[96,96],
    offset:[-50, -60],
  },
  JUMP_SHOOT_RIGHT: {
    type: ACTION_TYPES.JUMP_SHOOT_RIGHT,
    width: 180.57,
    dir: 1,
    img: 'jumpShootRight.png',
    steps: 7,
    mask:[180.57, 100],
    offset:[-90, -60],
  },
   JUMP_SHOOT_LEFT: {
    type: ACTION_TYPES.JUMP_SHOOT_LEFT,
    width: 180.57,
    dir: -1,
    img: 'jumpShootLeft.png',
    steps:7,
    mask:[180.57,100],
    offset:[-90, -65],
  },
  SHOOT_RIGHT: {
    type: ACTION_TYPES.SHOOT_RIGHT,
    width: 166.875,
    dir: -1,
    img: 'shootRight.png',
    steps: 7,
    mask:[166.875,96],
    offset:[-81, -65],
  },
   SHOOT_LEFT: {
    type: ACTION_TYPES.SHOOT_LEFT,
    width: 166.875,
    dir: 1,
    img: 'shootLeft.png',
    steps: 7,
    mask:[166.875,96],
    offset:[-100, -65],
  },
  IDLE_JUMP_RIGHT: {
    type: ACTION_TYPES.IDLE_JUMP_RIGHT,
    width:96,
    dir:1,
    img:'idleJumpRight.png',
    mask: [96,96],
    steps:1,
    offset:[-50,-60]
  },
  IDLE_JUMP_LEFT: {
    type: ACTION_TYPES.IDLE_JUMP_LEFT,
    width:96,
    dir:1,
    img:'idleJumpLeft.png',
    mask: [96,96],
    steps:1,
    offset:[-50,-60]
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
