import React, { Component } from 'react'
import { connect } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFlask, faBullseye, faCaretDown } from '@fortawesome/free-solid-svg-icons'

class ModeSelector extends Component {
	handleclick = () => {
		this.props.changeGameMode()
		this.props.resetRoot()
	}

	render() {
		var icon,icon2
    this.props.gameMode === 'breakOut' ? (icon = faFlask) : ([icon,icon2] = [faBullseye,faCaretDown])
    

		return (
			<div className='gameModeButton' onClick={this.handleclick}>
				<FontAwesomeIcon icon={icon} />
        {/* <FontAwesomeIcon icon={icon2}/> */}
			</div>
		)
	}
}

const mapStateToProps = state => ({
	gameMode: state.gameMode
})

const mapDispatchToProps = dispatch => ({
	changeGameMode: () => dispatch({ type: 'TOGGLE_GAME_MODE' }),
	resetRoot: () => dispatch({ type: 'RESET_ROOT' }),
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ModeSelector)
