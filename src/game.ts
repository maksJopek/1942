import Anime from "./Animation";
import { Background } from "./drawables/Background";
import Bullet from "./drawables/Bullet";
import { canvas, ctx, TOPBAR_HEIGHT } from "./consts";
import BigCircle from "./enemies/BigCircle";
import Straight from "./enemies/Straight";
import Red1 from "./enemies/Red1";
import Red2 from "./enemies/Red2";
import Enemy from "./enemies/Enemy";
import { clearCtx, randomInteger, sleep } from "./helpers";
import Player from "./Player";
import { TopBar } from "./drawables/TopBar";
import { keys } from "./Events";
import Highscore from "./Highscore";
import Green1 from "./enemies/Green1";
import Green2 from "./enemies/Green2";
import Strange from "./enemies/Strange";
import White from "./enemies/White";
import Startscreen from "./drawables/Startscreen";
import { getHighscore } from "./Storage";
import AnimStart from "./drawables/AnimStart";
import { IMGS, SOUNDS } from "./Images";
import Powerup from "./drawables/Powerup";

let p = new Player()
let pLifes = 3;
// pLifes = 1;
let score = 0;
let highscore = getHighscore();
export const rolls = { r: 3 }
// let rolls = 3;
let bullets = [] as Bullet[]
const playerBullets = () => bullets.filter(b => b.players)
const enemyBullets = () => bullets.filter(b => !b.players)
let enemies = [] as Enemy[]
let enemShooted = 0;
let animations = [] as Anime[]
let intervalId = 0;
let rafId = 0;
let showMenu = true
let showAnimStart = true
// showMenu = false
// showAnimStart = false
let bg = new Background()
let tb = new TopBar()
let hg = new Highscore()
let animStart = new AnimStart(0, TOPBAR_HEIGHT)
let pu: Powerup | null = null
// const ss = new Startscreen();

export async function start() {
  p = new Player()
  bullets = [] as Bullet[]
  enemies = [] as Enemy[]
  animations = [] as Anime[]
  newTimeout()
  rafId = requestAnimationFrame(gpuLoop)
}
export function cpuLoop() {
  if (showMenu) {
    SOUNDS.mainTheme.play()
    cpuMenu()
    newTimeout()
    return
  }
  if (showAnimStart) {
    return
  }
  if (hg.show) {
    SOUNDS.mainTheme.pause()
    SOUNDS.name.play()
    tb.setData(score, pLifes, rolls.r, bg.delta, enemShooted, highscore)
    if (hg.move()) newTimeout()
    return;
  }
  // hg.show = true
  if (bg.delta > 2375) { p.autoPilot = true; p.stopAtBorder = false; }
  if (bg.delta === 2580) {
    SOUNDS.mainTheme.pause()
    SOUNDS.win.play()
    p.landed = true
  }
  p.move()
  p.shoot(bullets)
  bg.move()
  spawnEnemies()
  tb.setData(score, pLifes, rolls.r, bg.delta, enemShooted, highscore)

  // enemies = enemies.filter(e => !bullets.some(b => b.collides(e)))
  enemies.forEach(e => e.shoot(bullets))
  enemies = enemies.filter(e => !e.move())

  bullets = bullets.filter(b => !b.move())
  if (pu && pu.move()) pu = null

  const enemCollPlay = enemies.filter(e => p.collides([e]));
  const bullCollPlay = enemyBullets().filter(b => p.collides([b]));
  if (pu && p.collides([pu])) {
    pu = null
    p.power = 3
    SOUNDS.powerup.play()
  }

  bullets = bullets.filter(b => !bullCollPlay.includes(b))
  // const enemiesToDie = enemies.filter(e => e.collides(bullets))
  // console.log("bef: ", enemies.length);

  enemies = enemies.filter(e => {
    if (e.collides(playerBullets())) {
      e.health -= p.power;
      bullets = bullets.filter(b => !b.collides([e]))
      if (e.health < 1) {
        animations.push(e.deathAnim)
        score += e.points
        enemShooted++;
        SOUNDS.enemyDie.play()
        if (e instanceof Straight && e.drop) pu = new Powerup(e.x, e.y)
        return false
      } else if (e instanceof BigCircle) score += 100;
      else if (e instanceof Strange) score += 100;
    }
    return true;
  })
  // console.log("aft: ", enemies.length);
  // playerDied({} as Enemy)
  if (bullCollPlay.length || enemCollPlay.length) playerDied(enemCollPlay)
  // if (bullCollPlay.length || enemCollPlay.length) animations.push(p.deathAnimation)
  // else newTimeout()
  newTimeout()
}

export function gpuLoop() {
  rafId = requestAnimationFrame(gpuLoop)

  clearCtx();

  if (showMenu) {
    gpuMenu();
    return;
  }
  if (showAnimStart) {
    SOUNDS.mainTheme.pause()
    SOUNDS.startLevel.play()
    SOUNDS.startLevel.onended = () => { SOUNDS.mainTheme.currentTime = 4.0; SOUNDS.mainTheme.play() }
    tb.draw()
    showAnimStart = animStart.draw()
    if (showAnimStart) newTimeout()
    return;
  }
  if (hg.show) {
    hg.drawHg(bg, score)
    tb.draw()
    return;
  }

  bg.draw()
  if (pu) pu.draw()
  bullets.forEach(b => b.draw())
  p.draw()
  enemies.forEach(e => e.draw())
  animations = animations.filter(a => a.draw())
  tb.draw()
}

