import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App';
import shapeReducer from './reducers/shapeReducer'

import {createStore} from 'redux'
import {Provider} from 'react-redux'

const store = createStore(
    shapeReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )

store.subscribe(() => {
    if (store.getState().leaves.length > 0){
        console.log(store.getState().leaves)
        store.dispatch({ type: 'CREATE_NODES' })
    }
})


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
);
