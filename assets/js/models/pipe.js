class Pipe {

  constructor(ctx, x, y, height, mode) {
    this.ctx = ctx;
    this.x = x;
    this.vx = 3;
    this.y = y;
    this.height = height;
    this.mode = mode;

    this.img = new Image();
    // iteration 3: load the source checking the mode and setup this.with (must be the image with)
    this.img.src = `assets/img/pipe-${mode}.png`;

    this.img.onload = () => {
      this.width = this.img.width;
    }
  }

  draw() {
    // iteration 3: draw the pipe don't worry if looks unscaled. You can start drawing a green rectangle
    switch(this.mode) {
      case 'top':
        this.ctx.drawImage(
          this.img,
          this.ctx.canvas.width,
          0,
          this.img.width,
          this.img.height,
        )
        break;

      case 'bottom':
        this.ctx.drawImage(
          this.img,
          this.ctx.canvas.width,
          0,
          this.img.width,
          this.img.height,
        )
        break;
    }
  }

  move () {
    // iteration 3: move the pipe
    this.x -= this.vx;
  }
}
