import Drawable, { Rectangle } from "../Drawable";
import { IMGS } from "../Images";

export default class Powerup extends Drawable {
  sprite = IMGS.powerup
  width = IMGS.powerup.width
  height = IMGS.powerup.height
  squares: Rectangle[] = [new Rectangle(this)]

  move() {
    this.y += 1
    return this.isOutsideMap()
  }
}
