var FamousPlatform = require('famous');
var Size = FamousPlatform.components.Size;
var Position = FamousPlatform.components.Position;
var Rotation = FamousPlatform.components.Rotation;
var Align = FamousPlatform.components.Align;
var Origin = FamousPlatform.components.Origin;
var MountPoint = FamousPlatform.components.MountPoint;
var DOMElement = FamousPlatform.domRenderables.DOMElement;
var PhysicsEngine = FamousPlatform.physics.PhysicsEngine;
var Famous = FamousPlatform.core.Famous;
var Clock = Famous.getClock();
var physics = FamousPlatform.physics;
var math = FamousPlatform.math;
var UIEventHandler = FamousPlatform.components.UIEventHandler;
var Collision = physics.Collision;
var Box = physics.Box;
var Vec3 = math.Vec3;
var Wall = physics.Wall;
var Gravity = physics.Gravity1D
var Transitionable = FamousPlatform.transitions.Transitionable;
var audio = new Audio('./sounds/plasma.mp3');


function Game(node){
  this.simulation = new PhysicsEngine();
  this.node = node;
  this.mainBgPos = 0;

  this.mainEl = new DOMElement(this.node, {
    properties: {
      'background-image': 'url(./images/city2.png)',
      'background-repeat': 'repeat-x',
      'background-position': 'center',
      'background-position': '10px'
    }
  })

  this.currentEvent = null;
  this.stepsAmount = null;
  this.eventDuration = null;
  this.timer = 0;
  this.score = 0;

  this.bullets = [];
  this.enemies = [];
  
  //update the physics engine
  var updater = {
    onUpdate: function(t) {
      this.simulation.update(t)
      this.update()
      Famous.requestUpdateOnNextTick(updater);
    }.bind(this)
  }

  Famous.requestUpdateOnNextTick(updater);

  _createKeyEvents.call(this)
  _createPlayer.call(this)
  _createTitles.call(this)
  _createBodies.call(this)

  
 createEnemy.call(this)
  createEnemy.call(this)
  createEnemy.call(this)
  createEnemy.call(this)

  var sizer = new Size(node)
  sizer.onSizeChange = function(size){
    this.mainHeight = size[0]
    this.mainWidth = size[1]
    // this.wall3.setPosition(this.mainWidth,0,0);
    // this.wall4.setPosition(0,this.mainHeight,0)

  }.bind(this)

 

}

Game.prototype.update = function(){
  
  //loop through bullet views and update to corresponding box in PE 
  if(this.bullets.length > 0){
    for(var i = 0; i < this.bullets.length; i++){
      var bulletPosition = this.simulation.getTransform(this.bullets[i][0]).position
      this.bullets[i][1].set(bulletPosition[0], bulletPosition[1], 2)
    }
  }
  
  //loop through enemies and update to corresponding box in PE
  if(this.enemies.length > 0){
    for(var i = 0; i < this.enemies.length; i++){
      var enemyPosition = this.simulation.getTransform(this.enemies[i][0]).position
      this.enemies[i][1].set(enemyPosition[0], enemyPosition[1], 0)
    }
  }

  //box that updates player
  var boxTransform = this.simulation.getTransform(this.box).position;
  var x = boxTransform[0]
  var y = boxTransform[1]
  var z = boxTransform[2]

  this.player.position.set(x,y,z)

 
  //starts the sprite animations when a new event is called
  if(this.currentEvent!==null){

    this.timer++;
    
    //calls sprite frame on 'this.eventDuration' intervals
    if(this.timer%this.eventDuration === 0){
      this.currentEvent.call(this)
      this.player.currentStep++
    }
    
    //reset to defaults when sprite animation is finished
    if(this.player.currentStep > this.stepsAmount){
      this.currentEvent = null;
      this.timer = 0;
      this.player.currentStep = 0;
      this.player.backgroundPosition = 0;
      this.player.jumping = false;
    }

  }


}




function _createKeyEvents(){
  //hack until figure out keydown event 
  window.addEventListener('keydown', function(e){
    
    //up
    if(e.which === 38){
       initEvent.call(this, 13, 6, Jump)
    }
    
    //left
    if(e.which === 37){
       initEvent.call(this, 13, 4, moveLeft)
    }
    //right
    if(e.which === 39){
      initEvent.call(this, 13, 4, moveRight) 
    }
    
    //spacebar
    if(e.which === 32){
     console.log('pew')
    
       initEvent.call(this, 7, 5, shoot)
       new Audio('./sounds/plasma.mp3').play()
       createBullet.call(this)
     
    }
  
  }.bind(this))

}


