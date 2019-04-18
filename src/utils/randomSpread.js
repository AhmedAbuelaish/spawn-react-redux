function randomSpread(originalValue, percentOfOriginal, precision, spread, direction){
	// percentOfOriginal= % of originalValue
	// precision= 0%:least precise, 100%:most precise
	// originalValue: starting value
	// spread= range of values around the originalValue to pick from
	// direction= 2: centered around percentOfOriginal. 1:Positive bias. -1:negative bias

	let randomizer = 0

	if (direction === 2) {
		randomizer = Math.random() - Math.random()
	} else if (direction === 1 || direction === -1) {
		randomizer = direction * Math.abs(Math.random() - Math.random())
	} else {
		direction = -1
	}
	return (percentOfOriginal / 100) * originalValue + (randomizer * spread * (100 - precision)) / 100
}

export default randomSpread
