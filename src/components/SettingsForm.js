import React, { Component } from 'react'
import { connect } from 'react-redux'
import InputField from './InputField'

class SettingsForm extends Component {
	constructor(props) {
		super(props)
		this.state = this.props.settings
		this.handleFormChange = this.handleFormChange.bind(this)
		this.handleFormSubmission = this.handleFormSubmission.bind(this)
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
					className='settings-form'
					onSubmit={e => {
						this.handleFormSubmission(e)
					}}>
						<InputField
							propName={'minSize'}
							propValue={this.state.minSize}
							propMin={1}
							propMax={10}
							fieldChange={this.handleFormChange}
							formSubmit={this.handleFormSubmission}
						/>
						<InputField
							propName={'multiplierPrecision'}
							propValue={this.state.multiplierPrecision}
							propMin={0}
							propMax={100}
							fieldChange={this.handleFormChange}
							formSubmit={this.handleFormSubmission}
						/>
						<InputField
							propName={'decay'}
							propValue={this.state.decay}
							propMin={10}
							propMax={100}
							fieldChange={this.handleFormChange}
							formSubmit={this.handleFormSubmission}
						/>
						<InputField
							propName={'decayPrecision'}
							propValue={this.state.decayPrecision}
							propMin={0}
							propMax={100}
							fieldChange={this.handleFormChange}
							formSubmit={this.handleFormSubmission}
						/>
					<input className='reset-button' type='submit' value='Reset' />
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
