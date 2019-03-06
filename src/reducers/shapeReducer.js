const initialState = [
    {
        radius: 100,
        x: 300,
        y: 300
    }
]

const shapeReducer = (state = initialState, action) => {
    const newShapes = state.slice()
    switch (action.type) {
        case 'ADD_SHAPE':
            newShapes.push({
                radius: action.radius,
                x: 500,
                y: 500
            })
            console.log(newShapes)
            return newShapes
        case 'DELETE_SHAPE':
            return newShapes
        default:
            return state
    }
}

export default shapeReducer