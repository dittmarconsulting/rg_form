'use strict'

import C from '../app/constants'
import * as FormAction from '../app/actions/formActions'

it('should return `loginData` to match provided data', () => {

    // invoke action
    let action = FormAction.saveUser({
        username: 'test',
        email: 'test@test.com'
    })

    // check
    expect(action.type).toBe('LOGIN_IN')
    expect(action.payload.username).toBe('test')
    expect(action.payload.email).toBe('test@test.com')
})
