import Line from "./line.js";
let animate = 0;
let startPointX = 0, endPointX = 0;
let startPointY = 0, endPointY = 0;
let lineLengthPx = 0, lineLengthMm = 0;

class Drawing {
    constructor() {
      this.canvas = document.querySelector('canvas');
      this.ctx = this.canvas.getContext('2d');
      this.start = document.getElementById('start');
      this.clear = document.getElementById('clear');
      this.lengthPx = document.getElementById('length-px');
      this.lengthMm = document.getElementById('length-mm');
      this.lengthPx.innerHTML = lineLengthPx;
      this.lengthMm.innerHTML = lineLengthMm;
      this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

      window.addEventListener('resize', this.resize.bind(this));
      this.resize();

      this.pos = {};

      this.line = new Line();

      // window.requestAnimationFrame(this.animate.bind(this));

      this.canvas.addEventListener('mousedown', this.onDown.bind(this));
      this.canvas.addEventListener('mouseup', this.onUp.bind(this));
      this.canvas.addEventListener('mousemove', this.onMove.bind(this));
      this.canvas.addEventListener('click', this.onClick.bind(this));
      this.start.addEventListener('click', this.animate.bind(this));
      this.clear.addEventListener('click', this.onClear.bind(this));
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    resize() {
      this.stageWidth = document.body.clientWidth;
      this.stageHeight = document.body.clientHeight;

      this.canvas.width = this.stageWidth * this.pixelRatio;
      this.canvas.height = this.stageHeight * this.pixelRatio;

      this.ctx.scale(this.pixelRatio, this.pixelRatio);
    }

    animate() {
      animate = 0;

      animate = window.requestAnimationFrame(this.animate.bind(this));

      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.line.draw(this.ctx);
    }

    onDown(e) {
      this.pos.x = startPointX = e.offsetX;
      this.pos.y = startPointY = e.offsetY;

      this.line.onDown(this.pos.x, this.pos.y);
    }

    onMove(e) {
      this.pos.x = e.offsetX;
      this.pos.y = e.offsetY;

      this.line.onMove(this.pos.x, this.pos.y);
    }

    onUp(e) {
      this.pos.x = endPointX = e.offsetX;
      this.pos.y = endPointY = e.offsetY;

      if (startPointX === endPointX) {
        lineLengthPx = endPointY - startPointY;
        lineLengthMm = lineLengthPx * 0.26458333333333;
      } else if (startPointY === endPointY) {
        lineLengthPx = endPointX - startPointX;
        lineLengthMm = lineLengthPx * 0.26458333333333;
      } else {
        const powX = Math.pow(endPointX - startPointX, 2);
        const powY = Math.pow(endPointY - startPointY, 2);
        lineLengthPx = Math.sqrt(powX + powY);
        lineLengthMm = lineLengthPx * 0.26458333333333;
      }

      this.lengthPx.innerHTML = lineLengthPx;
      this.lengthMm.innerHTML = lineLengthMm;

      this.line.onUp(this.pos.x, this.pos.y);
    }

    onClick() {
      setTimeout(() => window.cancelAnimationFrame(animate), 100);
    }

    onClear() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

window.onload = () => {
    new Drawing();
}