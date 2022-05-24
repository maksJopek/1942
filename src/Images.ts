// const URLS = [
//   "/src/imgs/bg2.png",
//   "/src/imgs/topbar.png",
// ];
import { alphabet } from "./consts";
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
  font: {
    white: {} as any,
    yellow: {} as any,
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
    for (const char of [...alphabet]) {
      (((IMGS.font as any)[color] as any)[char]) = await asyncImageLoader("/src/imgs/font/" + color + "/" + encodeURIComponent(char) + ".png") as any
    }
  }
  IMGS.font[' '] = await asyncImageLoader("/src/imgs/font/ .png")
  IMGS.font.yellow[' '] = await asyncImageLoader("/src/imgs/font/ .png")
  IMGS.font.white[' '] = await asyncImageLoader("/src/imgs/font/ .png")
}
async function asyncImageLoader(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.src = url
    image.onload = () => resolve(image)
    image.onerror = () => { console.log("img did not load", url); reject() }
  })
}

