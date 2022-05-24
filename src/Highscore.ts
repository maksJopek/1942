// import { canvas } from "./consts";
import { canvas, ctx, alphabet } from "./consts";
import Drawable from "./Drawable";
import { Background } from "./drawables/Background";
import { Selector } from "./drawables/Selector";
import { keys } from "./Events";
import { IMGS } from "./Images";

export default class Highscore extends Drawable {
  width = canvas.width
  height = canvas.height
  show = false;
  imgPixels: ImageData | null = null;
  selector = new Selector(12, 37);
  _bx = 12
  _by = 27
  moving = false;
  dx = 32;
  dy = 26;
  name = [' ', ' ', ' '];
  lastTimestamp = 0;
  constructor() {
    super(0, 0)
  }
  drawHg(bg: Background) {
    if (this.imgPixels == null) {
      const imgPixels = bg.getImageData();
      for (let y = 0; y < imgPixels.height; y++) {
        for (let x = 0; x < imgPixels.width; x++) {
          const i = (y * 4) * imgPixels.width + x * 4;
          const avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
          imgPixels.data[i] = avg;
          imgPixels.data[i + 1] = avg;
          imgPixels.data[i + 2] = avg;
        }
      }
      this.imgPixels = imgPixels;
    }
    ctx.putImageData(this.imgPixels, 0, 24, 0, 0, this.imgPixels.width, this.imgPixels.height);
    this.selector.draw()
    let x = 17, y = 40;
    for (const char of alphabet) {
      ctx.drawImage(IMGS.font.white[char], x, y)
      x += this.dx;
      if (x > 275) {
        x = 17;
        y += this.dy;
      }
    }
    while (x < 275) { ctx.drawImage(IMGS.font.yellow['-'], x, y); x += this.dx / 2; }
    x = 17;
    y += this.dy;
    const botTxt = ['a', 't', 'h', ' ', 'a', 'b', 'c', 'd', 'e', 'f', 'g', ' ', ...this.name, ' ', 'z', 'y'];
    for (let char of botTxt) {
      ctx.drawImage(IMGS.font.yellow[char], x, y);
      x += this.dx / 2;
    }
  }
  move(): boolean {
    if (!this.moving) {
      if (+keys.right ^ +keys.left) {
        keys.right ? this.bx = this.selector.x + this.dx : this.bx = this.selector.x - this.dx
      } else {
        this.bx = this.selector.x
      }

      if (+keys.up ^ +keys.down) {
        keys.down ? this.by = this.selector.y + this.dy : this.by = this.selector.y - this.dy
      } else {
        this.by = this.selector.y
      }

      if (keys.fire && Date.now() - this.lastTimestamp > 300) {
        let [x, y] = [this.selector.x, this.selector.y]
        x = Math.floor(x / this.dx)
        y = Math.floor(y / this.dy) - 1
        const char = alphabet[x + y * 9];
        if (char === "rv") {
          for (let i = this.name.length - 1; i >= 0; i--) {
            if (this.name[i] !== " ") this.name[i] = ' '
          }
        }
        else if (char === "ed") {
          console.log("%csaving", "color: darkblue; font-size: 1.3em; background-color: darkgreen;");
        }
        else if (this.name.filter(a => a !== ' ').length === 3) this.name[2] = char;
        else {
          for (let i = 0; i < this.name.length; i++) {
            if (this.name[i] === " ") { this.name[i] = char; break; }
          }
        }

        this.lastTimestamp = Date.now()
      }
    }

    if (this.selector.x !== this.bx || this.selector.y !== this.by) {
      this.moving = true;
      if (this.selector.x < this.bx) this.selector.x += 2;
      if (this.selector.x > this.bx) this.selector.x -= 2;
      if (this.selector.y < this.by) this.selector.y += 2;
      if (this.selector.y > this.by) this.selector.y -= 2;
      return true;
    }
    this.moving = false
    return true;
  }

  get bx() { return this._bx }
  get by() { return this._by }
  set bx(val) {
    if (val > 10 && val < 17 + this.dx * 8)
      this._bx = val
  }
  set by(val) {
    if (val > 30 && val < 40 + this.dy * 3)
      this._by = val
  }
} 
