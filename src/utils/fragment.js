// ~~~~~~~~~~~ Option 1: FRAGMENTED ENTIRE ARRAY ~~~~~~~~~~~~~~~~~~~~~~~~~~~//
function createFragmentedArray(parentsArr, settings) {
	var allChildrenArray = parentsArr.map((currentParent, index) => {
		return distributeParentValue(currentParent, settings)
	})
	allChildrenArray = flatten(allChildrenArray)
	return allChildrenArray
}

// ~~~~~~~~~~~ Option 2: FRAGMENT FIRST ELEMENT IN THE ARRAY ~~~~~~~~~~~~~~~//
function popSingleLeaf(parentsArr, settings) {
	var singleChildArray = distributeParentValue(parentsArr[0], settings)
	singleChildArray = flatten(singleChildArray)
	return singleChildArray
}

// ~~~~~~~~~~~~~~ DISTRIBUTE VALUE ~~~~~~~~~~~~~~~~~~~//
function distributeParentValue(parent, settings) {
	// settings is an object containing minSize & distFactor
	// <1 distFactor for decreasing sizes but greater quantity (0.2 min)
	// >1 distFactor for chances of increasing sizes but fewer quantity (1.5+ is unstable)
	let parentSize = parent.radius
	let parentX = parent.coordX
	let parentY = parent.coordY
	let parentAngle = parent.angle

	let minSize = settings.minSize
	let distFactor = settings.distFactor

	let remainder = parentSize
	let mySize = 0
	let myAngle = parentAngle
	let myDistance = parentSize + 10 // Adjust this to move children off of circumferance
	let currentChildrenArray = []

	// Checks:
	// let processSteps = 0
	// let retotalizer = 0

	if (parentSize <= minSize) {
		return currentChildrenArray
	} else {
		while (remainder >= minSize) {
			// processSteps += 1
			mySize = Math.trunc(remainder * Math.random() * distFactor * 1000) / 1000
			let tempAngle =
				Math.acos((parentSize ^ (2 + myDistance) ^ (2 - mySize) ^ 2) / (2 * myDistance * parentSize)) / (2 * Math.PI)
			remainder -= mySize
			if (mySize >= minSize) {
				// retotalizer += mySize
				myAngle += tempAngle // Find my center
				currentChildrenArray.push({
					radius: mySize,
					coordX: parentX + myDistance * Math.cos(myAngle),
					coordY: parentY + myDistance * Math.sin(myAngle),
					angle: myAngle
				})
				myAngle += tempAngle // Setup for next center
			}
		}
	}
	// console.log(Math.trunc((100 * currentChildrenArray.length) / processSteps), '% distribution score')
	// console.log(Math.trunc((100 * retotalizer) / parentSize), '% total score')
	return currentChildrenArray
}

function flatten(arr, val) {
	return arr.reduce((acc, val) => acc.concat(val), [])
}

module.exports = { createFragmentedArray,popSingleLeaf }

// tests

// const settings = { distFactor: 1.4, minSize: 1 }

// for(let i=0;i<1000;i++){
//     var arr = [{
//         radius: 1000,
//         coordX: 500,
//         coordY: 500,
//         angle: 0
//     }]
//     while (arr.length > 0) {
//         var arr = createFragmentedArray(arr, settings)
//     }
// }
