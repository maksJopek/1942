import { TOPBAR_HEIGHT } from "../consts"
import Drawable from "../Drawable"
import { IMGS } from "../Images"

export default class Startscreen extends Drawable {
  sprite = IMGS.startScreen0
  si = 0
  i = 0  
  j = 0
  color = "white"
  colors = ["white", "yellow", "blue", "purple", "red"]
  ci = 0

  constructor() {
    super(0, TOPBAR_HEIGHT)
  }

  move() {
    if(this.si === 0) {
      if(this.i++ === 199) { this.sprite = IMGS.startScreen1; this.i = 0; this.si++ }
      // if(this.i++ === 19) { this.sprite = IMGS.startScreen1; this.i = 0; this.si++ }
    } else {
      // if(this.i++ === 2) {
      if(this.i++ === 9) {
        this.ci++;
        if(this.ci >= this.colors.length) {
          if(this.j++ === 9) {
          // if(this.j++ === 2) {
            this.si++;
            if(this.si > 4) this.si = 0
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
