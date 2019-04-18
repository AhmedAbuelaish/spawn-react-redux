import React, { Component } from 'react'
import { connect } from 'react-redux'

class ShapeContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			animating: false,
			burstIntensity: 10
		}
	}

	componentDidMount() {
		this.props.resetRoot()
	}

	loopCreatAnimation = timestamp => {
		if (this.props.leaves.length > 0 && this.state.burstIntensity > 0) {
			this.props.createNodes()
			console.log(this.state.burstIntensity)
			this.setState({ burstIntensity: this.state.burstIntensity - 1 })
			this.frame = requestAnimationFrame(this.loopCreatAnimation)
		} else {
			cancelAnimationFrame(this.frame)
			this.setState({ animating: false })
			console.log('end of animation')
		}
	}

	toggleAnimation = id => {
		if (this.state.animating) {
			cancelAnimationFrame(this.frame)
			console.log('cancelled animation')
			this.setState({ animating: false })
		}
		this.props.createNewRoot(id)
		this.setState({ animating: true, burstIntensity: 5 })
		this.frame = requestAnimationFrame(this.loopCreatAnimation)
	}

	render() {
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
					return <div className='cell' style={styles} key={i} onClick={() => this.toggleAnimation(currentShape.id)} />
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
	resetRoot: () => dispatch({ type: 'RESET_ROOT' }),
	createNodes: () => dispatch({ type: 'CREATE_NODES' }),
	createNewRoot: currId => dispatch({ type: 'NEW_ROOT', id: currId })
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ShapeContainer)
