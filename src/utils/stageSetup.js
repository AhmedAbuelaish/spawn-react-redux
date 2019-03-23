import { pluck } from '../utils/arrayFunctions'

function calcNewZoom(leaves, stage, viewport) {
	let allX = pluck(leaves, 'coordX')
	let allY = pluck(leaves, 'coordY')

	let maxX = Math.max(...allX, stage.x.max)
	let minX = Math.min(...allX, stage.x.min)
	let maxY = Math.max(...allY, stage.y.max)
	let minY = Math.min(...allY, stage.y.min)
	console.log('maxX', maxX, 'minY', minY)
	let deltaX = Math.max(Math.abs(minX), maxX - stage.x.max)
	let deltaY = Math.max(Math.abs(minY), maxY - stage.y.max)
	console.log('deltaX', deltaX, 'deltaY', deltaY)

	let newStage = {
		x: {
			min: -deltaX,
			max: stage.x.max + deltaX
		},
		y: {
			min: -deltaY,
			max: stage.y.max + deltaY
		},
		zoom: 0.9 / Math.max(1 + (2 * deltaX) / viewport.width, 1 + (2 * deltaY) / viewport.height)
	}

	return newStage
}

export { calcNewZoom }
