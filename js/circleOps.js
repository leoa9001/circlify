

function cutByM(fc, M){
	var preCirc = fc.circles.slice(0); //Should clone the array
	var refCirc = [];
	var N = fc.N;
	var norm = fc.norm;

	for(var i = 0; i < N; i++){
		refCirc.push({
			radius : preCirc[i].r,
			index : i
		});
	}
	
	function compareRad(circ1, circ2){
		return circ1.radius - circ2.radius;
	}

	refCirc.sort(compareRad);
	
	var zeroCirc = {r: 0, th :0};// set other circles to zeroCirc
	//eliminating N-M least significant parts.
	for(var j = 0; j < N-M; j++){
		preCirc[refCirc[j].index] = zeroCirc;
	}


	return new FourierComponent(preCirc, fc.phase, "circles");
}

