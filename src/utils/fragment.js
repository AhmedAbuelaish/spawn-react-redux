// ~~~~~~~~~~~ CREATE FRAGMENTED ARRAY ~~~~~~~~~~~~~~~//
function createFragmentedArray(parentsArr, settings) {
	console.log('createFragmentedArray')
	var allChildrenArray = parentsArr.map((currentParent, index) => {
		return distributeParentValue(currentParent, settings)
	})
	allChildrenArray = flatten(allChildrenArray)
	console.log('createFragmentedArray')
	return allChildrenArray
}

// ~~~~~~~~~~~~~~ DISTRIBUTE VALUE ~~~~~~~~~~~~~~~~~~~//
function distributeParentValue(parent, settings) {
	console.log('distributeParentValue')
	let totalRadialSpace = totalizeAngleRange(settings.angleRange)
	let multiplier = randomSpread(settings.multiplier, 100, settings.multiplierPrecision, 100, -1)
	console.log('multiplier=', multiplier)

	let mySize = 0
	let myAngle = parent.angle
	let myDistance = parent.radius + 30 // Adjust this to move children off of circumferance
	let currentChildrenArray = []
	let siblingCounter = 0

	let remainder = multiplier * parent.radius

	if (parent.radius <= settings.minSize || parent.id.length ===20) {
		return currentChildrenArray
	} else {
		while (remainder >= settings.minSize) {
			console.log('siblingCounter',siblingCounter)
			mySize = randomSpread(parent.radius, settings.decay, settings.decayPrecision, 100, 2)
			let tempAngle = Math.atan(mySize / myDistance)
			remainder -= mySize
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
	console.log('flatten')
	return arr.reduce((acc, val) => acc.concat(val), [])
}

function totalizeAngleRange(angleArr) {
	console.log('totalizeAngleRange')
	let totalAngleArr = angleArr.map((currentRangeArr, index) => {
		return currentRangeArr[1] - currentRangeArr[0]
	})
	let totalAngle = totalAngleArr.reduce((partial_sum, a) => partial_sum + a)
	return totalAngle
}

function randomSpread(originalValue, percentOfOriginal, precision, spread, direction) {
	// percentOfOriginal= % of originalValue
	// precision= 0%:least precise, 100%:most precise
	// originalValue: starting value
	// spread= range as % of originalValue to randomize around
	// direction= 2: centered around percentOfOriginal. 1:Positive bias. -1:negative bias
	console.log('randomSpread')
	let range = originalValue * spread/100
	let randomizer = 0

	if (direction === 2) {
		randomizer = Math.random() - Math.random()
	} else if (direction === 1 || direction === -1) {
		randomizer = direction * Math.abs(Math.random() - Math.random())
	} else {
		direction = -1
	}
	return (percentOfOriginal/100) * originalValue + (randomizer * range * (100 - precision)/100)
}

module.exports = { createFragmentedArray }
