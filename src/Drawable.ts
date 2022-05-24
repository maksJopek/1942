import { canvas, ctx } from "./consts";
import { IMGS } from "./Images";

export default abstract class Drawable {
  public stopAtBorder = false
  public width!: number;
  public height!: number;
  public sprite!: string | HTMLImageElement;
  public squares!: Array<Rectangle>;
  public sprites!: Array<string>;

  constructor(public _x: number, public _y: number,) { }

  collides(w: Drawable): boolean {
    for (const square of this.squares) {
      for (const s of w.squares) {
        if (square.x < s.x2 && square.x2 > s.x &&
          square.y < s.y2 && square.y2 > s.y) return true
      }
    }
    return false;
  }

  draw() {
    if (typeof this.sprite === "string") {
      ctx.fillStyle = this.sprite;
      ctx.fillRect(this.x, this.y, this.width, this.height);
      // } else if (this.sprite instanceof HTMLImageElement) {
    } else {
      ctx.drawImage(this.sprite, this.x, this.y)
    }
  }

  get x() { return this._x }
  set x(val) {
    if (!this.stopAtBorder) {
      this._x = val;
      return
    }
    // Used only for Player
    if (val <= 35) { this._x = 35; this.sprite = IMGS.playerUp }
    else if (val + this.width >= canvas.width - 35) { this._x = canvas.width - 35 - this.width; this.sprite = IMGS.playerUp }
    else this._x = val
  }
  get y() { return this._y }
  set y(val) {
    if (!this.stopAtBorder) {
      this._y = val;
      return
    }
    // Used only for Player
    if (val <= 15 + 24) this._y = 15 + 24;
    else if (val + this.height >= canvas.height - 15) this._y = canvas.height - 15 - this.height;
    else this._y = val
  }

  get x2() { return this.x + this.width }
  get y2() { return this.y + this.height }

  /// Should be abstract but this is extended by Animation which doesnt move
  // abstract move(): boolean;
  move() { return true; };

}

export class Rectangle extends Drawable {
  constructor(public begetter: Drawable, x?: number, y?: number, width?: number, height?: number) {
    x = x ?? begetter.x
    y = y ?? begetter.y
    super(x, y);
    this.change(x, y, width ?? begetter.width, height ?? begetter.height)
  }
  change(x: number, y: number, width: number, height: number) {
    this._x = x
    this._y = y
    this.width = width
    this.height = height

  }
  get x(): number { return this.begetter.x + this._x; }
  get y(): number { return this.begetter.y + this._y; }
  set x(val) { this._x = val }
  set y(val) { this._y = val }
  get x2() { return this.x + this.width }
  get y2() { return this.y + this.width }
  sprite = "rgba(128,0,128, 0.5)"
}
// export abstract class Square {
//   constructor(public x: number, public y: number, public width: number, public height: number) { }

//   get x2() { return this.x + this.width }
//   get y2() { return this.y + this.height }
// }
