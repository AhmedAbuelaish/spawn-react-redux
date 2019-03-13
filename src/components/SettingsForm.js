import React, { Component } from 'react'
import { connect } from 'react-redux'

class SettingsForm extends Component {
	constructor(props) {
		super(props)
		this.state = this.props.settings
	}

	handleFormChange = (value, targetProp) => {
		console.log('input:', value)
		this.setState({ [targetProp]: value })
	}

	handleFormSubmission = e => {
		e.preventDefault()
		this.props.updateSettings(this.state)
		this.props.reset()
		this.plantSeed()
		const intId = setInterval(() => {
			this.handleCreateShape()
		}, 50)
		setTimeout(() => {
			clearInterval(intId)
		}, 10000)
	}

	plantSeed = () => {
		this.props.createRoot()
	}

	handleCreateShape = () => {
		this.props.createNodes()
	}

	render() {
		return (
			<div>
				<form
					className="settings-form"
					onSubmit={e => {
						this.handleFormSubmission(e)
					}}
				>
					<div>
						<input
							className="slider"
							type="range"
							id="decaySlider"
							min="0.1"
							max="1"
							value={this.state.decay * 100}
							onChange={e => {
								this.handleFormChange(e.target.value/100, 'decay')
							}}
							onMouseUp={e => {
								this.handleFormSubmission(e)
							}}
						/>
						<input
							className="textFields"
							type="text"
							id="decay"
							value={this.state.decay * 100}
							onChange={e => {
								this.handleFormChange(e.target.value/100, 'decay')
							}}
						/>
						<input
							className="slider"
							type="range"
							id="multiplierSlider"
							min="0"
							max="2"
							value={this.state.multiplier}
							onChange={e => {
								this.handleFormChange(e.target.value, 'multiplier')
							}}
							onMouseUp={e => {
								this.handleFormSubmission(e)
							}}
						/>
						<input
							className="textFields"
							type="text"
							id="multiplier"
							value={Math.trunc(this.state.multiplier)}
							onChange={e => {
								this.handleFormChange(e.target.value, 'multiplier')
							}}
						/>
					</div>
					<input className="reset-button" type="submit" value="Reset" />
				</form>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	settings: state.settings,
	nodes: state.nodes,
	leaves: state.leaves
})

const mapDispatchToProps = dispatch => ({
	updateSettings: settingsObj => dispatch({ type: 'UPDATE_SETTINGS', settings: settingsObj }),
	reset: () => dispatch({ type: 'RESET' }),
	createRoot: () => dispatch({ type: 'CREATE_ROOT' }),
	createNodes: () => dispatch({ type: 'CREATE_NODES' })
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SettingsForm)
