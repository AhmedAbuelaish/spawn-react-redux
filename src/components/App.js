import React, { Component } from 'react'
import '../styles/App.css'
import Canvas from './Canvas'
import ShapeContainer from '../containers/ShapeContainer'
import SettingsForm from '../components/SettingsForm'

class App extends Component {
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<div>
						<SettingsForm />
						<ShapeContainer />
						{/* <Canvas /> */}
					</div>
				</header>
			</div>
		)
	}
}

export default App