import React, { Component } from 'react'

class SettingsForm extends Component {
	constructor(props) {
		super(props)
		this.state = ''
	}

	handleFormChange = e => {
		this.setState({ value: e.target.value })
	}

	handleFormSubmission = e => {
		e.preventDefault()
		this.props.settings(this.state.value)
		this.setState({ value: '' })
	}

	render() {
		return (
			<div>
				<form
					onSubmit={e => {
						this.handleFormSubmission(e)
					}}
				>
					<input type="text" value={this.state.value} onChange={e => this.handleFormChange(e)} />
				</form>
			</div>
		)
	}
}

export default SettingsForm
