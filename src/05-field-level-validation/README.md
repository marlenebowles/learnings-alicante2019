# Exercise 5 – Field-Level Validation with React Final Form

Field-level validation is achieved by passing a `validate` prop to `<Field/>`.

The `validate` prop is a function that takes the value of the field and returns `undefined` if the value is valid, or an error if it is not. [Read the documentation](https://final-form.org/docs/react-final-form/types/FieldProps#validate).

## Which validation method to use?

As with everything in engineering and life, each decision comes with tradeoffs.

The benefit of record-level validation is that, if you are using Node on the server, you can share the same validation code on the client and the server. And you _should_ be validating the form values _again_ on the server to insure that someone cannot spoof an AJAX request to your server with invalid data.

The benefit of record-level validation is that you can share validation functions and compose them together. For example, there's no reason to write more than one (falsy) "required" function, `value => value ? undefined : 'Required'`.

There are libraries that will let you compose functions to create record level validation functions.

It's up to you to decide how you'd like to structure your mental model of the form.

## Exercise

Convert the record-level validation to field-level validation in `SignupForm.js`.
