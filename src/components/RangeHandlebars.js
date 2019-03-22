import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { totalizeAngleRange, angleSpread, degToRad, radToDeg } from '../utils/angleFunctions'

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
			id: this.props.id,
			minMax: this.props.minMax
		}
		// Initialize deg and rad angles
		// hardcoded center based on bottom left controller + 10px padding
		// --- todo: make this flexible and based on position of parent getBoundingClientRect()
		this.state = {
			...this.state,
			center: {
				cx: 10 + parseFloat(this.props.radius),
				cy: -10 + this.props.viewportDims.height - this.props.radius
			},
			angle: this.fromRangeToAngle()
		}
		// Calculate position of each handlebar
		this.state = {
			...this.state,
			pos: {
				x: parseFloat(this.state.radius),
				y: parseFloat(this.state.radius)
			}
		}
		// Bind mouse event functions
		this.onMouseDown = this.onMouseDown.bind(this)
		this.onMouseUp = this.onMouseUp.bind(this)
		this.onMouseMove = this.onMouseMove.bind(this)
		this.fromRangeToAngle = this.fromRangeToAngle.bind(this)
		this.fromAngleToRange = this.fromAngleToRange.bind(this)
		this.updateStates = this.updateStates.bind(this)
	}

	componentDidUpdate(props, state) {
		if (this.state.dragging && !state.dragging) {
			document.addEventListener('mousemove', this.onMouseMove)
			document.addEventListener('mouseup', this.onMouseUp)
		} else if (!this.state.dragging && state.dragging) {
			document.removeEventListener('mousemove', this.onMouseMove)
			document.removeEventListener('mouseup', this.onMouseUp)
		}
	}

	fromRangeToAngle = () => {
		return {
			deg: parseFloat(this.props.angle),
			rad: degToRad(parseFloat(this.props.angle))
		}
	}

	fromAngleToRange = () => {
		let newRanges = this.state.angleRange
		newRanges[parseFloat(this.state.id[0])][parseFloat(this.state.id[1])] = this.state.angle.deg
		this.setState({ angleRange: newRanges })
	}

	toggleHover = () => {
		this.setState({ hover: !this.state.hover })
	}

	// calculate relative position to the mouse and set dragging=true
	onMouseDown = e => {
		if (e.button !== 0) return
		this.setState({
			dragging: true
		})
		e.stopPropagation()
		e.preventDefault()
	}

	onMouseUp = e => {
		this.setState({ dragging: false, mouseQuad: 0 })
		e.stopPropagation()
		e.preventDefault()
		// todo: trigger dispatch action here with settings updated with new angleRange
	}

	onMouseMove = e => {
		if (!this.state.dragging) return
		let deltaY = e.pageY - this.state.center.cy
		let deltaX = e.pageX - this.state.center.cx
		let newAngleInRad = Math.atan(deltaY / deltaX)
		if (deltaX < 0 && deltaY < 0) {
			// Top left Quadrant
			newAngleInRad -= Math.PI
		} else if (deltaX < 0 && deltaY > 0) {
			// Bottom left Quadrant
			newAngleInRad += Math.PI
		}
		if (newAngleInRad <= this.state.minMax.min) {
			newAngleInRad = this.state.minMax.min
		}
		if (newAngleInRad >= this.state.minMax.max) {
			newAngleInRad = this.state.minMax.max
		}
		if (Math.abs(this.state.angle.rad - newAngleInRad) > Math.PI / 4) {
			newAngleInRad = this.state.angle.rad
		}
		this.updateStates(newAngleInRad)
		e.stopPropagation()
		e.preventDefault()
	}

	updateStates = ang => {
		this.setState({
			angle: {
				deg: radToDeg(ang),
				rad: ang
			}
		})
		this.fromAngleToRange()
		this.props.handleChange(this.state.angleRange, 'angleRange', this.state.id)
		this.setState({ minMax: this.props.minMax })
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

const mapDispatchToProps = dispatch => ({})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RangeHandlebars)
