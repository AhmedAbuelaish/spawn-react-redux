import React, { Component } from 'react'
import { connect } from 'react-redux'

class ObstacleContainer extends Component {

	render() {
		console.log('zoom', this.props.stage.zoom)
		return (
			<div
				style={{
					position: 'relative',
					left: 0,
					top: 0,
					width: this.props.viewportDims.width,
					height: this.props.viewportDims.height
				}}>
				{this.props.nodes.map((currentObstacle, i) => {
					const styles = {
						width: currentObstacle.radius * 2,
						height: currentObstacle.radius * 2,
						left: currentObstacle.coordX,
						top: currentObstacle.coordY,
						borderRadius: '50%',
						background: 'radial-gradient(rgba(210, 77, 87, 0.1),rgba(210, 77, 87, 0.2) , rgba(210, 77, 87, 0.8))',
						position: 'absolute',
						transform: `translate(-${currentObstacle.radius}px, -${currentObstacle.radius}px)`
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
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ObstacleContainer)
