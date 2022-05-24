import { ctx } from "./consts";
import Drawable from "./Drawable";

export default class Anime extends Drawable {
  i = 0;
  j = 0;

  constructor(drawable: Drawable, public frames: string[]) {
    super(drawable._x, drawable._y)
    this.width = drawable.width
    this.height = drawable.height
  }

  draw(): boolean {
    // console.log("drawing", this)
    ctx.fillStyle = this.frames[this.i];
    ctx.fillRect(this.x, this.y, this.width, this.height);
    this.j++;
    if (this.j === 50) { this.i++; this.j = 0; }
    return this.i !== this.frames.length;
  }
}

