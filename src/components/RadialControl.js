import React, { Component } from 'react'
import { connect } from 'react-redux'
import PieChart from 'react-minimal-pie-chart'
import RangeHandlebars from './RangeHandlebars'

var arrays = require('../utils/arrayFunctions')

class RadialControl extends Component {
	render() {
		let angleRanges = this.props.settings.angleRange
		let initAngle = angleRanges[0][0]
		return (
			<div style={{ position: 'relative', border: '2px solid white' }}>
				{angleRanges.map((currentRange, i) => {
					return (
						<div>
							<RangeHandlebars radius={'150'} angle={parseFloat(currentRange[0]) % 360} key={i + '0'} />
							<RangeHandlebars radius={'150'} angle={parseFloat(currentRange[1]) % 360} key={i + '1'} />
						</div>
					)
				})}
				<PieChart
					data={arrays.flatten(angleRanges.map((currentRange, i, allRanges) => {
            let nextRangeStart = 0
						if(i>=allRanges.length-1){
							initAngle < 0 ? (nextRangeStart = initAngle + 360) : (nextRangeStart = initAngle)
            } else {
              nextRangeStart = allRanges[i + 1][0]
            }
						let sectionData = {
							title: `${i}`,
							value: (parseFloat(currentRange[1]) % 360) - (parseFloat(currentRange[0]) % 360),
							color: `#C13C` + Math.trunc(Math.random() * 100)
						}
						let emptySectionData = {
							title: `blank${i}`,
							value: nextRangeStart - parseFloat(currentRange[0]) % 360,
							color: `rgba(0,0,0,0.25)`
            }
            console.log(sectionData,emptySectionData)
						return [sectionData,emptySectionData]
					}))}
					startAngle={parseFloat(angleRanges[0][0]) % 360}
					totalValue={360}
					lineWidth={15}
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
