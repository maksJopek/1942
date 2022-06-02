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
  shootedDown = 0;
  bgd = 0;
  constructor() {
    super(0, 0)
  }
  setData(score: number, lives: number, rolls: number, bgd: number, shootedDown: number, highscore?: number | string) {
    this.score = score
    this.lives = lives
    this.rolls = rolls
    this.bgd = bgd
    this.shootedDown = shootedDown
    if (highscore) {
      if (typeof highscore === "string") highscore = parseInt(highscore)
      this.highscore = highscore
    }
  }
  draw() {
    if (this.sprite.src == null) this.sprite = IMGS.topbar;
    ctx.drawImage(this.sprite, 0, 0);
    [...this.score.toString().padStart(7, '0')].forEach((char, i) => {
      ctx.drawImage(IMGS.font.small.white[char], 24 + i * 8, 8)
    });
    for (let i = 0; i < this.lives; i++) {
      ctx.drawImage(IMGS.planeIcon, 112 + i * 8, 9)
    }
    for (let i = 0; i < this.rolls; i++) {
      ctx.drawImage(IMGS.rollIcon, 177 + i * 8, 9)
    }
    [...this.highscore.toString().padStart(7, '0')].forEach((char, i) => {
      ctx.drawImage(IMGS.font.small.white[char], 240 + i * 8, 8)
    });
    if (this.bgd >= 2580) {
      // 9 41
      [..."shooting down ".split(''), ...(this.shootedDown / 32).toFixed(0).toString().padStart(3, '0').split(''), '%'].forEach((char, i) => {
        ctx.drawImage(IMGS.font.white[char], 9 + i * 17, 41, 15, 8)
      });
      [..."bonus".split('')].forEach((char, i) => {
        ctx.drawImage(IMGS.font.white[char], 110 + i * 17, 94, 15, 8)
      });
      [...(this.lives * 500).toString().padStart(5, '0'), ..." pts".split('')].forEach((char, i) => {
        ctx.drawImage(IMGS.font.white[char], 77 + i * 17, 108, 15, 8)
      });
      [...'rx1000=', ...(this.rolls * 1000).toString().padStart(4, '0'), ..." pts"].forEach((char, i) => {
        ctx.drawImage(IMGS.font.yellow[char], 43 + i * 17, 147, 15, 8)
      });
    }
  }
}

