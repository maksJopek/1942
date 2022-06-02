import "./style.css";
import "./Events";
import loadAllImages, { loadAllSounds, SOUNDS } from "./Images";
import { start } from "./game";

const btn = document.createElement("button");
async function init() {
  await loadAllSounds();
  await loadAllImages();
  try {
    SOUNDS.win.volume = 0;
    await SOUNDS.win.play()
    SOUNDS.win.pause()
    SOUNDS.win.volume = 1
    SOUNDS.win.currentTime = 0;
    start();
  } catch (error) {
    console.log(error);

    btn.innerText = "Start da game"
    btn.onclick = () => { btn.remove(); start(); }
    document.body.appendChild(btn)
  }
}
document.body.onload = init;
