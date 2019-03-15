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
	let initSpreadArray = arrayToSpread
	for (var i = 0; i < arrayToSpreadOver.length; i++) {
		console.log('begining of loop')
		initSpreadArray = shiftEntireArray(initSpreadArray, arrayToSpreadOver, i)
		console.log('initSpreadArray', initSpreadArray)
		for (var j = 0; j < initSpreadArray.length; j++) {
			let newEl = Object.assign({}, initSpreadArray[j])
			console.log('newEl', newEl)
			console.log('spacebetween', radToDeg(spaceBetween))
			let tempAngle = newEl.angle + (2 * j + 1) * spaceBetween
			rangeNumber = findMatchingRange(arrayToSpreadOver, radToDeg(tempAngle))
			console.log('tempAngle', radToDeg(tempAngle), 'rangeNumber', rangeNumber)
			if (rangeNumber === -1) {
				console.log('skip this element and unshift entire array', newEl.id)
				initSpreadArray = ushiftEntireArray(initSpreadArray, arrayToSpreadOver, i)
				break
			} else {
				console.log(
					'tempAngle',
					radToDeg(tempAngle),
					'max',
					arrayToSpreadOver[rangeNumber][1],
					'rangeNumber',
					rangeNumber
				)
				newEl.angle = tempAngle
				console.log(newEl)
				resultArray.push(newEl)
				initSpreadArray = initSpreadArray.splice(j, initSpreadArray.length-1)
				console.log('resultArray', resultArray)
				console.log('initSpreadArray', initSpreadArray)
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

function radToDeg(angle) {
	return Math.round((angle * 180) / Math.PI)
}

function degToRad(angle) {
	return Math.round((angle * Math.PI * 100) / 180) / 100
}

module.exports = { totalizeAngleRange, angleSpread, degToRad, radToDeg }
