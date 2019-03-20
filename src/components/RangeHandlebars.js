import React, { Component } from 'react'

var angles = require('../utils/angleFunctions')

class RangeHandlebars extends Component {
	constructor(props) {
		super(props)
		this.state = {
			hover: false
		}
	}
	toggleHover = () => {
		this.setState({hover: !this.state.hover })
	}
	render() {
		let { radius, angle } = this.props
		let handleWidth = parseFloat(radius)
		let radAngle = angles.degToRad(parseFloat(angle))
		let borderProps
		console.log('handleWidth', handleWidth)
		if (this.state.hover) {
			borderProps = '2px solid rgba(256,256,256,0.5)'
		} else {
			borderProps = '0px solid rgba(256,256,256,0)'
		}
		let styles = {
			position: 'absolute',
			height: '2px',
			backgroundImage: 'linear-gradient(90deg,rgba(256,256,256,0),rgba(256,256,256,0.05),rgba(256,256,256,0.8))',
			borderRadius: '5px',
			width: handleWidth,
			top: `${1 * radius + 0.5 * handleWidth * Math.sin(radAngle)}px`,
			left: `${0.5 * radius + 0.5 * handleWidth * Math.cos(radAngle)}px`,
			transform: `rotate(${angle}deg)`,
			border: borderProps
		}
		return <div style={styles} className='handlebars' onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover} />
	}
}

export default RangeHandlebars
