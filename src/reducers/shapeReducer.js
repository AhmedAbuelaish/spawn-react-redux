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
    shapes: [{
        radius: 50,
        x: 50,
        y: 50,
        angle: 0
    }]
}

const shapeReducer = (state = initialState, action) => {
    const newShapes = state.shapes.slice()
    switch (action.type) {
        case 'ADD_SHAPE':
            for(let i=0;i<1000;i++){    
            newShapes.push({
                radius: action.radius,
                x: Math.random()*900,
                y: Math.random()*900
            })}
            console.log(newShapes)
            return {shapes: newShapes}
        case 'DELETE_SHAPE':
            return {shapes: newShapes}
        default:
            return state
    }
}

export default shapeReducer