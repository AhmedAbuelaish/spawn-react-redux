import React, { Component } from 'react'

var angles = require('../utils/angleFunctions')

class RangeHandlebars extends Component {
	render() {
		let { radius, angle } = this.props
		let overhang = 1
		let handleWidth = parseFloat(radius) * overhang
		let radAngle = angles.degToRad(parseFloat(angle))
		console.log('handleWidth', handleWidth)
		let styles = {
			position: 'absolute',
			height: '4px',
			backgroundColor: 'white',
			borderRadius: '5px',
			width: handleWidth,
			top: `${1 * radius + 0.5 * handleWidth * Math.sin(radAngle)}px`,
			left: `${0.5 * radius + 0.5 * handleWidth * Math.cos(radAngle)}px`,
			transform: `rotate(${angle}deg)`
		}
		return <div style={styles} />
	}
}

export default RangeHandlebars
