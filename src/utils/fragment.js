function createFragmentedArray(oldArray) {
	var newArray = oldArray.map((currentItem, index) => {
        let parentRadius = currentItem.radius
        

		let parentX = currentItem.coordX
		let parentY = currentItem.coordY
	})
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
                resultArray.push(currentValue)
                retotalizer += currentValue
			}
			remainder -= currentValue
		}
	}
    console.log(Math.trunc((100 * resultArray.length) / processSteps), '% distribution score')
    console.log(Math.trunc((100 * retotalizer) / startValue), '% total score')
	// console.log(resultArray)
	return resultArray
}



distributeValue (10, {distFactor: 0.5, minValue: 0.2})