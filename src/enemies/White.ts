import { Rectangle } from "../Drawable";
import Bullet from "../drawables/Bullet";
import { random } from "../helpers";
import { getSmallDeathAnim, IMGS } from "../Images";
import Enemy from "./Enemy";

export default class White extends Enemy {
  sprite = IMGS.whiteDown;
  width = IMGS.whiteDown.width;
  height = IMGS.whiteDown.height;
  velx = 1
  vely = 3
  phase = 0;
  spriteNum = 1;
  i = 0;
  squares: Rectangle[] = [new Rectangle(this)]

  constructor(x: number, y: number, public left: boolean) {
    super(x, y)
    this.height = IMGS.whiteDown.height;
    this._y = y - this.height
  }

  move() {
    let dx = 0, dy = 0;

    switch (this.phase) {
      case 0:
        dy = this.vely
        if (this.y > 40) this.phase++;
        break;
      case 1:
        dx = this.left ? this.velx : -this.velx
        dy = this.vely
        if (this.y > 78) this.phase++
        break;
      case 2:
        this.velx = 3
        this.sprite = this.left ? IMGS.whiteTurnLeft : IMGS.whiteTurnRight;
        dx = this.left ? this.velx : -this.velx
        dy = this.vely
        if (this.y > 145) this.phase++
        break;
      case 3:
        this.velx = 6
        this.sprite = this.left ? IMGS.whiteStrangeLeft : IMGS.whiteStrangeRight;
        dx = this.left ? this.velx : -this.velx
        dy = this.vely
        // if (this.y > 145) this.phase++
        break;
      // case 1:
      //   dx = this.left ? -this.vel : this.vel
      //   dy = -this.vel
      //   if (this.y < 58) this.phase++
      //   break;
      // case 2:
      //   this.sprite = this.left ? IMGS.greenUpToLeft : IMGS.greenUpToRight;
      //   this.phase++;
      //   break;
      default:
        break;
    }

    this.x += dx;
    this.y += dy;
    this.width = this.sprite.width
    this.height = this.sprite.height
    this.squares = [new Rectangle(this)]
    return this.isOutsideMap()
  }

  hasShooted = false;
  shoot(bullets: Bullet[]): boolean {
    if (this.sprite !== IMGS.whiteDown || this.hasShooted) return false;
    if (random(0.008)) {
      if (super.shoot(bullets))
        this.hasShooted = true
    }
    return true;
  }
  deathAnim = getSmallDeathAnim(this)
}

