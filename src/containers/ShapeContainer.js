import React, { Component } from 'react'
import { connect } from 'react-redux'

class ShapeContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			animating: false
		}
	}

	componentDidMount() {
		this.props.createRoot()
		// this.frame = requestAnimationFrame(this.loopCreatAnimation)
	}

	loopCreatAnimation = timestamp => {
		if (this.props.leaves.length > 0) {
			this.props.createNodes()
			this.frame = requestAnimationFrame(this.loopCreatAnimation)
		} else {
			cancelAnimationFrame(this.frame)
			this.state.animating = false
			console.log('end of animation')
		}
	}

	toggleAnimation = () => {
		if (this.state.animating) {
			cancelAnimationFrame(this.frame)
			console.log('cancelled animation')
			this.state.animating = false
		}
		this.props.reset()
		this.props.createRoot()
		this.state.animating = true
		this.frame = requestAnimationFrame(this.loopCreatAnimation)
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
					return <div className='cell' style={styles} key={i} onClick={this.toggleAnimation} />
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
	createNodes: () => dispatch({ type: 'CREATE_NODES' }),
	reset: () => dispatch({ type: 'RESET' })
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ShapeContainer)
