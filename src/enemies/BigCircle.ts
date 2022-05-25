import { canvas } from "../consts";
import { Rectangle } from "../Drawable";
import { keys } from "../Events";
import { IMGS } from "../Images";
import Enemy from "./Enemy";

export default class BigCircle extends Enemy {
  width = 48
  height = 40
  sprite: HTMLImageElement | string = IMGS.bigCircleDown;
  vel = 2

  phase = 0;

  counter = 0;
  move() {
    if (this.sprite instanceof HTMLImageElement && this.sprite.src == null) this.sprite = IMGS.bigCircleDown
    if (this.sprite instanceof HTMLImageElement) this.width = this.sprite.width
    if (this.sprite instanceof HTMLImageElement) this.height = this.sprite.height

    let yShift = 0, xShift = 0

    switch (this.phase) {
      case 0:
        this.squares = this.allSqaures.bigCircleDown;
        yShift = this.vel;
        // if (this.y2 > 124) { this.phase++; keys.fps = 1 }
        if (this.y2 > 124) this.phase++
        break;
      case 1:
        keys.fps = 1
        this.sprite = IMGS.bigCircleDownToRight1;
        this.squares = this.allSqaures.bigCircleDownToRight1;
        this.counter = 0;
        this.phase++;
        break;
      case 2:
        yShift = this.vel;
        xShift = this.vel;
        if (this.counter++ === 3) this.phase++;
        break;
      case 3:
        this.sprite = IMGS.bigCircleDownToRight2;
        this.squares = this.allSqaures.bigCircleDownToRight2;
        this.counter = 0;
        this.phase++;
        break;
      case 4:
        xShift = this.vel;
        yShift = this.vel;
        if (this.counter++ === 3) this.phase++;
        break;
      case 5:
        this.sprite = IMGS.bigCircleDownToRight3;
        this.squares = this.allSqaures.bigCircleDownToRight3;
        this.counter = 0;
        this.phase++;
        break;
      case 6:
        xShift = this.vel;
        yShift = this.vel;
        if (this.counter++ === 3) this.phase++;
        break;
      case 7:
        this.sprite = IMGS.bigCircleRight;
        this.squares = this.allSqaures.bigCircleRight;
        this.phase++;
        break;
      case 8:
        keys.fps = 50
        xShift = this.vel;
        if(this.x2 > 184) this.phase++;
        break;
      case 9:
        keys.fps = 1
        this.sprite = IMGS.bigCircleRightToUp1; 
        this.phase++;
        this.counter = 0;
        break;
      case 10:
        xShift = this.vel
        yShift = -this.vel
        if (this.counter++ === 3) this.phase++;
        break;
      case 11:
        this.sprite = IMGS.bigCircleRightToUp2; 
        this.phase++;
        this.counter = 0;
        break;
      case 12:
        xShift = this.vel
        yShift = -this.vel
        if (this.counter++ === 3) this.phase++;
        break;
      case 13:
        this.sprite = IMGS.bigCircleRightToUp3; 
        this.phase++;
        this.counter = 0;
        break;
      case 14:
        xShift = this.vel
        yShift = -this.vel
        if (this.counter++ === 3) this.phase++;
        break;
      case 15:
        this.sprite = IMGS.bigCircleUp; 
        this.phase++;
        break;
      case 16:
        yShift = -this.vel;
        if(this.y < 50) this.phase++;
        break;
        // uptoleft at 77 + 24 + ~8
        // leftToDown at 268
      case 17:
        this.sprite = IMGS.bigCircleUpToLeft1;
        this.phase++;
        this.counter = 0;
        break;
      case 18:
        xShift = -this.vel
        yShift = -this.vel
        if (this.counter++ === 3) this.phase++;
        break;
      case 19:
        this.sprite = IMGS.bigCircleUpToLeft2;
        this.phase++;
        this.counter = 0;
        break;
      case 20:
        xShift = -this.vel
        yShift = -this.vel
        if (this.counter++ === 3) this.phase++;
        break;
      case 21:
        this.sprite = IMGS.bigCircleUpToLeft3;
        this.phase++;
        this.counter = 0;
        break;
      case 22:
        xShift = -this.vel
        yShift = -this.vel
        if (this.counter++ === 3) this.phase++;
        break;
      case 23:
        this.sprite = IMGS.bigCircleLeft;
        this.phase++;
        this.counter = 0;
        break;
      case 24:
        xShift = -this.vel
        if (this.x < 49) this.phase++;
        break;
      case 25:
        this.sprite = IMGS.bigCircleLeftToDown1;
        this.phase++;
        this.counter = 0;
        break;
      case 26:
        xShift = -this.vel
        yShift = this.vel
        if (this.counter++ === 3) this.phase++;
        break;
      case 27:
        this.sprite = IMGS.bigCircleLeftToDown2;
        this.phase++;
        this.counter = 0;
        break;
      case 28:
        xShift = -this.vel
        yShift = this.vel
        if (this.counter++ === 3) this.phase++;
        break;
      case 29:
        this.sprite = IMGS.bigCircleLeftToDown3;
        this.phase++;
        this.counter = 0;
        break;
      case 30:
        xShift = -this.vel
        yShift = this.vel
        if (this.counter++ === 3) this.phase++;
        break;
      case 31:
        this.sprite = IMGS.bigCircleDown;
        this.phase++;
        this.counter = 0;
        break;
      case 32:
        yShift = this.vel
        // yShift = this.vel
        // if (this.counter++ === 3) this.phase++;
        break;
      default:
        break;
    }

    this.x += xShift;
    this.y += yShift;
    return this.x2 < 0 || this.y2 < 0 || this.x > canvas.width || this.y > canvas.height
  }

  readonly allSqaures = {
     bigCircleDown: [new Rectangle(this, 14, 0, 20, 8), new Rectangle(this, 20, 0, 8, 40), new Rectangle(this, 0, 22, 48, 12)],
     bigCircleDownToRight1: [new Rectangle(this, 4, 0, 14, 16), new Rectangle(this, 14, 10, 24, 20), new Rectangle(this, 0, 20, 24, 20)],
     bigCircleDownToRight2: [new Rectangle(this, 0, 0, 14, 14), new Rectangle(this, 14, 14, 22, 22), new Rectangle(this, 28, 6, 14, 14), new Rectangle(this, 8, 28, 12, 14)],
     bigCircleDownToRight3: [new Rectangle(this, 0, 2, 10, 22), new Rectangle(this, 10, 12, 30, 8), new Rectangle(this, 26, 0, 16, 12), new Rectangle(this, 18, 20, 24, 10), new Rectangle(this, 14, 30, 16, 12)],
     bigCircleRight: [ new Rectangle(this, 0, 14, 8, 16), new Rectangle(this, 0, 18, 44, 8), new Rectangle(this, 22, 0, 14, 43), ],
  };

}

