'use strict'

import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { login } from './formReducers'

// add all reducers here to match the initState
export default combineReducers({
    form: formReducer,
    login
})
