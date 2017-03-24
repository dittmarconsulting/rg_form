'use strict'

import C from '../constants'

export const saveUser = (userData)  => {

    // here we could use thunk to save data to API instead of doing it in the
    // SignupForm component submit() function
    // in this case we save the user data to local storage (see store.js)

    return {
        type: C.LOGIN_IN,
        payload: userData
    }
}
