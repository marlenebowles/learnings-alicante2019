import React from 'react'
import { Form, Field } from 'react-final-form'
import isEmail from 'sane-email-validation'

const required = value => (value ? undefined : 'Required')
const validEmail = value => (isEmail(value) ? undefined : 'Invalid Email')
const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined)

/**
 * Objective: Refactor to use a single render function, and put a
 * className="active" on the <div/> when the field it contains is
 * active.
 *
 * Requirements:
 *  - The `placeholder` prop should be given to `<Field/>` and
 *    used in both the `<label/>` and the `<input/>` components.
 */
export default function SignupForm({ onSubmit }) {
  return (
    <Form onSubmit={onSubmit}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Field name="firstName" validate={required}>
            {({ input, meta }) => (
              <div>
                <label htmlFor="firstName">First Name</label>
                <input
                  {...input}
                  id="firstName"
                  type="text"
                  placeholder="First Name"
                />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <Field name="lastName" validate={required}>
            {({ input, meta }) => (
              <div>
                <label htmlFor="lastName">Last Name</label>
                <input
                  {...input}
                  id="lastName"
                  type="text"
                  placeholder="Last Name"
                />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <Field
            name="email"
            validate={composeValidators(required, validEmail)}
          >
            {({ input, meta }) => (
              <div>
                <label htmlFor="email">Email</label>
                <input {...input} id="email" type="email" placeholder="Email" />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <button type="submit">Submit</button>
        </form>
      )}
    </Form>
  )
}
