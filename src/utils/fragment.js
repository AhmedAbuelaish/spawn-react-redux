function createFragmentedArray(oldArray) {
	var newArray = oldArray.map((currentItem, index) => {
		let parentRadius = currentItem.radius
		let parentX = currentItem.coordX
		let parentY = currentItem.coordY
	})
}

function distributeValue(startValue, minValue, distFactor) {
	// <1 distFactor for decreasing sizes but greater quantity (0.2 min)
	// >1 distFactor for chances of increasing sizes but fewer quantity
	if (!distFactor) {
		distFactor = 1
	}
	if (distFactor < 0.2) {
		distFactor = 0.2
    }
    
	let remainder = startValue
	let currentValue = 0
	let resultArray = []
	let processSteps = 0

	if (startValue <= minValue) {
		return resultArray
	} else {
		while (remainder >= minValue) {
			processSteps += 1
			currentValue = Math.trunc(remainder * Math.random() * distFactor * 1000) / 1000
			if (currentValue >= minValue) {
				resultArray.push(currentValue)
			}
			remainder -= currentValue
		}
	}
	console.log(Math.trunc((100 * resultArray.length) / processSteps), '% distribution score')
	console.log(resultArray)
	return resultArray
}
