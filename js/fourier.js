


//document.getElementById("jsTestThing").innerHTML = slowDFT([math.complex(1,0),math.complex(1,0),math.complex(1,0),math.complex(1,0)] ,1 , math.complex(0,1))





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

	var ft0 = FFT(pts0,omega*omega);
	var ft1 = FFT(pts1,omega*omega);

	omegaCurr

}


function toPolar(z){
	var re = math.sqrt(math.re(z)*math.re(z) + math.im(z)*math.im(z));
	var the = math.atan2(math.im(z),math.re(z));

	console.log("Leo is a" + " " + the);

	return {r:re, th:the};
}