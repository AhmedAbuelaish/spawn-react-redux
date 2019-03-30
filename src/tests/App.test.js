import React from 'react'
import ReactDOM from 'react-dom'
import App from '../components/App'
import shapeReducer from '../reducers/shapeReducer'

import { createStore } from 'redux'
import { Provider } from 'react-redux'

const store = createStore(shapeReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

it('renders without crashing', () => {
	const div = document.createElement('div')
	ReactDOM.render(
		<Provider store={store}>
			<App />
		</Provider>,
		div
	)
	ReactDOM.unmountComponentAtNode(div)
})
