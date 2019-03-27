import { totalizeAngleRange, angleSpread, degToRad, radToDeg } from './angleFunctions'
import { flatten } from './arrayFunctions'
import randomSpread from './randomSpread'

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
	let myDistance = parent.radius + 10 // Adjust this to move children off of circumferance
	let currentChildrenArray = []
	let siblingCounter = 0

	let minAngle = Math.atan(settings.minSize / myDistance)
	let remainder = randomSpread(parent.radius, settings.multiplier, settings.multiplierPrecision, 50, 2)

	if (parent.radius <= settings.minSize || parent.id.length === 40) {
		return currentChildrenArray
	} else {
		while (remainder >= settings.minSize) {
			mySize = randomSpread(remainder * Math.random(), settings.decay, settings.decayPrecision, 100, 2)
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
					angle: myAngle,
					color: '210, 77, 87' // rgb values
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

export default createFragmentedArray

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
		if(newLeaves.length===0 || newLeaves.length>20000)break
	}
	console.timeEnd('fragArray')
	console.log(newNodes.length)
	window.newNodes=newNodes
	// const intId = setInterval(() => {
	// 	let result = createFragmentedArray(testLeaves,testSettings)
	// 	console.log(result)
	// }, 50)
	// setTimeout(() => {
	// 	clearInterval(intId)
	// }, 10000)
}
