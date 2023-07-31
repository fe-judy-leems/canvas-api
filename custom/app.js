const lineWidth = document.querySelector("#input-line-width");
const textSize = document.querySelector("#input-font-width");

const fileInput = document.querySelector("#file");
const textInput = document.querySelector("#text");
const saveButton = document.querySelector("#save");
const modeButton = document.querySelector("#mode-button");
const destroyButton = document.querySelector("#destroy-button");
const eraserButton = document.querySelector("#eraser-button");
const rulerButton = document.querySelector("#ruler-button");
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
    console.log("painting!!!!!")
    return;
  }
  if(isRulering) {
    isFilling = false;
    isPainting = false;
    ctx.beginPath()
    ctx.strokeStyle = "red"
    ctx.lineWidth = "1"
    ctx.moveTo(event.offsetX, event.offsetY)
    ctx.setLineDash([10, 10])
    ctx.stroke();
    ctx.closePath();
    console.log("ruler!!!!!")
  }
  //ctx.moveTo(event.offsetX, event.offsetY);
}

function startPainting() {
  isPainting = true;

  if(isRulering) {
    isFilling = false;
    isPainting = false;
    console.log("ruler mode start")
  }

  // if (isRulering) {
  //   isPainting = false;
  //   ctx.beginPath()
  //   ctx.strokeStyle = "red"
  //   ctx.moveTo(event.offsetX, event.offsetY);
  //   ctx.lineTo(event.offsetX, event.offsetY);
  //   ctx.setLineDash([10, 10])
  //   ctx.stroke();
  //   ctx.closePath();
  // }
}

function cancelPainting() {
  isPainting = false;
  isRulering = false;
  isFilling = false;
  ctx.beginPath();
  console.log("end painting")
}

function onRulerClick() {
  if(isRulering) {
    isFilling = false;
    isPainting = false;
    isRulering = false;
    rulerButton.innerHTML = "Start Ruler";
    modeButton.removeAttribute("disabled");
  } else {
    isFilling = false;
    isPainting = false;
    isRulering = true;
    rulerButton.innerHTML = "Ruler mode";
    modeButton.setAttribute("disabled", "disabled");
  }
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
  if (isFilling) {
    isFilling = false;
    modeButton.innerHTML = "Fill";
  } else {
    isFilling = true;
    modeButton.innerHTML = "Draw";
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
  modeButton.innerHTML = "Fill";
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

modeButton.addEventListener("click", onModeClick);
destroyButton.addEventListener("click", onDestoryClick);
eraserButton.addEventListener("click", onEraserClick);
rulerButton.addEventListener("click", onRulerClick)
saveButton.addEventListener("click", onSaveClick);

fileInput.addEventListener("change", onFileChage);
textSize.addEventListener("change", onChageText);



document.addEventListener("DOMContentLoaded", () => {
  color.value =
    colorOptions[Math.floor(Math.random() * colorOptions.length)].dataset.color;
  ctx.strokeStyle = color.value;
  ctx.fillStyle = color.value;
});
