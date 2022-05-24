// export interface Keys {
//   right: boolean;
//   left: boolean;
//   up: boolean;
//   down: boolean;
//   fire: boolean;
// }
export const keys = {
  right: false,
  left: false,
  up: false,
  down: false,
  fire: false,
  repeat: false,
  fps: 50,
}

// window.onkeydown = window.onkeydown ?? ((e: KeyboardEvent) => e.repeat ? keys.fire = false : setKey(e.key, true))
window.onkeydown = window.onkeydown ?? ((e: KeyboardEvent) => setKey(e.key, true, e.repeat))
window.onkeyup = window.onkeyup ?? ((e: KeyboardEvent) => setKey(e.key, false, e.repeat))

function setKey(key: string, val: boolean, repeat: boolean) {
  if (["w", "k"].includes(key)) keys.up = val;
  else if (["a", "h"].includes(key)) keys.left = val;
  else if (["s", "j"].includes(key)) keys.down = val;
  else if (["d", "l"].includes(key)) keys.right = val;
  else if (["m", ";", "/"].includes(key)) { keys.fire = val; keys.repeat = repeat }
  else if (["r"].includes(key)) location.reload();
  else if (["f"].includes(key)) keys.fps = 50;
  else if (["g"].includes(key)) keys.fps = 1;
  // console.log(key, val ? "keydown" : "keyup")
}

