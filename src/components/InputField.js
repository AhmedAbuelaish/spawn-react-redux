import React, { Component } from 'react'

class InputField extends Component {
	render() {
		let { propName, propValue, propMin, propMax, fieldChange, formSubmit } = this.props
		return (
			<div className='settings-controllers'>
				<label className='controller-label'>{propName}</label>
				<input
					className='sliders'
					type='range'
					id={propName + 'Slider'}
					min={propMin}
					max={propMax}
					value={propValue}
					onChange={e => fieldChange(e.target.value, propName)}
					onMouseUp={e => formSubmit(e)}
				/>
				<input
					className='text-fields'
					type='text'
					id={propName}
					value={propValue}
					onChange={e => fieldChange(e.target.value, propName)}
				/>
			</div>
		)
	}
}

export default InputField
