export const canvas = document.querySelector<HTMLCanvasElement>('canvas')!
export const ctx = canvas.getContext("2d")!
ctx.imageSmoothingEnabled = false;

export const PLAYER_SIZE = 20; // canvas-dot
export const PLAYER_VEL = 3.5; // canvas-dot / frame
export const BULLET_VEL = 4.5; // canvas-dot / frame
export const FIRE_DELAY = 300; // ms
export const TOPBAR_HEIGHT = 24; // ms

export const FPS = 1;
export const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '.', '-', '&', '?', '!', 'man', 'woman', 'heart', 'rv', 'ed']
