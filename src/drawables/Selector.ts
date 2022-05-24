import { canvas, ctx } from "../consts";
import Drawable from "../Drawable";
import { IMGS } from "../Images";

export class Selector extends Drawable {
  sprite = IMGS.selector
  width = canvas.width
  height = 24
  draw() {
    if (this.sprite.src == null) this.sprite = IMGS.selector;
    ctx.drawImage(this.sprite, this.x, this.y)
  }
}


