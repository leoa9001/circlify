/*
Constants
*/

var FPS = 12;
var WIDTH = 640;
var HEIGHT = 480;

/*
Actual Game Variables
*/

var mouseDown = false;
var mouseX = 0;
var mouseY = 0;
var lastPos = {x: 0, y: 0};
var pos = {x: 0, y: 0};

/*
HTML Setup Stuff
*/

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
canvas.width = WIDTH;
canvas.height = HEIGHT;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

canvas.addEventListener("mousemove", function (e) {
    console.log("mouse move");
    console.log(e.clientX + " " + e.clientY);
    pos = {x: e.clientX, y: e.clientY};

}, false);
canvas.addEventListener("mousedown", function (e) {
    console.log("mouse down");
    lastPos = {x: e.clientX, y: e.clientY};
    mouseDown = true;
}, false);
canvas.addEventListener("mouseup", function (e) {
    console.log("mouse up");
    mouseDown = false;
}, false);
canvas.addEventListener("mouseout", function (e) {
    console.log("mouse out");
}, false);

/*
Functions, but should be more general management functions and 
game loop stuff.
*/

function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
    }
    else if (e.keyCode == 37) {
        leftPressed = true;
    }

    if (e.keyCode == 67) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

function keyUpHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    }
    else if (e.keyCode == 37) {
        leftPressed = false;
    }
}

function Update() {
    // ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (mouseDown) {
        ctx.beginPath();
        ctx.moveTo(lastPos.x, lastPos.y);
        ctx.lineTo(pos.x, pos.y);
        // ctx.strokeStyle = x;
        ctx.lineWidth = 10;
        ctx.stroke();
        ctx.closePath();

        lastPos = {x: pos.x, y: pos.y};
    }
}

setInterval(Update, 1000/FPS);