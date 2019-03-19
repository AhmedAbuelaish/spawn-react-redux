import React, { Component } from 'react'

var angles = require('../utils/angleFunctions')

class RangeHandlebars extends Component {
	render() {
        let { radius, angle } = this.props
		let handleWidth = parseFloat(radius) * 1
		let radAngle = angles.degToRad(parseFloat(angle))
		console.log('handleWidth', handleWidth)
		let styles = {
			position: 'absolute',
			height: '5px',
			width: handleWidth,
			top: `${(1*radius)+(0.5*handleWidth * Math.sin(radAngle))}px`,
			left: `${(0.5*radius)+(0.5*handleWidth * Math.cos(radAngle))}px`,
			// tranform: `translate(100)}`,
			backgroundColor: 'white',
			borderRadius: '5px',
			transform: `rotate(${angle}deg)`
		}
		return <div style={styles} />
	}
}

export default RangeHandlebars
