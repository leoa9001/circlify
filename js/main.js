/*
Constants
*/

/*
HTML Setup Stuff
*/

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
canvas.width = WIDTH;
canvas.height = HEIGHT;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

/*
Actual Game Variables
*/

var mouseDown = false;
var mouseX = 0;
var mouseY = 0;

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
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

setInterval(Update, 1000/FPS);