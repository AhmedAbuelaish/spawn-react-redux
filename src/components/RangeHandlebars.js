import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'
var angles = require('../utils/angleFunctions')

class RangeHandlebars extends Component {
	constructor(props) {
		super(props)
		this.state = {
			hover: false
		}
	}
	toggleHover = () => {
		this.setState({ hover: !this.state.hover })
	}
	render() {
		let { radius, angle } = this.props
		let handleWidth = parseFloat(radius)
		let handleHeight = 3
		let radAngle = angles.degToRad(parseFloat(angle))
		let backgroundProps, iconColor
		let componentClasses = ['handlebars']
		if (this.state.hover) {
			componentClasses += 'hover'
		}
		let styles = {
			position: 'absolute',
			height: `${handleHeight}px`,
			width: handleWidth,
			top: `${1 * radius + 0.5 * handleWidth * Math.sin(radAngle)}px`,
			left: `${0.5 * radius + 0.5 * handleWidth * Math.cos(radAngle) - handleHeight / 2}px`,
			transform: `rotate(${angle}deg)`,
			textAlign: 'end',
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'flex-end',
			paddingRight: '5px',
		}
		return (
			<div style={styles} className={componentClasses} onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>
				<FontAwesomeIcon icon={faCaretUp} />
				<FontAwesomeIcon icon={faCaretDown} />
			</div>
		)
	}
}

export default RangeHandlebars
