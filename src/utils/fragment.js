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
	let mySize = 0
	let myAngle = 0
	let myDistance = parent.radius + 5 // Adjust this to move children off of circumferance
	let currentChildrenArray = []
	let siblingCounter = 0
	
	let rangeToSpreadOver = totalizeAngleRange(settings.angleRange)
	let remainder = randomSpread(rangeToSpreadOver, settings.multiplier, settings.multiplierPrecision, 50, 2)

	if (parent.radius <= settings.minSize || parent.id.length === 40) {
		return currentChildrenArray
	} else {
		while (remainder >= 0) {
			// As long as there is a remainder, create new leaves
			mySize = randomSpread(parent.radius, settings.decay, settings.decayPrecision, 100, -1)
			let tempAngle = Math.atan(mySize / myDistance)
			remainder -= mySize
			if (mySize >= settings.minSize) {
				// Create the new leaf as long as it is greater than minSize
				myAngle += tempAngle // Find my center
				currentChildrenArray.push({
					id: parent.id + '' + siblingCounter,
					radius: mySize,
					distance: myDistance,
					coordX: parent.coordX,
					coordY: parent.coordY,
					angle: myAngle,
					color: `210, ${mySize * 20}, ${mySize * 40}` // rgb values
				})
				siblingCounter += 1
				myAngle += tempAngle // Setup for next center
			}
		}
	}

	// Spread Angle of children over angle range
	let distributedChildrenArray = angleSpread(
		currentChildrenArray,
		Math.abs(radToDeg(myAngle)),
		settings.angleRange,
		radToDeg(parent.angle) % 360
	)

	let positionedChildrenArray = distributedChildrenArray.map((el, index) => {
		let newEl = Object.assign({}, el)
		newEl.coordX = newEl.coordX + newEl.distance * Math.cos(newEl.angle)
		newEl.coordY = newEl.coordY + newEl.distance * Math.sin(newEl.angle)
		return newEl
	})

	return positionedChildrenArray
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//                                   RANDOM SPREAD
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function randomSpread(originalValue, percentOfOriginal, precision, spread, direction) {
	// percentOfOriginal= % of originalValue
	// precision= 0%:least precise, 100%:most precise
	// originalValue: starting value
	// spread= range as % of originalValue to randomize around
	// direction= 2: centered around percentOfOriginal. 1:Positive bias. -1:negative bias
	let range = originalValue * (percentOfOriginal / 100) * (spread / 100)
	let randomizer = 0

	if (direction === 2) {
		randomizer = Math.random() - Math.random()
	} else if (direction === 1 || direction === -1) {
		randomizer = direction * Math.abs(Math.random() - Math.random())
	} else {
		direction = -1
	}
	return (percentOfOriginal / 100) * originalValue + (randomizer * range * (100 - precision)) / 100
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//                                   ANGLE FUNCTIONS
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function flatten(arr, val) {
	return arr.reduce((acc, val) => acc.concat(val), [])
}

function totalizeAngleRange(angleArr) {
	let totalAngleArr = angleArr.map((currentRangeArr, index) => {
		return currentRangeArr[1] - currentRangeArr[0]
	})
	let totalAngle = totalAngleArr.reduce((partial_sum, a) => partial_sum + a)
	return totalAngle
}

function angleSpread(arrayToSpread, rangeToSpread, arrayToSpreadOver, parentAngle) {
	// adds equal sized spaces between the circles to spread them apart
	let rangeToSpreadOver = totalizeAngleRange(arrayToSpreadOver)
	let numberOfRanges = arrayToSpreadOver.length
	let emptySpace = rangeToSpreadOver - rangeToSpread
	let spaceBetween

	if (emptySpace < 0) {
		emptySpace = 0
	}
	if (arrayToSpread.length === 0) {
		spaceBetween = 0
	} else {
		spaceBetween = degToRad(emptySpace / (arrayToSpread.length * 2))
	}

	let cummAngle = degToRad(arrayToSpreadOver[0][0])
	let rangeNumber = 0
	let resultArray = []
	let initialArray = arrayToSpread
	let initSpreadArray = []
	for (var i = 0; i < arrayToSpreadOver.length; i++) {
		initSpreadArray = shiftEntireArray(initialArray, arrayToSpreadOver, i)
		for (var j = 0; j < initialArray.length; j++) {
			let newEl = Object.assign({}, initSpreadArray[j])
			let tempAngle = newEl.angle + (2 * j + 1) * spaceBetween
			rangeNumber = findMatchingRange(arrayToSpreadOver, radToDeg(tempAngle))
			if (rangeNumber === -1) {
				break
			} else {
				newEl.angle = tempAngle
				resultArray.push(newEl)
				initialArray.splice(0, j)
			}
		}
	}

	let filteredArray = resultArray.filter(function(el) {
		return el != null
	})

	let finalPositionedArray = filteredArray.map((el, index) => {
		let newEl = Object.assign({}, el)
		newEl.angle += degToRad(parentAngle)
		return newEl
	})
	return finalPositionedArray
}

function shiftEntireArray(arrayToShift, refArr, i) {
	return arrayToShift.map((el, index) => {
		let newEl = Object.assign({}, el)
		newEl.angle += degToRad(refArr[i][0])
		// console.log(radToDeg(el.angle), '+', refArr[i][0], '-->', radToDeg(newEl.angle))
		return newEl
	})
}

function findMatchingRange(ranges, checkValue) {
	function checkRange(range) {
		// console.log('checkValue', checkValue, 'range[0]', range[0], 'range[1]', range[1])
		return checkValue >= range[0] && checkValue <= range[1]
	}
	return ranges.findIndex(checkRange)
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
