'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'

import SignupForm from './components/SignupForm'

// get the redux store
import store from './store'

ReactDOM.render(
    <Provider store={store}>
        <SignupForm />
    </Provider>,
  document.body.appendChild(document.createElement('div'))
)
