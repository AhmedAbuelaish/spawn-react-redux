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
	let parentId = parent.id
	let parentSize = parent.radius
	let parentX = parent.coordX
	let parentY = parent.coordY
	let parentAngle = parent.angle

	let radialSpace = settings.angleRange
	let totalRadialSpace = totalizeAngleRange(radialSpace)
	let minSize = settings.minSize
	let multiplier = settings.multiplier

	let decayFactor = settings.decayFactor
	let decayPrecision = settings.decayPrecision

	let remainder = parentSize
	let mySize = 0
	let myAngle = parentAngle
	let myDistance = parentSize + 20 // Adjust this to move children off of circumferance
	let currentChildrenArray = []
	let siblingCounter = 0

	// Checks:
	// let retotalizer = 0

	if (parentSize <= minSize) {
		return currentChildrenArray
	} else {
		while (remainder >= minSize) {
			mySize = randomSpread(decayFactor,decayPrecision,remainder,0.2,2)
			let tempAngle = Math.atan(mySize / myDistance)
			if (!tempAngle) {
				console.log(
					'tempAngle',
					tempAngle,
					'myDistance',
					myDistance,
					'mySize',
					mySize,
					'parentSize',
					parentSize,
					'Size/Distance',
					mySize / myDistance
				)
			}
			remainder -= mySize
			if (mySize >= minSize) {
				// retotalizer += mySize
				myAngle += tempAngle // Find my center
				currentChildrenArray.push({
					id: parentId + '' + siblingCounter,
					radius: mySize,
					coordX: parentX + myDistance * Math.cos(myAngle),
					coordY: parentY + myDistance * Math.sin(myAngle),
					angle: myAngle
				})
				siblingCounter += 1
				myAngle += tempAngle // Setup for next center
			}
		}
	}
	return currentChildrenArray
}

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

function randomSpread(accuracy, precision, originalValue, spread, direction) {
	// accuracy is the % of the originalValue as a value between 0 & 1
	// precision: 0 = least precise, 1 = most precise
	// originalValue: starting value / target value
	// spread: range as a percentage of originalValue to randomize around. value between 0 & 1
	// direction: 2 = centered around value. 1 = Positive bias. -1 = negative bias
	let range = originalValue * spread
	let randomizer

	if (direction == 2) {
		randomizer = Math.random() - Math.random()
	} else if (direction == 1 || -1) {
		randomizer = direction * Math.abs(Math.random() - Math.random())
	} else {
		direction = 1
	}
	return accuracy * originalValue + Math.trunc(randomizer * range * (1 - precision))
}

module.exports = { createFragmentedArray }
