import { Rectangle } from "../Drawable";
import { getSmallDeathAnim, IMGS } from "../Images";
import Enemy from "./Enemy";

export default class Red2 extends Enemy {
  sprite = IMGS.redDown;
  width = IMGS.redDown.width;
  height = IMGS.redDown.height;
  vel = 2.5;
  phase = 0;
  i = 0;
  squares: Rectangle[] = [new Rectangle(this, 2, 2, this.width - 4, this.height - 4)]

  constructor(x: number, y: number, public left: boolean) {
    super(x, y)
    this.height = IMGS.redDown.height;
    this._y = y - this.height
  }

  move() {
    let dx = 0, dy = 0;

    switch (this.phase) {
      case 0:
        dy = this.vel;
        if (this.y > 163) this.phase++;
        break;
      case 1:
        this.sprite = IMGS.redDownToRight
        this.phase++
        this.i = 0;
        break;
      case 2:
        dx = this.vel
        dy = this.vel
        if (this.i++ === 9) this.phase++;
        break;
      case 3:
        this.sprite = IMGS.redRight
        this.phase++
        this.i = 0;
        break;
      case 4:
        dx = this.vel
        if (this.x > (this.left ? 285 : 285 + 80)) this.phase++;
        break;
      case 5:
        this.sprite = IMGS.redRightToUp
        this.phase++
        this.i = 0;
        break;
      case 6:
        dx = this.vel
        dy = -this.vel
        if (this.i++ === 13) this.phase++;
        break;
      case 7:
        this.sprite = IMGS.redUp
        this.phase++;
        break;
      case 8:
        dy = -this.vel
        if (this.y < 98) this.phase++
        break;
      case 9:
        this.sprite = IMGS.redUpToLeft
        this.phase++
        this.i = 0;
        break;
      case 10:
        dx = -this.vel
        dy = -this.vel
        if (this.i++ === 7) this.phase++;
        break;
      case 11:
        this.sprite = IMGS.redLeft
        this.phase++
        this.i = 0;
        break;
      case 12:
        dx = -this.vel
        if (this.x < (this.left ? 210 : 210 + 80)) this.phase++
        break;
      case 13:
        this.sprite = IMGS.redLeftToDown
        this.phase++
        this.i = 0
        break;
      case 14:
        dx = -this.vel
        dy = this.vel
        if (this.i++ === 7) this.phase++;
        break;
      case 15:
        this.sprite = IMGS.redDown
        this.phase++
        this.i = 0
        break;
      case 16:
        dy = this.vel

        break;
      default:
        break;
    }

    this.x += dx;
    this.y += dy;
    this.width = this.sprite.width
    this.height = this.sprite.height
    this.squares = [new Rectangle(this, 2, 2, this.width - 4, this.height - 4)]
    return this.isOutsideMap() && this.phase > 12
  }
  shoot(): boolean { return false }

  deathAnim = getSmallDeathAnim(this)
}

