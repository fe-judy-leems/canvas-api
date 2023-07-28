const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
canvas.width = 800;
canvas.height = 800;

ctx.lineWidth = 2;
ctx.moveTo(0, 0)

const colors = [
  "#55efc4",
  "#00cec9",
  "#0984e3",
  "#6c5ce7",
  "#fd79a8",
  "#ff7675",
  "#fab1a0"
]

function onClick(event) {
  console.log(event)
  ctx.beginPath()
  ctx.moveTo(event.screenX, event.screenY)
  const color = colors[Math.floor(Math.random() * colors.length)];
  ctx.strokeStyle = color;
  ctx.lineTo(event.offsetX, event.offsetY)
  ctx.stroke()
}

canvas.addEventListener("mousemove", onClick)
















