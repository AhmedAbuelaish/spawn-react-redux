import React, {Component} from 'react'
import {connect} from 'react-redux'

class ShapeContainer extends Component {

    constructor(props) {
        super(props)
        this.state={radius:''}
    }

    handleCreateShape = (e) => {
        e.preventDefault()
        // this.props.createShape(this.state.radius)
        this.props.createShape(Math.random()*100)
        this.setState({radius:''})
    }

    handleFormChange = (e) => {
        this.setState({radius:e.target.value})
    }

    render() {
        return (
            <div>
                <form onSubmit={(e)=>{this.handleCreateShape(e)}}>
                    <input type="text" value={this.state.radius} onChange={(e)=>this.handleFormChange(e)}/>
                </form>

                {this.props.shapes.map((currentShape, i) => {
                    const styles = {
                        width: currentShape.radius*2,
                        height: currentShape.radius*2,
                        borderRadius: '50%',
                        borderWidth: 1,
                        borderColor: 'black',
                        borderStyle: 'solid',
                        backgroundColor: 'hsl('+ Math.floor(Math.random() * 360).toString(16)+',80%,70%)',
                        position: 'absolute',
                        left: currentShape.x,
                        top: currentShape.y
                    }
                    return <div style={styles} key={i} />
                })}
            </div>
        )
    }
}


// If you mutate state, these functions do not get called. Do not mutate
const mapStateToProps = (state) => ({
    shapes: state
})

const mapDispatchToProps = (dispatch) => ({
    createShape: (shapeSize) => dispatch({type: 'ADD_SHAPE', radius: shapeSize}),
})

// The connect function allows the container to reference the store created by Provider
export default connect(mapStateToProps, mapDispatchToProps)(ShapeContainer)