import { canvas, ctx } from "../consts";
import Drawable from "../Drawable";
import { IMGS } from "../Images";

export class TopBar extends Drawable {
  sprite = IMGS.topbar;
  width = canvas.width
  height = 24
  constructor() {
    super(0, 0)
  }
  draw() {
    if (this.sprite.src == null) this.sprite = IMGS.topbar;
    ctx.drawImage(this.sprite, 0, 0)
  }
}

