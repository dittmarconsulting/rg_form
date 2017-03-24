'use strict'

import {createStore, applyMiddleware, compose} from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import rootReducer from './reducers/index'
import { ActionCreator } from './actions/index'

const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
            ActionCreator
        }) : compose

// combine middleware
const enhancer = composeEnhancers(
    applyMiddleware(
        thunk,
        logger()
    )
)

// create the redux store (passing the an empty object and init state)
const store = createStore(rootReducer, {}, enhancer);

// subcribe to store changes
store.subscribe(() => {
    // save the user data in local storage
    if(typeof localstorage !== 'undefined')
        localStorage.setItem('logged_user', JSON.stringify(store.getState().login.loginData));
})

export default store
