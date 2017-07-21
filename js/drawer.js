var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

/*
Draws a single circle at a given x, y with radius r and a line from the center
to the perimeter with angle th (trig angle)
*/
function drawCircle(x, y, r, th) {
	//console.log("drawCircle() run on "+ x + " "+ y + " "+ r + " "+ th);
	ctx.beginPath();
	ctx.arc(x, y, r, 0, 2 * Math.PI, false);
	ctx.lineWidth = 1;
	ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + r * Math.cos(th), y + r * Math.sin(th));
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.closePath();
}


/*
basically drawCircles except at various points in time rather 
than just the first frame

frame is the ith output... out of frames: 
frames = number of divisions of time for one rotation of C_1
*/
function drawFrame(circles, frame, frames){
	var cir = circles[0];
	var startX = cir.r * Math.cos(cir.th);
	var startY = cir.r * Math.sin(cir.th);


	for (var i = 1; i < circles.length; i++) {
		var c = circles[i];
		//console.log(c.r + " " + c.th);
		drawCircle(startX, startY, c.r, c.th-2*math.pi*i*frame/frames);

		var newX = startX + c.r * Math.cos(c.th-2*math.pi*i*frame/frames);
		var newY = startY + c.r * Math.sin(c.th-2*math.pi*i*frame/frames);
		startX = newX;
		startY = newY;
	}
	return {x: startX, y: startY};//gives point at the end <3
}



//Draws a point on the canvas where point is in x,y format.
function drawPoint(point){
	ctx.beginPath();
    ctx.arc(point.x, point.y, 4, 0, 2 * Math.PI, false);
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.closePath();
}











