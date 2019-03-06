import React, { Component } from 'react'

class Canvas extends Component {
	render() {
		return (
			<div>
				<canvas ref="canvas" width={640} height={425} />
				<img ref="image" src={cheese} className="hidden" />
			</div>
		)
	}
}

export default Canvas
