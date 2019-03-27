import createFragmentedArray from '../utils/fragment'
import calcNewZoom from '../utils/stageSetup'
import doesCircleIntersectSegment from '../utils/collisions'

// This reducer references/holds the main store
// It modifies the main state of the app

const initialState = {
	viewportDims: { width: window.innerWidth, height: window.innerHeight },
	stage: { x: { min: 0, max: window.innerWidth }, y: { min: 0, max: window.innerHeight }, zoom: 1 },
	settings: {
		angleRange: [[-100, -70], [-45, 45], [70, 100]], // Range: -180 to 180
		maxAngleRanges: 4,
		minSize: 1,
		multiplier: 130,
		multiplierPrecision: 80, // Higher Levels, precision -> 100%
		decay: 90,
		decayPrecision: 40 // Higher Levels, precision -> 100%
	},
	nodes: [],
	leaves: [],
	obstacles: [
		[{ x: 0, y: 0 }, { x: window.innerWidth, y: 0 }, { x: window.innerWidth, y: 50 }, { x: 0, y: 50 }],
		[{ x: window.innerWidth-50, y: 200 }, { x: window.innerWidth, y: 200 }, { x: window.innerWidth, y: 600 }, { x: window.innerWidth-50, y: 600 }]
	] // Draw obstacles clockwise
}


const shapeReducer = (state = initialState, action) => {
	var newNodes = state.nodes.slice()
	var newLeaves = state.leaves.slice()
	var newSettings = { ...state.settings }
	var newViewportDims = { ...state.viewportDims }
	var newStage = state.stage
	// console.log('newStage', newStage)
	switch (action.type) {
		case 'RESET':
			var defaultStage = { x: { min: 0, max: window.innerWidth }, y: { min: 0, max: window.innerHeight }, zoom: 1 }
			return { ...state, nodes: [], leaves: [], stage: defaultStage }
		case 'CREATE_ROOT':
			newNodes = [
				{
					id: 0,
					radius: 150,
					coordX: state.viewportDims.width / 2,
					coordY: state.viewportDims.height / 2,
					angle: 0,
					color: `210, ${150*20}, ${150*40}` // rgb values
				}
			]
			newLeaves = newNodes
			return { ...state, nodes: newNodes, leaves: newLeaves }
		case 'CREATE_NODES':
			// console.log(state.nodes.length)
			newLeaves = createFragmentedArray(newLeaves, newSettings)
			newStage = calcNewZoom(newLeaves, state.stage, state.viewportDims)
			
			Array.prototype.push.apply(newNodes, newLeaves)
			return { ...state, nodes: newNodes, leaves: newLeaves, stage: newStage }
		case 'UPDATE_SETTINGS':
			newSettings = action.settings
			// console.log(newSettings)
			return { ...state, settings: newSettings }
		case 'UPDATE_VIEWPORT':
			newViewportDims = action.viewportDims
			return { ...state, viewportDims: newViewportDims }
		default:
			return state
	}
}

export default shapeReducer
