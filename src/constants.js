
export const TYPES = {
  IDLE: 'idle',
  MOVE_RIGHT: 'moveRight',
  MOVE_LEFT: 'moveLeft',
  JUMP_RIGHT: 'jumpRight',
  JUMP_LEFT: 'jumpLeft',
  SHOOT_RIGHT: 'shootRight',
  SHOOT_LEFT: 'shootLeft',
  JUMP_SHOOT_RIGHT: 'jumpShootRight',
  JUMP_SHOOT_LEFT: 'jumpShoopLeft'
}

export const DIRECTION = {
  LEFT: 'left',
  RIGHT: 'right'
}

export const SPRITE_DATA = {
  MOVE_RIGHT: {
    type: TYPES.MOVE_RIGHT,
    width: 96,
    dir: -1,
    img: 'moveRight.png',
    steps: 14,
    mask:[96,96]
  },
  MOVE_LEFT: {
    type: TYPES.MOVE_LEFT,
    width: 96,
    dir: 1,
    img: 'moveLeft.png',
    steps: 14,
    mask:[96,96]
  },
  JUMP_RIGHT: {
    type: TYPES.JUMP_RIGHT,
    width: 96,
    dir: -1,
    img: 'jumpRight.png',
    steps: 13,
    mask: [96,96]
  },
  JUMP_LEFT: {
    type: TYPES.JUMP_LEFT,
    width: 96,
    dir: 1,
    img: 'jumpLeft.png',
    steps: 13,
    mask:[96,96]
  },
  JUMP_SHOOT_RIGHT: {
    type: TYPES.JUMP_SHOOT_RIGHT,
    width: 185,
    dir: 1,
    img: 'jumpShootRight.png',
    steps: 7,
    mask:[185, 100]
  },
   JUMP_SHOOT_LEFT: {
    type: TYPES.JUMP_SHOOT_LEFT,
    width: 185,
    dir: -1,
    img: 'jumpShootLeft.png',
    steps:7,
    mask:[185,100]
  },
  SHOOT_RIGHT: {
    type: TYPES.SHOOT_RIGHT,
    width: 168,
    dir: 1,
    img: 'shootRight.png',
    steps: 7,
    mask:[168,96]
  },
   SHOOT_LEFT: {
    type: TYPES.SHOOT_LEFT,
    width: 168,
    dir: 1,
    img: 'shootLeft.png',
    steps: 7,
    mask:[168,96]
  }
 
}

export const KEYCODE = {
  UP: 38,
  DOWN: 40,
  LEFT: 37,
  RIGHT: 39,
  SPACE: 32
}
