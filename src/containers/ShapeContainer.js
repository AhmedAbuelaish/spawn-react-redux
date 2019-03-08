import React, { Component } from 'react'
import { connect } from 'react-redux'

// The shape container renders the grandParent shapes as the state changes
// All this container should care about is the radius of the shapes, and their coordinates
// Creating the shapes in the state should be done somewhere else

// Suggestion:
// For each iteration of shape creation, pass through the render function below.
// At the same time, use that same array of rendered shapes for the next iteration

class ShapeContainer extends Component {
	constructor(props) {
		super(props)
		this.state = { radius: '' }
	}

	componentDidMount() {
        // const int = setInterval(() => {this.handleCreateShape()}, 1000)
        this.handleCreateShape()
    }

	handleCreateShape = () => {
		this.props.createNodes()
	}

    // handleFormChange = (e) => {
        // this.setState({value: e.target.value})
    // }

    // handleFormSubmission = (e) => {
    //     e.preventDefault()
        // this.props.settings(this.state.value)
        // this.setState({value:''})
    // }

    render() {
        return (
            <div>
                {/* <form onSubmit={(e)=>{this.handleFormSubmission(e)}}>
                    <input type="text" value={this.state.value} onChange={(e)=>this.handleFormChange(e)}/>
                </form> */}

				{this.props.nodes.map((currentShape, i) => {
					const styles = {
						width: currentShape.radius * 2,
						height: currentShape.radius * 2,
						left: currentShape.coordX,
						top: currentShape.coordY,
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

const mapStateToProps = state => ({
    settings: state.settings,
    nodes: state.nodes,
    leaves: state.leaves
})

const mapDispatchToProps = dispatch => ({
	createNodes: () => dispatch({ type: 'CREATE_NODES' })
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ShapeContainer)
