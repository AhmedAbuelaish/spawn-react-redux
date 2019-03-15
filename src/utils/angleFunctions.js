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
		spaceBetween = emptySpace / (arrayToSpread.length * 2)
	}

	console.log('arrayToSpread',arrayToSpread)
	let newPositionedArray = arrayToSpread.map((el,index) => {
		console.log(degToRad(arrayToSpreadOver[0][0]))
		let newEl = Object.assign({},el)
		newEl.angle += degToRad(arrayToSpreadOver[0][0])
		return newEl
	})

	let newSpreadArray = newPositionedArray.map((currentEl, index) => {
		let totalAngle = 0
		let myAngle = currentEl.angle
		myAngle += spaceBetween

		return currentEl


	})

	let finalPositionedArray = newPositionedArray.map((el,index) => {
		let newEl = Object.assign({},el)
		console.log(degToRad(parentAngle))
		newEl.angle += degToRad(parentAngle)
		return newEl
	})
	console.log('finalPositionedArray',finalPositionedArray)
	return finalPositionedArray
	// console.log(rangeToSpread, 'spread in', rangeToSpreadOver)
	// console.log(emptySpace, '/', arrayToSpread.length, '* 2 =', spaceBetween)
}

function radToDeg(angle) {
	return Math.round((angle * 180) / Math.PI)
}

function degToRad(angle) {
	return Math.round((angle * Math.PI * 100) / 180) / 100
}

module.exports = { totalizeAngleRange, angleSpread, degToRad, radToDeg }
