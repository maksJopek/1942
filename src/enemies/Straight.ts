import { canvas } from "../consts";
import { Rectangle } from "../Drawable";
import Bullet from "../drawables/Bullet";
import { random } from "../helpers";
import { getSmallDeathAnim, IMGS } from "../Images";
import Enemy from "./Enemy";

export default class Straight extends Enemy {
  sprite = IMGS.simpleDown;
  width = IMGS.simpleDown.width;
  height = IMGS.simpleDown.height;
  vel = 2.5
  phase = 0;
  spriteNum = 1;
  i = 0;
  squares: Rectangle[] = [new Rectangle(this, 2, 2, this.width - 4, this.height - 4)]
  drop = false

  constructor(x: number, y: number, drop?: boolean) {
    super(x, y)
    if (drop) this.drop = drop
    this.height = IMGS.simpleDown.height;
    this._y = y - this.height
  }

  move() {
    let dy = 0;

    if (this.phase === 0) {
      dy = this.vel;
      if (this.y2 > canvas.height - 15) this.phase++;
    }
    if (this.phase === 1) {
      //@ts-expect-error
      this.sprite = IMGS["simpleRot" + this.spriteNum]
      if (this.i++ === 4) { this.i = 0; this.spriteNum++; }
      if (this.spriteNum === 5) { this.sprite = IMGS.simpleUp; this.phase++; }
    }
    if (this.phase === 2) {
      dy = -this.vel;
    }

    this.y += dy;
    this.width = this.sprite.width
    this.height = this.sprite.height
    this.squares = [new Rectangle(this, 2, 2, this.width - 4, this.height - 4)]
    return this.y + this.height < 0
  }

  hasShooted = false
  shoot(bullets: Bullet[]): boolean {
    if (this.hasShooted || this.phase !== 0) return false
    if (random(0.008)) {
      if (super.shoot(bullets))
        this.hasShooted = true
    }
    return true;
    // (new Bullet(this.width / 2, this.y2, 0, 2, false))
  }

  deathAnim = getSmallDeathAnim(this)
}
