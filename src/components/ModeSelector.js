import React, { Component } from 'react'
import { connect } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFlask, faBullseye } from '@fortawesome/free-solid-svg-icons'

class ModeSelector extends Component {
handleclick = () =>{
    this.props.changeGameMode()
}

  render() {
      var icon
    (this.props.gameMode=='targetPractice')?icon=faFlask:icon=faBullseye
    return (
      <div className="gameModeButton" onClick={this.handleclick}>
        <FontAwesomeIcon icon={icon} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
	gameMode: state.gameMode
})

const mapDispatchToProps = dispatch => ({
	changeGameMode: () => dispatch({ type: 'TOGGLE_GAME_MODE' })
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ModeSelector)
