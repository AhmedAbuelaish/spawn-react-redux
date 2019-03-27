import { pluck } from '../utils/arrayFunctions'

function calcNewZoom(leaves, stage, viewport) {
	let allX = pluck(leaves, 'coordX')
	let allY = pluck(leaves, 'coordY')

	let maxX = Math.max(...allX, viewport.width)
	let minX = Math.min(...allX, stage.x.min)
	let maxY = Math.max(...allY, viewport.height)
	let minY = Math.min(...allY, stage.y.min)
	console.log('stage x max',stage.x.max, 'stage.y.max',stage.y.max)
	console.log('viewport.width',viewport.width, 'viewport.height',viewport.height)
	console.log('max X', maxX, 'max Y', maxY)
	let deltaX = Math.max(Math.abs(minX), maxX - stage.x.max)
	let deltaY = Math.max(Math.abs(minY), maxY - stage.y.max)

	let newStage = {
		x: {
			min: -deltaX,
			max: stage.x.max + deltaX
		},
		y: {
			min: -deltaY,
			max: stage.y.max + deltaY
		},
		zoom: Math.trunc(10000 * 0.9 / Math.max(1 + (2 * deltaX) / viewport.width, 1 + (2 * deltaY) / viewport.height))/10000
	}

	return newStage
}

export { calcNewZoom }
