'use strict'

import React from 'react'
import {shallow} from 'enzyme'
import renderer from 'react-test-renderer'

import {Provider} from 'react-redux'
import store from '../app/store'
import SignupForm from '../app/components/SignupForm'

test('JSX should render properly and match Snapshot', () => {

  const component = renderer.create(
      <Provider store={store}>
          <SignupForm />
      </Provider>
  )

  let tree = component.toJSON

  expect(tree).toMatchSnapshot()
});
