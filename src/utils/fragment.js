// import {flatten} from './utilityFunctions'
const utility = require('./utilityFunctions')


// ~~~~~~~~~~~ CREATE FRAGMENTED ARRAY ~~~~~~~~~~~~~~~//
function createFragmentedArray(oldArray, settings) {
	var newArray = oldArray.map((currentItem, index) => {
		let parentX = currentItem.coordX
		let parentY = currentItem.coordY
		return distributeValue(currentItem.radius, settings)
	})
	newArray = utility.flatten(newArray)
	return newArray
}

// ~~~~~~~~~~~~~~ DISTRIBUTE VALUE ~~~~~~~~~~~~~~~~~~~//
function distributeValue(startValue, settings) {
	// settings is an object containing minSize & distFactor
	// <1 distFactor for decreasing sizes but greater quantity (0.2 min)
	// >1 distFactor for chances of increasing sizes but fewer quantity (1.5+ is unstable)
	if (!settings.distFactor) {
		settings.distFactor = 1
	}
	if (settings.distFactor < 0.2) {
		settings.distFactor = 0.2
	}

	let remainder = startValue
	let currentValue = 0
	let resultArray = []

	// Checks:
	let processSteps = 0
	let retotalizer = 0

	if (startValue <= settings.minSize) {
		return resultArray
	} else {
		while (remainder >= settings.minSize) {
			processSteps += 1
			currentValue = Math.trunc(remainder * Math.random() * settings.distFactor * 1000) / 1000
			if (currentValue >= settings.minSize) {
				resultArray.push({ radius: currentValue })
				retotalizer += currentValue
			}
			remainder -= currentValue
		}
	}
	// console.log(Math.trunc((100 * resultArray.length) / processSteps), '% distribution score')
	// console.log(Math.trunc((100 * retotalizer) / startValue), '% total score')
	return resultArray
}

module.exports = {createFragmentedArray}









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

