import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../styles/App.css'
import Canvas from '../containers/Canvas'
import ShapeContainer from '../containers/ShapeContainer'
import SettingsForm from './SettingsForm'
import RadialControl from './RadialControl'
import ObstacleContainer from '../containers/ObstacleContainer'
import ScoreCounter from './ScoreCounter'
import ModeSelector from './ModeSelector'

class App extends Component {
	constructor(props) {
		super(props)
		this.state = this.props.viewportDims
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
					<div className='stage' style={{ transform: `scale(${this.props.stage.zoom})`, position: 'relative' }}>
						<ObstacleContainer />
						<ShapeContainer />
						{/* <Canvas /> */}
					</div>
					<ModeSelector />
					<ScoreCounter />
					<RadialControl radius={0.05 * this.state.width} />
					<SettingsForm />
				</header>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	viewportDims: state.viewportDims,
	stage: state.stage
})

const mapDispatchToProps = dispatch => ({
	updateViewport: viewportObj => dispatch({ type: 'UPDATE_VIEWPORT', viewportDims: viewportObj })
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App)
