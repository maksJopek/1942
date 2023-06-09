import Bullet from "../drawables/Bullet";
import { BULLET_VEL, TOPBAR_HEIGHT } from "../consts";
import Drawable, { Rectangle } from "../Drawable";
import Anime from "../Animation";

export default abstract class Enemy extends Drawable {
  squares: Array<Rectangle> = [new Rectangle(this)]
  points = 50;
  health = 2
  deathAnim!: Anime;

  constructor(x: number, y: number) {
    super(x, y)
  }
  shoot(bullet: Bullet[]): boolean {
    if (this.y2 < TOPBAR_HEIGHT) return false
    bullet.push(new Bullet(this.x + (this.width / 2) - Bullet.width / 2, this.y2, 0, BULLET_VEL / 1.5, false))
    return true
  }
}
