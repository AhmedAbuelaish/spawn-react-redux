const initialState = [
    {
        radius: 50,
        x: 100,
        y: 100
    }
]

const shapeReducer = (state = initialState, action) => {
    const newShapes = state.slice()
    switch (action.type) {
        case 'ADD_SHAPE':
            newShapes.push({
                radius: action.radius,
                x: Math.random()*900,
                y: Math.random()*900
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