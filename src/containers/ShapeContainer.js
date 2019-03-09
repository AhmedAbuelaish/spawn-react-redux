import React, { Component } from 'react'
import { connect } from 'react-redux'

class ShapeContainer extends Component {
	constructor(props) {
		super(props)
		this.state = { radius: '' }
	}

	componentDidMount() {
		this.handlePlantSeed()
		const intId = setInterval(() => {this.handleCreateShape()}, 50)
		setTimeout(()=>{clearInterval(intId)},10000)
		// this.handleCreateShape()
		
	}
	
	handlePlantSeed = () => {
		this.props.createRoot()
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
						// borderWidth: 1,
						// borderColor: 'black',
                        // borderStyle: 'solid',
                        backgroundColor: 'rgba(210, 77, 87, 0.5)',
						position: 'absolute',
						transform: `translate(-${currentShape.radius}px, -${currentShape.radius}px)`
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
	createRoot: () => dispatch({ type: 'CREATE_ROOT'}),
	createNodes: () => dispatch({ type: 'CREATE_NODES' })
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ShapeContainer)
