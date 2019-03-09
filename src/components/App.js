import React, { Component } from 'react'
import '../styles/App.css'
import Canvas from './Canvas'
import ShapeContainer from '../containers/ShapeContainer'

class App extends Component {
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<div>
						<ShapeContainer />
						{/* <Canvas /> */}
					</div>
				</header>
			</div>
		)
	}
}

export default App