import Phaser from "phaser";


class PlayScene extends Phaser.Scene{

    constructor(config) {
        super('PlayScene');
        this.config = config;
       // console.log(config);
        
        this.birds = null;
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
}

    update() {
        console.log(this.config,"add");
    }
};

export default PlayScene