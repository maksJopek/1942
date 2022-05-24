import { canvas, PLAYER_VEL } from "../consts";
import Enemy from "./Enemy";

export default class Straight extends Enemy {
  width = 20;
  height = 20;
  sprite = "blue";
  vel = PLAYER_VEL * 0.8

  move() {
    if (this.y + this.height > canvas.height) { this.y = canvas.height - this.height; }
    else if (this.y === canvas.height - this.height) { this.vel *= -1; this.y += this.vel; }
    else { this.y += this.vel; }

    return this.y + this.height < 0
  }
}
