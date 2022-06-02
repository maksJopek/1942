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
  bigCircleDown: {} as HTMLImageElement,
  bigCircleDownToRight1: {} as HTMLImageElement,
  bigCircleDownToRight2: {} as HTMLImageElement,
  bigCircleDownToRight3: {} as HTMLImageElement,
  bigCircleRight: {} as HTMLImageElement,
  bigCircleRightToUp1: {} as HTMLImageElement,
  bigCircleRightToUp2: {} as HTMLImageElement,
  bigCircleRightToUp3: {} as HTMLImageElement,
  bigCircleUp: {} as HTMLImageElement,
  bigCircleUpToLeft1: {} as HTMLImageElement,
  bigCircleUpToLeft2: {} as HTMLImageElement,
  bigCircleUpToLeft3: {} as HTMLImageElement,
  bigCircleLeft: {} as HTMLImageElement,
  bigCircleLeftToDown1: {} as HTMLImageElement,
  bigCircleLeftToDown2: {} as HTMLImageElement,
  bigCircleLeftToDown3: {} as HTMLImageElement,
  bigStrangeUp0: {} as HTMLImageElement,
  bigStrangeUp1: {} as HTMLImageElement,
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
  // startScreen0: {} as HTMLImageElement,
  // startScreen1: {} as HTMLImageElement,
  // startScreen2: {} as HTMLImageElement,
  // startScreen3: {} as HTMLImageElement,
  // startScreen4: {} as HTMLImageElement,
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
// window.IMGS = IMGS;
export default async function loadAllImages() {
  for (const key in IMGS) {
    if (["empty", "font", "start"].includes(key)) continue;
    IMGS[key as keyof typeof IMGS] = await asyncImageLoader("/src/imgs/" + toKebabCase(key) + ".png") as any
  }
  // for (const color of ['yellow', 'white', 'blue', 'red', 'green', 'purple']) {
  for (const color of ['white']) {
    for (const char of allChars) {
      (((IMGS.font as any)[color] as any)[char]) = await asyncImageLoader("/src/imgs/font/" + color + "/" + encodeURIComponent(char) + ".png") as any
    }
  }
  IMGS.font[' '] = await asyncImageLoader("/src/imgs/font/ .png")
  IMGS.font.white[' '] = await asyncImageLoader("/src/imgs/font/ .png")
  IMGS.font.yellow[' '] = await asyncImageLoader("/src/imgs/font/ .png")
  IMGS.font.blue[' '] = await asyncImageLoader("/src/imgs/font/ .png")
  IMGS.font.red[' '] = await asyncImageLoader("/src/imgs/font/ .png")
  IMGS.font.green[' '] = await asyncImageLoader("/src/imgs/font/ .png")
  IMGS.font.purple[' '] = await asyncImageLoader("/src/imgs/font/ .png")
  // Only numbers
  for (const c of allChars.filter(ch => !alphabet.includes(ch))) {
    IMGS.font.small.white[c] = await asyncImageLoader("/src/imgs/font/small/white/" + c + ".png");
  }
  for (let i = 1; i <= 215; i++)
    IMGS.start[i] = await asyncImageLoader("/src/imgs/start/" + i + ".png");
}
async function asyncImageLoader(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.src = url
    image.onload = () => resolve(image)
    image.onerror = () => { console.log("img did not load", url); reject() }
  })
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
