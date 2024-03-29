# Exercise 12 – Third Party Inputs

The only contract a third party component needs to uphold to be _controlled_ by React Final Form is that it needs to take two things:

- A `value` prop
- An `onChange` prop

## Example

```jsx
<Field name="myValue">
  {({ input }) => (
    <SomeThirdPartyInput
      value={input.value}
      onChange={value => {
        // maybe reformat the value somehow
        input.onChange(value)
      }}
    />
  )}
</Field>
```

## Creating Custom Adapters

> [**Adapter Pattern**](https://en.wikipedia.org/wiki/Adapter_pattern)
>
> In software engineering, the adapter pattern is a software design pattern (also known as wrapper) that allows the interface of an existing class to be used as another interface. It is often used to make existing classes work with others without modifying their source code.

It's highly recommended that for each custom input component that you wish to use, you create an _adapter_ from the React Final Form API to the API of the component you would like to use.

Over the years as form state management libraries and form component libraries have been coexisting, the form component libraries have adapted to the way form state management libraries do things. As such, if you would like to use the exceedingly popular [Material-UI](https://material-ui.com) library, the `TextField` component, for example, will "just work" right out of the box if you spread the `input` variable into it just like you would for an HTML `<input/>` component.

### Adapter HOC

For third party components that accept the same props as an `<input/>`, you can write a simple function to adapt it to the React Final Form API. This is technically a [Higher Order Component](https://reactjs.org/docs/higher-order-components.html) since it is a function that takes a component and returns another component.

```js
const adapt = Component => ({ input, meta, ...rest }) => (
  <Component {...input} {...rest} />
)
```

Remember that any props that are not part of the `Field` UI will be passed directly to the input component. That's why the `...rest` is so important in our adapt function.

<!-- prettier-ignore -->
```jsx
import { TextField } from '@material-ui/core'

const AdaptedTextField = adapt(TextField)

<Field
  name="username"
  component={AdaptedTextField}
  fullWidth        // <--- part of TextField API
  label="Username" // <--- part of TextField API
  type="text"      // <--- part of TextField API
/>
```

## Exercise

Hook up the [Material UI](https://material-ui.com) form in `SignupForm.js` to React Final Form.

- [`TextField`](https://material-ui.com/components/text-fields/)
- [`Checkbox`](https://material-ui.com/components/checkboxes/)
- [`RadioGroup`](https://material-ui.com/components/radio-buttons/)
- [`Select`](https://material-ui.com/components/selects/)
- [`Button`](https://material-ui.com/components/buttons/)

🏅 For bonus points, display validation errors via Material UI's `error` and `helperText` props.
