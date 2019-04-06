import { createFragmentedArray, distributeParentValue } from '../utils/fragment'
import calcNewZoom from '../utils/stageSetup'
import doLeavesIntersectObstacles from '../utils/collisions'

// This reducer references/holds the main store
// It modifies the main state of the app

const initialState = {
	viewportDims: { width: window.innerWidth, height: window.innerHeight },
	stage: { x: { min: 0, max: window.innerWidth }, y: { min: 0, max: window.innerHeight }, zoom: 1 },
	settings: {
		angleRange: [[-100, -70], [-45, 45], [70, 100]], // Range: -180 to 180
		maxAngleRanges: 4,
		minSize: 4,
		multiplier: 130,
		multiplierPrecision: 20, // Higher Levels, precision -> 100%
		decay: 95,
		decayPrecision: 40, // Higher Levels, precision -> 100%
		rootAngle: 200
	},
	nodes: [],
	tempNodes: [],
	leaves: [],
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
					radius: 150,
					coordX: state.viewportDims.width * 0.5,
					coordY: state.viewportDims.height * 0.5,
					angle: state.settings.rootAngle,
					color: `210, ${150 * 20}, ${150 * 40}` // rgb values
				}
			]
			newLeaves = newNodes
			return { ...state, nodes: newNodes, leaves: newLeaves }
		case 'RENDER_NODES':
			return { ...state, nodes: newNodes, stage: newStage }
		case 'CREATE_LEAVES':
			Array.prototype.push.apply(newNodes, action.tempNodesArr)
			newStage = calcNewZoom(action.tempNodesArr, state.stage, state.viewportDims)
			return { ...state, nodes: newNodes, leaves: action.leavesArr, stage: newStage }
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

// type: 'CREATE_LEAVES', singleTempNode: tempNodeArr, newLeaves: newLeavesArr })
