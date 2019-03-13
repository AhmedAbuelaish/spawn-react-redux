var fragment = require('../utils/fragment')

// This reducer references/holds the main store
// It modifies the main state of the app

const initialState = {
	settings: {
		angleRange: [[0, 180], [180, 360]],
		minSize: 1,
		multiplier: 1,
		multiplierPrecision: 50, // Higher Levels, precision -> 100%
        decay: 20,
        decayPrecision: 50, // Higher Levels, precision -> 100%
	},
	nodes: [],
	leaves: []
}

const shapeReducer = (state = initialState, action) => {
	var newNodes = state.nodes.slice()
	var newLeaves = state.leaves.slice()
	var newSettings = { ...state.settings }
	switch (action.type) {
		case 'RESET':
			return { settings: state.settings, nodes: [], leaves: [] }
		case 'CREATE_ROOT':
			newNodes = [
				{
                    id: 0,
					radius: 100,
					coordX: 500,
					coordY: 500,
                    angle: Math.PI,
				}
			]
			newLeaves = newNodes
			return { settings: state.settings, nodes: newNodes, leaves: newLeaves }
		case 'CREATE_NODES':
			console.log(newNodes.length)
			newLeaves = fragment.createFragmentedArray(newLeaves, newSettings)
			newNodes = newNodes.concat(newLeaves)
			return { settings: state.settings, nodes: newNodes, leaves: newLeaves }
		case 'UPDATE_SETTINGS':
			newSettings = action.settings
			console.log(newSettings)
			return { settings: newSettings, nodes: state.nodes, leaves: state.leaves }
		default:
			return state
	}
}

export default shapeReducer
