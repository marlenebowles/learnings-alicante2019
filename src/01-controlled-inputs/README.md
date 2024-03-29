# Exercise 1 – Controlled Inputs with `React.useState`

The React unidirectional dataflow model strongly encourages using "controlled inputs".

---

## In React parlance, **a "controlled component" is one whose internal state is dictated by its parent** (via props).

[Read the React docs on "Controlled Components"](https://reactjs.org/docs/forms.html#controlled-components).

---

With the standard HTML form components, such as `<input>`, `<textarea>`, and `<select>`, if you do not pass a `value` prop (or pass `undefined`), the component will be **_uncontrolled_**, allowing the underlying DOM component to manage its own value state. If you pass a `value` prop, the input will cede all control of its value state to its parent, and the value of the input will _only ever be_ what is passed in as the `value` prop. For example:

```jsx
<input type="text" name="username" value="erikras" />
```

The value for that input will only ever be `'erikras'`, no matter how hard you bang on the keyboard to change it.

To make it controlled, the responsibility falls to the developer – that's you! – to manage every change to the value of the form.

# `React.useState`

[Read React docs](https://reactjs.org/docs/hooks-reference.html#usestate). `React.useState` allows us to maintain (read and write) one value of state across renders of our component. Every time your state changes, your component will rerender with the new value. Behold, the ubiquitous "counter" example:

```jsx
function MyCounter() {
  const [count, setCount] = React.useState(0)

  return (
    <button type="button" onClick={() => setCount(count + 1)}>
      {count}
    </button>
  )
}
```

How do we manage an input's value with `React.useState`? Using the `onChange` handler!

```jsx
function MyTextInput() {
  // it cannot be undefined, or the input will be uncontrolled!
  const [value, setValue] = React.useState('')

  return (
    <input
      name="firstName"
      type="text"
      value={value}
      onChange={event => {
        // The new value is in event.target.value.
        // See: https://reactjs.org/docs/forms.html
        setValue(event.target.value)
      }}
    />
  )
}
```

Now we have a controlled input!

## Exercise

Modify `SignupForm.js` so that the inputs are controlled. Maintain the values of firstName, lastName and email in local state using `React.useState`, and call `onSubmit` with the two values when the form is submitted.
