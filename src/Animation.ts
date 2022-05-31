import { ctx } from "./consts";
import Drawable from "./Drawable";

export default class Anime extends Drawable {
  i = 0;
  j = 0;

  constructor(drawable: Drawable, public frames: Array<string | HTMLImageElement>) {
    super(drawable._x, drawable._y)
    this.width = drawable.width
    this.height = drawable.height
    if (frames.length === 0) debugger
  }

  draw(): boolean {
    if (typeof this.frames[0] === "string") {
      ctx.fillStyle = (this.frames as string[])[this.i];
      ctx.fillRect(this.x, this.y, this.width, this.height);
    } else {
      ctx.drawImage((this.frames as HTMLImageElement[])[this.i], this.x, this.y)
    }
    if (++this.j === 4) { this.i++; this.j = 0; }
    return this.i !== this.frames.length;
  }
}

