import { canvas } from "../consts";
// import { keys } from "../Events";
import { Rectangle } from "../Drawable";
import { IMGS } from "../Images";
import Enemy from "./Enemy";

export default class BigCircle extends Enemy {
  width = 48
  height = 40
  sprite: HTMLImageElement | string = IMGS.bigCircleDown;
  sprites = ["pink", "red", "blue", "green", "black", "white"]
  vel = 1.8

  phase = 0;

  squares: Rectangle[] = [
    // new Rectangle(this.x, this.y, this.width, this.height),
    new Rectangle(this, 14, 0, 20, 8),
    new Rectangle(this, 20, 7, 8, 12),
    new Rectangle(this, 0, 20, 48, 20),
  ]

  counter = 0;
  move() {
    if (this.sprite instanceof HTMLImageElement && this.sprite.src == null) this.sprite = IMGS.bigCircleDown
    if (this.sprite instanceof HTMLImageElement) this.width = this.sprite.width
    if (this.sprite instanceof HTMLImageElement) this.height = this.sprite.height

    let yShift = 0, xShift = 0

    switch (this.phase) {
      case 0:
        yShift = this.vel;
        // if (this.y2 > 124) { this.phase++; keys.fps = 1 }
        if (this.y2 > 124) this.phase++
        break;
      case 1:
        this.sprite = IMGS.bigCircleDownToRight1;
        // this.squares = [new Rectangle(this.x, this.y, this.width, this.height)]
        this.phase++;
        break;
      case 2:
        yShift = this.vel;
        xShift = this.vel;
        this.phase++;
        break;
      case 3:
        this.sprite = IMGS.bigCircleDownToRight2;
        // this.squares = [new Rectangle(this.x, this.y, this.width, this.height)]
        this.counter = 0;
        this.phase++;
        break;
      case 4:
        xShift = this.vel;
        yShift = this.vel;
        if (this.counter++ === 1) this.phase++;
        break;
      case 5:
        this.sprite = IMGS.bigCircleDownToRight3;
        // this.squares = [new Rectangle(this.x, this.y, this.width, this.height)]
        this.phase++;
        break;
      case 6:
        xShift = this.vel;
        yShift = this.vel;
        this.phase++;
        break;
      case 7:
        this.sprite = IMGS.bigCircleRight;
        // width = 48
        // height = 40
        this.squares[0].change(0, 14, 8, 16);
        this.squares[1].change(0, 18, 44, 8);
        this.squares[2].change(22, 0, 14, 43);
        // new Rectangle(this.x + 20, this.y + 7, 8, 12),
        // new Rectangle(this.x, this.y + 20, 48, 20),
        this.phase++;
        break;
      case 8:
        xShift = this.vel;
        break;
      // case 4:
      //   // this.sprite = this.sprites[3];
      //   xShift = this.vel;
      //   yShift = this.vel;
      //   if (this.y2 > 160) this.phase++;
      //   break;
      // case 5:
      //   // this.sprite = this.sprites[0];
      //   xShift = this.vel;
      //   if (this.x2 > 150) this.phase++;
      //   break;
      // case 6:
      //   // this.sprite = this.sprites[1];
      //   yShift = -this.vel;
      //   xShift = this.vel;
      //   if (this.x2 > 220) this.phase++;
      //   break;
      // case 7:
      //   // this.sprite = this.sprites[2];
      //   yShift = -this.vel;
      //   xShift = this.vel;
      //   if (this.x2 > 240) this.phase++;
      //   break;
      // case 8:
      //   // this.sprite = this.sprites[3];
      //   yShift = -this.vel;
      //   xShift = this.vel;
      //   if (this.x2 > 260) this.phase++;
      //   break;
      // case 9:
      //   // this.sprite = this.sprites[0];
      //   yShift = -this.vel;
      //   if (this.y < 50) this.phase++;
      //   break;
      // case 10:
      //   yShift = -this.vel

      default:
        break;
    }

    // if (this.y > 80 && this.phase === 0) this.phase++;
    // else if (this.x > 40) this.phase++;

    // if (this.x === 25 && this.y < 100) {
    //   yShift = this.vel
    // } else if (this.y.toFixed(0) === '101' && this.x < 200) {
    //   xShift = this.vel
    // } else if (this.y > 20) {
    //   yShift = -this.vel;
    // } else if (this.x > 25) {
    //   xShift = -this.vel;
    // } else {
    //   yShift = this.vel;
    // }

    this.x += xShift;
    this.y += yShift;
    // for (const s of this.squares) {
    //   s.x += xShift;
    //   s.y += yShift;
    // }

    return this.x2 < 0 || this.y2 < 0 || this.x > canvas.width || this.y > canvas.height
  }

}

