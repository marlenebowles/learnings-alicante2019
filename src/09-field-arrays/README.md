# Exercise 9 – Field Arrays

The vast majority of forms do not need to manage an array of fields. For that reason, field array support is _not_ included in React Final Form's core package.

You'll need to install two additional packages.

- `final-form-arrays`: A collection of "mutators" to enable array manipulation in Final Form
- `react-final-form-arrays`: A React library that provides a `<FieldArray/>` component

```bash
yarn add final-form-arrays react-final-form-arrays
```

## Step 1: Provide mutators to `<Form/>`

<!-- prettier-ignore -->
```jsx
import arrayMutators from 'final-form-arrays'

const MyForm = () => (
  <Form onSubmit={onSubmit} mutators={arrayMutators}>
    //                      ^^^^^^^^^^^^^^^^^^^^^^^^
    {({ handleSubmit, pristine, invalid }) => (
      <form onSubmit={handleSubmit}>

        ...fields...

      </form>
    )}
  </Form>
)
```

## Step 2: Use `<FieldArray/>`

`<FieldArray/>` provides, via render prop, two things:

- `fields`: an array-like object contains _strings_ of field names, needed to give to `<Field/>`, which has the following properties that make it "array-like":
  - `fields.concat()`
  - `fields.forEach()`
  - `fields.insert()`
  - `fields.length`
  - `fields.map()`
  - `fields.pop()`
  - `fields.push()`
  - `fields.remove()`
  - `fields.shift()`
  - `fields.unshift()`
- `meta`: some metadata about the array, much like the `meta` provided by `<Field/>`

<!-- prettier-ignore -->
```jsx
import { FieldArray } from 'react-final-form-arrays'

<FieldArray name="customers">
  {({ fields }) => (
    <div>
      {fields.map((name, index) => (
        <div key={name}>
          <div>
            <label>First Name</label>
            <Field
              // Remember, the name is a string, like 'customers[0]',
              // so the name prop for this field will be 'customers[0].firstName'
              name={`${name}.firstName`}
              component="input"
            />
          </div>
          <div>
            <label>Last Name</label>
            <Field name={`${name}.lastName`} component="input" />
          </div>
          <button
            type="button"
            // This is how we would remove an item from the array
            onClick={() => fields.remove(index)}
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        // This is how we would add a new item to the end of the array
        onClick={() => fields.push({ firstName: '', lastName: '' })}
      >
        Add
      </button>
    </div>
  )}
</FieldArray>
```

## Exercise

Add the ability to add a list of hobbies to `SignUpForm.js`, such that the submitted form data looks like this:

```json
{
  "firstName": "Erik",
  "lastName": "Rasmussen",
  "hobbies": ["reading", "guitar", "coding"]
}
```
