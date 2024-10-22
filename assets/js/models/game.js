class Game {

  constructor(canvasId, onGameEnd) {
    this.canvas = document.getElementById(canvasId);
    this.canvas.width = 384;
    this.canvas.height = 498;
    this.ctx = this.canvas.getContext('2d');

    this.drawIntervalId = undefined;
    this.fps = 1000 / 60;

    // iteration 1: setup the backgroundo
    this.background = new Background(this.ctx);
    
    // iteration 2: setup the flappy
    this.flappybird = new FlappyBird(this.ctx, 50, this.canvas.height / 2);

    this.pipes = [];
    this.drawPipesCount = 0;
    this.pipesFrequency = 100;

    // bonus: setup the score
  }
  

  onKeyEvent(event) {
    // iteration 2: link flappy key events
    this.flappybird.onKeyEvent(event);

  }

  start() {
    if (!this.drawIntervalId) {
      this.drawIntervalId = setInterval(() => {
        // Iteration 1: each 60f clear - move - draw - [next iterations: addPipes - checkCollisions - checkScore]
        this.clear();

        this.move();
        
        this.draw();

        this.addPipes();
        
        this.checkCollisions();

      }, this.fps);
    }
  }

  stop() {
    // Iteration 1: stop the game
    clearInterval(this.drawIntervalId);
  }

  restart() {
    // Bonus: restart on demand
    this.pipes = [];
    this.flappybird.x = 50;
    this.flappybird.y = this.canvas.height / 2;
    this.start();
  }

  end() {
    // Iteration 4: stop the game and setup score
    this.stop();
    
    const restartLogo = new Image();
    restartLogo.src = 'assets/img/restart.png';

    restartLogo.onload = () => {
      const imageWidth = restartLogo.width;
      const imageHeight = restartLogo.height;
      
      const centerX = (this.canvas.width - imageWidth) / 2;
      const centerY = (this.canvas.height - imageHeight) / 2;
      
      this.ctx.drawImage(restartLogo, centerX, centerY);
    };
  }

  clear() {
    // Iteration 1: clean the screen
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  move() {
    // Iteration 1: move the background
    this.background.move();

    // Iteration 2: move the flappy
    this.flappybird.move();

    // Iteration 3: move the pipes
    this.pipes.forEach((pipe) => pipe.move());
  }

  addPipes() {
    // Iteration 3: each draw pipes frequency cycles concat a pair of pipes to the pipes array and reset the draw cycle
    this.pipes.concat(this.randPairOfPipes());
    this.drawPipesCount = 0;
  }

  randPairOfPipes() {
    const space = this.canvas.height - this.background.footerImg.height;
    const gap = (this.flappybird.height * 2) + this.flappybird.jumpImpulse;
    const topSize = Math.floor(Math.random() * (space - gap) * 0.75);
    const bottomSize = space - topSize - gap;
    // Iteration 3: return two new pipes one at the top and other at the bottom
    return [
      new Pipe(this.ctx, this.canvas.width, 0, topSize, 'top'),
      new Pipe(this.ctx, this.canvas.width, this.canvas.height - this.background.footerImg.height - bottomSize, bottomSize, 'bottom')
    ];
  }

  checkCollisions() {
    // Iteration 4: check pipes collisions among flappy and end game if any pipe collides with the bird
    if (/*this.flappybird.collides(pipe) || */this.flappybird.collides(this.background.footerImg) || this.flappybird.y + this.flappybird.height >= this.background.y || this.flappybird.y <= 0) {
      this.end();
    }
  }

  checkScore() {
    // Bonus
  }

  draw() {
    // Iteration 1: draw the background
    this.background.draw();

    // Iteration 2: draw the flappy
    this.flappybird.draw();

    // Iteration 2: draw the pipes
    this.pipes.forEach(pipe => pipe.draw());

    // Bonus: draw the score

    this.drawPipesCount++;
  }
}
