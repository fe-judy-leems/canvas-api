const lineWidth = document.querySelector("#input-line-width");
const textSize = document.querySelector("#input-font-width");
const modeBtn = document.querySelector("#mode-button");
const fileInput = document.querySelector("#file");
const textInput = document.querySelector("#text");
const saveButton = document.querySelector("#save");
const destroyBtn = document.querySelector("#destroy-button");
const eraserBtn = document.querySelector("#eraser-button");
const rulerBtn = document.querySelector("#ruler-button");
const colorOptions = Array.from(document.querySelectorAll(".color-option"));
const color = document.querySelector("#color");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 800;
ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";
let isPainting = false;
let isFilling = false;
let isRulering = false;

const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;
const FONT_FAMILY = "Selif";

function onMove(event) {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  ctx.moveTo(event.offsetX, event.offsetY);
}

function startPainting() {
  isPainting = true;
}

function cancelPainting() {
  isPainting = false;
  ctx.beginPath();
}

function onLineWidthChage(event) {
  ctx.lineWidth = event.target.value;
}

function onColorChage(event) {
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
}

function onColorClick(event) {
  const colorValue = event.target.dataset.color;
  ctx.strokeStyle = colorValue;
  ctx.fillStyle = colorValue;
  color.value = colorValue;
}

function onRulerClick() {
  if(isRulering) {
    rulerBtn.innerHTML = "Start Ruler"
    modeBtn.removeAttribute("disabled")

  } else {
    isFilling = false;
    isPainting = false;
    rulerBtn.innerHTML = "Ruler mode"
    modeBtn.setAttribute("disabled", "disabled")
    // 여기서 canvas mousemove, mousedown, mouseup event setting
  }
}

function onModeClick() {
  if (isFilling) {
    isFilling = false;
    modeBtn.innerHTML = "Fill";
  } else {
    isFilling = true;
    modeBtn.innerHTML = "Draw";
  }
}

function onCanvasClick() {
  if (isFilling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}

function onDestoryClick() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function onEraserClick() {
  ctx.strokeStyle = "white";
  ifFilling = false;
  modeBtn.innerHTML = "Fill";
}

function onFileChage(event) {
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.src = url;
  image.onload = function () {
    ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    // fileInput.value = null;
  };
}

function onDoubleClick(event) {
  ctx.save();
  const text = textInput.value;
  ctx.lineWidth = 1;
  ctx.fillText(text, event.offsetX, event.offsetY);
  ctx.restore();
}

function onChageText(event) {
  ctx.font = `${event.target.value}px ${FONT_FAMILY}`;
}

function onSaveClick() {
  const url = canvas.toDataURL();
  const a = document.createElement("a");
  a.href = url;
  a.download = "myDrawing.png";
  a.click();
}




canvas.addEventListener("dblclick", onDoubleClick);
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", onCanvasClick);

lineWidth.addEventListener("change", onLineWidthChage);

color.addEventListener("change", onColorChage);

colorOptions.forEach((color) => color.addEventListener("click", onColorClick));

modeBtn.addEventListener("click", onModeClick);
destroyBtn.addEventListener("click", onDestoryClick);
eraserBtn.addEventListener("click", onEraserClick);
rulerBtn.addEventListener("click", onRulerClick)

fileInput.addEventListener("change", onFileChage);
textSize.addEventListener("change", onChageText);

saveButton.addEventListener("click", onSaveClick);

document.addEventListener("DOMContentLoaded", () => {
  color.value =
    colorOptions[Math.floor(Math.random() * colorOptions.length)].dataset.color;
  ctx.strokeStyle = color.value;
  ctx.fillStyle = color.value;
});
