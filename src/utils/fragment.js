var rs = require('./randomSpread')
var angles = require('./angleFunctions')

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
	let myDistance = parent.radius + 30 // Adjust this to move children off of circumferance
	let currentChildrenArray = []
	let siblingCounter = 0

	let minAngle = Math.atan(settings.minSize / myDistance)
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
					distance: myDistance,
					coordX: parent.coordX,
					coordY: parent.coordY,
					angle: myAngle
				})
				siblingCounter += 1
				myAngle += tempAngle // Setup for next center
			}
		}
	}

	// Spread Angle of children over angle range
	let distributedChildrenArray = angles.angleSpread(
		currentChildrenArray,
		Math.abs(angles.radToDeg(myAngle)),
		settings.angleRange,
		angles.radToDeg(parent.angle) % 360
	)

	let positionedChildrenArray = distributedChildrenArray.map((el, index) => {
		let newEl = Object.assign({}, el)
		newEl.coordX = newEl.coordX + newEl.distance * Math.cos(newEl.angle)
		newEl.coordY = newEl.coordY + newEl.distance * Math.sin(newEl.angle)
		return newEl
	})

	return positionedChildrenArray
}

function flatten(arr, val) {
	return arr.reduce((acc, val) => acc.concat(val), [])
}

module.exports = { createFragmentedArray }
