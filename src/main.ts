import "./style.css";
import "./Events";
import loadAllImages from "./Images";
import { start } from "./game";
import { IMGS } from "./Images"

async function init() {
  await loadAllImages();
  console.log(IMGS.startScreen0);
  start();
}
document.body.onload = init;
