import React, { Component } from 'react'
import { connect } from 'react-redux'

class ScoreCounter extends Component {
  render() {
    return (
        <div className='score'>
        {this.props.nodes.length}
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
