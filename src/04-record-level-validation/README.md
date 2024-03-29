# Exercise 4 – Record-Level Validation with React Final Form

There are two ways of doing client-side validation with React Final Form:

- **Record-Level Validation**: validates all the form values at once
- **Field-Level Validation**: validates each field value individually

They can be used interchangeably, even in the same form (although that is not recommended). First we're going to look at _record-level validation_.

A record-level validation function takes all the form values and returns _an object of errors that is **the same shape** as the values object_. What does that mean?

If your values look like:

```json
{
  "firstName": "Erik",
  "lastName": "Rasmussen",
  "email": "notavalidemailaddress",
  "gamesPlayed": 4
}
```

and two of the values, let's say `email` and `gamesPlayed` are invalid, the `errors` object should look like:

```js
return {
  // no value for firstName because it's valid
  // no value for lastName because it's valid
  email: 'Invalid email address',
  gamesPlayed: 'You must play at least 10 games to qualify'
}
```

The "same shape" rule goes for "deep" values, too. If your values are:

```json
{
  "shipping": {
    "street": "",
    "city": "New York"
  }
}
```

...your errors might look like:

```json
{
  "shipping": {
    "street": "Required"
  }
}
```

**Errors do not need to be strings**; they can be anything you'd like. This can be useful for internationalization, i.e. they could be keys to a table of strings elsewhere containing error messages in many languages.

If the form is valid, a record-level validation function should return an empty "errors" object, i.e. `{}`.

## Displaying Errors

Our errors are provided to us by the `<Field/>` component, but only if we are using a render prop. We will have to stop using the `component="input"` shortcut and render the input ourselves.

```jsx
<Field
  component="input"
  type="text"
  name="firstName"
  placeholder="First Name"
/>
```

becomes

```jsx
<Field type="text" name="firstName">
  {({ input, meta }) => (
    <React.Fragment>
      <input {...input} placeholder="First Name" />
      {meta.error && <span>{meta.error}</span>}
    </React.Fragment>
  )}
</Field>
```

All of the props that we need to pass to our `<input/>` (e.g. `name`, `value`, `onChange`, etc.) are nicely bundled up for us by `<Field/>` into an `input` object that we can [spread](https://reactjs.org/docs/jsx-in-depth.html#spread-attributes) into the props of our `<input/>` component.

Our error, and much other information about our field, can be found inside the `meta` object `<Field/>` provides.

## Exercise

Add back "required" validation on all fields, and email validation with the `isEmail` predicate, in `SignupForm.js`.
