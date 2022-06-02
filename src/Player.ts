import Bullet from "./drawables/Bullet";
import { BULLET_VEL, canvas, ctx, FIRE_DELAY, PLAYER_VEL } from "./consts";
import Drawable, { Rectangle } from "./Drawable";
import { keys } from "./Events";
import { getPlayerDeathAnim, IMGS, SOUNDS } from "./Images";
import { rolls } from "./game";

export default class Player extends Drawable {
  static startx = 144;
  static starty = 122;
  // static startx = 250;
  // static starty = 150;

  width = IMGS.playerUp.width;
  height = IMGS.playerUp.height;
  sprite = IMGS.playerUp;
  xvel = 0;
  yvel = 0;
  lastShoot = 0;
  stopAtBorder = true;
  autoPilot = false;
  landed = false;
  rolling = false
  ri = 0;
  rsi = 1;
  squares: Rectangle[] = [new Rectangle(this)]
  // squares: Rectangle[] = []

  power = 2;
  alive = true;

  constructor() {
    super(Player.startx, Player.starty)
  }

  shoot(bullet: Bullet[]) {
    if (!keys.fire || keys.repeat || this.autoPilot || !this.alive) return;
    if (Date.now() - this.lastShoot < FIRE_DELAY) return;
    this.lastShoot = Date.now()
    bullet.push(new Bullet(this.x + 2, this.y + 7, 0, -BULLET_VEL, true, this.power))
    SOUNDS.fire.playFromBegin()
  }

  move() {
    if (!this.alive) return false
    if (this.autoPilot) {
      // debugger
      const tx = 144
      const ty = 87
      const vel = PLAYER_VEL / 2.5
      const xd = Math.abs(this.x - tx)
      this.xvel = 0; this.yvel = 0;
      if (xd < vel) this.x = tx
      else if (this.x !== tx) this.xvel += (this.x > tx ? -1 : 1) * vel
      const yd = Math.abs(this.y - ty)
      if (yd < vel) this.y = ty
      else if (this.y !== ty) this.yvel = -vel
    }
    else {
      if (keys.roll && rolls.r > 0 && this.rolling === false) {
        this.rolling = true;
        this.squares = []
        rolls.r--;
        this.rsi = 1;
      }

      if (this.rolling && this.ri++ === 7) { this.rsi++; this.ri = 0; }
      if (this.rsi >= 8) { this.rolling = false; this.squares = [new Rectangle(this)] }
      if (keys.right || keys.left) {
        if (keys.right && keys.left) {
          keys.lastx === "right" ? this.xvel = PLAYER_VEL : this.xvel = -PLAYER_VEL;
        } else if (keys.right) this.xvel = PLAYER_VEL
        else if (keys.left) this.xvel = -PLAYER_VEL
      } else {
        this.xvel = 0
      }
      // if (+keys.right ^ +keys.left) {
      //   keys.right ? this.xvel = PLAYER_VEL : this.xvel = -PLAYER_VEL;
      // } else {
      //   this.xvel = 0
      // }

      if (keys.up || keys.down) {
        if (keys.up && keys.down) {
          keys.lasty === "down" ? this.yvel = PLAYER_VEL : this.yvel = -PLAYER_VEL;
        } else if (keys.up) this.yvel = -PLAYER_VEL
        else if (keys.down) this.yvel = PLAYER_VEL
      } else {
        this.yvel = 0
      }
      // if (+keys.up ^ +keys.down) {
      //   keys.down ? this.yvel = PLAYER_VEL : this.yvel = -PLAYER_VEL;
      // } else {
      //   this.yvel = 0
      // }
    }
    // if (keys.left && keys.right) this.sprite = IMGS.playerUp
    // else if (keys.right) this.sprite = IMGS.playerRight
    // else if (keys.left) this.sprite = IMGS.playerLeft
    // else this.sprite = IMGS.playerUp
    // if (this.x + this.xvel <= 35) this.sprite = IMGS.playerUp
    // else if (this.x + this.xvel + this.width >= canvas.width - 35) this._x = canvas.width - 35 - this.width;
    //@ts-expect-error
    if (this.rolling) this.sprite = IMGS["playerRot" + this.rsi]
    // else if (this.xvel && this.yvel) this.sprite = IMGS.playerUp
    else if (this.xvel > 0) this.sprite = IMGS.playerRight
    else if (this.xvel < 0) this.sprite = IMGS.playerLeft
    else this.sprite = IMGS.playerUp
    if (this.x + this.xvel <= 25) this.sprite = IMGS.playerUp
    else if (!this.autoPilot && this.x + this.xvel + this.width >= canvas.width - 25) this._x = canvas.width - 25 - this.width;

    this.width = this.sprite.width;
    this.height = this.sprite.height;
    // this.squares = [new Rectangle(this)]
    this.y += this.yvel;
    this.x += this.xvel;

    return true;
  }
  draw() {
    if (!this.alive) return

    if (this.landed) {
      this._x = 147
      this._y = 87
      this.sprite = IMGS.playerSmall
    }
    this.sprite = this.sprite ?? IMGS.playerUp;
    try {
      ctx.drawImage(this.sprite, this.x, this.y)
    } catch (error) {
      console.log(error);
    }
  }

  deathAnimation = getPlayerDeathAnim(this)
}
