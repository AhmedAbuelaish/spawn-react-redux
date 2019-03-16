import React, { Component } from 'react'

class InputField extends Component {
	render() {
		let { propName, propLabel, propValue, propMin, propMax, fieldChange, formSubmit } = this.props
		return (
			<div className='settings-controllers'>
				<label className='controller-label'>{propLabel}</label>
				<input
					className='text-fields'
					type='text'
					id={propName}
					value={propValue[0]}
					onChange={e => fieldChange(e.target.value, propName, 0)}
				/>
				<input
					className='slidersHalf'
					type='range'
					id={propName + 'Slider'}
					min={propMin}
					max={propMax}
					value={propValue[0]}
					onChange={e => fieldChange(e.target.value, propName, 0)}
					onMouseUp={e => formSubmit(e)}
				/>
				<input
					className='slidersHalf'
					type='range'
					id={propName + 'Slider'}
					min={propMin}
					max={propMax}
					value={propValue[1]}
					onChange={e => fieldChange(e.target.value, propName, 1)}
					onMouseUp={e => formSubmit(e)}
				/>
				<input
					className='text-fields'
					type='text'
					id={propName}
					value={propValue[1]}
					onChange={e => fieldChange(e.target.value, propName, 1)}
				/>
			</div>
		)
	}
}

export default InputField
