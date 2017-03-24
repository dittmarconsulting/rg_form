'use strict'

import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Field, reduxForm, SubmissionError } from 'redux-form'

import { ActionCreator } from '../actions/index'

// text for the required <span>
const required = value => value ? undefined : 'Required'

// email must have an email format
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
  'Invalid email address' : undefined

// customised input fields
const renderField = ({ input, label, type, meta: { touched, error } }) => (
    <div className="form-group">
        <label>{label}</label>
        <input
            {...input}
            type={type}
            className="form-control"
            placeholder={label}
        />
        {touched && error && <span style={styles.error}>{error}</span>}
    </div>
)

// mock a async call with Promise
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

// mock fake API call
const submit = (values, dispatch, props) => {

    // simulate server latency
    return sleep(3000)
        .then(() => {

            // check if email exits
            if (values.email === 'test@test.com') {
                throw new SubmissionError({
                    email: 'Email is already taken',
                    _error: 'Email taken!'
                })
            }

            // dispatch the user data to action creator
            dispatch(props.saveUser({
                username: values.username,
                email: values.email
            }))

            // reset fields
            dispatch(props.reset())
        })
}

// the actual form component
let SignupForm = (props) => {

    const { handleSubmit, pristine, error, reset, submitting,
        dispatch, loginData, submitSucceeded } = props

    return (
        <div className="container-fluid">
            <div style={styles.container} className="row">
                <form onSubmit={handleSubmit(submit, dispatch, props)}>
                    <Field
                        name="username"
                        type="text"
                        component={renderField}
                        label="Username"
                        validate={required}
                    />
                    <Field
                        name="email"
                        type="email"
                        component={renderField}
                        label="Email"
                        validate={[ required, email ]}
                    />
                    <div className="btn-group">
                        <button
                            className="btn btn-success"
                            type="submit"
                            disabled={submitting}
                        >Submit</button>
                        <button
                            className="btn btn-default"
                            type="button"
                            disabled={pristine || submitting}
                            onClick={reset}
                        >Clear Values</button>
                    </div>
                </form>
                <hr/>
                    {
                        (submitSucceeded) ?
                            <div className="alert alert-success" role="alert">
                                <strong>Logged-in!</strong> {JSON.stringify(loginData)}
                            </div> : null
                    }
                    {
                        (submitting) ? <i className="fa fa-refresh fa-spin fa-2x fa-fw"></i> : null
                    }
            </div>
        </div>
    )
}

const styles = {
    container: {
        margin: 20,
        padding: 20,
        backgroundColor: '#f1f1f1'
    },
    error: {
        color: '#FF0000'
    }
}

// register form element
SignupForm = reduxForm({
    form: 'signinForm',  // a unique identifier for this form
    submit,
    asyncBlurFields: [ 'username' ]
})(SignupForm)

// connect form to redux
SignupForm = connect(
    state => ({
        // pull in the login reducer state
        loginData: state.login.loginData,
        // set initial values for the fields if needed
        initialValues: {
            //username: state.login.loginData.username,
            //email: state.login.loginData.email
        }
    }),
    dispatch => {
        // pull in saveUser action cretor
        return bindActionCreators(ActionCreator, dispatch)
    }
)(SignupForm)

export default SignupForm
