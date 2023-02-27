import "./style.css";
import "./Events";
import { loadAllImages, loadAllSounds } from "./Images";
import { start } from "./game";
import { canvas, helpTxt } from "./consts";

const btn = document.getElementsByTagName("button")[0]
const txt = document.getElementsByTagName("div")[0]

async function init() {
  try {
    await loadAllSounds();
    await loadAllImages();
    // SOUNDS.win.volume = 0;
    // await SOUNDS.win.play()
    // SOUNDS.win.pause()
    // SOUNDS.win.volume = 1
    // SOUNDS.win.currentTime = 0;

    txt.innerText = "GAME IS READY TO BE PLAYED"
    btn.classList.add("visible")
    btn.onclick = () => {
      btn.remove();
      txt.remove();
      canvas.style.display = "block";
      helpTxt.style.display = "block";
      start();
    }
  } catch (error) {
    console.error(error);
  }
}
document.body.onload = init;
