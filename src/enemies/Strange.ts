import { Rectangle } from "../Drawable";
import { IMGS } from "../Images";
import Enemy from "./Enemy";

export default class Strange extends Enemy {
  sprite = IMGS.bigStrangeUp1;
  width = IMGS.bigStrangeUp1.width;
  height = IMGS.bigStrangeUp1.height;
  vel = 1
  phase = 0;
  spriteCounter = 0;
  spriteNum = 1;
  i = 0;
  squares: Rectangle[] = [new Rectangle(this, 2, 2, this.width - 2, this.height - 2)]

  move() {
    let dx = 0, dy = 0;

    switch (this.phase) {
      case 0:
        dy = -this.vel
        if (this.y < 105) this.phase++;
        break;
      case 1:
        this.phase++;
        break;
      case 2:
        dx = this.vel
        dy = -this.vel
        if (this.x > 182) this.phase++;
        break;
      case 3:
        this.vel = 3
        dx = this.vel
        if (this.x > 210) this.phase++;
        // if (this.x > 210) debugger
        break;
      case 4:
        this.vel = 2;
        dx = this.vel
        dy = -this.vel
        if (this.y < 70) this.phase++;
        break;
      case 5:
        dx = -this.vel
        if (this.x < 175) this.phase++;
        break;
      case 6:
        dx = -this.vel
        dy = -this.vel
        if (this.y < 45) this.phase++;
        break;
      case 7:
        dx = -this.vel
        if (this.x < 60) this.phase++;
        break;
      case 8:
        dx = -this.vel
        dy = this.vel
        if (this.x < 20) this.phase++;
        break;
      case 9:
        dx = this.vel
        if (this.x > 40) this.phase++;
        break;
      case 10:
        dx = this.vel
        dy = -this.vel
        if (this.x > 60) this.phase++;
        break;
      case 11:
        this.vel = 1;
        this.phase++;
        break;
      case 12:
        dy = -this.vel
        break;
      default:
        break;
    }

    this.x += dx;
    this.y += dy;
    //@ts-expect-error
    if (this.spriteCounter++ === 3) { this.spriteNum ^= 1; this.sprite = IMGS["bigStrangeUp" + this.spriteNum]; this.spriteCounter = 0; }
    // this.width = this.sprite.width
    // this.height = this.sprite.height
    // this.squares = [new Rectangle(this, 2, 2, this.width - 2, this.height - 2)]
    return this.isOutsideMap()
  }
}

