import Anime from "./Animation";
import { allChars, alphabet } from "./consts";
import Enemy from "./enemies/Enemy";
import { toKebabCase } from "./helpers";
import Player from "./Player";

export const IMGS = {
  bg: {} as HTMLImageElement,
  topbar: {} as HTMLImageElement,
  playerUp: {} as HTMLImageElement,
  playerLeft: {} as HTMLImageElement,
  playerRight: {} as HTMLImageElement,
  playerSmall: {} as HTMLImageElement,
  playerRot1: {} as HTMLImageElement,
  playerRot2: {} as HTMLImageElement,
  playerRot3: {} as HTMLImageElement,
  playerRot4: {} as HTMLImageElement,
  playerRot5: {} as HTMLImageElement,
  playerRot6: {} as HTMLImageElement,
  playerRot7: {} as HTMLImageElement,
  playerRot8: {} as HTMLImageElement,
  bigCircleDown: {} as HTMLImageElement,
  bigCircleDownRed: {} as HTMLImageElement,
  bigCircleDownToRight1: {} as HTMLImageElement,
  bigCircleDownToRight1Red: {} as HTMLImageElement,
  bigCircleDownToRight2: {} as HTMLImageElement,
  bigCircleDownToRight2Red: {} as HTMLImageElement,
  bigCircleDownToRight3: {} as HTMLImageElement,
  bigCircleDownToRight3Red: {} as HTMLImageElement,
  bigCircleRight: {} as HTMLImageElement,
  bigCircleRightRed: {} as HTMLImageElement,
  bigCircleRightToUp1: {} as HTMLImageElement,
  bigCircleRightToUp1Red: {} as HTMLImageElement,
  bigCircleRightToUp2: {} as HTMLImageElement,
  bigCircleRightToUp2Red: {} as HTMLImageElement,
  bigCircleRightToUp3: {} as HTMLImageElement,
  bigCircleRightToUp3Red: {} as HTMLImageElement,
  bigCircleUp: {} as HTMLImageElement,
  bigCircleUpRed: {} as HTMLImageElement,
  bigCircleUpToLeft1: {} as HTMLImageElement,
  bigCircleUpToLeft1Red: {} as HTMLImageElement,
  bigCircleUpToLeft2: {} as HTMLImageElement,
  bigCircleUpToLeft2Red: {} as HTMLImageElement,
  bigCircleUpToLeft3: {} as HTMLImageElement,
  bigCircleUpToLeft3Red: {} as HTMLImageElement,
  bigCircleLeft: {} as HTMLImageElement,
  bigCircleLeftRed: {} as HTMLImageElement,
  bigCircleLeftToDown1: {} as HTMLImageElement,
  bigCircleLeftToDown1Red: {} as HTMLImageElement,
  bigCircleLeftToDown2: {} as HTMLImageElement,
  bigCircleLeftToDown2Red: {} as HTMLImageElement,
  bigCircleLeftToDown3: {} as HTMLImageElement,
  bigCircleLeftToDown3Red: {} as HTMLImageElement,
  bigStrangeUp0: {} as HTMLImageElement,
  bigStrangeUp0Red: {} as HTMLImageElement,
  bigStrangeUp1: {} as HTMLImageElement,
  bigStrangeUp1Red: {} as HTMLImageElement,
  simpleDown: {} as HTMLImageElement,
  simpleRot1: {} as HTMLImageElement,
  simpleRot2: {} as HTMLImageElement,
  simpleRot3: {} as HTMLImageElement,
  simpleRot4: {} as HTMLImageElement,
  simpleUp: {} as HTMLImageElement, // po 4 klatki na sprite
  redRight: {} as HTMLImageElement,
  redRightToDown: {} as HTMLImageElement,
  redRightToUp: {} as HTMLImageElement,
  redDown: {} as HTMLImageElement,
  redDownToLeft: {} as HTMLImageElement,
  redDownToRight: {} as HTMLImageElement,
  redLeft: {} as HTMLImageElement,
  redLeftToUp: {} as HTMLImageElement,
  redLeftToDown: {} as HTMLImageElement,
  redUp: {} as HTMLImageElement,
  redUpToRight: {} as HTMLImageElement,
  redUpToLeft: {} as HTMLImageElement,
  greenUp: {} as HTMLImageElement,
  greenUpToRight: {} as HTMLImageElement,
  greenUpToLeft: {} as HTMLImageElement,
  greenRight: {} as HTMLImageElement,
  greenRightToDown: {} as HTMLImageElement,
  greenDown: {} as HTMLImageElement,
  greenDownToLeft: {} as HTMLImageElement,
  greenLeft: {} as HTMLImageElement,
  greenLeftToUp: {} as HTMLImageElement,
  whiteDown: {} as HTMLImageElement,
  whiteTurnLeft: {} as HTMLImageElement,
  whiteTurnRight: {} as HTMLImageElement,
  whiteStrangeLeft: {} as HTMLImageElement,
  whiteStrangeRight: {} as HTMLImageElement,
  playerDeath1: {} as HTMLImageElement,
  playerDeath2: {} as HTMLImageElement,
  playerDeath3: {} as HTMLImageElement,
  playerDeath4: {} as HTMLImageElement,
  playerDeath5: {} as HTMLImageElement,
  playerDeath6: {} as HTMLImageElement,
  playerDeath7: {} as HTMLImageElement,
  playerDeath8: {} as HTMLImageElement,
  playerDeath9: {} as HTMLImageElement,
  playerDeath10: {} as HTMLImageElement,
  playerDeath11: {} as HTMLImageElement,
  playerDeath12: {} as HTMLImageElement,
  playerDeath13: {} as HTMLImageElement,
  playerDeath14: {} as HTMLImageElement,
  playerDeath15: {} as HTMLImageElement,
  playerDeath16: {} as HTMLImageElement,
  playerDeath17: {} as HTMLImageElement,
  playerDeath18: {} as HTMLImageElement,
  playerDeath19: {} as HTMLImageElement,
  playerDeath20: {} as HTMLImageElement,
  playerDeath21: {} as HTMLImageElement,
  smallDeath1: {} as HTMLImageElement,
  smallDeath2: {} as HTMLImageElement,
  smallDeath3: {} as HTMLImageElement,
  smallDeath4: {} as HTMLImageElement,
  smallDeath5: {} as HTMLImageElement,
  smallDeath6: {} as HTMLImageElement,
  bigDeath1: {} as HTMLImageElement,
  bigDeath2: {} as HTMLImageElement,
  bigDeath3: {} as HTMLImageElement,
  bigDeath4: {} as HTMLImageElement,
  bigDeath5: {} as HTMLImageElement,
  bigDeath6: {} as HTMLImageElement,
  bigDeath7: {} as HTMLImageElement,
  bigDeath8: {} as HTMLImageElement,
  bigDeath9: {} as HTMLImageElement,
  bigDeath10: {} as HTMLImageElement,
  bigDeath11: {} as HTMLImageElement,
  playerBullet2: {} as HTMLImageElement,
  playerBullet3: {} as HTMLImageElement,
  enemyBullet: {} as HTMLImageElement,
  planeIcon: {} as HTMLImageElement,
  rollIcon: {} as HTMLImageElement,
  powerup: {} as HTMLImageElement,
  startScreen0: {} as HTMLImageElement,
  startScreen1: {} as HTMLImageElement,
  startScreen2: {} as HTMLImageElement,
  startScreen3: {} as HTMLImageElement,
  startScreen4: {} as HTMLImageElement,
  restartScreen: {} as HTMLImageElement,
  font: {
    white: {} as any,
    yellow: {} as any,
    blue: {} as any,
    red: {} as any,
    green: {} as any,
    purple: {} as any,
    small: {
      white: {} as any,
    },
    ' ': {} as HTMLImageElement,
  },
  start: {} as any,
  selector: {} as HTMLImageElement,
  empty: {} as HTMLImageElement,
};
export const URL = "/"
// window.IMGS = IMGS;
export default async function loadAllImages() {
  for (const key in IMGS) {
    if (["empty", "font", "start"].includes(key)) continue;
    IMGS[key as keyof typeof IMGS] = await asyncImageLoader(URL + "src/imgs/" + toKebabCase(key) + ".png") as any
  }
  for (const color of ['yellow', 'white', 'blue', 'red', 'green', 'purple']) {
    // for (const color of ['white', 'yellow']) {
    for (const char of allChars) {
      (((IMGS.font as any)[color] as any)[char]) = await asyncImageLoader(URL + "src/imgs/font/" + color + "/" + encodeURIComponent(char) + ".png") as any
    }
  }
  IMGS.font[' '] = await asyncImageLoader(URL + "src/imgs/font/ .png")
  IMGS.font.white[' '] = await asyncImageLoader(URL + "src/imgs/font/ .png")
  IMGS.font.white['%'] = await asyncImageLoader(URL + "src/imgs/font/%25.png")
  IMGS.font.yellow[' '] = await asyncImageLoader(URL + "src/imgs/font/ .png")
  IMGS.font.yellow['='] = await asyncImageLoader(URL + "src/imgs/font/=.png")
  IMGS.font.blue[' '] = await asyncImageLoader(URL + "src/imgs/font/ .png")
  IMGS.font.red[' '] = await asyncImageLoader(URL + "src/imgs/font/ .png")
  IMGS.font.green[' '] = await asyncImageLoader(URL + "src/imgs/font/ .png")
  IMGS.font.purple[' '] = await asyncImageLoader(URL + "src/imgs/font/ .png")
  // Only numbers
  for (const c of allChars.filter(ch => !alphabet.includes(ch))) {
    IMGS.font.small.white[c] = await asyncImageLoader(URL + "src/imgs/font/small/white/" + c + ".png");
  }
  for (let i = 1; i <= 215; i++)
    IMGS.start[i] = await asyncImageLoader(URL + "src/imgs/start/" + i + ".png");
}
async function asyncImageLoader(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.src = url
    image.onload = () => resolve(image)
    image.onerror = () => { console.log("img did not load", url); reject() }
  })
}
async function asyncSoundLoader(url: string): Promise<HTMLAudioElement> {
  return new Promise((resolve, reject) => {
    const image = new Audio(url)
    image.src = url
    image.oncanplaythrough = () => resolve(image)
    image.onerror = () => { console.log("img did not load", url); reject() }
  })
}
export interface Sound extends HTMLAudioElement {
  playFromBegin: () => void;
}
export const SOUNDS = {
  enemyDie: {} as Sound,
  fire: {} as Sound,
  mainTheme: {} as Sound,
  name: {} as Sound,
  playerDeath: {} as Sound,
  startLevel: {} as Sound,
  win: {} as Sound,
  powerup: {} as Sound,
  letterCheck: {} as Sound,
  rvCheck: {} as Sound,
}
export async function loadAllSounds() {
  for (const key in SOUNDS) {
    const toBeSound = await asyncSoundLoader(URL + "src/audios/" + toKebabCase(key) + ".mp3") as Sound
    toBeSound.playFromBegin = function() { this.currentTime = 0; this.play() }
    if (["mainTheme", "win", "name"].includes(key)) toBeSound.loop = true;
    SOUNDS[key as keyof typeof SOUNDS] = toBeSound;
  }
}

