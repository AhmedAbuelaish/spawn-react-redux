// ~~~~~~~~~~~ CREATE FRAGMENTED ARRAY ~~~~~~~~~~~~~~~//
function createFragmentedArray(parentsArr, settings) {
	var allChildrenArray = parentsArr.map((currentParent, index) => {
		return distributeParentValue(currentParent, settings)
	})
	allChildrenArray = flatten(allChildrenArray)
	return allChildrenArray
}

// ~~~~~~~~~~~~~~ DISTRIBUTE VALUE ~~~~~~~~~~~~~~~~~~~//
function distributeParentValue(parent, settings) {
	let myAngle = 0
	let mySize = 0
	let myRange = 0
	let currentChildrenArray = []
	let myDistance = parent.radius + 5 // Adjust this to move children off of circumferance
	let siblingCounter = 0

	if (parent.radius <= settings.minSize || parent.id.length === 40) {
		return currentChildrenArray
	} else {
		let rangeSizeArr = calcRangeSize(settings.angleRange)
		let remainder = randomSpread(
			parent.radius,
			settings.multiplier,
			settings.multiplierPrecision,
			0.5 * parent.radius,
			2
		)
		// remainder = degToRad(remainder)

		while (remainder >= settings.minSize) {
			// As long as there is a remainder, create new leaves
			mySize = randomSpread(parent.radius * Math.random(), 100-settings.decay, settings.decayPrecision, parent.radius, -1)

			let myAngleSpan = 2 * Math.atan(mySize / myDistance)
			remainder -= Math.max(mySize,0)

			// Create the new leaf as long as it is greater than minSize
			if (mySize >= settings.minSize) {
				// Place leaf in range if it fits
				for (var r = 0; r < rangeSizeArr.length; r++) {
					if (radToDeg(myAngleSpan) <= rangeSizeArr[myRange]) {
						break
					} else {
						myRange++
						myRange >= rangeSizeArr.length ? (myRange = 0) : (myRange = myRange)
					}
				}
				myAngle =
					parent.angle +
					randomSpread(
						(settings.angleRange[myRange][1] + settings.angleRange[myRange][0]) / 2,
						100,
						settings.anglePrecision,
						rangeSizeArr[myRange],
						2
					)
				currentChildrenArray.push({
					id: parent.id + '' + siblingCounter,
					radius: mySize,
					distance: myDistance,
					coordX: parent.coordX + myDistance * Math.cos(degToRad(myAngle)),
					coordY: parent.coordY + myDistance * Math.sin(degToRad(myAngle)),
					angle: myAngle,
					color: `210, ${mySize * 20}, ${mySize * 40}` // rgb values
				})
				siblingCounter += 1
				myRange++
				myRange >= rangeSizeArr.length ? (myRange = 0) : (myRange = myRange)
			}
		}
	}

	return currentChildrenArray
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//                                   RANDOM SPREAD
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function randomSpread(originalValue, percentOfOriginal, precision, spread, direction) {
	// percentOfOriginal= % of originalValue
	// precision= 0%:least precise, 100%:most precise
	// originalValue: starting value
	// spread= range of values around the originalValue to pick from
	// direction= 2: centered around percentOfOriginal. 1:Positive bias. -1:negative bias

	let randomizer = 0

	if (direction === 2) {
		randomizer = Math.random() - Math.random()
	} else if (direction === 1 || direction === -1) {
		randomizer = direction * Math.abs(Math.random() - Math.random())
	} else {
		direction = -1
	}
	return (percentOfOriginal / 100) * originalValue + (randomizer * spread * (100 - precision)) / 100
}

function noise(min, max) {
	return min + Math.random() * (max - min)
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//                                   ANGLE FUNCTIONS
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function flatten(arr, val) {
	return arr.reduce((acc, val) => acc.concat(val), [])
}

function calcRangeSize(angleArr) {
	let rangeSizeArr = angleArr.map((currentRangeArr, index) => {
		return currentRangeArr[1] - currentRangeArr[0]
	})
	return rangeSizeArr
}

function radToDeg(angle) {
	return Math.round((angle * 180) / Math.PI)
}

function degToRad(angle) {
	return Math.round((angle * Math.PI * 100) / 180) / 100
}

export default createFragmentedArray

//
//
//
//
//
// Offline Tests:

window.offlineTest = offlineTest
function offlineTest() {
	let testRoot = [
		{
			id: 0,
			radius: 200,
			coordX: 900 / 2,
			coordY: 900 / 2,
			angle: 0
		}
	]

	let testSettings = {
		angleRange: [[-100, -70], [-45, 45], [70, 100]], // Range: -180 to 180
		maxAngleRanges: 4,
		minSize: 1,
		multiplier: 130,
		multiplierPrecision: 40, // Higher Levels, precision -> 100%
		decay: 90,
		decayPrecision: 40 // Higher Levels, precision -> 100%
	}
	let newNodes = testRoot
	let newLeaves = newNodes
	console.time('fragArray')
	for (var i = 0; i < 50; i++) {
		newLeaves = createFragmentedArray(newLeaves, testSettings)
		Array.prototype.push.apply(newNodes, newLeaves)
		// console.log('nodes',newNodes)
		// console.log('leaves',newLeaves)
		if (newLeaves.length === 0 || newLeaves.length > 20000) break
	}
	console.timeEnd('fragArray')
	console.log(newNodes.length)
	window.newNodes = newNodes
	// const intId = setInterval(() => {
	// 	let result = createFragmentedArray(testLeaves,testSettings)
	// 	console.log(result)
	// }, 50)
	// setTimeout(() => {
	// 	clearInterval(intId)
	// }, 10000)
}
