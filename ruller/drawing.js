import Line from "./line.js";
let animate;

class Drawing {
    constructor() {
        this.canvas = document.createElement('canvas');
        document.body.appendChild(this.canvas);

        this.ctx = this.canvas.getContext('2d');

        this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

        window.addEventListener('resize', this.resize.bind(this));
        this.resize();

        this.pos = {};

        this.line = new Line();
        
        window.requestAnimationFrame(this.animate.bind(this));

        this.canvas.addEventListener('mousedown', this.onDown.bind(this));
        this.canvas.addEventListener('mouseup', this.onUp.bind(this));
        this.canvas.addEventListener('mousemove', this.onMove.bind(this));
        this.canvas.addEventListener('click', this.onClick.bind(this));
    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * this.pixelRatio;
        this.canvas.height = this.stageHeight * this.pixelRatio;

        this.ctx.scale(this.pixelRatio, this.pixelRatio);
    }

    animate() {
        animate = window.requestAnimationFrame(this.animate.bind(this));

        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        this.line.draw(this.ctx);
    }

    onDown(e) {
        this.pos.x = e.offsetX;
        this.pos.y = e.offsetY;

        this.line.onDown(this.pos.x, this.pos.y);
    }

    onMove(e) {
        this.pos.x = e.offsetX;
        this.pos.y = e.offsetY;

        this.line.onMove(this.pos.x, this.pos.y);
    }

    onUp(e) {
        this.pos.x = e.offsetX;
        this.pos.y = e.offsetY;

        this.line.onUp(this.pos.x, this.pos.y);
        
    }

    onClick() {
        setTimeout(() => window.cancelAnimationFrame(animate), 200);
    }
}

window.onload = () => {
    new Drawing();
}