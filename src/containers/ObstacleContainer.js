import React, { Component } from 'react'
import { connect } from 'react-redux'

class ObstacleContainer extends Component {

	render() {
		// console.log('zoom', this.props.stage.zoom)
		return (
			<div
				style={{
					position: 'absolute',
					left: 0,
					top: 0,
					width: this.props.viewportDims.width,
					height: this.props.viewportDims.height
				}}>
				{this.props.obstacles.map((currentObstacle, i) => {
					const styles = {
						width: currentObstacle[2].x-currentObstacle[0].x,
						height: currentObstacle[2].y-currentObstacle[0].y,
						left: currentObstacle[0].x,
						top: currentObstacle[0].y,
						background: 'black',
						position: 'absolute'
					}
					return <div style={styles} key={i} />
				})}
				{this.props.targets.map((currentTarget, i) => {
					const styles = {
						width: currentTarget[2].x-currentTarget[0].x,
						height: currentTarget[2].y-currentTarget[0].y,
						left: currentTarget[0].x,
						top: currentTarget[0].y,
						background: 'rgba(210,50,50,0.7)',
						position: 'absolute'
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
	obstacles: state.obstacles,
	targets: state.targets,
	stage: state.stage
})

const mapDispatchToProps = dispatch => ({
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ObstacleContainer)
