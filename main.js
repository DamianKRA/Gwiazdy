const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let cWidth = window.innerWidth;
let cHeight = window.innerHeight - 5;

canvas.width = cWidth;
canvas.height = cHeight;
let stars = [];

ctx.transform(1, 0, 0, -1, cWidth / 2, cHeight / 2);

function randomNumber(min, max) {
    let random = Math.round(Math.random() * (max - min + 1)) + min;
    return random;
}

function odleglosc(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

function Star() {
    this.x = randomNumber(-cWidth / 2, cWidth / 2); //Math.round(Math.random() * (cWidth)) - cWidth / 2;
    this.y = randomNumber(-cHeight / 2, cHeight / 2); //Math.round(Math.random() * (cHeight)) - cHeight / 2;
    this.prevX = this.x;
    this.prevY = this.y;
    this.fromCenter = odleglosc(0, 0, this.x, this.y)
    this.r = 0;

    this.draw = function () {
        // ctx.fillStyle = "white";
        // ctx.beginPath();
        // ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        // ctx.fill();

        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(this.prevX, this.prevY);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
    };

    this.update = function () {
        if ((this.x > -cWidth / 2 && this.x < cWidth / 2) &&
            (this.y > -cHeight / 2 && this.y < cHeight / 2)) {

            this.x += this.x / this.fromCenter;
            this.y += this.y / this.fromCenter;

            this.prevX += this.x / this.fromCenter;
            this.prevY += this.y / this.fromCenter;

        } else {
            this.x = randomNumber(-cWidth / 2, cWidth / 2);
            this.y = randomNumber(-cHeight / 2, cHeight / 2);
            this.prevX = this.x;
            this.prevY = this.y;
        }
    };
}

function init() {
    for (let i = 0; i < 1000; i++) {
        stars[i] = new Star();
    }
}

function animation() {
    ctx.clearRect(-cWidth / 2, cHeight / 2, cWidth * 2, -cHeight * 2);

    for (let i in stars) {
        stars[i].draw();
        stars[i].update();
    }
}

init();
setInterval(animation, 1000 / 60);