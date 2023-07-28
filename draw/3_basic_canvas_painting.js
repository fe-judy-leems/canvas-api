const lineWidth = document.querySelector('#input-line-width')
const modeBtn = document.querySelector('#mode-btn')
const destroyBtn = document.querySelector('#destroy-btn')
const eraserBtn = document.querySelector('#eraser-btn')
const colorOptions = Array.from(document.querySelectorAll(".color-option"))
const color = document.querySelector('#color')
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = 800;
canvas.height = 800;
ctx.lineWidth = lineWidth.value;
let isPainting = false; // isPainting true일때만 그림을 그릴것
let isFilling = false;

const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;


function onMove(event) {
  if(isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY)
    ctx.stroke()
    return
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

function onModeClick() {
  if(isFilling) {
    isFilling = false
    modeBtn.innerHTML = "Fill"
  } else {
    isFilling = true
    modeBtn.innerHTML = "Draw"
  }

}

function onCanvasClick() {
  if(isFilling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
  }
}

function onDestoryClick() {
  ctx.fillStyle = "white"
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
}

function onEraserClick() {
  ctx.strokeStyle = "white";
  ifFilling = false;
  modeBtn.innerHTML = "Fill";
}

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", onCanvasClick)

lineWidth.addEventListener("change", onLineWidthChage)

color.addEventListener("change", onColorChage);

colorOptions.forEach(color => color.addEventListener("click", onColorClick))

modeBtn.addEventListener("click", onModeClick)
destroyBtn.addEventListener("click", onDestoryClick);
eraserBtn.addEventListener("click", onEraserClick)

document.addEventListener("DOMContentLoaded", () => {
  color.value = colorOptions[Math.floor(Math.random() * colorOptions.length)].dataset.color;
  ctx.strokeStyle = color.value;
  ctx.fillStyle = color.value;
})