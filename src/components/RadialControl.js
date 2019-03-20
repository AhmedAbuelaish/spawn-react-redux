import React, { Component } from 'react'
import { connect } from 'react-redux'
import PieChart from 'react-minimal-pie-chart'
import RangeHandlebars from './RangeHandlebars'

var arrays = require('../utils/arrayFunctions')

class RadialControl extends Component {
	constructor(props) {
		super(props)
    this.state = this.props.settings.angleRange
    
	}
	getInitialState() {
		return {
			pos: this.props.initialPos,
			dragging: false,
			rel: null // position relative to the cursor
		}
  }
  
	handleFormChange = (value, targetProp, i) => {
		console.log('input:', value, 'i', i)
		if (i === undefined) {
			this.setState({ [targetProp]: value })
		} else if (i === 0) {
			this.setState({ [targetProp]: [[value, this.state.angleRange[0][1]]] })
			console.log(this.state.angleRange, 'i', i)
		} else if (i === 1) {
			this.setState({ [targetProp]: [[this.state.angleRange[0][0], value]] })
			console.log(this.state.angleRange, 'i', i)
		}
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

	// calculate relative position to the mouse and set dragging=true
	onMouseDown(e) {
		console.log(this.state)
		if (e.button !== 0) return
		var computedStyle = window.getComputedStyle(this.getDOMNode())
		var pos = { top: parseInt(computedStyle.top), left: parseInt(computedStyle.left) }
		this.setState({
			dragging: true,
			rel: {
				x: e.pageX - pos.left,
				y: e.pageY - pos.top
			}
		})
		e.stopPropagation()
		e.preventDefault()
	}

	onMouseUp(e) {
		this.setState({ dragging: false })
		e.stopPropagation()
		e.preventDefault()
	}

	onMouseMove(e) {
		if (!this.state.dragging) return
		this.setState({
			pos: {
				x: e.pageX - this.state.rel.x,
				y: e.pageY - this.state.rel.y
			}
		})
		e.stopPropagation()
		e.preventDefault()
	}

	render() {
		let angleRanges = this.state
		let initAngle = Math.min(...angleRanges[0])
		let controllerRadius = 150
		return (
			<div style={{ position: 'relative' }}>
				{angleRanges.map((currentRange, i) => {
					return (
						<div>
							<RangeHandlebars radius={controllerRadius} angle={parseFloat(currentRange[0]) % 360} key={i + '0'} onMouseDown={this.onMouseDown}/>
							<RangeHandlebars radius={controllerRadius} angle={parseFloat(currentRange[1]) % 360} key={i + '1'} />
						</div>
					)
				})}
				<PieChart
					data={arrays.flatten(
						angleRanges.map((currentRange, i, allRanges) => {
							let nextRangeStart = 0
							if (i >= allRanges.length - 1) {
								nextRangeStart = initAngle + 360
							} else {
								nextRangeStart = allRanges[i + 1][0]
							}
							let sectionData = {
								title: `${i}`,
								value: (parseFloat(currentRange[1]) % 360) - (parseFloat(currentRange[0]) % 360),
								color: `#C13C37`
							}
							let emptySectionData = {
								title: `blank${i}`,
								value: nextRangeStart - (parseFloat(currentRange[1]) % 360),
								color: `rgba(0,0,0,0.5)`
							}
							return [sectionData, emptySectionData]
						})
					)}
					startAngle={parseFloat(angleRanges[0][0]) % 360}
					totalValue={360}
					lineWidth={45}
					radius={40}
				/>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	settings: state.settings
})

const mapDispatchToProps = dispatch => ({
	updateSettings: settingsObj => dispatch({ type: 'UPDATE_SETTINGS', settings: settingsObj }),
	reset: () => dispatch({ type: 'RESET' })
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RadialControl)
