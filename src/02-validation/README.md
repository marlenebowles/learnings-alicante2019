# Exercise 2 – Validation

Creating a good form user experience requires client-side validation. The user should be prompted to correct mistakes without having to send any requests to the server.

Now that we have our values on every render, we can validate them, and display validation errors when they are invalid.

In this exercise, to void reinventing the wheel, we will use the library [`sane-email-validation`](https://github.com/scottgonzalez/sane-email-validation) to check if an email address is valid.

## 🤔Should you store validation errors in state?

Why or why not?

## Exercise

Modify `SignupForm.js` to add client-side validation for all fields:

- `firstName`
  - When value is falsy, error message should be `'Required'`
- `lastName`
  - When value is falsy, error message should be `'Required'`
- `email`
  - When value is falsy, error message should be `'Required'`
  - When `isEmail()` returns false, error message should be `'Invalid Email'`
