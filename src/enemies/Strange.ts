import { BULLET_VEL, TOPBAR_HEIGHT } from "../consts";
import { Rectangle } from "../Drawable";
import Bullet from "../drawables/Bullet";
import { random } from "../helpers";
import { getBigDeathAnim, IMGS } from "../Images";
import Enemy from "./Enemy";

export default class Strange extends Enemy {
  sprite = IMGS.bigStrangeUp1;
  width = IMGS.bigStrangeUp1.width;
  height = IMGS.bigStrangeUp1.height;
  vel = 1
  phase = 0;
  spriteCounter = 0;
  si = 0;
  changeSprite = true;
  spriteNum = 1;
  i = 0;
  squares: Rectangle[] = [
    new Rectangle(this, 22, 0, 4, 37),
    new Rectangle(this, 14, 31, 20, 5),
    new Rectangle(this, 0, 8, 48, 8),
    new Rectangle(this, 10, 5, 8, 3),
    new Rectangle(this, 30, 4, 8, 4),
    new Rectangle(this, 8, 16, 32, 2),
    new Rectangle(this, 18, 18, 12, 3),
  ]
  health = 30
  points = 2100

  move() {
    let dx = 0, dy = 0;

    switch (this.phase) {
      case 0:
        dy = -this.vel
        if (this.y < 105) this.phase++;
        break;
      case 1:
        this.phase++;
        break;
      case 2:
        dx = this.vel
        dy = -this.vel
        if (this.x > 182) this.phase++;
        break;
      case 3:
        this.vel = 3
        dx = this.vel
        if (this.x > 210) this.phase++;
        // if (this.x > 210) debugger
        break;
      case 4:
        this.vel = 2;
        dx = this.vel
        dy = -this.vel
        if (this.y < 70) this.phase++;
        break;
      case 5:
        dx = -this.vel
        if (this.x < 175) this.phase++;
        break;
      case 6:
        dx = -this.vel
        dy = -this.vel
        if (this.y < 45) this.phase++;
        break;
      case 7:
        dx = -this.vel
        if (this.x < 60) this.phase++;
        break;
      case 8:
        dx = -this.vel
        dy = this.vel
        if (this.x < 20) this.phase++;
        break;
      case 9:
        dx = this.vel
        if (this.x > 40) this.phase++;
        break;
      case 10:
        dx = this.vel
        dy = -this.vel
        if (this.x > 60) this.phase++;
        break;
      case 11:
        this.vel = 1;
        this.phase++;
        break;
      case 12:
        dy = -this.vel
        break;
      default:
        break;
    }

    if (this.spriteCounter++ === 3) { this.spriteNum ^= 1; this.spriteCounter = 0; }
    let strSprite = "bigStrangeUp" + this.spriteNum;
    if (this.health < 30 - 20) {
      if (this.si++ > 3) { this.changeSprite = !this.changeSprite; this.si = 0; }
    }
    else if (this.health < 30 - 10) {
      if (this.si++ > 8) { this.changeSprite = !this.changeSprite; this.si = 0; }
    }
    else if (this.health < 30) {
      if (this.si++ > 30) { this.changeSprite = !this.changeSprite; this.si = 0; }
    }
    if (this.changeSprite === true && this.health < 30)
      //@ts-expect-error
      this.sprite = IMGS[strSprite + "Red"]
    else
      //@ts-expect-error
      this.sprite = IMGS[strSprite]

    this.x += dx;
    this.y += dy;
    // this.width = this.sprite.width
    // this.height = this.sprite.height
    // this.squares = [new Rectangle(this, 2, 2, this.width - 2, this.height - 2)]
    return this.isOutsideMap()
  }

  shoot(bullets: Bullet[]): boolean {
    if (this.y2 < TOPBAR_HEIGHT) return false
    if (random(0.01)) {
      if (random(0.5)) {
        bullets.push(new Bullet(this.x + (this.width / 2) - Bullet.width / 2, this.y2, 0, BULLET_VEL / 2, false))
      } else {
        if (random(0.5)) bullets.push(new Bullet(this.x + (this.width / 2) - Bullet.width / 2, this.y2, BULLET_VEL / 2, BULLET_VEL / 2, false))
        else bullets.push(new Bullet(this.x + (this.width / 2) - Bullet.width / 2, this.y2, -BULLET_VEL / 2, BULLET_VEL / 2, false))
      }

    }
    return true
  }

  deathAnim = getBigDeathAnim(this)
}

