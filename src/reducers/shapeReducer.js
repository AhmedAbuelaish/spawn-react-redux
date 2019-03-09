var fragment = require('../utils/fragment')

// This reducer references/holds the main store
// It modifies the main state of the app

// Suggestion:
// grandParents are the shapes that are rendered and that no longer need to be referenced
// activeParents are shapes whose properties need to be referenced for the next generation of children
// Once used, activeParents will be added appended to the grandParents array at which point they are rendered
// The activeParents are then erased and replaced by the new generation of shapes



const tree = {
    "ROOT": {
        radius: 100,
        x: 50,
        y: 25,
        children: ["node-2352452353", "node-235134134325"]
    },
    "node-23423535": {
    }
}


const initialState = {
    settings: {
        angleRange: [[0,180],[180,360]],
        minSize: 1,
        distFactor: 1.4
    },
    nodes: [],
    leaves : [{
        radius: 100,
        coordX: 500,
        coordY: 500,
        angle: 0
    }]
}

const shapeReducer = (state = initialState, action) => {
    var newNodes = state.nodes.slice()
    var newLeaves = state.leaves.slice()
    var newSettings = {... state.settings}
    switch (action.type) {
        case 'RESET':
            return {settings: state.settings, nodes: [], leaves: []}
        case 'CREATE_ROOT':
            newNodes = [{
                radius: 100,
                coordX: 500,
                coordY: 500,
                angle: 0
            }]
            newLeaves = newNodes
            return {settings: state.settings, nodes: newNodes, leaves: newLeaves}
        case 'CREATE_NODES':
            console.log(newNodes.length)
            newLeaves = fragment.createFragmentedArray(newLeaves,newSettings)
            newNodes = newNodes.concat(newLeaves)
            return {settings: state.settings, nodes: newNodes, leaves: newLeaves}
        case 'UPDATE_SETTINGS':
            newSettings = action.settings
            console.log(newSettings)
            return {settings: newSettings, nodes: state.nodes, leaves: state.leaves}
        default:
            return state
        }
}

export default shapeReducer