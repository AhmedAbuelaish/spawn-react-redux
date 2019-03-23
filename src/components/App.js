import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../styles/App.css'
import Canvas from './Canvas'
import ShapeContainer from '../containers/ShapeContainer'
import SettingsForm from './SettingsForm'
import RadialControl from './RadialControl'

class App extends Component {
	constructor(props) {
		super(props)
		this.state = this.props.viewportDims
		this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
		console.log('viewport',this.state)
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
						<ShapeContainer />
						{/* <Canvas /> */}
					</div>
					<RadialControl radius={150}/>
					<SettingsForm />
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
