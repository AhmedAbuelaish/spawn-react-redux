
console.log(randomSpread(1,0.5,5,1,-1))

function randomSpread(factor, precision, originalValue, spread, direction){
	// factor is the % of the originalValue as a value between 0 & 1
	// precision: 0 = least precise, 1 = most precise
	// originalValue: starting value / target value
	// spread: range as a percentage of originalValue to randomize around. value between 0 & 1
	// direction: 2 = centered around value. 1 = Positive bias. -1 = negative bias

	let range = originalValue * spread
	let result = []
	let moreResults = []



	for (var i = 0; i < 100; i++) {
		if (direction == 2) {
			(randomizer = (Math.random() - Math.random()))
		} else if (direction ==1 || -1) {
			(randomizer = direction * Math.abs(Math.random() - Math.random()))
		} else {
			direction = 1
		}
		let values = factor * originalValue + Math.trunc(randomizer * range * (1 - precision))
		result.push(values)
	}

	var counts = {}

	for (var i = 0; i < result.length; i++) {
		var num = result[i]
		counts[num] = counts[num] ? counts[num] + 1 : 1
	}

	for (var i = originalValue * 2; i > 0; i--) {
		console.log(i, marker(counts[i]))
		moreResults.push(marker(counts[i]))
	}

	function marker(numberOfMarkers) {
		var markers = ''
		for (var i = 0; i < numberOfMarkers; i++) {
			markers += '|'
		}
		return markers
	}
}
