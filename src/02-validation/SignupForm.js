import React from 'react'
import isEmail from 'sane-email-validation'

/**
 * Objective: Add required validation for all fields,
 * and email validation, using `isEmail` for the email field.
 *
 * Requirements:
 *  - The form should not submit if the values are invalid.
 *  - Errors should be shown next to each field when it is invalid.
 *  - Errors should disappear when a field becomes valid.
 */
export default function SignupForm({ onSubmit }) {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  let firstNameError = undefined;
  let lastNameError = undefined;
  let emailError = undefined;

  if (!firstName){
    firstNameError = "Required";
  }
  if (!lastName) {
    lastNameError = "Required"
  }
  if (!email){
    emailError = "Required";
  } else if (!isEmail(email)){
    emailError = "Wrong Email"
  }
  return (
    <form
      onSubmit={event => {
        event.preventDefault()
        if (!firstNameError && !emailError && !lastNameError) {
          onSubmit({
            firstName,
            lastName,
            email
          })
        }
      }}
    >
      <div>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          placeholder="First Name"
          value={firstName}
          onChange={event => setFirstName(event.target.value)}
        />
        {firstNameError && (
          <span>
            {firstNameError}
          </span>
        )}
      </div>
      <div>
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          placeholder="Last Name"
          value={lastName}
          onChange={event => setLastName(event.target.value)}
        />
        {lastNameError && (
          <span>
            {lastNameError}}
          </span>
        )}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
        {emailError && (
          <span>
            {emailError}
          </span>
        )}
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}
