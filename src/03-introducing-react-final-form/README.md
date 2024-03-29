# Exercise 3 – Introducing React Final Form

You can imagine how it would be to continue adding form functionality yourself using `React.useState` for every field, or perhaps a more sophisticated version using `React.useReducer`, but it gets messy very quickly, and this is just for one form. Imagine your application has dozens of forms! 😱

This is why form libraries exist: to abstract away all of that state management to let you quickly build robust forms.

In this exercise, we are going to implement our previous exercise using React Final Form; first without the validation. Go read the [Getting Started](https://final-form.org/docs/react-final-form/getting-started) guide first.

The basic idea is to wrap your entire form with the `Form` component, which injects, via render props, useful state information and callbacks into your JSX.

## Step 1 - Give `Form` your `onSubmit` function

```jsx
<Form
  onSubmit={values => {
    // do something with submitted values
  }}
>
  ...
</Form>
```

This tells React Final Form what to do with the values upon submission. The library is unopinionated about what you do with the values; you can send them to a server via AJAX, save them to `localStorage`, or whatever you'd like.

The `Form` will provide you with a `handleSubmit` function for your to pass into the HTML `<form>`'s `onSubmit` prop. This `handleSubmit` will take care of calling `event.preventDefault()` for you, so your form will not be submitted the standard HTML way.

So now we have:

```jsx
<Form onSubmit={onSubmit}>
  {({ handleSubmit }) => (
    <form onSubmit={handleSubmit}>...fields go here...</form>
  )}
</Form>
```

What's going on with `{({ handleSubmit }) => ()}` ???

That is using the ["children as render prop" pattern](https://reactjs.org/docs/render-props.html#using-props-other-than-render), by passing a function as the `children` prop, thus allowing the `Form` to call back into our code with the state that it is managing for us. React Final Form [supports using either `children` or `render`](https://final-form.org/docs/react-final-form/api/Form#2-provide-a-way-to-render-the-form) as the "render prop".

Also, we are doing ES6 destructuring function arguments. So this:

```js
(formRenderProps) => {
  const handleSubmit = formRenderProps.handleSubmit
  ...
}
```

is equivalent to

```js
(formRenderProps) => {
  const { handleSubmit } = formRenderProps
  ...
}
```

is equivalent to

```js
({ handleSubmit }) => {
  ...
}
```

It just shortens the code and makes it more concise.

## Step 2 - The `Field` component

The `Field` component registers itself with the surrounding `Form` component and injects field state into the JSX via a render prop. However, for quick bootstrapping of a project, you can provide a `component="input"` (or `select` or `textarea`), and `Field` will render a standard HTML input for you with `value` and `onChange` (and `onFocus` and `onBlur`) handlers all connected properly.

So our:

```jsx
<input
  type="text"
  id="firstName"
  name="firstName"
  placeholder="First Name"
  value={firstName}
  onChange={event => setFirstName(event.target.value)}
/>
```

becomes:

```jsx
<Field
  component="input"
  type="text"
  id="firstName"
  name="firstName"
  placeholder="First Name"
/>
```

## Exercise

See if you can rewrite our form in `SignupForm.js`, without validation, using React Final Form. We'll add validation back in the next exercise.
