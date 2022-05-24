import Bullet from "../drawables/Bullet";
import { BULLET_VEL } from "../consts";
import Drawable, { Rectangle } from "../Drawable";

export default abstract class Enemy extends Drawable {
  squares: Array<Rectangle> = [new Rectangle(this)]
  points = 5;

  shoot(bullet: Bullet[]) {
    bullet.push(new Bullet(this.x + (this.width / 2) - Bullet.width / 2, this.y2, 0, BULLET_VEL, true))
  }
}
