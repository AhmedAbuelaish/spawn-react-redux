import React, { Component } from 'react'
import { connect } from 'react-redux'

class ScoreCounter extends Component {
  render() {
    return (
        <div className='score'>
        Score: {this.props.nodes.length-1}
      </div>
    )
  }
}


const mapStateToProps = state => ({
	nodes: state.nodes,
})

const mapDispatchToProps = dispatch => ({
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ScoreCounter)
