import { canvas } from "../consts";
import Drawable, { Rectangle } from "../Drawable";

export default class Bullet extends Drawable {
  static width = 2;
  static height = 5;
  static color = "black";
  width = 2;
  height = 5;
  color = "black";
  sprite = "black";

  squares: Rectangle[] = [new Rectangle(this)]

  constructor(x: number, y: number, public xvel: number, public yvel: number, public players: boolean) {
    super(x, y);
    // this.width = Bullet.width;
    // this.height = Bullet.height;
  }

  move(): boolean {
    this.x += this.xvel;
    this.y += this.yvel;

    return (
      this.x + this.width < 0 || this.y + this.height < 0 || this.x > canvas.width || this.y > canvas.height
    );
  }
}
