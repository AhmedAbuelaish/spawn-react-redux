import React, { Component } from 'react'

class Draggable extends Component {
	constructor(props) {
		super(props)
		this.state = { x: 0, y: 0 }
	}

	getDefaultProps() {
	    return {
	        // allow the initial position to be passed in as a prop
	        initialPos: {x: 0, y: 0}
	      }
	}

	getInitialState() {
		return {
			pos: this.props.initialPos,
			dragging: false,
			rel: null // position relative to the cursor
		}
	}

	componentDidUpdate(props, state) {
		if (this.state.dragging && !state.dragging) {
			document.addEventListener('mousemove', this.onMouseMove)
			document.addEventListener('mouseup', this.onMouseUp)
		} else if (!this.state.dragging && state.dragging) {
			document.removeEventListener('mousemove', this.onMouseMove)
			document.removeEventListener('mouseup', this.onMouseUp)
		}
	}

	// calculate relative position to the mouse and set dragging=true
	onMouseDown(e) {
        // only left mouse button
        
        console.log(this.state)
		if (e.button !== 0) return
		var computedStyle = window.getComputedStyle(this.getDOMNode())
		var pos = { top: parseInt(computedStyle.top), left: parseInt(computedStyle.left) }
		this.setState({
			dragging: true,
			rel: {
				x: e.pageX - pos.left,
				y: e.pageY - pos.top
			}
		})
		e.stopPropagation()
		e.preventDefault()
	}

	onMouseUp(e) {
		this.setState({ dragging: false })
		e.stopPropagation()
		e.preventDefault()
	}

	onMouseMove(e) {
		if (!this.state.dragging) return
		this.setState({
			pos: {
				x: e.pageX - this.state.rel.x,
				y: e.pageY - this.state.rel.y
			}
		})
		e.stopPropagation()
		e.preventDefault()
	}

	render() {
		return this.transferPropsTo(
			React.DOM.div(
				{
					onMouseDown: this.onMouseDown,
					style: {
						left: this.state.pos.x + 'px',
						top: this.state.pos.y + 'px'
					}
				},
				this.props.children
			)
		)
	}
}

export default Draggable
