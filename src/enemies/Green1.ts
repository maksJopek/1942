import { Rectangle } from "../Drawable";
import { IMGS } from "../Images";
import Enemy from "./Enemy";

export default class Green1 extends Enemy {
  sprite = IMGS.greenUp;
  width = IMGS.greenUp.width;
  height = IMGS.greenUp.height;
  vel = 2
  phase = 0;
  spriteNum = 1;
  i = 0;
  squares: Rectangle[] = [new Rectangle(this, 2, 2, this.width - 2, this.height - 2)]

  constructor(x: number, y: number, public left: boolean) {
    super(x, y)
  }

  move() {
    let dx = 0, dy = 0;

    switch (this.phase) {
      case 0:
        dy = -this.vel
        if (this.y < 110) this.phase++;
        break;
      case 1:
        dx = this.left ? -this.vel : this.vel
        dy = -this.vel
        if (this.y < 58) this.phase++
        break;
      case 2:
        this.sprite = this.left ? IMGS.greenUpToLeft : IMGS.greenUpToRight;
        this.phase++;
        break;
      case 3:
        dx = this.left ? -this.vel : this.vel
        dy = -this.vel
        if (this.y < 31) this.phase++
        break;
      case 4:
        this.sprite = IMGS.greenDown
        this.phase++;
        break;
      case 5:
        dy = this.vel
        break;
      default:
        break;
    }

    this.x += dx;
    this.y += dy;
    this.width = this.sprite.width
    this.height = this.sprite.height
    this.squares = [new Rectangle(this, 2, 2, this.width - 2, this.height - 2)]
    return this.isOutsideMap()
  }
}
