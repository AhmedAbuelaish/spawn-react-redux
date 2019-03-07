// This reducer references/holds the main store
// It modifies the main state of the app

// Suggestion:
// grandParents are the shapes that are rendered and that no longer need to be referenced
// activeParents are shapes whose properties need to be referenced for the next generation of children
// Once used, activeParents will be added appended to the grandParents array at which point they are rendered
// The activeParents are then erased and replaced by the new generation of shapes

const initialState = {
    settings: {
        angleRange: [[0,180],[180,360]],
        minimumRadius: 3
    },
    grandParents: [{
        radius: 50,
        x: 50,
        y: 50,
        angle: 0
    }],
    activeParents: [{
        radius: 50,
        x: 50,
        y: 50,
        angle: 0
    }],
    youngChildren: [{
        radius: 50,
        x: 50,
        y: 50,
        angle: 0
    }]
}

const shapeReducer = (state = initialState, action) => {
    const newParents = state.activeParents.slice()
    var newGrandParents = state.grandParents.slice()
    const newChildren = []
    switch (action.type) {
        case 'CREATE_CHILDREN':
            // Call the function that gets passed an element in an array and returns a new array based on the element's values 
            for(let i=0;i<1000;i++){    
                newChildren.push({
                    radius: action.radius,
                    x: Math.random()*900,
                    y: Math.random()*900,
                    angle: Math.random()*2*Math.PI
                })}
            console.log()
            return {youngChildren: newChildren}
        case 'RAISE_CHILDREN':
            // Call the function that gets passed an element in an array and returns a new array based on the element's values 
            return {activeParents: newParents}
        case 'AGE_PARENTS':
            // This appends activeParents to grandParents
            console.log('newGP', newGrandParents)
            newGrandParents = newGrandParents.concat(newParents)
            console.log('newGP + Parents', newGrandParents)
            return {grandParents: newGrandParents}
        default:
            return state
    }
}

export default shapeReducer