// import {flatten} from './utilityFunctions'
const utility = require('./utilityFunctions')

function createFragmentedArray(oldArray, settings) {
	var newArray = oldArray.map((currentItem, index) => {
		let parentX = currentItem.coordX
		let parentY = currentItem.coordY
		return distributeValue(currentItem.radius, settings)
    })
    newArray = utility.flatten(newArray)
    console.log(newArray)
    console.log(newArray.length)
	return newArray
}

function distributeValue(startValue, settings) {
	// settings is an object containing minValue & distFactor

	// <1 distFactor for decreasing sizes but greater quantity (0.2 min)
	// >1 distFactor for chances of increasing sizes but fewer quantity
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

	if (startValue <= settings.minValue) {
		return resultArray
	} else {
		while (remainder >= settings.minValue) {
			processSteps += 1
			currentValue = Math.trunc(remainder * Math.random() * settings.distFactor * 1000) / 1000
			if (currentValue >= settings.minValue) {
				resultArray.push({'radius': currentValue})
				retotalizer += currentValue
			}
			remainder -= currentValue
		}
	}
	// console.log(Math.trunc((100 * resultArray.length) / processSteps), '% distribution score')
	// console.log(Math.trunc((100 * retotalizer) / startValue), '% total score')
	return resultArray
}






// tests

const arr = [
	{ radius: 10 },
	{ radius: 87 },
	{ radius: 9 },
	{ radius: 15 },
	{ radius: 0 },
	{ radius: 30 },
	{ radius: 20 },
	{ radius: 5 },
	{ radius: 2 },
	{ radius: 1 },
	{ radius: 100 }
]

const settings = { distFactor: 1.3, minValue: 1 }

var arr1 = createFragmentedArray(arr, settings)
var arr2 = createFragmentedArray(arr1, settings)
var arr3 = createFragmentedArray(arr2, settings)
var arr4 = createFragmentedArray(arr3, settings)
var arr5 = createFragmentedArray(arr4, settings)
var arr6 = createFragmentedArray(arr5, settings)
var arr7 = createFragmentedArray(arr6, settings)
var arr8 = createFragmentedArray(arr7, settings)
var arr9 = createFragmentedArray(arr8, settings)
var arr10 = createFragmentedArray(arr9, settings)
var arr11 = createFragmentedArray(arr10, settings)
var arr12 = createFragmentedArray(arr11, settings)
var arr13 = createFragmentedArray(arr12, settings)
var arr14 = createFragmentedArray(arr13, settings)
