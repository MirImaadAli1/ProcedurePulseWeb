## FormBuilder

* #### src/components/FormBuilder/elements/layout/index.jsx
The `Layout` component is a reusable React component designed to provide a structured layout for form elements. The component supports dynamic form element handling, including deletion, duplication, type selection, and setting the "required" status. The Layout component is highly customizable, allowing developers to pass child components that represent specific form elements.

| Prop Name        | Type       | Required | Description                                                                                                                                    | Relations/Connections                                                                                              |
|------------------|------------|----------|------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------|
| item           |  `object`     | Yes      | An object representing the form element. It contains `id`, `value`, `required`, and `type` properties.                                          | Connected to all form element handler functions (`handleValue`, `deleteEl`, `handleRequired`, `handleElType`).      |
| handleValue    | `func`   | Yes      | Function to handle changes in the form element's value.                                                                                         | Used in child components for updating the value of the specific form element represented by `item`.                |
| deleteEl       | `func`   | Yes      | Function to delete the form element.                                                                                                            | Tied to the delete icon button, allowing the removal of the form element represented by `item`.                    |
| duplicateElement | Function | Yes      | Function to duplicate the form element.                                                                                                         | Tied to the duplicate icon button, allowing the duplication of the form element represented by `item`.             |
| children       | `node`       | No       | React children components that represent the specific form element to be rendered within the `Layout`.                                           | Directly rendered within the `Grid` component, providing the visual representation of the form element.            |


* #### src/components/FormBuilder/elements/TextField.jsx
The `TextFieldInput` component is a React component designed to serve as a customizable input field for audit questions. It includes options for additional input types such as Yes/No/N/A checkboxes, comments, and image uploads. The component is flexible, allowing users to toggle these additional options on or off. It utilizes Material-UI icons and Tailwind CSS classes for styling.

| Prop Name             | Type       | Required | Description                                                                                                                | Relations/Connections                                                                                              |
|-----------------------|------------|----------|----------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------|
| `item`                | `object`     | Yes      | An object representing the text field element. It contains `id`, `value`, `yesNoChecked`, `commentsChecked`, and `imageChecked` properties. | Connected to all functions handling value and checkbox changes (`handleValue`, `handleCheckboxChange`).              |
| `handleValue`         | `func`   | Yes      | Function to handle changes in the text field's value.                                                                      | Used in the input field for updating the value of the text field represented by `item`.                             |
| `handleCheckboxChange`| `func`   | Yes      | Function to handle the changes in the checkbox selections (Yes/No/N/A, Comments, Image).                                   | Tied to the checkbox inputs, enabling updates to the corresponding properties in `item`.                            |
| `deleteEl`            | `func`   | Yes      | Function to delete the text field element.                                                                                 | Tied to the delete button, allowing the removal of the text field element represented by `item`.                    |


* #### src/components/FormBuilder/Header.jsx
The `Header` component is a React component designed to serve as a dynamic and customizable header for an audit form. It includes inputs for a title and a description, which can be edited in place. Material-UI's TextField is used for the input fields, and the component is styled using both Tailwind CSS and inline styles.

#### Component Props

| Prop Name        | Type     | Required | Description                                                                                           | Relations/Connections                                                                                          |
|------------------|----------|----------|-------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------|
| `title`          | `string`   | Yes      | The title of the form or audit. It is displayed as a large, bold text and can be edited by the user.   | Used in the `TextField` component for setting the initial value and updating the title via `setTitle`.          |
| `description`    | `string`   | Yes      | The description of the form or audit. It provides additional context and can also be edited.           | Used in the `TextField` component for setting the initial value and updating the description via `setDescription`. |
| `setTitle`       | `func` | Yes      | A function to update the title state in the parent component.                                          | Connected to the `onChange` event of the title `TextField` to handle updates to the title value.                |
| `setDescription` | `func` | Yes      | A function to update the description state in the parent component.                                    | Connected to the `onChange` event of the description `TextField` to handle updates to the description value.     |


* #### src/components/FormBuilder/index.jsx

#### Overview

The `FormBuilder` component is a powerful React tool for creating dynamic, customizable forms. It allows users to add, reorder, and configure form elements on the fly, with real-time data storage handled by Firebase.

#### Component Props

`FormBuilder` is a self-contained component and does not accept any props. All state and functionality are managed within the component itself.
