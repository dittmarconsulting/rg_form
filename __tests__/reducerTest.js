'use strict'

import C from '../app/constants'
import appReducer from '../app/reducers/index'

it('`loginData` object should match provided data', () => {

    // invoke reducer and return the new state
    let state = appReducer({}, {
        type: C.LOGIN_IN,
        payload: {
            username: 'test',
            email: 'test@test.com'
        }
    })

    // check
    expect(state.login.loginData.username).toBe('test')
    expect(state.login.loginData.email).toBe('test@test.com')
})
