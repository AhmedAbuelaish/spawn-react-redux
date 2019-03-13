let decayFactor = 0.9
let decayPrecision = 0.5
let parentSize = 500
let decaySpread = parentSize * 0.2

let result = []

for (var i = 0; i < 100; i++) {
	let values = decayFactor * parentSize + Math.trunc((Math.random() - Math.random()) * decaySpread * (1 - decayPrecision))
	result.push(values)
}

var counts = {}

for (var i = 0; i < result.length; i++) {
	var num = result[i]
	counts[num] = counts[num] ? counts[num] + 1 : 1
}

for (var i = parentSize * 2; i > 0; i--) {
	console.log(i, marker(counts[i]))
}

function marker(numberOfMarkers) {
	var markers = ''
	for (var i = 0; i < numberOfMarkers; i++) {
		markers += '|'
	}
	return markers
}
