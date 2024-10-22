class FlappyBird {

  constructor(ctx, x, y) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.jumpImpulse = 60;
    this.vy = 3;

    this.sprite = new Image();
    this.sprite.src = 'assets/img/bird.png';
    
    // sprite setup
    this.sprite.horizontalFrameIndex = 0;
    this.sprite.verticalFrameIndex = 0;
    this.sprite.horizontalFrames = 3;
    this.sprite.verticalFrames = 1;

    this.sprite.onload = () => {
      this.sprite.frameWith = Math.floor(this.sprite.width / this.sprite.horizontalFrames);
      this.sprite.frameHeight = Math.floor(this.sprite.height / this.sprite.verticalFrames);
      this.width = this.sprite.frameWith;
      this.height = this.sprite.frameHeight;
    }

    this.drawCount = 0;
  }

  onKeyEvent(event) {
    const isJumping = event.type === 'keydown';
    switch (event.keyCode) {
      case KEY_UP:
        // iteration 2: jump! if necessary =D
        if (isJumping) {
          this.y -= this.jumpImpulse;
        }
        break;        
    }
  }

  draw() {
    // draw sprite
    this.ctx.drawImage(
      this.sprite,
      (this.sprite.horizontalFrameIndex / this.sprite.horizontalFrames) * this.sprite.width,
      0,
      this.sprite.width / this.sprite.horizontalFrames,
      this.sprite.height,
      this.x,
      this.y,
      this.width,
      this.height
    )

    this.drawCount++;

    // animate sprite
    this.animate();
  }

  animate() {
    // iteration 2: configure frame animation

    if (this.drawCount > 10) {
      this.drawCount = 0;
      this.sprite.horizontalFrameIndex++;

      if (this.sprite.horizontalFrameIndex > this.sprite.horizontalFrames - 1) {
        this.sprite.horizontalFrameIndex = 0;
      }
    }
  }

  move() {
    // iteration 2: move the y´
    this.y += this.vy;
  }

  collides(element) {
    // iteration 3: check collisions (true|false)
    const colX = element.x <= this.x + this.w && element.x + element.w >= this.x;
    const colY = element.y <= this.y + this.h && element.y + element.h >= this.y;

    return colX && colY;
  }
}