function _createPlayer(){
   //player 
  var playerNode = this.node.addChild()
  
  this.player = {
    node: playerNode,
    el: new DOMElement(playerNode),
    health: 50,
    currentStep: 0,
    backgroundPosition: 0,
    direction: 'right',
    movement: [],
    jumping: false,
    size: new Size(playerNode),
    position: new Position(playerNode),
    mountpoint: new MountPoint(playerNode)
  }
   
  this.player.el.setProperty('background-image', 'url(./images/vctrmanidle.png)')
   //size and center player
  this.player.size.setMode(1,1)
  this.player.size.setAbsolute(96,96)
  this.player.mountpoint.set(0.5,0.5)
  
}



function _createTitles(){
 //titles
  var titles = this.node.addChild()
  this.titles = {
    align: new Align(titles),
    size: new Size(titles),
    el: new DOMElement(titles)
  }
  //size and set title 
  this.titles.align.set(0.01,0.01)
  this.titles.size.setMode(1,1)
  this.titles.size.setAbsolute(150,50)
  this.titles.el.setContent('score: '+this.score+ ' health: '+ this.player.health)
  this.titles.el.setProperty('color', 'white')

}

function _createBodies(){
  
  //create box for player
  this.box = new Box({
    size: [90,90,50],
    mass: 10,
    restrictions: ['z'],
    position: new Vec3(500,50,0)
  });

  //id player for collision events
  this.box.player = true;
  
  //set up boundaries
  this.wall1 = new Wall({direction: physics.Wall.RIGHT, restitution: 5, friction: 2});
  this.wall2 = new Wall({direction: physics.Wall.DOWN, restitution: 5, friction: 2});
  this.wall3 = new Wall({direction: physics.Wall.LEFT, restitution: 5, friction: 2});
  this.wall4 = new Wall({direction: physics.Wall.UP, restitution: 5, friction: 2});
  
  //best practice here for width/height?
  this.wall3.setPosition(window.innerWidth,0,0);
  this.wall4.setPosition(0,window.innerHeight,0)

  this.gravity = new Gravity([this.box])
  this.enemyCollision = new Collision([this.wall1, this.wall2, this.wall3, this.wall4])

  this.collision = new Collision([this.box, this.wall1, this.wall2, this.wall3, this.wall4])
  this.simulation.add(this.gravity,this.box, this.collision, this.enemyCollision)
  //this.enemyCollision = new Collision()
  

}


function createEnemy(){
  
  var enemy = new Box({
    size: [90,90,50],
    mass: 50,
    restrictions: ['z'],
    position: new Vec3((Math.random()*window.innerWidth),-200,0)
  });

  //id as enemy for collision events
  enemy.enemy = true;

  var enemyNode = this.node.addChild()
  //this.gravity.addTarget(enemy)
  this.simulation.addBody(enemy, this.gravity)
  //better implementation?
  //add el to enemy so we can modify it in bullet collision
  enemy.enemyEl = new DOMElement(enemyNode)
  var enemyPosition = new Position(enemyNode)
  var enemySize = new Size(enemyNode)
  var enemyMountPoint = new MountPoint(enemyNode)
  //enemy.enemyEl.setProperty('background-color', 'red')
  enemySize.setMode(1,1,0)
  enemySize.setAbsolute(90,90,0)
  enemyMountPoint.set(0.5,0.5)
  enemyPosition.set(10,10)
  this.collision.addTarget(enemy)
  this.enemyCollision.addTarget(enemy)
  this.enemies.push([enemy, enemyPosition])
  enemy.enemyEl.setContent('<img src="./images/live.gif" />')
  
  //enemy collision event
  enemy.events.on('collision:start', function(e){
    //if collided with a player
    if(e.bodyA.player || e.bodyB.player){
      //decrease health 
      this.player.health--;
     
      //console.log('ouch', this.player.health)
      //update scoreboard
      //this.titles.el.setContent('score: '+this.score+ ' health: '+ this.player.health)
      
      //alert if no more health
  
    }

 }.bind(this))


}



