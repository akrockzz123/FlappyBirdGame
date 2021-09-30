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
        this.GapBetweenPipes = [1500,2000];
        this.pipeHorizontaldistance = 0;
        
        this.horizontaldistancerange = [400,600];
        this.flapVelocity = 300;
        this.score = 0;
        this.scoreText = '';
        this.bestScore = 0;
        this.bestScoreText='';
    }


   preload() {
        console.log(this.config);
        this.load.image('sky','assets/sky.png');
       
        this.load.image('pipe','assets/pipe.png');
        this.load.image('pause','assets/pause.png');
        this.load.spritesheet('bird','assets/birdSprite.png',{
            frameWidth: 16,frameHeight: 16
        });
    }

     create() {
        
        console.log(this.config,"add");
  this.add.image(0,0,'sky').setOrigin(0);
  //this.createPause();
  //this.add.image(config.startposition.x,config.startposition.y, 'bird');
  this.birds = this.physics.add.sprite(this.config.startPosition.x,this.config.startPosition.y,'bird').setScale(3).setFlip(true).setOrigin(0,1)
  this.birds.body.gravity.y = 400;
  this.birds.body.setCollideWorldBounds = true;

  this.pipeHorizontaldistance = 0;

  this.birds.body.gravity.y = 200;

  this.pipes = this.physics.add.group();

  this.scoreText = '';
  this.score = 0;
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
  this.createScore();
  this.input.on('pointerdown',this.flap,this);

  this.createPause();
  this.input.keyboard.on('keydown_SPACE',this.flap,this);

  this.anims.create({
      key : 'fly',
      frames: this.anims.generateFrameNumbers('bird',{
          start: 8,
          end: 15
      }),
      frameRate: 8,
      repeat: -1,

      
  })

  this.birds.play('fly');
  
}
  //debugger




flap() {
    this.birds.body.velocity.y = - this.flapVelocity;
  }

  increaseScore() {
      this.score++;
      this.scoreText.setText(`Score: ${this.score}`);
      if(this.bestScore >= this.score)
      {
        this.bestScore = this.bestScore;
      }
      else
      {
        this.bestScore = this.score;
      }
      
      this.bestScoreText.setText(`BestScore: ${this.bestScore}`);
  }

  createCollider() {
      this.physics.add.collider(this.birds,this.pipes,this.restartBirdPosition,null,this);
  }
  createScore() {
      this.score = 0;
      this.scoreText = this.add.text(16,16,`Score ${0}  `, { fontSize: '32px',fills: '#000'});
      this.bestScoreText = this.add.text(50,50,`BestScore ${this.bestScore}  `, { fontSize: '32px',fills: '#000'});
  }
  createPause() {
      const pauseButton = this.add.image(this.config.width-30,this.config.height-30,'pause').setScale(3).setOrigin(1);

      pauseButton.setInteractive();

      pauseButton.on('pointerdown',() => {
          console.log("pausing the game");
          this.physics.pause();
          this.scene.pause();
      })
  }
 update() {
    if(this.birds.getBounds().bottom >= this.config.height || this.birds.getBounds().y <= 0 )
    {
      this.restartBirdPosition();
    }
  
    this.recyclePipes();
  }
  
   placepipe(upipe,lpipe) {
    //let getrightmostpipeX = getRightMostPipe(upipe);
    this.pipeHorizontaldistance += Phaser.Math.Between(this.horizontaldistancerange[0],this.horizontaldistancerange[1]);
    let pipeVerticalDistance = Phaser.Math.Between(200,250);
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
              this.increaseScore();
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
  
    //this.birds.x = this.config.startPosition.x;
    //this.birds.y = this.config.startPosition.y;
    this.physics.pause();
    this.birds.setTint('#ff0000');

    this.time.addEvent({
        delay: 2000,
        callback: () => {
            this.scene.restart();
        },
        loop: false
    })
  
  }
}


export default PlayScene