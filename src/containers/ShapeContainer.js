import React, { Component } from 'react'
import { connect } from 'react-redux'

class ShapeContainer extends Component {
	constructor(props) {
		super(props)
		// this.state = ''
	}

	componentDidMount() {
		this.handlePlantSeed()
		const intId = setInterval(() => {
			console.log('launched')
			this.handleCreateShape()
		}, 1000)
		setTimeout(() => {
			clearInterval(intId)
		}, 5000)
	}

	handlePlantSeed = () => {
		this.props.createRoot()
	}

	handleCreateShape = () => {
		this.props.createNodes()
	}

	render() {
		return (
			<div>
				{/* {this.props.nodes.map((currentShape, i) => {
					const styles = {
						width: currentShape.radius * 2,
						height: currentShape.radius * 2,
						left: currentShape.coordX,
						top: currentShape.coordY,
						borderRadius: '50%',
						// borderWidth: 1,
						// borderColor: 'black',
						// borderStyle: 'solid',
						background: 'radial-gradient(rgba(210, 77, 87, 0.1),rgba(210, 77, 87, 0.2) , rgba(210, 77, 87, 0.8))',
						// backgroundColor: 'rgba(210, 77, 87, 0.5)',
						position: 'absolute',
						transform: `translate(-${currentShape.radius}px, -${currentShape.radius}px)`
					}
					return <div style={styles} key={i} />
				})} */}
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
	createRoot: () => dispatch({ type: 'CREATE_ROOT' }),
	createNodes: () => dispatch({ type: 'CREATE_NODES' })
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ShapeContainer)
