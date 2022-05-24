import { canvas, ctx } from "../consts";
import Drawable from "../Drawable";
import { IMGS } from "../Images";

export class Background extends Drawable {
  sprite = IMGS.bg;
  width = canvas.width
  height = canvas.height - 24
  constructor() {
    super(0, 0)
  }
  // delta = -1751 + 24 + 2693;
  delta = 0
  move(): boolean {
    this.delta += 1;
    return true;
  }
  draw() {
    if (this.sprite.src == null) this.sprite = IMGS.bg;
    ctx.drawImage(this.sprite, 0, 2693 - this.delta + 24, 320, 200 - 24, 0, 24, this.width, this.height)
  }
  getImageData() {
    ctx.drawImage(this.sprite, 0, 2693 - this.delta + 24, 320, 200 - 24, 0, 24, this.width, this.height)
    return ctx.getImageData(0, 24, this.width, this.height);
  }
}