export function getSmallDeathAnim(t: Enemy) {
  return new Anime(t, [
    IMGS.smallDeath1,
    IMGS.smallDeath2,
    IMGS.smallDeath3,
    IMGS.smallDeath4,
    IMGS.smallDeath5,
    IMGS.smallDeath6,
  ])
}
export function getBigDeathAnim(t: Enemy) {
  return new Anime(t, [
    IMGS.bigDeath1,
    IMGS.bigDeath2,
    IMGS.bigDeath3,
    IMGS.bigDeath4,
    IMGS.bigDeath5,
    IMGS.bigDeath6,
    IMGS.bigDeath7,
    IMGS.bigDeath8,
    IMGS.bigDeath9,
    IMGS.bigDeath10,
    IMGS.bigDeath11,
  ])
}
export function getPlayerDeathAnim(t: Player) {
  return new Anime(t, [
    IMGS.playerDeath1,
    IMGS.playerDeath2,
    IMGS.playerDeath3,
    IMGS.playerDeath4,
    IMGS.playerDeath5,
    IMGS.playerDeath6,
    IMGS.playerDeath7,
    IMGS.playerDeath8,
    IMGS.playerDeath9,
    IMGS.playerDeath10,
    IMGS.playerDeath11,
    IMGS.playerDeath12,
    IMGS.playerDeath13,
    IMGS.playerDeath14,
    IMGS.playerDeath15,
    IMGS.playerDeath16,
    IMGS.playerDeath17,
    IMGS.playerDeath18,
    IMGS.playerDeath19,
    IMGS.playerDeath20,
    IMGS.playerDeath21,
  ])
}
