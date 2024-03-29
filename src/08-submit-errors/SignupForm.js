import React from 'react'
import { Form, Field } from 'react-final-form'

/**
 * Objective: Display form-wide submit error and
 * field-level submit errors when they occur.
 *
 * Requirements:
 *  - Submit errors should be displayed next to the inputs
 *    in a `<span>` just like client-side validation errors
 *  - Form-wide error should be displayed in a
 *    `<div className="error"/>` above the Submit button.
 */
export default function SignupForm({ onSubmit }) {
  return (
    <Form
      onSubmit={onSubmit}
      validate={values => {
        const errors = {}
        if (!values.username) {
          errors.username = 'Required'
        }
        if (!values.secret) {
          errors.secret = 'Required'
        }
        return errors
      }}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <p>
            Username <code>"erikras"</code> will fail, and any secret other than{' '}
            <code>"42"</code> will also fail.
          </p>
          <Field name="username">
            {({ input, meta }) => (
              <div>
                <label htmlFor="username">Username</label>
                <input
                  {...input}
                  id="username"
                  type="text"
                  placeholder="Username"
                />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <Field name="secret">
            {({ input, meta }) => (
              <div>
                <label htmlFor="secret">Secret</label>
                <input
                  {...input}
                  id="secret"
                  type="password"
                  placeholder="Secret"
                />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>

          {/* <div className="error">Form wide error goes here</div> */}

          <button type="submit">Submit</button>
        </form>
      )}
    </Form>
  )
}
