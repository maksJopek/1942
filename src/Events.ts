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
  roll: false,
  repeat: false,
  fps: 50,
  lastx: "",
  lasty: "",
}

// window.onkeydown = window.onkeydown ?? ((e: KeyboardEvent) => e.repeat ? keys.fire = false : setKey(e.key, true))
window.onkeydown = window.onkeydown ?? ((e: KeyboardEvent) => setKey(e.key, true, e.repeat))
window.onkeyup = window.onkeyup ?? ((e: KeyboardEvent) => setKey(e.key, false, e.repeat))

function setKey(key: string, val: boolean, repeat: boolean) {
  if (["w", "k"].includes(key)) { keys.up = val; keys.lasty = "up" }
  else if (["a", "h"].includes(key)) { keys.left = val; keys.lastx = "left" }
  else if (["s", "j"].includes(key)) { keys.down = val; keys.lasty = "down" }
  else if (["d", "l"].includes(key)) { keys.right = val; keys.lastx = "right" }
  else if (["m", ";", "/"].includes(key)) { keys.fire = val; keys.repeat = repeat }
  else if ([" "].includes(key)) keys.roll = val;
  else if (["r"].includes(key)) location.reload();
  else if (["f"].includes(key)) keys.fps = 50;
  else if (["g"].includes(key)) keys.fps = 1;
  else if (["c"].includes(key)) keys.fps = 12;
  else if (["y"].includes(key)) keys.fps += 1;
  else if (["t"].includes(key)) keys.fps -= 1;
  // console.log(key, val ? "keydown" : "keyup")
}

