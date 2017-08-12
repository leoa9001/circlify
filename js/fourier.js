

// document.getElementById("jsTestThing").innerHTML = FFT([math.complex(1,0),math.complex(1,0),math.complex(1,0),math.complex(1,0)], math.complex(0,1))




/*
getCircles(points): 
Given a list of points (as a list of complex numbers) it returns a list of tuples representing the circle for the fourier transform (as (r,theta) pairs).

slowDFT(points, leadCoef, omega): 
takes in a list of points (complex numbers), a leadCoefficient for the sum (typically 1/N) and omega a primitive Nth root of unity (can change sign accordingly to do things like IFFTs) and outputs the complex number list that is
the discrete fourier transform of the points.

FFT(points, omega):
Recursively does FFT on points list with respect to primitive Nth root of unity omega: multiplies by no lead coefficient! Just evaluates the sum formula (this is done since the function calls itself for the recursion; no helper function).

toPolar(z): 
Given a complex number z, returns it in polar coords as a dictionary {r: radius, th: theta}.


*/
//points is a list of complex numbers
function FourierComponent(points, phase){
	this.points = points;
	this.circles = getCircles(points);
	this.phase = phase;
	this.N = points.length;

	//helper vars
	this.freezePhase = false;

	//increments the phase (minimal circle rotation)
	this.update = function(){
		if(!this.freezePhase)this.phase++;
		if(this.phase==this.N)this.phase = 0;
	}

	//adds a point and then basically recalculates the whole fourier decomposition
	this.appendPoint = function(point){
		this.points.push(point);
		this.circles = getCircles(points);
		this.N = this.points.length;
	}

	//draws circles and the current point
	this.draw = function(){
		var currPoint = drawFrame(this.circles,this.phase,this.N);
		drawPoint(currPoint);
	}

	//draws all points in the points array
	this.drawPoints = function(){
		for(var i = 0; i < points.length;i++){
			drawPoint({x: math.re(this.points[i]), y: math.im(this.points[i])});
		}
	}

	//setphase 
	this.setPhase = function(p){
		this.phase = p;
	}

	//change freeze 
	this.toggleFreeze = function(){
		this.freezePhase = !this.freezePhase;
	}

	//translate function for dragging components t is the amount to translate by. 
	this.translate = function(t){
		var c = fromPolar(this.circles[0]);
		c = math.add(c,t);
		this.circles[0] = toPolar(c);

		for(var i = 0; i < this.N;i++){
			this.points[i] = math.add(this.points[i],t);
		}
	}

	//Norm should agree with point norm (up to those fun issues :p)
	this.norm = function(){
		var sum = 0;
		for(var i = 0; i < this.N;i++){
			var r = this.circles[i].r;
			//console.log(r);
			sum += (math.sqrt(this.N)*r)*r;
		}

		return math.sqrt(this.N)*sum;
	}
}




function getCircles(points){
	//we're using omega = e^2pi i/N rather than e^-pi i/N and taking 1/N 
	var fourierDecomp = slowDFT(points, 1/points.length, math.pow(math.e,math.complex(0,2*math.pi/points.length)));
	var circles = [];

	for(var i = 0; i < points.length;i++){
		var pti = toPolar(fourierDecomp[i]);
		circles.push({r:pti.r, th:pti.th}); //this is perhaps unnecessary but idk how objects passing works in js
	}

	return circles;
}

//General n^2 time DFT which works for any n.
function slowDFT(points, leadCoef, omega){
	//add assert omega^N = 1
	var N = points.length;
	var ck = []
	for(var k = 0; k < N; k++){
		sum = math.complex(0,0);
		for(var j = 0; j < N;j++){
			sum = math.add(sum, 
				math.multiply(points[j],math.pow(omega,k*j)
					)
				);
		}
		ck.push(math.multiply(leadCoef,sum));
	}

	return ck;
}


// Cooley-Tukey FFT which works for N a power of 2 (does not do padding)
function FFT(points, omega){
	//add assert N is a power of 2 and omega^N = 1
	var N = points.length;
	if(N==1)return points;
	var pts0 = [];
	var pts1 = [];

	for(var j = 0; j < N/2;j++){
		pts0.push(points[2*j]);
		pts1.push(points[2*j+1]);
	}

	var ft0 = FFT(pts0,math.multiply(omega,omega));
	var ft1 = FFT(pts1,math.multiply(omega,omega));

	var ft = [];
	var omegaCurr = math.complex(1,0);

	for(var k = 0; k < N/2;k++){
		ft.push(math.add(ft0[k],math.multiply(omegaCurr,ft1[k])));
		omegaCurr = math.multiply(omega,omegaCurr);
	}
	omegaCurr = math.complex(-1,0);

	for(var k = 0; k < N/2;k++){
		ft.push(math.add(ft0[k],math.multiply(omegaCurr,ft1[k])));
		omegaCurr = math.multiply(omega,omegaCurr);
	}
	return ft;
}


function toPolar(z){
	var re = math.sqrt(math.re(z)*math.re(z) + math.im(z)*math.im(z));
	var the = math.atan2(math.im(z),math.re(z));
	return {r:re, th:the};
}

function fromPolar(v){
	var x = v.r * math.cos(v.th);
	var y = v.r * math.sin(v.th);

	return math.complex(x,y);
}