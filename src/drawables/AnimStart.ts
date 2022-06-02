import { ctx, TOPBAR_HEIGHT } from "../consts";
import Drawable from "../Drawable";
import { IMGS } from "../Images";

export default class AnimStart extends Drawable {
  i = 0;
  draw(): boolean {
    try {
      ctx.drawImage(IMGS.start[this.i], 0, TOPBAR_HEIGHT);
    } catch (error) {
      return false
    }
    this.i++;
    return true
  }
}
