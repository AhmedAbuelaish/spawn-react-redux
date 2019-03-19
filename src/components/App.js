import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../styles/App.css'
import Canvas from './Canvas'
import ShapeContainer from '../containers/ShapeContainer'
import SettingsForm from '../components/SettingsForm'
import RadialControl from '../components/RadialControl'

class App extends Component {
	constructor(props) {
		super(props)
		this.state = this.props.viewportDims
		// this.state = { width: window.innerWidth, height: window.innerHeight }
		this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
	}

	componentDidMount() {
		this.updateWindowDimensions()
		window.addEventListener('resize', this.updateWindowDimensions)
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.updateWindowDimensions)
	}

	updateWindowDimensions() {
		this.setState({ width: window.innerWidth, height: window.innerHeight })
		this.props.updateViewport(this.state)
	}

	render() {
		return (
			<div className='App'>
				<header className='App-header'>
					<div>
						{/* <ShapeContainer /> */}
						{/* <SettingsForm /> */}
						{/* <Canvas /> */}
						<RadialControl />
					</div>
				</header>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	viewportDims: state.viewportDims
})

const mapDispatchToProps = dispatch => ({
	updateViewport: viewportObj => dispatch({ type: 'UPDATE_VIEWPORT', viewportDims: viewportObj })
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App)
