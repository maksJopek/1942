import { ctx, TOPBAR_HEIGHT } from "../consts"
import Drawable from "../Drawable"
import { IMGS } from "../Images"
import { getStorage, Storage } from "../Storage"

export default class Startscreen extends Drawable {
  sprite = IMGS.startScreen0
  si = 0
  i = 0
  j = 0
  color = "white"
  colors = ["white", "yellow", "blue", "purple", "red"]
  ci = 0
  cdx = 16;
  cdy = 26;
  storage: Storage | null = null
  show0 = true

  constructor() {
    super(0, TOPBAR_HEIGHT)
  }

  draw() {
    //@ts-expect-error
    if (this.sprite.width == null) this.sprite = IMGS["startScreen" + this.si]
    if (this.storage == null) this.storage = getStorage()
    ctx.drawImage(this.sprite, this.x, this.y)
    const chars = [] as string[][]
    for (const [i, score] of this.storage.entries()) {
      let place = ""
      if (i === 0) place = "top";
      else if (i === 1) place = "2nd";
      else if (i === 2) place = "3rd";
      else place = i + "th";

      chars.push([...place.split(''), ' ', ...score.score.padStart(7, '0').split(''), ' ', ...score.name, ' ', ...score.world.split('')])
    }
    if (this.si !== 0 && this.show0 !== true) {
      let x = 17, y = 40;
      for (const char of chars) {
        x = 17
        for (const c of char) {
          try {
            //@ts-expect-error
            ctx.drawImage(IMGS.font[this.color][c], x, y)
          } catch (e) { debugger }

          x += this.cdx
        }
        y += this.cdy
      }
    }
  }
  move() {
    if (this.si === 0 || this.show0) {
      this.sprite = IMGS.startScreen0;
      // if (this.i++ === 19) {
      if (this.i++ === 199) {
        this.i = 0;
        // debugger
        if (!this.show0) {
          this.si++
        } else {
          this.show0 = !this.show0
        }
      }
    } else {
      //@ts-expect-error
      this.sprite = IMGS["startScreen" + this.si];
      console.log("startScreen" + this.si);

      // if (this.i++ === 2) {
      if (this.i++ === 9) {
        this.ci++;
        if (this.ci >= this.colors.length) {
          if (this.j++ === 9) {
            // if (this.j++ === 2) {
            this.si++;
            this.show0 = true
            if (this.si > 4) { this.si = 0; this.show0 = false; }
            //@ts-expect-error
            this.sprite = IMGS["startScreen" + this.si]
            this.j = 0
          }
          this.ci = 0;
        }
        this.color = this.colors[this.ci]
        this.i = 0
      }
    }
    // console.log(this.sprite, this.color);

    return true;
  }
}
