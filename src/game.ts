import Anime from "./Animation";
import { Background } from "./drawables/Background";
import Bullet from "./drawables/Bullet";
import { canvas, ctx } from "./consts";
import BigCircle from "./enemies/BigCircle";
import Enemy from "./enemies/Enemy";
import { clearCtx, sleep } from "./helpers";
import Player from "./Player";
import { TopBar } from "./drawables/TopBar";
import { keys } from "./Events";
import Highscore from "./Highscore";

let p = new Player()
let pLifes = 3;
let bullets = [] as Bullet[]
let enemies = [] as Enemy[]
// let bg = new Background();
let animations = [] as Anime[]
let intervalId = 0;
let rafId = 0;
intervalId; rafId;
const bg = new Background()
const tb = new TopBar()
const hg = new Highscore()

export function start() {
  p = new Player()
  bullets = [] as Bullet[]
  enemies = [] as Enemy[]
  animations = [] as Anime[]
  enemies.push(new BigCircle(25, -20))
  // enemies.push(new Straight(20, 0))
  intervalId = setTimeout(cpuLoop, 1000 / keys.fps)
  rafId = requestAnimationFrame(gpuLoop)
}
export function cpuLoop() {
  if (hg.show) {
    hg.move();
    setTimeout(cpuLoop, 1000 / keys.fps)
    return;
  }
  p.move()
  p.shoot(bullets)
  bg.move()
  if (enemies.length === 0) {
    enemies.push(new BigCircle(25, -20))
    setTimeout(() => enemies.push(new BigCircle(25, -20)), 1000)
  }

  // enemies = enemies.filter(e => !bullets.some(b => b.collides(e)))
  enemies.forEach(e => Math.random() < 0.05 && e.shoot(bullets))
  enemies = enemies.filter(e => !e.move())

  bullets = bullets.filter(b => !b.move())

  // const collidingEnemy = enemies.filter(e => p.collides(e));
  // const collidingBullets = bullets.filter(b => p.collides(b));
  // if (collidingBullets.length || collidingEnemy.length) playerDied(collidingEnemy[0])
  setTimeout(cpuLoop, 1000 / keys.fps)
}

export function gpuLoop() {
  rafId = requestAnimationFrame(gpuLoop)

  clearCtx()

  if (hg.show) {
    hg.drawHg(bg)
    tb.draw()
    return;
  }

  bg.draw()
  bullets.forEach(b => b.draw())
  p.squares.forEach(s => s.draw())
  p.draw()
  enemies.forEach(e => {
    e.draw()
    if (e instanceof BigCircle) {
      e.squares.forEach(s => s.draw())
    }
  })
  animations = animations.filter(a => a.draw())
  tb.draw()
}

export async function playerDied(_enemy?: Enemy) {
  animations.push(p.deathAnimation)
  p.width = 0;
  p.height = 0;
  // clearTimeout(intervalId)
  // cancelAnimationFrame(rafId)
  if (--pLifes) {
    await drawRestartScreen();
    start()
  } else {
    hg.show = true
  }
}

export async function drawRestartScreen() {
  clearCtx()

  ctx.fillStyle = "yellow"
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  await sleep(2000)
}

