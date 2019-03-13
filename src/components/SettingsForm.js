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
						{/* minSize */}
						<input
							className="slider"
							type="range"
							id="minSizeSlider"
							min="1"
							max="10"
							value={this.state.minSize}
							onChange={e => {
								this.handleFormChange(e.target.value, 'minSize')
							}}
							onMouseUp={e => {
								this.handleFormSubmission(e)
							}}
						/>
						<input
							className="textFields"
							type="text"
							id="minSize"
							value={this.state.minSize}
							onChange={e => {
								this.handleFormChange(e.target.value, 'minSize')
							}}
						/>
						{/* multiplierPrecision */}
						<input
							className="slider"
							type="range"
							id="multiplierPrecisionSlider"
							min="0"
							max="100"
							value={this.state.multiplierPrecision}
							onChange={e => {
								this.handleFormChange(e.target.value, 'multiplierPrecision')
							}}
							onMouseUp={e => {
								this.handleFormSubmission(e)
							}}
						/>
						<input
							className="textFields"
							type="text"
							id="multiplierPrecision"
							value={this.state.multiplierPrecision}
							onChange={e => {
								this.handleFormChange(e.target.value, 'multiplierPrecision')
							}}
						/>
						{/* decay */}
						<input
							className="slider"
							type="range"
							id="decaySlider"
							min="10"
							max="100"
							value={this.state.decay}
							onChange={e => {
								this.handleFormChange(e.target.value, 'decay')
							}}
							onMouseUp={e => {
								this.handleFormSubmission(e)
							}}
						/>
						<input
							className="textFields"
							type="text"
							id="decay"
							value={this.state.decay}
							onChange={e => {
								this.handleFormChange(e.target.value, 'decay')
							}}
						/>
						{/* decayPrecision */}
						<input
							className="slider"
							type="range"
							id="decayPrecisionSlider"
							min="0"
							max="100"
							value={this.state.decayPrecision}
							onChange={e => {
								this.handleFormChange(e.target.value, 'decayPrecision')
							}}
							onMouseUp={e => {
								this.handleFormSubmission(e)
							}}
						/>
						<input
							className="textFields"
							type="text"
							id="decayPrecision"
							value={this.state.decayPrecision}
							onChange={e => {
								this.handleFormChange(e.target.value, 'decayPrecision')
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
