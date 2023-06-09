import { canvas, ctx } from "./consts";

export const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));
export const clearCtx = () => ctx.clearRect(0, 0, canvas.width, canvas.height)
export const toKebabCase = (str: string) => str
  .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
  ?.map(x => x.toLowerCase())
  .join('-');

export function random(p: number): boolean {
  if (p < 0 || p > 1) throw Error("Wrong probability - " + p)
  return Math.random() < p;
}
export function randomInteger(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
