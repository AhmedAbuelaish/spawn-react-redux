import React, { Component } from 'react'
import { connect } from 'react-redux'

class ScoreCounter extends Component {
	handleClick = () => {
		this.props.getWinningPath()
	}

	render() {
		return (
			<div className='score' onClick={this.handleClick}>
				Score: {this.props.nodes.length - 1}
			</div>
		)
	}
}

const mapStateToProps = state => ({
	nodes: state.nodes
})

const mapDispatchToProps = dispatch => ({
	getWinningPath: () => dispatch({ type: 'GET_WINNING_PATH' })
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ScoreCounter)
