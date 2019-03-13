import React from 'react'

const InputField = ({ name, fieldValue, fieldChange, formSubmit, min, max }) => {
	return (
		<div>
			<input
				className="slider"
				type="range"
				id={name + 'Slider'}
				min={min}
				max={max}
				value={fieldValue}
				onChange={e => fieldChange(e.target.value, name)}
				onMouseUp={() => formSubmit()}
			/>
			<input
				className="textFields"
				type="text"
				id={propName}
				value={fieldValue}
				onChange={e => fieldChange(e.target.value, name)}
			/>
		</div>
	)
}

export default InputField
