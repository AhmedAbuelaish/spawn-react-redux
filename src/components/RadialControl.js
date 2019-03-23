import React, { Component } from 'react'
import { connect } from 'react-redux'
import PieChart from 'react-minimal-pie-chart'
import RangeHandlebars from './RangeHandlebars'
import { totalizeAngleRange, angleSpread, degToRad, radToDeg } from '../utils/angleFunctions'
import { flatten } from '../utils/arrayFunctions'

class RadialControl extends Component {
	constructor(props) {
		super(props)
		this.state = {
			angleRange: this.props.settings.angleRange,
			maxAngleRanges: this.props.settings.maxAngleRanges,
			radius: this.props.radius
		}
		this.state = {
			...this.state,
			minMax: this.calcAllMinMax(),
			pad: 10
		}
		this.handleFormChange = this.handleFormChange.bind(this)
		this.calcAllMinMax = this.calcAllMinMax.bind(this)
		this.createPieData = this.createPieData.bind(this)
	}

	handleFormChange = (value, targetProp, i) => {
		this.setState({ [targetProp]: value })
		this.setState({ minMax: this.calcAllMinMax() })
	}

	calcAllMinMax = () => {
		let flatArr = flatten(this.state.angleRange)
		let boundArr = flatten([-180, flatArr, 180])
		let mmArr = boundArr.map((currentValue, currentIndex) => {
			if (currentIndex === 0 || currentIndex === boundArr.length - 1) return {}
			let prevIndex = currentIndex - 1
			let nextIndex = currentIndex + 1
			let key = Math.floor((currentIndex - 1) / 2) + '' + ((currentIndex - 1) % 2)
			return {
				[key]: {
					min: degToRad(boundArr[prevIndex] + this.state.pad),
					max: degToRad(boundArr[nextIndex] - this.state.pad)
				}
			}
		})
		return Object.assign({}, ...mmArr)
	}

	createPieData = (arr, initial) => {
		return flatten(
		arr.map((currentRange, i, allRanges) => {
			let nextRangeStart = 0
			if (i >= allRanges.length - 1) {
				nextRangeStart = initial + 360
			} else {
				nextRangeStart = allRanges[i + 1][0]
			}
			let sectionData = {
				title: `${i}`,
				value: (parseFloat(currentRange[1]) % 360) - (parseFloat(currentRange[0]) % 360),
				color: `rgba(210, 77, 87, 0.7)`
			}
			let emptyValue = nextRangeStart - (parseFloat(currentRange[1]) % 360)
			let emptySectionData = {
				title: `blank${i}`,
				value: emptyValue,
				color: emptyValue <= this.state.pad ? `rgba(255,255,255,0.8)` : `rgba(0,0,0,0.2)`,
			}
			return [sectionData, emptySectionData]
		})
	)}

	render() {
		let angleRanges = this.state.angleRange
		let initAngle = Math.min(...angleRanges[0])
		let controllerRadius = this.state.radius
		return (
			<div className='radial-controller'>
				{angleRanges.map((currentRange, i) => {
					return (
						<div className='rangeHandlebars' key={i}>
							<RangeHandlebars
								radius={controllerRadius}
								angle={parseFloat(currentRange[0]) % 360}
								minMax={this.state.minMax[i + '0']}
								id={i + '0'}
								handleChange={this.handleFormChange}
							/>
							<RangeHandlebars
								radius={controllerRadius}
								angle={parseFloat(currentRange[1]) % 360}
								minMax={this.state.minMax[i + '1']}
								id={i + '1'}
								handleChange={this.handleFormChange}
							/>
						</div>
					)
				})}
				<PieChart
					data={this.createPieData(angleRanges, initAngle)}
					style={{ width: `${controllerRadius * 2}px`}}
					segmentsStyle={{ transition: 'stroke .3s' }}
					startAngle={parseFloat(angleRanges[0][0]) % 360}
					totalValue={360}
					lineWidth={42}
					radius={42}
				/>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	settings: state.settings,
})

const mapDispatchToProps = dispatch => ({
	updateSettings: settingsObj => dispatch({ type: 'UPDATE_SETTINGS', settings: settingsObj }),
	reset: () => dispatch({ type: 'RESET' })
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RadialControl)
