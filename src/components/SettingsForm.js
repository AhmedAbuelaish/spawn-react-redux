import React, { Component } from 'react'
import { connect } from 'react-redux'
import InputField from './InputField'
import DoubleInput from './DoubleInput'

class SettingsForm extends Component {
	constructor(props) {
		super(props)
		this.state = this.props.settings
		this.handleFormChange = this.handleFormChange.bind(this)
		this.handleFormSubmission = this.handleFormSubmission.bind(this)
	}

	componentDidUpdate(prevProps) {
		if (prevProps.settings !== this.props.settings) {
			this.setState(this.props.settings)
		}
	}

	handleFormChange = (value, targetProp, i) => {
		if (i === undefined) {
			this.setState({ [targetProp]: value })
		} else if (i === 0) {
			this.setState({ [targetProp]: [[value, this.state.angleRange[0][1]]] })
		} else if (i === 1) {
			this.setState({ [targetProp]: [[this.state.angleRange[0][0], value]] })
		}
	}

	handleFormSubmission = e => {
		e.preventDefault()
		this.props.updateSettings(this.state)
	}

	render() {
		return (
			<div className='settings-controller'>
				<form
					className='settings-form'
					onSubmit={e => {
						this.handleFormSubmission(e)
					}}>
					<InputField
						propName={'minSize'}
						propLabel={'Min Size'}
						propValue={this.state.minSize}
						propMin={1}
						propMax={10}
						fieldChange={this.handleFormChange}
						formSubmit={this.handleFormSubmission}
					/>
					<InputField
						propName={'anglePrecision'}
						propLabel={'Angle Prec.'}
						propValue={this.state.anglePrecision}
						propMin={0}
						propMax={100}
						fieldChange={this.handleFormChange}
						formSubmit={this.handleFormSubmission}
					/>
					<InputField
						propName={'decay'}
						propLabel={'Decay'}
						propValue={this.state.decay}
						propMin={0}
						propMax={90}
						fieldChange={this.handleFormChange}
						formSubmit={this.handleFormSubmission}
					/>
					<InputField
						propName={'decayPrecision'}
						propLabel={'D Precision'}
						propValue={this.state.decayPrecision}
						propMin={0}
						propMax={100}
						fieldChange={this.handleFormChange}
						formSubmit={this.handleFormSubmission}
					/>
					<input className='reset-button' type='submit' value='Reset' style={{ visibility: 'hidden' }} />
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
	createNodes: () => dispatch({ type: 'CREATE_NODES' })
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SettingsForm)
