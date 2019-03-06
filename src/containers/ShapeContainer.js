import React, {Component} from 'react'
import {connect} from 'react-redux'

class ShapeContainer extends Component {

    constructor(props) {
        super(props)
        this.state={radius:100}
    }

    handleCreateShape = (e) => {
        e.preventDefault()
        this.props.createShape(this.state.radius)
    }

    render() {
        return (
            <div>
                <form onSubmit={(e)=>{this.handleCreateShape(e)}}>
                    <input type="text" value={this.state.radius} onChange={(e)=>this.handleCreateShape(e)}/>
                    <input type="submit" value="+" disabled={!this.state.radius}/>
                </form>
            </div>
        )
    }
}


// If you mutate state, these functions do not get called. Do not mutate
const mapStateToProps = (state) => ({
    // todos is a prop, equivalent to <ShapeContainer todos="..." />
    // todos: state.todos
})

const mapDispatchToProps = (dispatch) => ({
    // equivalent to <ShapeContainer createShape={(todoText) => dispatch({type: 'ADD_TODO', text: todoText})} />
    createShape: (shapeSize) => dispatch({type: 'ADD_SHAPE', radius: shapeSize}),
    // toggleDone: (todoIndex) => dispatch({type: 'TOGGLE_DONE', index: todoIndex})
})

// The connect function allows the container to reference the store created by Provider
export default connect(mapStateToProps, mapDispatchToProps)(ShapeContainer)