import Drawable, { Rectangle } from "../Drawable";
import { IMGS } from "../Images";

export default class Bullet extends Drawable {
  static width = 2;
  static height = 5;
  static color = "black";
  // width = 2;
  // height = 5;
  // color = "black";


  constructor(x: number, y: number, public xvel: number, public yvel: number, public players: boolean, public power?: number) {
    super(Math.floor(x), Math.floor(y));
    //@ts-expect-error
    if (players) this.sprite = IMGS["playerBullet" + power]
    else this.sprite = IMGS.enemyBullet;
    this.width = (this.sprite as HTMLImageElement).width
    this.height = (this.sprite as HTMLImageElement).height
    this.squares = [new Rectangle(this)]
    console.log(this.width, this.height);
  }

  move(): boolean {
    this.x += this.xvel;
    this.y += this.yvel;

    return this.isOutsideMap()
  }
}
