import React, { Component } from 'react'
import PieChart from 'react-minimal-pie-chart'
import RangeHandlebars from './RangeHandlebars'

class RadialControl extends Component {
	render() {
		return (
			<div style={{position:'relative', border: '2px solid white'}}>
        <RangeHandlebars radius={'150'} angle={'180'}/>
				<PieChart
					data={[
						{ title: 'One', value: 10, color: '#E38627' },
						{ title: 'Two', value: 15, color: '#C13C37' },
						{ title: 'Three', value: 20, color: '#6A2135' }
					]}
				/>
			</div>
		)
	}
}

export default RadialControl
