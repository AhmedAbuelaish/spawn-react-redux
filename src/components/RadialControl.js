import React, { Component } from 'react'
import { connect } from 'react-redux'
import PieChart from 'react-minimal-pie-chart'
import RangeHandlebars from './RangeHandlebars'

var arrays = require('../utils/arrayFunctions')

class RadialControl extends Component {
	constructor(props) {
		super(props)
		this.state = {
			angleRange: this.props.settings.angleRange,
			maxAngleRanges: this.props.settings.maxAngleRanges,
			radius: this.props.radius,
			center: 0
		}
		this.handleFormChange = this.handleFormChange.bind(this)
		this.getCenter = this.getCenter.bind(this)
	}

	componentDidMount() {}

	getCenter = element => {
		let rect = element.getBoundingClientRect()
		console.log('rect', rect)
		this.setState({ center: rect })
		return rect
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
	render() {
		let angleRanges = this.state.angleRange
		let initAngle = Math.min(...angleRanges[0])
		let controllerRadius = this.state.radius
		return (
			<div className='radial-controller' ref={this.getCenter} style={{ border: '1px solid red' }}>
				{angleRanges.map((currentRange, i) => {
					return (
						<div className='rangeHandlebars'>
							<RangeHandlebars radius={controllerRadius} angle={parseFloat(currentRange[0]) % 360} key={i + '0'} id={i + '0'}/>
							<RangeHandlebars radius={controllerRadius} angle={parseFloat(currentRange[1]) % 360} key={i + '1'} id={i + '1'}/>
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
								color: `rgba(210, 77, 87, 0.7)`
							}
							let emptySectionData = {
								title: `blank${i}`,
								value: nextRangeStart - (parseFloat(currentRange[1]) % 360),
								color: `rgba(0,0,0,0.2)`
							}
							return [sectionData, emptySectionData]
						})
					)}
					style={{ width: `${controllerRadius * 2}px` }}
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
