
console.log(randomSpread(130,60,50,100,2))

function randomSpread(originalValue, percentOfOriginal, precision, spread, direction){
	// percentOfOriginal= % of originalValue
	// precision= 0%:least precise, 100%:most precise
	// originalValue: starting value
	// spread= range as % of originalValue to randomize around
	// direction= 2: centered around percentOfOriginal. 1:Positive bias. -1:negative bias

	let range = originalValue * (percentOfOriginal/100) * (spread/100)
	let randomizer = 0
	let result = []

	for (var i = 0; i < 100; i++) {
		if (direction === 2) {
			randomizer = Math.random() - Math.random()
		} else if (direction === 1 || direction === -1) {
			randomizer = direction * Math.abs(Math.random() - Math.random())
		} else {
			direction = -1
		}
		let values = (percentOfOriginal/100) * originalValue + Math.trunc(randomizer * range * (100 - precision)/100)
		result.push(values)
	}

	var counts = {}

	for (var i = 0; i < result.length; i++) {
		var num = result[i]
		counts[num] = counts[num] ? counts[num] + 1 : 1
	}

	for (var i = originalValue * 2; i > -originalValue; i--) {
		console.log(i, marker(counts[i]))
	}
	return '------Done-------'
}

function marker(numberOfMarkers) {
	var markers = ''
	for (var i = 0; i < numberOfMarkers; i++) {
		markers += '|'
	}
	return markers
	}
