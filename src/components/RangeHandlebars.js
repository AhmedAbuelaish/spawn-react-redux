import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'
var arrays = require('../utils/arrayFunctions')
var angles = require('../utils/angleFunctions')

class RangeHandlebars extends Component {
	constructor(props) {
		super(props)
		// Initial state based on props and new parameters
		this.state = {
			angleRange: this.props.settings.angleRange,
			radius: parseFloat(this.props.radius),
			handle: {
				height: 3
			},
			hover: false,
			dragging: false,
			id: this.props.id
		}
		// Initialize deg and rad angles)
		// hardcoded center based on bottom left controller + 10px padding
		// --- todo: make this flexible and based on position of parent getBoundingClientRect()
		// calc min max based on the two adjacent handles
		this.state = {
			...this.state,
			center: {
				cx: 10 + this.props.radius,
				cy: -10 + this.props.viewportDims.height - this.props.radius
			},
			angle: {
				deg: this.props.angle,
				rad: angles.degToRad(parseFloat(this.props.angle))
			},
			minMax: this.calcMinMax()
		}
		// Calculate position of each handlebar
		this.state = {
			...this.state,
			pos: {
				x: this.state.radius,
				y: this.state.radius
			}
		}
		// Bind mouse event functions
		this.onMouseDown = this.onMouseDown.bind(this)
		this.onMouseUp = this.onMouseUp.bind(this)
		this.onMouseMove = this.onMouseMove.bind(this)
		console.log(this.state)
	}
	calcMinMax = () => {
		let flatArr = arrays.flatten(this.state.angleRange)
		let currentIndex = 2 * this.state.id[0] + this.state.id[1]
		let maxIndex = flatArr.length - 1
		let prevIndex = currentIndex === 0 ? maxIndex : currentIndex - 1
		let nextIndex = currentIndex === maxIndex ? 0 : currentIndex + 1
		let pad = 5
		return {
			min: angles.degToRad(flatArr[prevIndex] + pad),
			max: angles.degToRad(flatArr[nextIndex] - pad)
		}
	}
	componentDidUpdate(props, state) {
		// console.log('update')
		if (this.state.dragging && !state.dragging) {
			document.addEventListener('mousemove', this.onMouseMove)
			document.addEventListener('mouseup', this.onMouseUp)
		} else if (!this.state.dragging && state.dragging) {
			document.removeEventListener('mousemove', this.onMouseMove)
			document.removeEventListener('mouseup', this.onMouseUp)
		}
	}
	toggleHover = () => {
		this.setState({ hover: !this.state.hover })
	}
	// calculate relative position to the mouse and set dragging=true
	onMouseDown = e => {
		// console.log('down')
		// console.log(e)
		if (e.button !== 0) return
		this.setState({
			dragging: true
		})
		e.stopPropagation()
		e.preventDefault()
	}

	onMouseUp = e => {
		// console.log('up')
		this.setState({ dragging: false })
		e.stopPropagation()
		e.preventDefault()
		// todo: trigger dispatch action here with settings updated with new angleRange
	}

	onMouseMove = e => {
		// console.log('move')
		console.log(e)
		if (!this.state.dragging) return
		let newAngleInRad = Math.atan((e.pageY - this.state.center.cy) / (e.pageX - this.state.center.cx))
		if (newAngleInRad < 0) {
			newAngleInRad = 2 * Math.PI + newAngleInRad
		}
		this.setState({
			angle: {
				deg: angles.radToDeg(newAngleInRad),
				rad: newAngleInRad
			}
		})
		console.log('angle', this.state.angle)
		e.stopPropagation()
		e.preventDefault()
	}

	render() {
		let componentClasses = ['handlebars']
		if (this.state.hover) {
			componentClasses += 'hover'
		}
		let styles = {
			position: 'absolute',
			height: `${this.state.handle.height}px`,
			width: this.state.radius,
			left: `${this.state.pos.x}px`,
			top: `${this.state.pos.y}px`,
			transform: `rotate(${this.state.angle.deg}deg)`,
			transformOrigin: `0px`,
			borderRadius: '5px',
			textAlign: 'end',
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'flex-end',
			paddingRight: '5px'
		}
		return (
			<div
				style={styles}
				className={componentClasses}
				onMouseEnter={this.toggleHover}
				onMouseLeave={this.toggleHover}
				onMouseDown={this.onMouseDown}>
				<FontAwesomeIcon icon={faCaretUp} />
				<FontAwesomeIcon icon={faCaretDown} />
			</div>
		)
	}
}

const mapStateToProps = state => ({
	settings: state.settings,
	viewportDims: state.viewportDims
})

const mapDispatchToProps = dispatch => ({
	updateSettings: settingsObj => dispatch({ type: 'UPDATE_SETTINGS', settings: settingsObj })
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RangeHandlebars)
