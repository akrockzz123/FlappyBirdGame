
import Phaser from "phaser";

import PlayScene from "./scenes/PlayScene";

const WIDTH = 800;
const HEIGHT = 600;

const BIRD_POSITION = {x:WIDTH/10,y: HEIGHT/2};

const SHARED_CONFIG = {
  width: WIDTH,
  height: HEIGHT,
  startPosition: BIRD_POSITION
}
const config = {
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
     
    }
  },
  scene: [new PlayScene(SHARED_CONFIG)]
};

new Phaser.Game(config);

const initialPosition = {
  x: config.width/10,
  y: config.height/2
}

let birds;

let upperpipe;
let lowerpipe;
let flapVelocity = 250;
const GapBetweenPipes = [50,100];
let pipeHorizontaldistance = 0;
let pipeVerticalDistance;
let pipeVerticalPosition;
let horizontaldistancerange = [400,600];
let pipes = null;
function preload () {
  
}

function create () {


  this.add.image(0,0,'sky').setOrigin(0);
  //this.add.image(initialPosition.x,initialPosition.y, 'bird');
  birds = this.physics.add.sprite(initialPosition.x,initialPosition.y,'bird').setOrigin(0,1)

  
  //upperpipe = this.physics.add.sprite(300,100,'pipes').setOrigin(0);
  



  birds.body.gravity.y = 200;

  pipes = this.physics.add.group();

  for(let i=0;i<4;i++) {
    

    upperpipe = pipes.create(0,0,'pipe').setOrigin(0,1);

    lowerpipe = pipes.create(0,0,'pipe').setOrigin(0,0);
    placepipe(upperpipe,lowerpipe);

    
  }

  pipes.setVelocityX(-200);
  //upperpipe = this.physics.add.sprite(200,300,'pipe').setOrigin(0);

  

  this.input.on('pointerdown',flap);
  this.input.keyboard.on('keydown_SPACE',flap);    
  
  //debugger
  // this.input.on('pointerdown', flap);
 
}

function update() {
  if(birds.y > config.height || birds.y <= -birds.height )
  {
    restartBirdPosition();
  }

  recyclePipes();
}

function placepipe(upipe,lpipe) {
  //let getrightmostpipeX = getRightMostPipe(upipe);
  pipeHorizontaldistance +=  Phaser.Math.Between(...horizontaldistancerange);
    pipeVerticalDistance = Phaser.Math.Between(100,150);
    pipeVerticalPosition = Phaser.Math.Between(0+20,config.height-20-pipeVerticalDistance);

    upipe.x = pipeHorizontaldistance;

    lpipe.x = pipeHorizontaldistance;

    upipe.y = pipeVerticalPosition;

    lpipe.y = upipe.y + pipeVerticalDistance;

    //upipe.body.velocity.x =  -200;

    //lpipe.body.velocity.x =-200;                 

    //pipeHorizontaldistance += 400

  
}

function recyclePipes() {

  const temppipes = [];
  pipes.getChildren().forEach(pipe => {
    if(pipe.getBounds().right <= 0)
    {
      if(pipe.getBounds().right <= 0)
      {
        temppipes.push(pipe);

        if(temppipes.length ===2)
        {
          placepipe(...temppipes);
        }
      }
    }
  })
}
function getRightMostPipe() {

  let rightmostX = 0;

  pipes.getChildren().forEach(function(pipe) {
    rightmostX = Math.max(pipe.x,rightmostX);
  })
}

function flap() {
  birds.body.velocity.y = - flapVelocity;
}


function restartBirdPosition() {

  birds.body.velocity.y = 0;

  birds.x = initialPosition.x;
  birds.y = initialPosition.y;

}