import { canvas, ctx, PLAYER_SIZE } from "./consts";
import { IMGS } from "./Images";

export default abstract class Drawable {
  public stopAtBorder = false
  public width!: number;
  public height!: number;
  public sprite!: string | HTMLImageElement;
  public squares!: Array<Rectangle>;
  public sprites!: Array<string>;

  constructor(public _x: number, public _y: number,) { }

  collides(ws: Drawable[]): boolean {
    if (this.width === 48 && ws.length > 0) {
      // debugger
      const alien = ws[0]
      for (const square of this.squares) {
        for (const s of alien.squares) {
          if (square.x < s.x2 && square.x2 > s.x &&
            square.y < s.y2 && square.y2 > s.y) console.log("aaa");
        }
      }
    }
    for (const w of ws) {
      for (const square of this.squares) {
        for (const s of w.squares) {
          if (
            square.x < s.x2 &&
            square.x2 > s.x &&
            square.y < s.y2 &&
            square.y2 > s.y
          ) return true
        }
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
    // const diff = Math.abs(IMGS.playerUp.height - (this.sprite as HTMLImageElement).height);
    const left = this.sprite === IMGS.playerLeft
    const right = this.sprite === IMGS.playerRight
    const diff = left ? 1 : (right ? 2 : 0)

    if (val <= 15 + 24) this._y = 15 + 24;
    // else if (val + this.height >= canvas.height - 15) this._y = canvas.height - 15 - this.height + diff;
    else if (val + this.height >= canvas.height - 15) {
      if (left || right) this._y = canvas.height - 15 - this.height + diff + 1;
      else this._y = canvas.height - 15 - this.height + diff;
    }
    else this._y = val
  }

  get x2() { return this.x + this.width }
  get y2() { return this.y + this.height }

  /// Should be abstract but this is extended by Animation which doesnt move
  // abstract move(): boolean;
  move() { return true; };
  isOutsideMap() { return this.x2 < 0 || this.y2 < 0 || this.x > canvas.width || this.y > canvas.height }

}

export class Rectangle extends Drawable {
  sprite = "rgba(128,0,128, 0.5)"
  constructor(public begetter: Drawable, x?: number, y?: number, width?: number, height?: number) {
    if (begetter.width === PLAYER_SIZE) {
      console.log(begetter.x, begetter.y, begetter.width, begetter.height);
    }
    x = x ?? 0
    y = y ?? 0
    super(x, y);
    this.change(x, y, width ?? begetter.width, height ?? begetter.height)
  }
  change(x: number, y: number, width: number, height: number) {
    this._x = x
    this._y = y
    this.width = width
    this.height = height
  }
  get x() { return this.begetter.x + this._x; }
  get y() { return this.begetter.y + this._y; }
  set x(val) { this._x = val }
  set y(val) { this._y = val }
  get x2() { return this.x + this.width }
  get y2() { return this.y + this.height }
}
// export abstract class Square {
//   constructor(public x: number, public y: number, public width: number, public height: number) { }

//   get x2() { return this.x + this.width }
//   get y2() { return this.y + this.height }
// }
