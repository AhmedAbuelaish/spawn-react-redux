import React, { Component } from 'react'

class Canvas extends Component {
	componentDidMount() {
		const canvas = this.refs.canvas
		const ctx = canvas.getContext('2d')
	}

	render() {
		return (
			<div>
				<canvas ref="canvas" width={640} height={425}/>
			</div>
		)
	}
}

export default Canvas
