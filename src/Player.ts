import Anime from "./Animation";
import Bullet from "./drawables/Bullet";
import { BULLET_VEL, ctx, FIRE_DELAY, PLAYER_SIZE, PLAYER_VEL } from "./consts";
import Drawable, { Rectangle } from "./Drawable";
import { keys } from "./Events";
import { IMGS } from "./Images";

export default class Player extends Drawable {
  static startx = 250;
  static starty = 100;

  width = PLAYER_SIZE;
  height = PLAYER_SIZE;
  sprite = IMGS.empty;
  xvel = 0;
  yvel = 0;
  lastShoot = 0;
  stopAtBorder = true;
  squares: Rectangle[] = [new Rectangle(this)]

  lifes = 3;

  constructor() {
    super(Player.startx, Player.starty)
  }

  shoot(bullet: Bullet[]) {
    if (!keys.fire || keys.repeat) return;
    if (Date.now() - this.lastShoot < FIRE_DELAY) return;
    this.lastShoot = Date.now()
    bullet.push(new Bullet(this.x + (this.width / 2) - Bullet.width / 2, this.y - Bullet.height, 0, -BULLET_VEL, true))
  }

  move() {
    if (+keys.right ^ +keys.left) {
      keys.right ? this.xvel = PLAYER_VEL : this.xvel = -PLAYER_VEL;
    } else {
      this.xvel = 0
    }

    if (+keys.up ^ +keys.down) {
      keys.down ? this.yvel = PLAYER_VEL : this.yvel = -PLAYER_VEL;
    } else {
      this.yvel = 0
    }

    if (keys.left && keys.right) this.sprite = IMGS.playerUp
    else if (keys.right) this.sprite = IMGS.playerRight
    else if (keys.left) this.sprite = IMGS.playerLeft
    else this.sprite = IMGS.playerUp

    this.x += this.xvel;
    this.y += this.yvel;

    // this.squares[0].x = this.x
    // this.squares[0].y = this.y
    // this.squares[0].width = this.sprite.width
    // this.squares[0].height = this.sprite.height

    return true;
  }
  draw() {
    this.sprite = this.sprite ?? IMGS.playerUp;
    try {
      ctx.drawImage(this.sprite, this.x, this.y)
    } catch (error) {
      console.log(error);
    }
  }

  get deathAnimation() { return new Anime(this, ["red", "green", "blue"]) }
}
