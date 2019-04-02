function totalizeAngleRange(angleArr) {
	let totalAngleArr = angleArr.map((currentRangeArr, index) => {
		return currentRangeArr[1] - currentRangeArr[0]
	})
	let totalAngle = totalAngleArr.reduce((partial_sum, a) => partial_sum + a)
	return totalAngle
}

function angleSqueeze(arrayToSpread, rangeToSpread, arrayToSpreadOver, parentAngle){
	let rangeToSpreadOver = totalizeAngleRange(arrayToSpreadOver)
	let numberOfRanges = arrayToSpreadOver.length

}

function angleSpread(arrayToSpread, rangeToSpread, arrayToSpreadOver, parentAngle) {
	// adds equal sized spaces between the circles to spread them apart
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

	let cummAngle = degToRad(arrayToSpreadOver[0][0])
	let rangeNumber = 0
	let resultArray = []
	let initialArray = arrayToSpread
	let initSpreadArray = []
	for (var i = 0; i < arrayToSpreadOver.length; i++) {
		initSpreadArray = shiftEntireArray(initialArray, arrayToSpreadOver, i)
		for (var j = 0; j < initialArray.length; j++) {
			let newEl = Object.assign({}, initSpreadArray[j])
			let tempAngle = newEl.angle + (2 * j + 1) * spaceBetween
			rangeNumber = findMatchingRange(arrayToSpreadOver, radToDeg(tempAngle))
			if (rangeNumber === -1) {
				break
			} else {
				newEl.angle = tempAngle
				resultArray.push(newEl)
				initialArray.splice(0, j)
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

export { totalizeAngleRange, angleSpread, degToRad, radToDeg }
