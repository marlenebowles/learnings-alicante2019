# Exercise 11 – Hooks!

Hooks are amazing; they provide an elegant solution to the complex problem of managing state in a React application. Their introduction was also the first test case for how versatile the Final Form API is.

Final Form was written to be [framework agnostic, modular, tiny, and performant](https://final-form.org/docs/final-form/philosophy). Final Form is used with Angular, Vue, and even directly with Web Components. Due to its agnosticism around framworks, it is entirely possible that the core implemention of Final Form could outlive React itself. So how did Final Form survive the migration to Hooks?

**PERFECTLY**

Because Final Form manages all your form state and simply provides a way to send updates and subscribe to changes, it was a perfect fit for the `useEffect()` hook. It was so perfect that migrating React Final Form to use hooks ended up removing a lot of duplicated code in the `componentDidMount()` and `componentDidUpdate()` lifecycle methods, reducing the bundle size even further.

## Hooks do _NOT_ replace Render Props!!!

When you use a hook that updates your component's state, the entire render function will need to run again with the new state values. When you use a component with a render prop that injects a specific value into your JSX, _only that render prop function_ need be called when that injected value changes.

Let's look at an example to demonstrate why:

```jsx
const useSecondsSinceMount = () => {
  const [seconds, setSeconds] = React.useState(0)
  React.useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds => seconds + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])
  return seconds
}

const LargeComponent = () => {
  const seconds = useSecondsSinceMount()
  return (
    <div>
      <div>SOME HUGE CONTENT</div>
      <div>{seconds} seconds</div>
      <div>MORE HUGE CONTENT</div>
    </div>
  )
}
```

The entire `<LargeComponent/>` is going to have to render every second. Do not confuse [rerendering with DOM reconciliation](https://kentcdodds.com/blog/fix-the-slow-render-before-you-fix-the-re-render)!! _BUT_, not rerendering (generating the React elements) will always be faster than rerendering. If the other things that `<LargeComponent/>` is rendering are slow to render, you could have some performance issues. Now let's look at how Render Props help:

```jsx
const WithSecondsSinceMount = ({ children }) => {
  const seconds = useSecondsSinceMount()
  return children(seconds)
}

const LargeComponent = () => {
  return (
    <div>
      <div>SOME HUGE CONTENT</div>
      <WithSecondsSinceMount>
        {seconds => <div>{seconds} seconds</div>}
      </WithSecondsSinceMount>
      <div>MORE HUGE CONTENT</div>
    </div>
  )
}
```

In this example, _only_ the part of the component displaying the elapsed seconds will rerender.

## But hooks _DO_ help!

Notice how, in the example above, we were able to trivially convert our hook-managed state into a render prop context. Having the hook available is still useful, even if using render props remains the primary API for injecting our hook-managed state.

This is precisely what React Final Form does.

As of `v5`, all of the state and subscription management of `<Field/>` is abstracted out into a `useField()` hook, providing the same `{ input, meta }` structure you are used to with the render prop API. But what good does this do you? It allows you to _build your own `<Field/>`_.

## Example

If you want a component that creates a text field?

```jsx
const TextField = ({ name }) => {
  const { input } = useField(name)
  return <input type="text" {...input} />
}
```

## Exercise

Convert all the custom input components, and `<Error/>` component in `SignUpForm.js` to use `useField()`.

- [`useField()` API docs](https://final-form.org/docs/react-final-form/api/useField)

```jsx
const Avatar = ({ profilePic, firstName, lastName }) => (
  <img src={profilePic} alt={`${firstName} ${lastName}`} />
)

const CurrentUserAvatar = () => {
  const user = useCurrentUser()
  return <Avatar {...user} />
}

export default CurrentUserAvatar
```
