let decayFactor = 1
let multiplierPrecision = 0.9
let multiplier = 5

let result = []

for (var i = 0; i < 100; i++) {
	let values = decayFactor * multiplier - Math.trunc(Math.abs(Math.random() - Math.random()) * multiplier * (1 - multiplierPrecision))
	result.push(values)
}

var counts = {}

for (var i = 0; i < result.length; i++) {
	var num = result[i]
	counts[num] = counts[num] ? counts[num] + 1 : 1
}

for (var i = multiplier * 2; i > 0; i--) {
	console.log(i, marker(counts[i]))
}

function marker(numberOfMarkers) {
	var markers = ''
	for (var i = 0; i < numberOfMarkers; i++) {
		markers += '|'
	}
	return markers
}