function createBullet(){
  
  //init position of bullet
  var boxTransform = this.simulation.getTransform(this.box).position;
  var x = boxTransform[0] + 10;
  var y = boxTransform[1];
  
  var bullet = new Box({
    size: [10,10,50],
    mass: 110,
    restrictions: ['z'],
    position: new Vec3(x,y,0)
  });
  
  //id as bullet for checking collision events
  bullet.bullet = true;
  
  this.enemyCollision.addTarget(bullet)
  this.simulation.addBody(bullet)

  var bulletShell = this.node.addChild()
  var bulletEl = new DOMElement(bulletShell)
  var bulletPosition = new Position(bulletShell)
  var bulletSize = new Size(bulletShell)
  bulletEl.setProperty('background-color', 'rgba(228, 240, 253, 0.76)')
  bulletEl.setProperty('border-radius', '50%')
  bulletEl.setProperty('box-shadow', '0px 0px 10px rgb(228, 240, 253)')
  bulletSize.setMode(1,1,1)
  bulletSize.setAbsolute(10,10,10)
   
  this.bullets.push([bullet, bulletPosition])
   
  //set velocity based on player direction

  if(this.player.direction === 'left'){
     bullet.setVelocity(-1000, 0,0)
  }

  if(this.player.direction === 'right'){
    bullet.setVelocity(1000,0,0)
  }
 
  

  this.collided = false;
  //bullet collision events
  bullet.events.on('collision:start', function(e){
    //check if collided body is an enemy
    if(e.bodyA.enemy){
      this.score++;
    
      //on hit update score and change enemy image to dead
      //var updatedScore = 'score: '+this.score+ ' health: '+ this.player.health
      //console.log(updatedScore, this.titles.el.setContent(updatedScore))
      //this.titles.el.setContent()
      e.bodyA.enemyEl.setContent('<img src="./images/dead.png" />')
    //only play sound on bullet's first hit
    if(!this.collided){
      new Audio('./sounds/hit.mp3').play()
      this.collided = true;
    }
   
    }
  }.bind(this))



}

//makes sure events aren't called twice 
function initEvent(steps, duration, callback){
  
  if(this.currentEvent !== callback){
    this.player.currentStep = 0;
    this.currentEvent = callback;
    this.stepsAmount = steps;
    this.eventDuration = duration;
  }

}

function shoot(){

  //shoot right and not jumping sprite
  if(this.player.direction === 'right' && !this.player.jumping){
    //move sprite frame
    if(this.player.currentStep > 0 && this.player.currentStep <= 7){
      this.player.backgroundPosition-=168
      var num = this.player.backgroundPosition
      this.player.el.setProperty('background-position', num + 'px')
    }
    //init sprite
    if(this.player.currentStep === 0 && !this.player.jumping){
      this.player.size.setMode(1,1)
      this.player.size.setAbsolute(168,96)
      this.player.el.setProperty('background-position', 0 + 'px')
      this.player.el.setProperty('background-image', 'url(./images/shootRight.png)')
      this.player.backgroundPosition = 0
    }
  }
  
  //shoot left and not jumping sprite
  if(this.player.direction === 'left' && !this.player.jumping){
    //move sprite frame
    if(this.player.currentStep > 0 && this.player.currentStep <= 7){
      this.player.backgroundPosition+=168
      var num = this.player.backgroundPosition
      this.player.el.setProperty('background-position', num + 'px')
    }
    //init sprite
    if(this.player.currentStep === 0 && !this.player.jumping){
      this.player.size.setMode(1,1)
      this.player.size.setAbsolute(168,96)
      this.player.backgroundPosition = 168
      this.player.el.setProperty('background-image', 'url(./images/shootLeft.png)')
      this.player.el.setProperty('background-position', 168 + 'px')
     
    }
  }
  
  //shoot right and jumping sprite
  if(this.player.direction === 'right' && this.player.jumping){
    //move sprite frame
    if(this.player.currentStep > 1 && this.player.currentStep <= 7){
      this.player.backgroundPosition-=185
      var num = this.player.backgroundPosition
      this.player.el.setProperty('background-position', num + 'px')
    }
    //init sprite
    if(this.player.currentStep === 0 && this.player.jumping){
      this.player.backgroundPosition = 0
      this.player.size.setMode(1,1)
      this.player.size.setAbsolute(185,100)
      this.player.el.setProperty('background-position', 4 + 'px')
      this.player.el.setProperty('background-image', 'url(./images/jumpShootRight.png)')
      this.player.jumping = true;
    }
  }
  
  //shoot left and jumping sprite
  if(this.player.direction === 'left' && this.player.jumping){
    //move sprite frame
    if(this.player.currentStep > 1 && this.player.currentStep <= 7){
      this.player.backgroundPosition+=185
      var num = this.player.backgroundPosition
      this.player.el.setProperty('background-position', num + 'px')
    }
    //init sprite
    if(this.player.currentStep === 0 && this.player.jumping){
      this.player.backgroundPosition = 185
      this.player.size.setMode(1,1)
      this.player.size.setAbsolute(185,100)
      this.player.el.setProperty('background-position', 185 + 'px')
      this.player.el.setProperty('background-image', 'url(./images/jumpShootLeft.png)')
      this.player.jumping = true;
    }
  }
  

}



