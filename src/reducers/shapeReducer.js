var fragment = require('../utils/fragment')

// This reducer references/holds the main store
// It modifies the main state of the app

const initialState = {
	viewportDims: { width: window.innerWidth, height: window.innerHeight  },
	settings: {
		angleRange: [[0,180]],
		minSize: 1,
		multiplier: 130,
		multiplierPrecision: 40, // Higher Levels, precision -> 100%
		decay: 50,
		decayPrecision: 40, // Higher Levels, precision -> 100%
		zoom: 100
	},
	nodes: [],
	leaves: []
}

const shapeReducer = (state = initialState, action) => {
	var newNodes = state.nodes.slice()
	var newLeaves = state.leaves.slice()
	var newSettings = { ...state.settings }
	var newViewportDims = { ...state.viewportDims }
	switch (action.type) {
		case 'RESET':
			return { ...state, nodes: [], leaves: [] }
		case 'CREATE_ROOT':
			newNodes = [
				{
					id: 0,
					radius: 50,
					coordX: state.viewportDims.width/2,
					coordY: state.viewportDims.height/2,
					angle: 0
				}
			]
			newLeaves = newNodes
			return { ...state, nodes: newNodes, leaves: newLeaves }
		case 'CREATE_NODES':
			console.log(state.nodes.length)
			newLeaves = fragment.createFragmentedArray(newLeaves, newSettings)
			newNodes = newNodes.concat(newLeaves)
			return { ...state, nodes: newNodes, leaves: newLeaves }
		case 'UPDATE_SETTINGS':
			newSettings = action.settings
			// console.log(newSettings)
			return { ...state, settings: newSettings }
		case 'UPDATE_VIEWPORT':
			newViewportDims = action.viewportDims
			console.log(newViewportDims)
			return { ...state, viewportDims: newViewportDims }
		default:
			return state
	}
}

export default shapeReducer
