import { ctx } from "./consts";
import Drawable from "./Drawable";

export default class Anime extends Drawable {
  i = 0;
  j = 0;

  constructor(public drawable: Drawable, public frames: Array<string | HTMLImageElement>) {
    super(drawable._x, drawable._y)
    this.width = drawable.width
    this.height = drawable.height
    // if (frames.length === 0) debugger
  }

  draw(): boolean {
    if (typeof this.frames[0] === "string") {
      ctx.fillStyle = (this.frames as string[])[this.i];
      ctx.fillRect(this.drawable.x, this.drawable.y, this.drawable.width, this.drawable.height);
    } else {
      try {
        const f = (this.frames as HTMLImageElement[])[this.i]
        if (f)
          ctx.drawImage(f, this.drawable.x, this.drawable.y)
      } catch (e) { debugger }
    }
    if (++this.j === 5) { this.i++; this.j = 0; }
    return this.i !== this.frames.length;
  }
}

