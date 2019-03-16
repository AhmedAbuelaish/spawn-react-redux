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

	console.log(rangeToSpread, 'spread over', rangeToSpreadOver)
	console.log(emptySpace, '/', arrayToSpread.length, '* 2 =', radToDeg(spaceBetween))
	// console.log(arrayToSpread)

	let cummAngle = degToRad(arrayToSpreadOver[0][0])
	let rangeNumber = 0
	let resultArray = []
	let currentSpreadArray = arrayToSpread
	for (var i = 0; i < arrayToSpreadOver.length; i++) {
		console.log('begining of loop')
		currentSpreadArray = shiftEntireArray(currentSpreadArray, arrayToSpreadOver, i)
		console.log('currentSpreadArray', currentSpreadArray)
		for (var j = 0; j < currentSpreadArray.length; j++) {
			let newEl = Object.assign({}, currentSpreadArray[j])
			console.log('newEl', newEl)
			console.log('spacebetween', radToDeg(spaceBetween))
			let tempAngle = newEl.angle + (2 * j + 1) * spaceBetween
			rangeNumber = checkIfInRange(arrayToSpreadOver, radToDeg(tempAngle), i)
			if (rangeNumber !== false) {
				console.log(
					'tempAngle',
					radToDeg(tempAngle),
					'max',
					arrayToSpreadOver[rangeNumber][1],
					'rangeNumber',
					rangeNumber
				)
				newEl.angle = tempAngle
				resultArray.push(newEl)
				currentSpreadArray.splice(0, 1)
				console.log('resultArray', resultArray)
				console.log('currentSpreadArray', currentSpreadArray)
			} else {
				console.log('skip this element and unshift entire array', newEl.id, 'rangeNumber', rangeNumber)
				currentSpreadArray = ushiftEntireArray(currentSpreadArray, arrayToSpreadOver, i)
				break
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
		console.log(radToDeg(el.angle), '+', refArr[i][0], '-->', radToDeg(newEl.angle))
		return newEl
	})
}

function ushiftEntireArray(arrayToShift, refArr, i) {
	return arrayToShift.map((el, index) => {
		let newEl = Object.assign({}, el)
		newEl.angle -= degToRad(refArr[i][0])
		console.log(radToDeg(el.angle), '-', refArr[i][0], '-->', radToDeg(newEl.angle))
		return newEl
	})
}

function findMatchingRange(ranges, checkValue) {
	function checkRange(range) {
		console.log('checkValue', checkValue, 'range[0]', range[0], 'range[1]', range[1])
		return checkValue >= range[0] && checkValue <= range[1]
	}
	return ranges.findIndex(checkRange)
}

function checkIfInRange(ranges, checkValue, index) {
	console.log('checkValue', checkValue, 'ranges[index][0]', ranges[index][0], 'ranges[index][1]', ranges[index][1])
	if (checkValue >= ranges[index][0] && checkValue <= ranges[index][1]) {
		return index
	} else {
		return false
	}
}

function radToDeg(angle) {
	return Math.round((angle * 180) / Math.PI)
}

function degToRad(angle) {
	return Math.round((angle * Math.PI * 100) / 180) / 100
}

module.exports = { totalizeAngleRange, angleSpread, degToRad, radToDeg }
