import React, { Component } from 'react'
import { connect } from 'react-redux'
import PieChart from 'react-minimal-pie-chart'
import RangeHandlebars from './RangeHandlebars'

class RadialControl extends Component {
	render() {
    let angleRanges = this.props.settings.angleRange
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
					data={angleRanges.map((currentRange, i) => {
						return {
							title: `${i}`,
							value: (parseFloat(currentRange[1]) % 360) - (parseFloat(currentRange[0]) % 360),
							color: `#C13C` + Math.trunc(Math.random() * 100)
						}
          })}
          startAngle = {parseFloat(angleRanges[0][0]) % 360}
          totalValue={360}
          lineWidth={15}
          padding={10}
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
