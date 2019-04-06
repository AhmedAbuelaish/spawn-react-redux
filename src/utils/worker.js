
export default () => {
	onmessage = (e) => {
    // eslint-disable-line no-restricted-globals
		if (!e) return

    console.log('received message from container')
    // console.log(e.data)
		let leaves = e.data[0]
		let settings = e.data[1]
		let obstacles = e.data[2]
		let maxNodeCount = 10000
		let nodeCount = 0
		while (leaves.length !== [] && nodeCount<maxNodeCount ) {
      // console.log(JSON.stringify(leaves.slice()))
			console.log(leaves.slice().length)
			let leafIndex = Math.floor(Math.random() * leaves.length)
			let tempNodesArr = distributeParentValue(leaves[leafIndex], settings)
			tempNodesArr = doLeavesIntersectObstacles(tempNodesArr, obstacles)
			leaves[leafIndex] = tempNodesArr
			leaves = flatten(leaves)
			postMessage([tempNodesArr, leaves])
			nodeCount++
		}
	}
//
// 
// 
// 
//
// 
// THE LINES OF CODE BELOW ARE DUPLICATES FROM THE OTHER JS FILES
// THE REASON THEY ARE COPIED IN HERE IS BECAUSE WEBWORKER NEEDS
// TO BE SEPARATED FROM REACT'S SRC FILES
// 
// THE IDEAL WAY TO DO THIS IS TO HAVE A SEPARATE WEBPACK FOR THE WORKER
// AND FOR REACT
//
// 
// 
// 
//
// 
// 
// 
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// 											FRAGMENT.JS
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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
					color: `210, ${mySize * 20}, ${mySize * 40}` // rgb values
				})
				// console.log(currentChildrenArray.slice(),siblingCounter)
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


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// 											COLLISIONS.JS
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function doLeavesIntersectObstacles(leaves, obstacles) {
	let collisionLeaves = leaves.map((currentLeaf, index) => {
		for (var i = 0; i < obstacles.length; i++) {
			for (var j = 0; j < obstacles[i].length; j++) {
				var nextVert
				if (j === obstacles[i].length - 1) {
					nextVert = obstacles[i][0]
				} else {
					nextVert = obstacles[i][j + 1]
				}
				if (
					doesCircleIntersectSegment(
						{ x: currentLeaf.coordX, y: currentLeaf.coordY },
						currentLeaf.radius,
						obstacles[i][j],
						nextVert
					)
				) {
					// true
					let modLeaf = currentLeaf
					modLeaf.color = `0, 0, 0`
					modLeaf.radius = 0
					return modLeaf // rgb values
				}
			}
		}
		return currentLeaf
	})
	return collisionLeaves
}

function doesCircleIntersectSegment(center, radius, vertex1, vertex2) {
	// Check if vertices are in the circle, then check if distance is within radius
	if (distanceBetweenPoints(center, vertex1) <= radius || distanceBetweenPoints(center, vertex2) <= radius) {
		return true
	} else if (distanceToSegment(center, vertex1, vertex2) <= radius) {
		return true
	} else {
		return false
	}
}

function distanceBetweenPoints(point1, point2) {
	return Math.sqrt(sqr(point2.x - point1.x) + sqr(point2.y - point1.y))
}

function distanceToSegment(center, vertex1, vertex2) {
	// center, vertex1, & vertex2 as objects: {x: ..., y: ...}
	const x = center.x
	const y = center.y
	const x1 = vertex1.x
	const y1 = vertex1.y
	const x2 = vertex2.x
	const y2 = vertex2.y

	var A = x - x1
	var B = y - y1
	var C = x2 - x1
	var D = y2 - y1

	var dot = A * C + B * D
	var len_sq = sqr(C) + sqr(D)
	var param = -1
	if (len_sq !== 0)
		//in case of 0 length line
		param = dot / len_sq

	var xx, yy

	if (param < 0) {
		xx = x1
		yy = y1
	} else if (param > 1) {
		xx = x2
		yy = y2
	} else {
		xx = x1 + param * C
		yy = y1 + param * D
	}

	var dx = x - xx
	var dy = y - yy
	return Math.sqrt(sqr(dx) + sqr(dy))
}

function sqr(x) {
	return x * x
}



// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// 											ARRAYFUNCTIONS.JS
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function flatten(arr, val) {
	return arr.reduce((acc, val) => acc.concat(val), [])
}

function pluck(arr, key) {
	return arr.map(function(item) {
		return item[key]
	})
}

function multiPluck(arr, keys) {
	return arr.map(function(item) {
		var obj = {}
		for (var i = 0; i < keys.length; i++) {
			obj[keys[i]] = item[keys[i]]
		}
		return obj
	})
}



// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// 											ANGLEFUNCTIONS.JS
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function totalizeAngleRange(angleArr) {
	let totalAngleArr = angleArr.map((currentRangeArr, index) => {
		return currentRangeArr[1] - currentRangeArr[0]
	})
	let totalAngle = totalAngleArr.reduce((partial_sum, a) => partial_sum + a)
	return totalAngle
}

function angleSpread(arrayToSpread, rangeToSpread, arrayToSpreadOver, parentAngle) {
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

	// console.log(rangeToSpread, 'spread over', rangeToSpreadOver)
	// console.log(emptySpace, '/', arrayToSpread.length, '* 2 =', radToDeg(spaceBetween))
	// console.log(arrayToSpread)

	let cummAngle = degToRad(arrayToSpreadOver[0][0])
	let rangeNumber = 0
	let resultArray = []
	let initialArray = arrayToSpread
	let initSpreadArray = []
	for (var i = 0; i < arrayToSpreadOver.length; i++) {
		// console.log('begining of loop')
		initSpreadArray = shiftEntireArray(initialArray, arrayToSpreadOver, i)
		// console.log('initSpreadArray', initSpreadArray)
		for (var j = 0; j < initialArray.length; j++) {
			let newEl = Object.assign({}, initSpreadArray[j])
			// console.log('newEl', newEl)
			// console.log('spacebetween', radToDeg(spaceBetween))
			let tempAngle = newEl.angle + (2 * j + 1) * spaceBetween
			rangeNumber = findMatchingRange(arrayToSpreadOver, radToDeg(tempAngle))
			// console.log('tempAngle', radToDeg(tempAngle), 'rangeNumber', rangeNumber)
			if (rangeNumber === -1) {
				// console.log('skip this element', newEl.id)
				break
			} else {
				// console.log(
				// 	'tempAngle',
				// 	radToDeg(tempAngle),
				// 	'max',
				// 	arrayToSpreadOver[rangeNumber][1],
				// 	'rangeNumber',
				// 	rangeNumber
				// )
				newEl.angle = tempAngle
				// console.log(newEl)
				resultArray.push(newEl)
				initialArray.splice(0, j)
				// console.log('resultArray', resultArray)
				// console.log('initialArray', initialArray)
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


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// 											RANDOMSPREAD.JS
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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



}
