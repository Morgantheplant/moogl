
export const ACTION_TYPES = {
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

export const GAME_ITEM = {
  PLAYER: 'player',
  BULLET: 'bullet',
  ENEMY: 'enemy'
}

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
    mask:[96.21,96.21]
  },
  MOVE_RIGHT: {
    type: ACTION_TYPES.MOVE_RIGHT,
    width: 96,
    dir: -1,
    img: 'moveRight.png',
    steps: 14,
    mask:[96,96]
  },
  MOVE_LEFT: {
    type: ACTION_TYPES.MOVE_LEFT,
    width: 96,
    dir: 1,
    img: 'moveLeft.png',
    steps: 14,
    mask:[96,96]
  },
  JUMP_RIGHT: {
    type: ACTION_TYPES.JUMP_RIGHT,
    width: 96,
    dir: -1,
    img: 'jumpRight.png',
    steps: 14,
    mask: [96,96]
  },
  JUMP_LEFT: {
    type: ACTION_TYPES.JUMP_LEFT,
    width: 96,
    dir: 1,
    img: 'jumpLeft.png',
    steps: 13,
    mask:[96,96]
  },
  JUMP_SHOOT_RIGHT: {
    type: ACTION_TYPES.JUMP_SHOOT_RIGHT,
    width: 180.57,
    dir: 1,
    img: 'jumpShootRight.png',
    steps: 7,
    mask:[180.57, 100]
  },
   JUMP_SHOOT_LEFT: {
    type: ACTION_TYPES.JUMP_SHOOT_LEFT,
    width: 180.57,
    dir: -1,
    img: 'jumpShootLeft.png',
    steps:7,
    mask:[180.57,100]
  },
  SHOOT_RIGHT: {
    type: ACTION_TYPES.SHOOT_RIGHT,
    width: 166.875,
    dir: -1,
    img: 'shootRight.png',
    steps: 7,
    mask:[166.875,96]
  },
   SHOOT_LEFT: {
    type: ACTION_TYPES.SHOOT_LEFT,
    width: 166.875,
    dir: 1,
    img: 'shootLeft.png',
    steps: 7,
    mask:[166.875,96]
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
      height: '6px',
      width: '6px',
      boxShadow: 'white 0px 0px 10px',
      top: '100px',
      border: '2px solid rgb(96, 128, 192)',
      left: '100px'
    },
    shootingRate: 1000
  }
}
