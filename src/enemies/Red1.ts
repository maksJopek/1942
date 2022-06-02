import { Rectangle } from "../Drawable";
import { getSmallDeathAnim, IMGS } from "../Images";
import Enemy from "./Enemy";

export default class Red1 extends Enemy {
  sprite = IMGS.redRight;
  width = IMGS.redRight.width;
  height = IMGS.redRight.height;
  vel = 3
  phase = 0;
  spriteNum = 1;
  i = 0;
  squares: Rectangle[] = [new Rectangle(this, 2, 2, this.width - 2, this.height - 2)]

  move() {
    let dx = 0, dy = 0;

    switch (this.phase) {
      case 0:
        dx = this.vel;
        if (this.x2 > 145) this.phase++;
        // if (this.i++ === 19) this.phase++;
        break;
      case 1:
        this.sprite = IMGS.redRightToDown;
        this.phase++;
        this.i = 0;
        break;
      case 2:
        dx = this.vel;
        dy = this.vel;
        if (this.i++ === 7) this.phase++;
        break;
      case 3:
        this.sprite = IMGS.redDown;
        this.phase++;
        this.i = 0;
        break;
      case 4:
        dy = this.vel;
        // if (this.y > 125) this.phase++;
        if (this.i++ === 19) this.phase++;
        break;
      case 5:
        this.sprite = IMGS.redDownToLeft;
        this.phase++;
        this.i = 0;
        break;
      case 6:
        dx = -this.vel;
        dy = this.vel;
        if (this.i++ === 7) this.phase++;
        break;
      case 7:
        this.sprite = IMGS.redLeft;
        this.phase++;
        this.i = 0;
        break;
      case 8:
        dx = -this.vel;
        // if (this.x < 60) this.phase++;
        if (this.i++ === 19) this.phase++;
        break;
      case 9:
        this.sprite = IMGS.redLeftToUp;
        this.phase++;
        this.i = 0;
        break;
      case 10:
        dx = -this.vel
        dy = -this.vel
        if (this.i++ === 7) this.phase++;
        break;
      case 11:
        this.sprite = IMGS.redUp;
        this.phase++;
        this.i = 0;
        break;
      case 12:
        dy = -this.vel
        // if (this.y < 80) this.phase++;
        if (this.i++ === 19) this.phase++;
        break;
      case 13:
        this.sprite = IMGS.redUpToRight;
        this.phase++;
        this.i = 0;
        break;
      case 14:
        dx = this.vel
        dy = -this.vel
        if (this.i++ === 7) this.phase++;
        break;
      case 15:
        this.sprite = IMGS.redRight;
        this.phase++;
        this.i = 0;
        break;
      case 16:
        dx = this.vel
        if (this.x2 > 263) this.phase++;
        // if (this.i++ === 19) this.phase++;
        break;
      case 17:
        this.sprite = IMGS.redRightToDown;
        this.phase++;
        this.i = 0;
        break;
      case 18:
        dx = this.vel
        dy = this.vel
        if (this.i++ === 7) this.phase++;
        break;
      case 19:
        this.sprite = IMGS.redDown;
        this.phase++;
        this.i = 0;
        break;
      case 20:
        dy = this.vel;
        // if (this.y2 > 150) this.phase++;
        if (this.i++ === 19) this.phase++;
        break;
      case 21:
        this.sprite = IMGS.redDownToLeft;
        this.phase++;
        this.i = 0;
        break;
      case 22:
        dx = -this.vel
        dy = this.vel
        if (this.i++ === 7) this.phase++;
        break;
      case 23:
        this.sprite = IMGS.redLeft;
        this.phase++;
        this.i = 0;
        break;
      case 24:
        dx = -this.vel
        // if (this.x < 175) this.phase++;
        if (this.i++ === 19) this.phase++;
        break;
      case 25:
        this.sprite = IMGS.redLeftToUp;
        this.phase++;
        this.i = 0;
        break;
      case 26:
        dx = -this.vel
        dy = -this.vel
        if (this.i++ === 7) this.phase++;
        break;
      case 27:
        this.sprite = IMGS.redUp;
        this.phase++;
        this.i = 0;
        break;
      case 28:
        dy = -this.vel
        // if (this.y < 70) this.phase++
        if (this.i++ === 19) this.phase++;
        break;
      case 29:
        this.sprite = IMGS.redUpToRight;
        this.phase++;
        this.i = 0;
        break;
      case 30:
        dx = this.vel
        dy = -this.vel
        if (this.i++ === 7) this.phase++;
        break;
      case 31:
        this.sprite = IMGS.redRight;
        this.phase++;
        this.i = 0;
        break;
      case 32:
        dx = this.vel
        break;
      default:
        break;
    }

    this.x += dx;
    this.y += dy;
    this.width = this.sprite.width
    this.height = this.sprite.height
    this.squares = [new Rectangle(this, 2, 2, this.width - 4, this.height - 4)]
    return this.isOutsideMap()
  }
  shoot(): boolean { return false }
  deathAnim = getSmallDeathAnim(this)
}
