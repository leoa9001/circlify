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

var fourierComponentList = [];

var positions = []; //used when not animating
var currComponent; //used when animating < should really absorb positions into this though (although it is slower)

var animateCircles = false;
var frameNum = -1;

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
    pos = {x: e.clientX, y: e.clientY};

}, false);

canvas.addEventListener("mousedown", function (e) {
    lastPos = {x: e.clientX, y: e.clientY};


    if(!animateCircles){
        positions.push(math.complex(e.clientX, e.clientY));
    } else {
        console.log("WOOP WOOP WOOP: mousedown + animateCircles");
        console.log(fourierComponentList.length);
        pos = [];
        pos.push(math.complex(e.clientX,e.clientY));
        addComponent(new FourierComponent(pos,0,"points"));
    }

    mouseDown = true;
}, false);

canvas.addEventListener("mouseup", function (e) {
    // console.log("mouse up");
    mouseDown = false;


    if(!animateCircles){
        addComponent(new FourierComponent(positions, 0,"points"));
    }
    positions = [];
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
    // if (e.keyCode == 68) {
    //     for (var i = 0; i < positions.length; i++) {
    //         console.log(positions[i]);
    //     }
    //     console.log("_________________________________");
    // }

    //69 is e
    if (e.keyCode == 69) {
        var circles = getCircles(positions);
        drawCircles(circles);
    }

    //space key?
    if (e.keyCode == 32) {
        animateCircles = !animateCircles;
    }

    //f key for freeze toggle
    if(e.keyCode == 70){
        toggleFreezes();
    }

    //s key for sync
    if(e.keyCode == 83){
        orientPhases();
    }

    //t key for test code to run: put anything you want to test in here.
    if(e.keyCode==84){
        document.getElementById("test").innerHTML = " "+currComponent.norm();
        addComponent(cutByM(currComponent, Math.floor(1*currComponent.N/10)));
    }

    if(e.keyCode == 38){
        currComponent.translate(math.complex(0,-5));
    }

    if(e.keyCode == 40){
        currComponent.translate(math.complex(0,5));
    }

    if(e.keyCode == 37){
        currComponent.translate(math.complex(-5,0));
    }

    if(e.keyCode == 39){
        currComponent.translate(math.complex(5,0));
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
    if (mouseDown && !animateCircles) {
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

    if (animateCircles) {
        
        //real time drawing
        if(mouseDown){
            currComponent.appendPoint(math.complex(pos.x,pos.y));
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (var i = 0; i < fourierComponentList.length; i++) {
            fourierComponentList[i].update();
            fourierComponentList[i].draw();
            fourierComponentList[i].drawPoints();
        }
    }
}

function clearScreen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    positions = [];
    fourierComponentList = [];
}

//switch whether toggling or not
function toggleFreezes(){
    for(var i = 0; i < fourierComponentList.length;i++){
        fourierComponentList[i].toggleFreeze();
    }
}

//set all phases to 0
function orientPhases(){
    for(var i = 0; i < fourierComponentList.length;i++){
        fourierComponentList[i].setPhase(0);
    }
}

//formal way to add fourierComponents (will change the )
function addComponent(fc){
    currComponent = fc;
    fourierComponentList.push(fc);
}












setInterval(Update, 1000/FPS);