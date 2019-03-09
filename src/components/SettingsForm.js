import React, { Component } from 'react'
import { connect } from 'react-redux'

// settings: {
//     angleRange: [[0,180],[180,360]],
//     minSize: 1,
//     distFactor: 1.4
// },

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
							id="minSizeSlider"
							min="1"
							max="10"
							value={this.state.minSize}
							onChange={e => {
								this.handleFormChange(e.target.value, 'minSize')
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
						<input
							className="slider"
							type="range"
							id="distFactorSlider"
							min="10"
							max="150"
							value={this.state.distFactor * 100}
							onChange={e => {
								this.handleFormChange(e.target.value / 100, 'distFactor')
							}}
						/>
						<input
                            className="textFields"
							type="text"
							id="distFactor"
							value={Math.trunc(this.state.distFactor * 100)}
							onChange={e => {
								this.handleFormChange(e.target.value, 'distFactor')
							}}
						/>
					</div>
					<input type="submit" value="Reset" />
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
