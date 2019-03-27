function doesCircleIntersectSegment(center, radius, vertex1, vertex2) {
	// Check if vertices are in the circle, then check if distance is within radius
	if (distanceBetweenPoints(center, vertex1) <= radius || distanceBetweenPoints(center, vertex2) <= radius) {
		return true
	} else if (distanceToSegment(center, vertex1, vertex2) <= radius){
        return true   
    } else {
        return false
    }
}

function distanceBetweenPoints(point1, point2) {
	return Math.sqrt(sqr(point2.x - point1.x) + sqr(point2.y - point1.y))
}

function distanceToSegment(center, vertex1, vertex2) {
	// center, vertex1, & vertex2 as objects: {x: ..., y: ...}
	const x = center.x
	const y = center.y
	const x1 = vertex1.x
	const y1 = vertex1.y
	const x2 = vertex2.x
	const y2 = vertex2.y

	var A = x - x1
	var B = y - y1
	var C = x2 - x1
	var D = y2 - y1

	var dot = A * C + B * D
	var len_sq = sqr(C) + sqr(D)
	var param = -1
	if (len_sq != 0)
		//in case of 0 length line
		param = dot / len_sq

	var xx, yy

	if (param < 0) {
		xx = x1
		yy = y1
	} else if (param > 1) {
		xx = x2
		yy = y2
	} else {
		xx = x1 + param * C
		yy = y1 + param * D
	}

	var dx = x - xx
	var dy = y - yy
	return Math.sqrt(sqr(dx) + sqr(dy))
}

function sqr(x) {
	return x * x
}

export default doesCircleIntersectSegment
