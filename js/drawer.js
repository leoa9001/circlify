var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

function drawCircle(x, y, r, th) {
	console.log("hi");
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

function drawCircles(circles) {

	console.log("here");
	//start is circles[0].r and circles[0].th;

	var cir = circles[0];
	var startX = cir.r * Math.cos(cir.th);
	var startY = cir.r * Math.sin(cir.th);

	for (var i = 1; i < circles.length; i++) {
		var c = circles[i];
		console.log(c.r + " " + c.th);
		drawCircle(startX, startY, c.r, c.th);

		var newX = startX + c.r * Math.cos(c.th);
		var newY = startY + c.r * Math.sin(c.th);
		startX = newX;
		startY = newY;
	}
}


//frame is the ith output... out of frames: frames = number of divisions of time for one rotation of C_1
function drawFrame(circles, frame, frames){
	var cir = circles[0];
	var startX = cir.r * Math.cos(cir.th);
	var startY = cir.r * Math.sin(cir.th);


	for (var i = 1; i < circles.length; i++) {
		var c = circles[i];
		console.log(c.r + " " + c.th);
		drawCircle(startX, startY, c.r, c.th);

		var newX = startX + c.r * Math.cos(c.th+2*math.pi*i*frame/frames);
		var newY = startY + c.r * Math.sin(c.th+2*math.pi*i*frame/frames);
		startX = newX;
		startY = newY;
	}

}

// function drawCircle(x, y, [[r, th], [r, th]]);

[{r: 0.5, th: 72}, {r: 0.6, th: 33}];