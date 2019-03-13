// ~~~~~~~~~~~ CREATE FRAGMENTED ARRAY ~~~~~~~~~~~~~~~//
function createFragmentedArray(parentsArr, settings) {
	var allChildrenArray = parentsArr.map((currentParent, index) => {
		return distributeParentValue(currentParent, settings)
	})
	allChildrenArray = flatten(allChildrenArray)
	console.log(parentsArr)
	return allChildrenArray
}

// ~~~~~~~~~~~~~~ DISTRIBUTE VALUE ~~~~~~~~~~~~~~~~~~~//
function distributeParentValue(parent, settings) {
	let totalRadialSpace = totalizeAngleRange(settings.angleRange)
	let multiplier = randomSpread(settings.multiplier, settings.multiplierPrecision, settings.multiplier, 1, -1)

	let mySize = 0
	let myAngle = parent.angle
	let myDistance = parent.radius + 20 // Adjust this to move children off of circumferance
	let currentChildrenArray = []
	let siblingCounter = 0

	if (parent.radius <= settings.minSize) {
		return currentChildrenArray
	} else {
		while (siblingCounter < multiplier) {
			mySize = randomSpread(settings.decay, settings.decayPrecision, multiplier, 0.2, 2)
			let tempAngle = Math.atan(mySize / myDistance)
			if (mySize >= settings.minSize) {
				// retotalizer += mySize
				myAngle += tempAngle // Find my center
				currentChildrenArray.push({
					id: parent.id + '' + siblingCounter,
					radius: mySize,
					coordX: parent.coordX + myDistance * Math.cos(myAngle),
					coordY: parent.coordY + myDistance * Math.sin(myAngle),
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

function randomSpread(targetValue, precision, originalValue, spread, direction) {
	// targetValue= % of originalValue as a value between 0 & 1
	// precision= 0:least precise, 1:most precise
	// originalValue: starting value
	// spread= range as % of originalValue to randomize around. value between 0 & 1
	// direction= 2: centered around targetValue. 1:Positive bias. -1:negative bias
	let range = originalValue * spread
	let randomizer

	if (direction === 2) {
		randomizer = Math.random() - Math.random()
	} else if (direction === 1 || -1) {
		randomizer = direction * Math.abs(Math.random() - Math.random())
	} else {
		direction = 1
	}
	return targetValue * originalValue + Math.trunc(randomizer * range * (1 - precision))
}

module.exports = { createFragmentedArray }
