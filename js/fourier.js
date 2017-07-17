

document.getElementById("jsTestThing").innerHTML = FFT([math.complex(1,0),math.complex(1,0),math.complex(1,0),math.complex(1,0)], math.complex(0,1))




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

	//increments the phase (minimal circle rotation)
	this.update = function(){
		this.phase++;
		if(this.phase==this.N)this.phase = 0;
	}

	this.appendPoint = function(point){
		this.points.push(point);
		this.circles = getCircles(points);
		this.N = this.points.length;
	}

	this.draw = function(){
		var currPoint = drawFrame(this.circles,this.phase,this.N);
		drawPoint(currPoint);
	}

	this.drawPoints = function(){
		for(var i = 0; i < points.length;i++){
			drawPoint({x: math.re(this.points[i], y: math.im(this.points[i]))});
		}
	}
}




function getCircles(points){
	//we're using omega = e^2pi i/N rather than e^-pi i/N and taking 1/N 
	var fourierDecomp = slowDFT(points, 1/points.length, math.pow(math.e,math.complex(0,2*math.pi/points.length)));
	var circles = [];

	for(var i = 0; i < points.length;i++){
		var pti = toPolar(fourierDecomp[i]);
		circles.push({r:pti.r, th:pti.th});
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