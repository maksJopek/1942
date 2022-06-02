import { Rectangle } from "../Drawable";
import Bullet from "../drawables/Bullet";
import { random } from "../helpers";
import { getSmallDeathAnim, IMGS } from "../Images";
import Enemy from "./Enemy";

export default class Green2 extends Enemy {
  sprite = IMGS.greenDown;
  width = IMGS.greenDown.width;
  height = IMGS.greenDown.height;
  vel = 2
  phase = 0;
  spriteNum = 1;
  i = 0;
  squares: Rectangle[] = [new Rectangle(this, 2, 2, this.width - 2, this.height - 2)]

  constructor(x: number, y: number, public left: boolean) {
    super(x, y)
  }

  move() {
    let dx = 0, dy = 0;

    switch (this.phase) {
      case 0:
        dy = this.vel
        if (this.y > 163) this.phase++
        break;
      case 1:
        this.sprite = IMGS.greenDownToLeft
        this.phase++
        this.i = 0
        break;
      case 2:
        dx = -this.vel
        dy = this.vel
        if (this.i++ === 7) this.phase++
        break;
      case 3:
        this.sprite = IMGS.greenLeft
        this.phase++
        this.i = 0
        break;
      case 4:
        dx = -this.vel
        if (this.x < (this.left ? 10 : 10 + 80)) this.phase++
        break;
      case 5:
        this.sprite = IMGS.greenLeftToUp
        this.phase++
        this.i = 0
        break;
      case 6:
        dx = -this.vel
        dy = -this.vel
        if (this.i++ === 7) this.phase++
        break;
      case 7:
        this.sprite = IMGS.greenUp
        this.phase++
        this.i = 0
        break;
      case 8:
        dy = -this.vel
        if (this.y < 88) this.phase++
        break;
      case 9:
        this.sprite = IMGS.greenUpToRight
        this.phase++
        this.i = 0
        break;
      case 10:
        dx = this.vel
        dy = -this.vel
        if (this.i++ === 7) this.phase++
        break;
      case 11:
        this.sprite = IMGS.greenRight
        this.phase++
        this.i = 0
        break;
      case 12:
        dx = this.vel
        if (this.x > (this.left ? 176 : 176 + 80)) this.phase++
        break;
      case 13:
        this.sprite = IMGS.greenRightToDown
        this.phase++
        this.i = 0
        break;
      case 14:
        dx = this.vel
        dy = this.vel
        if (this.i++ === 7) this.phase++
        break;
      case 15:
        this.sprite = IMGS.greenDown
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
    return this.isOutsideMap()
  }

  hasShooted = false;
  shoot(bullets: Bullet[]): boolean {
    if (this.sprite !== IMGS.greenDown || this.hasShooted) return false;
    if (random(0.008)) {
      if (super.shoot(bullets))
        this.hasShooted = true
    }
    return true;
  }
  deathAnim = getSmallDeathAnim(this)
}
