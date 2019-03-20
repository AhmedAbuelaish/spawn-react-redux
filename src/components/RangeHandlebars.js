import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'
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
			rel: null // position relative to the cursor
		}
		// Initialize deg and rad angles
		this.state = {
			...this.state,
			center: { x: this.state.radius, y: this.state.radius },
			angle: {
				deg: this.props.angle,
				rad: angles.degToRad(parseFloat(this.props.angle))
			}
		}
		// Calculate position of each handlebar
		this.state = {
			...this.state,
			pos: {
				x:
					0.5 * this.state.radius +
					0.5 * this.state.radius * Math.cos(this.state.angle.rad) -
					this.state.handle.height / 2,
				y: 1 * this.state.radius + 0.5 * this.state.radius * Math.sin(this.state.angle.rad)
			}
		}
		// Bind mouse event functions
		this.onMouseDown = this.onMouseDown.bind(this)
		this.onMouseUp = this.onMouseUp.bind(this)
		this.onMouseMove = this.onMouseMove.bind(this)
	}
	componentDidUpdate(props, state) {
		console.log('update')
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
		console.log('down')
		if (e.button !== 0) return
		this.setState({
			dragging: true,
			rel: {
				x: e.pageX - this.state.pos.x,
				y: e.pageY - this.state.pos.y
			}
		})
		e.stopPropagation()
		e.preventDefault()
		console.log('dragging', this.state.dragging)
	}

	onMouseUp = e => {
		console.log('up')
		this.setState({ dragging: false })
		e.stopPropagation()
		e.preventDefault()
		console.log('dragging', this.state.dragging)
	}

	onMouseMove = e => {
		console.log('move')
		if (!this.state.dragging) return
		this.setState({
			pos: {
				x: e.pageX - this.state.rel.x,
				y: e.pageY - this.state.rel.y
			}
		})
		console.log('pageX',e.pageX,'pageY',e.pageY)
		e.stopPropagation()
		e.preventDefault()
		console.log('dragging', this.state.dragging)
	}

	render() {
		// let { radius, angle } = this.props
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
	settings: state.settings
})

const mapDispatchToProps = dispatch => ({
	updateSettings: settingsObj => dispatch({ type: 'UPDATE_SETTINGS', settings: settingsObj })
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RangeHandlebars)
