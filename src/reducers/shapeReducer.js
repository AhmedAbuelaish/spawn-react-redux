var fragment = require('../utils/fragment')

// This reducer references/holds the main store
// It modifies the main state of the app

const initialState = {
	settings: {
		angleRange: [[0, 180], [180, 360]],
		minSize: 1,
		distFactor: 1.5
	},
	nodes: [],
	leaves: []
}

const shapeReducer = (state = initialState, action) => {
	var newNodes = state.nodes.slice()
	var newLeaves = state.leaves.slice()
    var newSettings = { ...state.settings }
    var singleNewLeaves = []
	switch (action.type) {
		case 'RESET':
			return { settings: state.settings, nodes: [], leaves: [] }
		case 'CREATE_ROOT':
			newNodes = [
				{
					radius: 100,
					coordX: 500,
					coordY: 500,
					angle: Math.PI
				}
			]
			newLeaves = newNodes
			return { settings: state.settings, nodes: newNodes, leaves: newLeaves }
		case 'CREATE_NODES':
            singleNewLeaves = fragment.popSingleLeaf(newLeaves, newSettings)
            newNodes = newNodes.concat(singleNewLeaves)
            newLeaves = newLeaves.concat(singleNewLeaves)
            newLeaves.shift()
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
