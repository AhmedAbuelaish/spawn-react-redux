import React, { Component } from 'react'
import { connect } from 'react-redux'

class ShapeContainer extends Component {
	componentDidMount() {
		this.handlePlantSeed()
		requestAnimationFrame(this.createAnimationLoop)
	}

	createAnimationLoop = (timestamp) => {
		this.props.renderNodes()
		requestAnimationFrame(this.createAnimationLoop)
	}

	handlePlantSeed = () => {
		this.props.createRoot()
	}

	handleCreateShape = () => {
		this.props.renderNodes()
	}

	render() {
		// console.log('zoom', this.props.stage.zoom)
		return (
			<div
				style={{
					position: 'relative',
					left: 0,
					top: 0,
					width: this.props.viewportDims.width,
					height: this.props.viewportDims.height
				}}>
				{this.props.nodes.map((currentShape, i) => {
					const styles = {
						width: currentShape.radius * 2,
						height: currentShape.radius * 2,
						left: currentShape.coordX,
						top: currentShape.coordY,
						borderRadius: '50%',
						background: `radial-gradient(rgba(${currentShape.color}, 0.1),rgba(${currentShape.color}, 0.2) , rgba(${
							currentShape.color
						}, 0.8))`,
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
	renderNodes: () => dispatch({ type: 'RENDER_NODES' })
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ShapeContainer)
