import React from 'react'
import { Form, useField, FormSpy } from 'react-final-form'
import validate from './validate'

/**
 * Objective: Enable custom input components and `<Error/>`
 * using `useField()`
 *
 * Requirements:
 *  - Do not edit any code in the SignupForm component;
 *    only edit the components defined below it
 *  - Use of `<Field/>` component is prohibited.
 *
 * Bonus:
 *  - `<Error/>` component should _only_ rerender
 *    when `touched` or `error` changes for that field.
 */
export default function SignupForm({ onSubmit }) {
  return (
    <Form onSubmit={onSubmit} validate={validate}>
      {({ handleSubmit, values }) => (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="firstName">First Name</label>
            <TextField name="firstName" placeholder="First Name" />
            <Error name="firstName" />
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <TextField name="lastName" placeholder="Last Name" />
            <Error name="lastName" />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <EmailField name="email" placeholder="Email" />
            <Error name="email" />
          </div>
          <button type="submit">Submit</button>
          <pre>{JSON.stringify(values, undefined, 2)}</pre>
        </form>
      )}
    </Form>
  )
}

// ONLY EDIT BELOW THIS LINE

const TextField = ({ name, placeholder }) => {
  const { input } = useField(name);
  return <input {...input}  id={name} type="text" placeholder={placeholder} />
}

const EmailField = ({ name, placeholder }) => {
  const { input } = useField(name);
  return <input {...input} id={name} type="email" placeholder={placeholder} />
}
const Error = ({ name }) => {
  const { meta } = useField(name, {
    subscription: {
      touched: true,
      error: true,
    }
  });
  return (
    <React.Fragment>
       {(meta.touched && meta.error) && (
          <span> Error: {meta.error}</span>
        )}
    </React.Fragment>
  )
}
