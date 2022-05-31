import Anime from "./Animation";
import { Background } from "./drawables/Background";
import Bullet from "./drawables/Bullet";
import { canvas, ctx } from "./consts";
import BigCircle from "./enemies/BigCircle";
import Straight from "./enemies/Straight";
import Red1 from "./enemies/Red1";
import Red2 from "./enemies/Red2";
import Enemy from "./enemies/Enemy";
import { clearCtx, sleep } from "./helpers";
import Player from "./Player";
import { TopBar } from "./drawables/TopBar";
import { keys } from "./Events";
import Highscore from "./Highscore";
import Green1 from "./enemies/Green1";
import Green2 from "./enemies/Green2";
import Strange from "./enemies/Strange";
import White from "./enemies/White";

let p = new Player()
let pLifes = 1;
let score = 25004;
let highscore = 0;
let rolls = 3;
let bullets = [] as Bullet[]
const playerBullets = () => bullets.filter(b => b.players)
const enemyBullets = () => bullets.filter(b => !b.players)
let enemies = [] as Enemy[]
// let bg = new Background();
let animations = [] as Anime[]
let intervalId = 0;
let rafId = 0;
const bg = new Background()
const tb = new TopBar()
const hg = new Highscore()

export function start() {
  p = new Player()
  bullets = [] as Bullet[]
  enemies = [] as Enemy[]
  animations = [] as Anime[]
  // enemies.push(new BigCircle(25, -20))
  // enemies.push(new Straight(20, 0))
  // enemies.push(new Red1(0, 51))
  // enemies.push(new Green1(115, canvas.height, true), new Green1(170, canvas.height, false))
  // enemies.push(new Strange(160, canvas.height))
  // enemies.push(new White(60, 0, true), new White(230, 0, false))
  // enemies.push(new Red2(100, 0, true), new Red2(180, 0, false))
  // enemies.push(new Green2(100, 0, true), new Green2(180, 0, false))
  newTimeout()
  rafId = requestAnimationFrame(gpuLoop)
}
export function cpuLoop() {
  if (hg.show) {
    hg.move();
    tb.setData(score, pLifes, rolls, highscore)
    newTimeout()
    return;
  }
  p.move()
  p.shoot(bullets)
  bg.move()
  tb.setData(score, pLifes, rolls, highscore)
  if (enemies.length === 0) {
    // enemies.push(new BigCircle(25, -20))
    // enemies.push(new Straight(25, -20))
    // enemies.push(new Red1(25, -20))
    // enemies.push(new Green1(115, canvas.height, true), new Green1(170, canvas.height, false))
    // enemies.push(new Strange(160, canvas.height))
    // enemies.push(new White(60, 0, true), new White(230, 0, false))
    // enemies.push(new Red2(100, 0, true), new Red2(180, 0, false))
    // enemies.push(new Green2(100, 0, true), new Green2(180, 0, false))
    // setTimeout(() => enemies.push(new Straight(25, -20)), 1000)
    // setTimeout(() => enemies.push(new BigCircle(25, -20)), 1000)
    // setTimeout(() => enemies.push(new Red1(25, -20)), 1000)
    // setTimeout(() => enemies.push(new Green1(115, canvas.height, true), new Green1(170, canvas.height, false)), 1000)
    // setTimeout(() => enemies.push(new Strange(160, canvas.height)), 1000)
  }

  // enemies = enemies.filter(e => !bullets.some(b => b.collides(e)))
  enemies.forEach(e => Math.random() < 0.05 && e.shoot(bullets))
  enemies = enemies.filter(e => !e.move())

  bullets = bullets.filter(b => !b.move())

  const enemCollPlay = enemies.filter(e => p.collides([e]));
  const bullCollPlay = enemyBullets().filter(b => p.collides([b]));

  bullets = bullets.filter(b => !bullCollPlay.includes(b))
  // const enemiesToDie = enemies.filter(e => e.collides(bullets))
  // console.log("bef: ", enemies.length);

  enemies = enemies.filter(e => {
    if (e.collides(playerBullets())) {
      e.health -= p.power;
      animations.push(new Anime(e, e.deathAnim))
      bullets = bullets.filter(b => !b.collides([e]))
      if (e.health < 1) {
        score += e.points
        return false
      }
      return true
    }
    return true;
  })
  // console.log("aft: ", enemies.length);
  // playerDied({} as Enemy)
  if (!bullCollPlay.length || enemCollPlay.length) playerDied(enemCollPlay)
  else newTimeout()
}

export function gpuLoop() {
  rafId = requestAnimationFrame(gpuLoop)

  clearCtx()

  if (hg.show) {
    hg.drawHg(bg, score)
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

export async function playerDied(_enemy: Enemy[]) {
  animations.push(p.deathAnimation)
  p.width = 0;
  p.height = 0;
  clearTimeout(intervalId)
  cancelAnimationFrame(rafId)
  pLifes -= 1;
  if (pLifes !== 0) {
    await drawRestartScreen();
    start()
  } else {
    hg.show = true
    newTimeout()
    requestAnimationFrame(gpuLoop)
  }
}

export async function drawRestartScreen() {
  clearCtx()

  ctx.fillStyle = "yellow"
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  await sleep(2000)
}

const newTimeout = (f = cpuLoop) => { clearTimeout(intervalId); intervalId = setTimeout(f, 1000 / keys.fps) }

