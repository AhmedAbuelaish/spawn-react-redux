import React, {Component} from 'react'
import {connect} from 'react-redux'

// The shape container renders the grandParent shapes as the state changes
// All this container should care about is the radius of the shapes, and their coordinates
// Creating the shapes in the state should be done somewhere else

// Suggestion:
// For each iteration of shape creation, pass through the render function below. 
// At the same time, use that same array of rendered shapes for the next iteration


class ShapeContainer extends Component {

    constructor(props) {
        super(props)
        this.state={radius:''}
    }

    componentDidMount() {
        // const int = setInterval(()=>{this.handleCreateShape()},1000)
	}

    handleCreateShape = () => { 
        this.props.createShape(Math.random()*100)
    }

    render() {
        return (
            <div>
                {this.props.shapes.map((currentShape, i) => {
                    const styles = {
                        width: currentShape.radius*2,
                        height: currentShape.radius*2,
                        left: currentShape.x,
                        top: currentShape.y,
                        borderRadius: '50%',
                        borderWidth: 1,
                        borderColor: 'black',
                        borderStyle: 'solid',
                        position: 'absolute'
                    }
                    return <div style={styles} key={i} />
                })}
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    shapes: state.shapes
})

const mapDispatchToProps = (dispatch) => ({
    createShape: (shapeSize) => dispatch({type: 'ADD_SHAPE', radius: shapeSize}),
})


export default connect(mapStateToProps, mapDispatchToProps)(ShapeContainer)