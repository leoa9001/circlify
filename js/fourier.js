

var a = math.complex(-3,2)

//document.getElementById("jsTestThing").innerHTML = slowDFT([math.complex(1,0),math.complex(1,0),math.complex(1,0),math.complex(1,0)] ,1 , math.complex(0,1))

function DFT(){
	
}


function getCircles(points){
	//we're using omega = e^2pi i/N rather than e^-pi i/N and taking 1/N 
	fourierDecomp = slowDFT(points, 1/points.length, math.pow(math.e,math.complex(0,2*math.pi/points.length)));
	circles = [];

	for(var i = 0; i < points.length;i++){
		var pti = toPolar(fourierDecomp[i]);
		circles.push({r:pti.r, th:pti.phi});
	}

	return circles;
}

function toPolar(z){
	var re = math.sqrt(math.re*math.re + math.im*math.im);
	var the = math.atan2(math.im,math.re);

	return {r:re, th:the};
}


function slowDFT(points, leadCoef,omega){
	//add assert omega^N = 1
	var N = points.length;
	ck = []
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