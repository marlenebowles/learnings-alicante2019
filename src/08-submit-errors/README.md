# Exercise 8 – Submit Errors

Not all validation can happen on the client side. Sometimes something goes wrong on the backend. We need a way to return errors from our `onSubmit` function.

The way you return submit errors is by _resolving_ the `Promise` returned from `onSubmit()`. `Promise` _rejection_ is saved for communications errors, e.g. AJAX request receives 404 or 500 error.

## Field-Specific Errors

Just like with [Record Level Validation](../04-validate-with-final-form), your errors should be in the form of an `Object` in the same shape as the form values.

These will show up under [`meta.submitError`](https://final-form.org/docs/final-form/types/FieldState#submiterror) for the field.

## Form-Wide Errors

If you need to return an error that is not related to any specific field (e.g. "Login Failed"), you can place it in the special reserved key [`FORM_ERROR`](https://final-form.org/docs/final-form/api#form_error).

```js
import { FORM_ERROR } from 'final-form'

const onSubmit = async values => {
  const user = await auth(values)
  if (!user) {
    return {
      [FORM_ERROR]: 'Login Failed'
    }
  }
}
```

These will show up under [`submitError`](https://final-form.org/docs/final-form/types/FormState#submiterror) value in form state.

## Exercise

Modify `SignupForm.js` to display form-wide submit error and field-level submit errors when they occur.

- Submit errors should be displayed next to the inputs in a `<span>` just like client-side validation errors
- Form-wide error should be displayed in a `<div className="error"/>` above the Submit button.
