import { canvas, ctx } from "../consts";
import Drawable from "../Drawable";
import { IMGS } from "../Images";

export class TopBar extends Drawable {
  sprite = IMGS.topbar;
  width = canvas.width
  height = 24
  score = 0;
  lives = 0;
  rolls = 0;
  highscore = 0;
  constructor() {
    super(0, 0)
  }
  setData(score: number, lives: number, rolls: number, highscore?: number | string) {
    this.score = score
    this.lives = lives
    this.rolls = rolls
    if (highscore) {
      if (typeof highscore === "string") highscore = parseInt(highscore)
      this.highscore = highscore
    }
  }
  draw() {
    if (this.sprite.src == null) this.sprite = IMGS.topbar;
    ctx.drawImage(this.sprite, 0, 0);
    [...this.score.toString().padStart(7, '0')].forEach((char, i) => {
      ctx.imageSmoothingEnabled = false
      ctx.drawImage(IMGS.font.small.white[char], 24 + i * 8, 8)
    });
    for (let i = 0; i < this.lives; i++) {
      ctx.drawImage(IMGS.planeIcon, 112 + i * 8, 9)
    }
    for (let i = 0; i < this.rolls; i++) {
      ctx.drawImage(IMGS.rollIcon, 177 + i * 8, 9)
    }
    [...this.highscore.toString().padStart(7, '0')].forEach((char, i) => {
      ctx.imageSmoothingEnabled = false
      ctx.drawImage(IMGS.font.small.white[char], 240 + i * 8, 8)
    });
  }
}

