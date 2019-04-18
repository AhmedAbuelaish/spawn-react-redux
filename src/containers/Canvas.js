import React, { Component } from 'react'
import { connect } from 'react-redux'

class Canvas extends Component {
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
		this.props.resetRoot()
	}

	handleCreateShape = () => {
		this.props.createNodes()
	}

	// render() {
	// 	const viewBox = [
	// 		0,
	// 		0,
	// 		window.innerWidth,
	// 		window.innerHeight
	// 	]
	// 	const style = {
	// 		border: '1px solid black'
	// 	}
	// 	return (
	// 		<svg id='spawn-canvas' style={style} viewBox={viewBox}>
	// 			<circle cx={150} cy={500} r={50} />
	// 		</svg>
	// 	)
	// }
	render() {
		console.log('zoom', this.props.stage.zoom)
		const viewBox = [window.innerWidth / 2, 100 - window.innerHeight, window.innerWidth, window.innerHeight]
		const styles = {
			position: 'relative',
			left: 0,
			top: 0,
			width: window.innerWidth,
			height: window.innerHeight,
			transform: `scale(${this.props.stage.zoom})`
		}
		return (
			<svg className='stage' id='spawn-canvas' style={styles}>
				{this.props.nodes.map((currentShape, i) => {
					const styles = {
						// fill: 'radial-gradient(rgba(210, 77, 87, 0.1),rgba(210, 77, 87, 0.2) , rgba(210, 77, 87, 0.8))'
					}
					return (
						<React.Fragment>
							<defs>
								<radialGradient id='exampleGradient'>
									<stop offset='10%' stop-color='gold' />
									<stop offset='95%' stop-color='green' />
								</radialGradient>
							</defs>
							<circle cx={currentShape.coordX} cy={currentShape.coordY} r={currentShape.radius} />
						</React.Fragment>
					)
				})}
			</svg>
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
	createNodes: () => dispatch({ type: 'CREATE_NODES' })
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Canvas)
