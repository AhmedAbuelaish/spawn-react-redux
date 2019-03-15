function totalizeAngleRange(angleArr) {
	let totalAngleArr = angleArr.map((currentRangeArr, index) => {
		return currentRangeArr[1] - currentRangeArr[0]
	})
	let totalAngle = totalAngleArr.reduce((partial_sum, a) => partial_sum + a)
	return totalAngle
}

function radToDeg(angle) {
	return Math.round((angle * 180) / Math.PI)
}

function degToRad(angle) {
	return Math.round((angle * Math.PI * 100) / 180) / 100
}

module.exports = { totalizeAngleRange, degToRad, radToDeg }
