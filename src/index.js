import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App';
import shapeReducer from './reducers/shapeReducer'

import {createStore} from 'redux'
import {Provider} from 'react-redux'

const store = createStore(shapeReducer)


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
);
