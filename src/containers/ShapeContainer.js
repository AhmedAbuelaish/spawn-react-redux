import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createFragmentedArray, distributeParentValue } from '../utils/fragment'
import calcNewZoom from '../utils/stageSetup'
import doLeavesIntersectObstacles from '../utils/collisions'
import { flatten } from '../utils/arrayFunctions'
import worker from '../utils/worker.js'
import WebWorker from '../utils/workerSetup'

class ShapeContainer extends Component {
	constructor(props) {
		super(props)
		this.handleClick = this.handleClick.bind(this)
		this.startWebWorker = this.startWebWorker.bind(this)
	}

	componentDidMount() {
		this.props.createRoot()
		requestAnimationFrame(this.createAnimationLoop)
		this.worker = new WebWorker(worker)

	}

	createAnimationLoop = timestamp => {
		this.props.renderNodes()
		// console.log('frame')
		requestAnimationFrame(this.createAnimationLoop)
	}

	startWebWorker = () => {
		console.log('starting webworker')
		this.worker.postMessage([this.props.leaves, this.props.settings, this.props.obstacles])
		this.worker.onmessage = (event) => {
			console.log('recieved message from worker')
			console.log(event)
			this.props.createLeaves(event.data[0], event.data[1])
		}
	}

	createProcessingLoop = () => {
		let processedLeaves = flatten(this.props.leaves)
		for (var i = 0; i < 5; i++) {
			// console.log('start run number:', i)
			// console.log(JSON.stringify(processedLeaves.slice()))
			console.log(processedLeaves.slice().length)
			if (processedLeaves.slice().length === 0) {
				break
			} else {
				let leafIndex = Math.floor(Math.random() * processedLeaves.length)
				let tempNodesArr = distributeParentValue(processedLeaves[leafIndex], this.props.settings)
				tempNodesArr = doLeavesIntersectObstacles(tempNodesArr, this.props.obstacles)
				processedLeaves[leafIndex] = tempNodesArr
				processedLeaves = flatten(processedLeaves)
				this.props.createLeaves(tempNodesArr, processedLeaves)
				// console.log('complete run number:', i)
			}
		}
	}

	handleClick = () => {
		this.startWebWorker()
		// this.createProcessingLoop()
	}

	render() {
		// console.log('zoom', this.props.stage.zoom)
		return (
			<div
				className='cells'
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
					return <div style={styles} key={i} onClick={this.handleClick} />
				})}
			</div>
		)
	}
}

const mapStateToProps = state => ({
	viewportDims: state.viewportDims,
	settings: state.settings,
	nodes: state.nodes,
	tempNodes: state.tempNodes,
	leaves: state.leaves,
	stage: state.stage,
	obstacles: state.obstacles
})

const mapDispatchToProps = dispatch => ({
	createRoot: () => dispatch({ type: 'CREATE_ROOT' }),
	renderNodes: () => dispatch({ type: 'RENDER_NODES' }),
	createLeaves: (tempNodeArr, newLeavesArr) =>
		dispatch({ type: 'CREATE_LEAVES', singleTempNodes: tempNodeArr, newLeaves: newLeavesArr })
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ShapeContainer)
