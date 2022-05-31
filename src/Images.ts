// const URLS = [
//   "/src/imgs/bg2.png",
//   "/src/imgs/topbar.png",
// ];
import { allChars, alphabet } from "./consts";
import { toKebabCase } from "./helpers";

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
  planeIcon: {} as HTMLImageElement,
  rollIcon: {} as HTMLImageElement,
  startScreen0: {} as HTMLImageElement,
  startScreen1: {} as HTMLImageElement,
  startScreen2: {} as HTMLImageElement,
  startScreen3: {} as HTMLImageElement,
  startScreen4: {} as HTMLImageElement,
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
  selector: {} as HTMLImageElement,
  empty: {} as HTMLImageElement,
};
// window.IMGS = IMGS;
export default async function loadAllImages() {
  for (const key in IMGS) {
    if (["empty", "font"].includes(key)) continue;
    IMGS[key as keyof typeof IMGS] = await asyncImageLoader("/src/imgs/" + toKebabCase(key) + ".png") as any
  }
  for (const color of ['yellow', 'white']) {
    // for (const color of ['white']) {
    for (const char of allChars) {
      (((IMGS.font as any)[color] as any)[char]) = await asyncImageLoader("/src/imgs/font/" + color + "/" + encodeURIComponent(char) + ".png") as any
    }
  }
  IMGS.font[' '] = await asyncImageLoader("/src/imgs/font/ .png")
  IMGS.font.yellow[' '] = await asyncImageLoader("/src/imgs/font/ .png")
  IMGS.font.white[' '] = await asyncImageLoader("/src/imgs/font/ .png")
  // Only numbers
  for (const c of allChars.filter(ch => !alphabet.includes(ch))) {
    IMGS.font.small.white[c] = await asyncImageLoader("/src/imgs/font/small/white/" + c + ".png");
  }
}
async function asyncImageLoader(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.src = url
    image.onload = () => resolve(image)
    image.onerror = () => { console.log("img did not load", url); reject() }
  })
}