function moveRight(){
var bgpos = this.mainBgPos-=1
 this.mainEl.setProperty('background-position', bgpos + 'px')

  this.player.direction = 'right'
  //do not start moverRight sprite if jumping
  if(!this.player.jumping){ 
    //move sprite frame
    if(this.player.currentStep > 0 && this.player.currentStep <= 14){
      this.player.backgroundPosition-=96
      var num = this.player.backgroundPosition
      this.player.el.setProperty('background-position', num + 'px')
    }
    //init move right sprite
    if(this.player.currentStep === 0){
      this.player.el.setProperty('background-image', 'url(./images/moveRight.png)')
      this.player.backgroundPosition = 0
      this.player.size.setMode(1,1)
      this.player.size.setAbsolute(96,96)
      this.player.el.setProperty('background-position', 0 + 'px')
    }  
  }
  this.box.setVelocity(50,this.box.getVelocity()[1],this.box.getVelocity()[2])
  
}

function moveLeft(){
  var bgpos = this.mainBgPos+=1
  this.mainEl.setProperty('background-position', bgpos + 'px')
  this.player.direction = 'left'
  //do not start moveLeft sprite if jumping
  if(!this.player.jumping){
    //move sprite frame
    if(this.player.currentStep > 0 && this.player.currentStep <= 14){
      this.player.backgroundPosition+=96
      var num = this.player.backgroundPosition
      this.player.el.setProperty('background-position', num + 'px')
    }
    //init move left sprite
    if(this.player.currentStep === 0){
      this.player.el.setProperty('background-image', 'url(./images/moveLeft.png)')
      this.player.backgroundPosition = 0
      this.player.size.setMode(1,1)
      this.player.size.setAbsolute(96,96)
      this.player.el.setProperty('background-position', 0 + 'px')
    }
  }   
  this.box.setVelocity(-100,this.box.getVelocity()[1],this.box.getVelocity()[2])
  
}

function Jump(){
  this.player.jumping = true;
  //right jump
  if(this.player.direction === 'right'){
    //move sprite frame
    if(this.player.currentStep > 0 && this.player.currentStep <= 13){
        this.player.backgroundPosition-=96
        var num = this.player.backgroundPosition
        this.player.el.setProperty('background-position', num + 'px')
      
    }
    //init jump right sprite     
    if(this.player.currentStep === 0){
      this.player.el.setProperty('background-image', 'url(./images/jumpRight.png)')
      this.player.size.setMode(1,1)
      this.player.size.setAbsolute(96,96)
      this.player.backgroundPosition = 0
      this.player.el.setProperty('background-position', 0 + 'px')
    }  
  } 
  //left jump
  if(this.player.direction === 'left'){
    //move sprite frame
    if(this.player.currentStep > 0 && this.player.currentStep <= 13){
        this.player.backgroundPosition+=96
        var num = this.player.backgroundPosition
        this.player.el.setProperty('background-position', num + 'px')
      
    }
    //init jump left sprite    
    if(this.player.currentStep === 0){
      this.player.el.setProperty('background-image', 'url(./images/jumpLeft.png)')
      this.player.size.setMode(1,1)
      this.player.size.setAbsolute(96,96)
      this.player.backgroundPosition = 0
      this.player.el.setProperty('background-position', 0 + 'px')
    }  
    
  } 
  this.box.setVelocity(this.box.getVelocity()[0],-80,this.box.getVelocity()[2])
  
}

module.exports = Game