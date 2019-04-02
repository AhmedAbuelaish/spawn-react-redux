import createFragmentedArray from '../utils/fragment'
import calcNewZoom from '../utils/stageSetup'
import doLeavesIntersectObstacles from '../utils/collisions'

// This reducer references/holds the main store
// It modifies the main state of the app

const initialState = {
	viewportDims: { width: window.innerWidth, height: window.innerHeight },
	stage: { x: { min: 0, max: window.innerWidth }, y: { min: 0, max: window.innerHeight }, zoom: 1 },
	settings: {
		angleRange: [[-45, 45]], // Range: -180 to 180
		maxAngleRanges: 4,
		minSize: 4,
		multiplier: 130,
		multiplierPrecision: 80, // Higher Levels, precision -> 100%
		decay: 90,
		decayPrecision: 40, // Higher Levels, precision -> 100%
		rootAngle: 0,
		rootCoords: { coordX: window.innerWidth * 0.2, coordY: window.innerHeight * 0.5 },
		rootSize: 100
	},
	nodes: [],
	leaves: [],
	obstacles: [
		[{ x: 0, y: 0 }, { x: window.innerWidth*0.4, y: 0 }, { x: window.innerWidth*0.4, y: 50 }, { x: 0, y: 50 }],
		[
			{ x: window.innerWidth - 350, y: 300 },
			{ x: window.innerWidth - 300, y: 300 },
			{ x: window.innerWidth - 300, y: 600 },
			{ x: window.innerWidth - 350, y: 600 }
		],
		[
			{ x: 0, y: window.innerHeight - 50 },
			{ x: window.innerWidth*0.4, y: window.innerHeight - 50 },
			{ x: window.innerWidth*0.4, y: window.innerHeight},
			{ x: 0, y: window.innerHeight }
		],
		[{ x: 0, y: 0 }, { x: 50, y: 0 }, { x: 50, y: window.innerHeight }, { x: 0, y: window.innerHeight }]
	] // Draw obstacles clockwise
}

const shapeReducer = (state = initialState, action) => {
	var newNodes = state.nodes.slice()
	var newLeaves = state.leaves.slice()
	var newSettings = { ...state.settings }
	var newViewportDims = { ...state.viewportDims }
	var newStage = state.stage
	switch (action.type) {
		case 'RESET':
			var defaultStage = { x: { min: 0, max: window.innerWidth }, y: { min: 0, max: window.innerHeight }, zoom: 1 }
			return { ...state, nodes: [], leaves: [], stage: defaultStage }
		case 'CREATE_ROOT':
			newNodes = [
				{
					id: 0,
					radius: state.settings.rootSize,
					coordX: state.settings.rootCoords.coordX,
					coordY: state.settings.rootCoords.coordY,
					angle: state.settings.rootAngle,
					color: `210, ${150 * 20}, ${150 * 40}` // rgb values
				}
			]
			newLeaves = newNodes
			return { ...state, nodes: newNodes, leaves: newLeaves }
		case 'CREATE_NODES':
			newLeaves = createFragmentedArray(newLeaves, newSettings)
			newStage = calcNewZoom(newLeaves, state.stage, state.viewportDims)
			newLeaves = doLeavesIntersectObstacles(newLeaves, state.obstacles)
			Array.prototype.push.apply(newNodes, newLeaves)
			return { ...state, nodes: newNodes, leaves: newLeaves, stage: newStage }
		case 'UPDATE_SETTINGS':
			newSettings = action.settings
			return { ...state, settings: newSettings }
		case 'UPDATE_VIEWPORT':
			newViewportDims = action.viewportDims
			return { ...state, viewportDims: newViewportDims }
		default:
			return state
	}
}

export default shapeReducer