export function playerDied(_enemy: Enemy[]) {
  p.alive = false
  p.squares = []
  SOUNDS.playerDeath.play()
  const da = p.deathAnimation;
  da.cb = () => afterPlayerDeathAnim()
  animations.push(p.deathAnimation)
}
export async function afterPlayerDeathAnim() {
  clearTimeout(intervalId)
  cancelAnimationFrame(rafId)
  pLifes -= 1;
  rolls.r = 3
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

  tb.setData(score, pLifes, rolls.r, bg.delta, enemShooted, highscore)
  tb.draw()
  ctx.drawImage(IMGS.restartScreen, 0, TOPBAR_HEIGHT)
  ctx.drawImage(IMGS.font.white[pLifes], 245, 29 + TOPBAR_HEIGHT, 15, 8)
  Player.startx = 143
  Player.starty = 98 + TOPBAR_HEIGHT
  await sleep(2000)
  bg.delta = 150
}

let startscreen = new Startscreen()
tb.setData(score, pLifes, rolls.r, 0, 0, highscore)
function cpuMenu() {
  startscreen.move()
  if (keys.fire === true) showMenu = false;
}
function gpuMenu() {
  tb.draw()
  startscreen.draw()
}
export function startAgain() {
  clearTimeout(intervalId)
  cancelAnimationFrame(rafId)
  Player.startx = 144;
  Player.starty = 122;
  bg.delta = 0
  pLifes = 3;
  score = 0
  highscore = getHighscore();
  rolls.r = 3
  showMenu = true
  showAnimStart = true
  bg = new Background()
  tb = new TopBar()
  hg = new Highscore()
  animStart = new AnimStart(0, TOPBAR_HEIGHT)
  startscreen = new Startscreen()
  whichStraight = randomInteger(0, 2)
  tb.setData(score, pLifes, rolls.r, 0, 0, highscore)
  SOUNDS.mainTheme.currentTime = 0
  SOUNDS.win.currentTime = 0
  SOUNDS.startLevel.currentTime = 0
  keys.fire = false
  start()
}

const newTimeout = (f = cpuLoop) => { clearTimeout(intervalId); intervalId = setTimeout(f, 1000 / keys.fps) }

let whichStraight = randomInteger(0, 2)
function spawnEnemies() {

  ;;;; if (bg.delta === 190) enemies.push(new Straight(80, TOPBAR_HEIGHT));
  else if (bg.delta === 190 + 20) enemies.push(new Straight(110, TOPBAR_HEIGHT));
  else if (bg.delta === 190 + 20 + 30) enemies.push(new Straight(160, TOPBAR_HEIGHT));
  else if (bg.delta === 190 + 20 + 30 + 25) enemies.push(new Straight(210, TOPBAR_HEIGHT));
  else if (bg.delta === 190 + 20 + 30 + 25 + 80) enemies.push(new Straight(130, TOPBAR_HEIGHT, whichStraight === 0));
  else if (bg.delta === 190 + 20 + 30 + 25 + 80 + 50) enemies.push(new Straight(90, TOPBAR_HEIGHT, whichStraight === 1));
  else if (bg.delta === 190 + 20 + 30 + 25 + 80 + 50 + 32) enemies.push(new Straight(220, TOPBAR_HEIGHT, whichStraight === 2));
  else if (bg.delta === 640) enemies.push(new BigCircle(16, TOPBAR_HEIGHT - 40))
  else if (bg.delta === 640 + 38) enemies.push(new Straight(90, TOPBAR_HEIGHT), new Straight(266, TOPBAR_HEIGHT))
  else if (bg.delta === 640 + 38 + 38) enemies.push(new Straight(140, TOPBAR_HEIGHT))
  else if (bg.delta === 640 + 38 + 38 + 70) enemies.push(new Straight(30, TOPBAR_HEIGHT))
  else if (bg.delta === 640 + 38 + 38 + 70 + 30) enemies.push(new Straight(266, TOPBAR_HEIGHT))
  else if (bg.delta === 1026 + 21 * 0) enemies.push(new Red1(-24, 52))
  else if (bg.delta === 1026 + 21 * 1) enemies.push(new Red1(-24, 52))
  else if (bg.delta === 1026 + 21 * 2) enemies.push(new Red1(-24, 52))
  else if (bg.delta === 1026 + 21 * 3) enemies.push(new Red1(-24, 52))
  else if (bg.delta === 1026 + 21 * 4) enemies.push(new Red1(-24, 52))
  else if (bg.delta === 1120) enemies.push(new Green1(110, canvas.height, true), new Green1(170, canvas.height, false))
  else if (bg.delta === 1498) enemies.push(new Strange(160, canvas.height))
  else if (bg.delta === 1508 + 45) enemies.push(new Red2(100, TOPBAR_HEIGHT, true), new Red2(180, TOPBAR_HEIGHT, false))
  else if (bg.delta === 1508 + 45 + 90) enemies.push(new Green2(100, TOPBAR_HEIGHT, true), new Green2(180, TOPBAR_HEIGHT, false))
  else if (bg.delta === 2010 + 85 * 0) enemies.push(new White(60, TOPBAR_HEIGHT, true), new White(230, TOPBAR_HEIGHT, false))
  else if (bg.delta === 2010 + 85 * 1) enemies.push(new White(60, TOPBAR_HEIGHT, true), new White(230, TOPBAR_HEIGHT, false))
  else if (bg.delta === 2010 + 85 * 2) enemies.push(new White(60, TOPBAR_HEIGHT, true), new White(230, TOPBAR_HEIGHT, false))
  else if (bg.delta === 2010 + 85 * 3) enemies.push(new White(60, TOPBAR_HEIGHT, true))

  // if (bg.delta > 2200)
  //   console.log(bg.delta);
}
