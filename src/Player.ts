import Anime from "./Animation";
import Bullet from "./drawables/Bullet";
import { BULLET_VEL, canvas, ctx, FIRE_DELAY, PLAYER_VEL } from "./consts";
import Drawable, { Rectangle } from "./Drawable";
import { keys } from "./Events";
import { IMGS } from "./Images";

export default class Player extends Drawable {
  static startx = 250;
  static starty = 100;

  width = IMGS.playerUp.width;
  height = IMGS.playerUp.height;
  sprite = IMGS.empty;
  xvel = 0;
  yvel = 0;
  lastShoot = 0;
  stopAtBorder = true;
  squares: Rectangle[] = [new Rectangle(this)]

  lifes = 3;
  power = 2;

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
    if (this.x + this.xvel <= 35) this.sprite = IMGS.playerUp
    else if (this.x + this.xvel + this.width >= canvas.width - 35) this._x = canvas.width - 35 - this.width;

    this.width = this.sprite.width;
    this.height = this.sprite.height;
    this.squares = [new Rectangle(this)]
    this.y += this.yvel;
    this.x += this.xvel;

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
