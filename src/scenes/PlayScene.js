import Phaser from "phaser";


class PlayScene extends Phaser.Scene{

    constructor(config) {
        super('PlayScene');
        this.config = config;
       // console.log(config);
        
        this.birds = null;
        this.pipes = null;
        this.upperpipe = null;
        this.lowerpipe = null;
        let flapVelocity = 250;
        this.GapBetweenPipes = [50,100];
        this.pipeHorizontaldistance = 0;
        
        this.horizontaldistancerange = [400,600];
        this.flapVelocity = 250;

    }


   preload() {
        console.log(this.config);
        this.load.image('sky','assets/sky.png');
        this.load.image('bird', 'assets/bird.png');
        this.load.image('pipe','assets/pipe.png');
       
    }

     create() {
        
        console.log(this.config,"add");
  this.add.image(0,0,'sky').setOrigin(0);
  //this.add.image(config.startposition.x,config.startposition.y, 'bird');
  this.birds = this.physics.add.sprite(this.config.startPosition.x,this.config.startPosition.y,'bird').setOrigin(0,1)
  this.birds.body.gravity.y = 400;

  

  this.birds.body.gravity.y = 200;

  this.pipes = this.physics.add.group();

  for(let i=0;i<4;i++) {
    

    this.upperpipe = this.pipes.create(0,0,'pipe').setOrigin(0,1);
    this.upperpipe.body.immovable = true;
    this.lowerpipe = this.pipes.create(0,0,'pipe').setOrigin(0,0);
    this.lowerpipe.body.immovable = true;
    this.placepipe(this.upperpipe,this.lowerpipe);
    
    
  }

  this.pipes.setVelocityX(-200);
  //upperpipe = this.physics.add.sprite(200,300,'pipe').setOrigin(0);


  this.createCollider(this)

  this.input.on('pointerdown',this.flap,this);
  this.input.keyboard.on('keydown_SPACE',this.flap,this);
  

  
  //debugger
}

flap() {
    this.birds.body.velocity.y = - this.flapVelocity;
  }

  createCollider() {
      this.physics.add.collider(this.birds,this.pipes,this.restartBirdPosition,null,this);
  }
 update() {
    if(this.birds.y > this.config.height || this.birds.y <= -this.birds.height )
    {
      this.restartBirdPosition();
    }
  
    this.recyclePipes();
  }
  
   placepipe(upipe,lpipe) {
    //let getrightmostpipeX = getRightMostPipe(upipe);
    this.pipeHorizontaldistance += Phaser.Math.Between(this.horizontaldistancerange[0],this.horizontaldistancerange[1]);
    let pipeVerticalDistance = Phaser.Math.Between(100,150);
    let pipeVerticalPosition = Phaser.Math.Between(0+20,this.config.height-20-pipeVerticalDistance);
  
      upipe.x = this.pipeHorizontaldistance;
  
      lpipe.x = this.pipeHorizontaldistance;
  
      upipe.y =pipeVerticalPosition;
  
      lpipe.y = upipe.y + pipeVerticalDistance;
  
      //upipe.body.velocity.x =  -200;
  
      //lpipe.body.velocity.x =-200;                 
  
      //pipeHorizontaldistance += 400
  
    
  }

  
 recyclePipes() {

    const temppipes = [];
    this.pipes.getChildren().forEach(pipe => {
      if(pipe.getBounds().right <= 0)
      {
        if(pipe.getBounds().right <= 0)
        {
          temppipes.push(pipe);
  
          if(temppipes.length ===2)
          {
            this.placepipe(...temppipes);
          }
        }
      }
    })
  }
  getRightMostPipe() {
  
    let rightmostX = 0;
  
    this.pipes.getChildren().forEach(function(pipe) {
      rightmostX = Math.max(pipe.x,rightmostX);
    })
  }
  
restartBirdPosition() {

    this.birds.body.velocity.y = 0;
  
    this.birds.x = this.config.startPosition.x;
    this.birds.y = this.config.startPosition.y;
    this.physics.pause();
    this.birds.setTint(0xf0000);
  
  }
}


export default PlayScene