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

var positions = [];

/*
HTML Setup Stuff
*/

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = WIDTH;
canvas.height = HEIGHT;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

canvas.addEventListener("mousemove", function (e) {
    // console.log("mouse move");
    // console.log(e.clientX + " " + e.clientY);
    pos = {x: e.clientX, y: e.clientY};

}, false);
canvas.addEventListener("mousedown", function (e) {
    // console.log("mouse down");
    clearScreen();
    lastPos = {x: e.clientX, y: e.clientY};
    positions.push(math.complex(e.clientX, e.clientY));
    mouseDown = true;
}, false);
canvas.addEventListener("mouseup", function (e) {
    // console.log("mouse up");
    mouseDown = false;
}, false);
canvas.addEventListener("mouseout", function (e) {
    // console.log("mouse out");
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

    //67 is c
    if (e.keyCode == 67) {
        clearScreen();
    }

    //68 is d
    if (e.keyCode == 68) {
        for (var i = 0; i < positions.length; i++) {
            console.log(positions[i]);
        }
        console.log("_________________________________");
    }

    //69 is e
    if (e.keyCode == 69) {
        var circles = getCircles(positions);
        drawCircles(circles);
    }

    //65 is a
    if (e.keyCode == 65) {
        var circles = getCircles(positions);
        drawCircles(circles);
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
    if (mouseDown) {
        ctx.beginPath();
        ctx.moveTo(lastPos.x, lastPos.y);
        ctx.lineTo(pos.x, pos.y);
        // ctx.strokeStyle = x;
        ctx.lineWidth = 5;
        ctx.stroke();
        ctx.closePath();

        positions.push(math.complex(pos.x, pos.y));
        lastPos = {x: pos.x, y: pos.y};
    }
}

function clearScreen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    positions = [];
}

setInterval(Update, 1000/FPS);