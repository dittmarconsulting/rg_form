'use strict'

import C from '../constants'

const initState = {
    loginData: {
        username: '',
        email: ''
    }
}

export const login = (state=initState, action) => {

    switch(action.type) {

        // in case of `loginData` change
        case C.LOGIN_IN :
            return {
                ...state,
                loginData: action.payload
            }

        default: return state
    }
}
