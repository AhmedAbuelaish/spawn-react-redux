// fragment file before the angleSpread function

var rs = require('./randomSpread')
var as = require('./angleSpread')

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
	let totalRadialSpace = totalizeAngleRange(settings.angleRange)

	let mySize = 0
	let myAngle = parent.angle
	let myDistance = parent.radius + 30 // Adjust this to move children off of circumferance
	let currentChildrenArray = []
	let siblingCounter = 0

	let minAngle = Math.atan(1 / myDistance)
	let remainder = rs.randomSpread(parent.radius, settings.multiplier, settings.multiplierPrecision, 50, 2)

	if (parent.radius <= settings.minSize || parent.id.length === 40) {
		return currentChildrenArray
	} else {
		while (remainder >= settings.minSize) {
			mySize = rs.randomSpread(remainder * Math.random(), settings.decay, settings.decayPrecision, 100, 2)
			// mySize = Math.trunc(remainder * Math.random() * 1000) / 1000
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
	return arr.reduce((acc, val) => acc.concat(val), [])
}

function totalizeAngleRange(angleArr) {
	let totalAngleArr = angleArr.map((currentRangeArr, index) => {
		return currentRangeArr[1] - currentRangeArr[0]
	})
	let totalAngle = totalAngleArr.reduce((partial_sum, a) => partial_sum + a)
	return totalAngle
}

module.exports = { createFragmentedArray }
