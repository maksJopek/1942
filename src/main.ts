import "./style.css";
import "./Events";
import loadAllImages from "./Images";
import { start } from "./game";

async function init() {
  await loadAllImages();
  start();
}
document.body.onload = init;
