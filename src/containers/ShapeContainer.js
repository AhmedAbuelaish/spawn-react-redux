import React, { Component } from 'react'
import { connect } from 'react-redux'

class ShapeContainer extends Component {
	componentDidMount() {
		this.handlePlantSeed()
		const intId = setInterval(() => {
			this.handleCreateShape()
		}, 50)
		setTimeout(() => {
			console.log('cleared, final state:', this.props.nodes)
			clearInterval(intId)
		}, 1000)
	}

	handlePlantSeed = () => {
		this.props.createRoot()
	}

	handleCreateShape = () => {
		this.props.createNodes()
	}

	render() {
		console.log('zoom', this.props.stage.zoom)
		return (
			<div
				className='stage'
				style={{
					position: 'relative',
					left: 0,
					top: 0,
					width: this.props.viewportDims.width,
					height: this.props.viewportDims.height,
					transform: `scale(${this.props.stage.zoom})`
				}}>
				{this.props.nodes.map((currentShape, i) => {
					const styles = {
						width: currentShape.radius * 2,
						height: currentShape.radius * 2,
						left: currentShape.coordX,
						top: currentShape.coordY,
						borderRadius: '50%',
						background: 'radial-gradient(rgba(210, 77, 87, 0.1),rgba(210, 77, 87, 0.2) , rgba(210, 77, 87, 0.8))',
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
	viewportDims: state.viewportDims,
	settings: state.settings,
	nodes: state.nodes,
	leaves: state.leaves,
	stage: state.stage
})

const mapDispatchToProps = dispatch => ({
	createRoot: () => dispatch({ type: 'CREATE_ROOT' }),
	createNodes: () => dispatch({ type: 'CREATE_NODES' })
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ShapeContainer)
