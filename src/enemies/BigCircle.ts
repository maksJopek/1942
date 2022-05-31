import { canvas } from "../consts";
import { Rectangle } from "../Drawable";
// import { keys } from "../Events";
import { IMGS } from "../Images";
import Enemy from "./Enemy";

export default class BigCircle extends Enemy {
  width = 48
  height = 40
  sprite: HTMLImageElement | string = IMGS.bigCircleDown;
  strSprite = "bigCircleDown"
  vel = 2
  health = 20

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
        // keys.fps = 1
        // this.sprite = IMGS.bigCircleDownToRight1;
        this.strSprite = "bigCircleDownToRight1"
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
        // this.sprite = IMGS.bigCircleDownToRight2;
        this.strSprite = "bigCircleDownToRight2";
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
        // this.sprite = IMGS.bigCircleDownToRight3;
        this.strSprite = "bigCircleDownToRight3";
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
        // this.sprite = IMGS.bigCircleRight;
        this.strSprite = "bigCircleRight";
        this.squares = this.allSqaures.bigCircleRight;
        this.phase++;
        break;
      case 8:
        // keys.fps = 50
        xShift = this.vel;
        if (this.x2 > 184) this.phase++;
        break;
      case 9:
        // keys.fps = 1
        // this.sprite = IMGS.bigCircleRightToUp1;
        this.strSprite = "bigCircleRightToUp1";
        this.squares = this.allSqaures.bigCircleRightToUp1;
        this.phase++;
        this.counter = 0;
        break;
      case 10:
        xShift = this.vel
        yShift = -this.vel
        if (this.counter++ === 3) this.phase++;
        break;
      case 11:
        // this.sprite = IMGS.bigCircleRightToUp2;
        this.strSprite = "bigCircleRightToUp2";
        this.squares = this.allSqaures.bigCircleRightToUp2;
        this.phase++;
        this.counter = 0;
        break;
      case 12:
        xShift = this.vel
        yShift = -this.vel
        if (this.counter++ === 3) this.phase++;
        break;
      case 13:
        // this.sprite = IMGS.bigCircleRightToUp3;
        this.strSprite = "bigCircleRightToUp3";
        this.squares = this.allSqaures.bigCircleRightToUp3;
        this.phase++;
        this.counter = 0;
        break;
      case 14:
        xShift = this.vel
        yShift = -this.vel
        if (this.counter++ === 3) this.phase++;
        break;
      case 15:
        // this.sprite = IMGS.bigCircleUp;
        this.strSprite = "bigCircleUp";
        this.squares = this.allSqaures.bigCircleUp;
        this.phase++;
        break;
      case 16:
        yShift = -this.vel;
        if (this.y < 50) this.phase++;
        break;
      // uptoleft at 77 + 24 + ~8
      // leftToDown at 268
      case 17:
        // this.sprite = IMGS.bigCircleUpToLeft1;
        this.strSprite = "bigCircleUpToLeft1";
        this.squares = this.allSqaures.bigCircleUpToLeft1;
        this.phase++;
        this.counter = 0;
        break;
      case 18:
        xShift = -this.vel
        yShift = -this.vel
        if (this.counter++ === 3) this.phase++;
        break;
      case 19:
        // this.sprite = IMGS.bigCircleUpToLeft2;
        this.strSprite = "bigCircleUpToLeft2";
        this.squares = this.allSqaures.bigCircleUpToLeft2;
        this.phase++;
        this.counter = 0;
        break;
      case 20:
        xShift = -this.vel
        yShift = -this.vel
        if (this.counter++ === 3) this.phase++;
        break;
      case 21:
        // this.sprite = IMGS.bigCircleUpToLeft3;
        this.strSprite = "bigCircleUpToLeft3";
        this.squares = this.allSqaures.bigCircleUpToLeft3;
        this.phase++;
        this.counter = 0;
        break;
      case 22:
        xShift = -this.vel
        yShift = -this.vel
        if (this.counter++ === 3) this.phase++;
        break;
      case 23:
        // this.sprite = IMGS.bigCircleLeft;
        this.strSprite = "bigCircleLeft";
        this.squares = this.allSqaures.bigCircleLeft;
        this.phase++;
        this.counter = 0;
        break;
      case 24:
        xShift = -this.vel
        if (this.x < 49) this.phase++;
        break;
      case 25:
        // this.sprite = IMGS.bigCircleLeftToDown1;
        this.strSprite = "bigCircleLeftToDown1";
        this.squares = this.allSqaures.bigCircleLeftToDown1;
        this.phase++;
        this.counter = 0;
        break;
      case 26:
        xShift = -this.vel
        yShift = this.vel
        if (this.counter++ === 3) this.phase++;
        break;
      case 27:
        // this.sprite = IMGS.bigCircleLeftToDown2;
        this.strSprite = "bigCircleLeftToDown2";
        this.squares = this.allSqaures.bigCircleLeftToDown2;
        this.phase++;
        this.counter = 0;
        break;
      case 28:
        xShift = -this.vel
        yShift = this.vel
        if (this.counter++ === 3) this.phase++;
        break;
      case 29:
        // this.sprite = IMGS.bigCircleLeftToDown3;
        this.strSprite = "bigCircleLeftToDown3";
        this.squares = this.allSqaures.bigCircleLeftToDown3;
        this.phase++;
        this.counter = 0;
        break;
      case 30:
        // debugger
        xShift = -this.vel
        yShift = this.vel
        if (this.counter++ === 3) this.phase++;
        break;
      case 31:
        // this.sprite = IMGS.bigCircleDown;
        // TODO: IMPORANT, set sprite by strSprite and get red spites
        this.strSprite = "bigCircleDown";
        this.squares = this.allSqaures.bigCircleDown;
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
    bigCircleRight: [new Rectangle(this, 0, 14, 8, 16), new Rectangle(this, 8, 18, 36, 8), new Rectangle(this, 22, 0, 16, 43)],
    bigCircleRightToUp1: [new Rectangle(this, 0, 18, 10, 22), new Rectangle(this, 10, 20, 30, 10), new Rectangle(this, 28, 30, 14, 12), new Rectangle(this, 16, 0, 14, 20), new Rectangle(this, 30, 12, 12, 8)],
    bigCircleRightToUp2: [new Rectangle(this, 0, 28, 12, 14), new Rectangle(this, 12, 6, 22, 22), new Rectangle(this, 6, 0, 12, 12), new Rectangle(this, 28, 24, 12, 12)],
    bigCircleRightToUp3: [new Rectangle(this, 6, 28, 12, 12), new Rectangle(this, 0, 2, 24, 14), new Rectangle(this, 12, 16, 26, 10), new Rectangle(this, 24, 10, 10, 6), new Rectangle(this, 26, 26, 10, 4)],
    bigCircleUp: [new Rectangle(this, 14, 32, 20, 8), new Rectangle(this, 20, 0, 8, 32), new Rectangle(this, 0, 6, 48, 12)],
    bigCircleUpToLeft1: [new Rectangle(this, 20, 28, 14, 10), new Rectangle(this, 14, 2, 12, 24), new Rectangle(this, 26, 0, 12, 16), new Rectangle(this, 0, 10, 12, 20)],
    bigCircleUpToLeft2: [new Rectangle(this, 28, 28, 12, 12), new Rectangle(this, 6, 6, 22, 22), new Rectangle(this, 22, 0, 12, 12), new Rectangle(this, 0, 22, 12, 14)],
    bigCircleUpToLeft3: [new Rectangle(this, 32, 24, 10, 22), new Rectangle(this, 24, 28, 8, 8), new Rectangle(this, 0, 18, 26, 16), new Rectangle(this, 18, 0, 12, 16), new Rectangle(this, 12, 8, 6, 10), new Rectangle(this, 0, 32, 14, 17)],
    bigCircleLeft: [new Rectangle(this, 36, 12, 8, 16), new Rectangle(this, 0, 16, 36, 8), new Rectangle(this, 8, 0, 14, 41)],
    bigCircleLeftToDown1: [new Rectangle(this, 32, 5, 10, 21), new Rectangle(this, 2, 16, 30, 6), new Rectangle(this, 0, 0, 14, 16), new Rectangle(this, 0, 22, 24, 10), new Rectangle(this, 12, 32, 16, 10)],
    bigCircleLeftToDown2: [new Rectangle(this, 28, 0, 12, 14), new Rectangle(this, 6, 14, 22, 22), new Rectangle(this, 22, 30, 12, 12), new Rectangle(this, 0, 6, 10, 12)],
    bigCircleLeftToDown3: [new Rectangle(this, 20, 2, 14, 10), new Rectangle(this, 18, 12, 8, 26), new Rectangle(this, 26, 24, 12, 14), new Rectangle(this, 0, 12, 14, 12), new Rectangle(this, 14, 24, 4, 14), new Rectangle(this, 4, 24, 10, 6), new Rectangle(this, 12, 14, 8, 14)],
  };

}

