## Dashboard

* #### src/layouts/dashboard/index.js
* 
The `dashboard` component is a React component that provides a comprehensive overview of user-related data and analytics. It displays various statistics, charts, and project overviews, all designed to give the user a snapshot of their activity and performance. The component integrates Firebase Firestore for fetching data and uses Material-UI and custom components from the Material Dashboard 2 React framework for styling and layout.

The `dashboard` component does not accept external props. It manages its state and behavior internally.

* #### src/layouts/dashboard/components/OrdersOverview/index.js
  
The `TextFieldInput` component is a React component designed to serve as a customizable input field for audit questions. It includes options for additional input types such as Yes/No/N/A checkboxes, comments, and image uploads. The component is flexible, allowing users to toggle these additional options on or off. It utilizes Material-UI icons and Tailwind CSS classes for styling.

The `OrdersOverview` component does not accept external props. It manages its state and behavior internally.

* #### src/layouts/dashboard/components/Projects/index.js
  
The `Projects` component is a React component that provides a detailed view of ongoing projects in a tabular format. It leverages Material-UI components and custom components from the Material Dashboard 2 React framework to create an interactive and visually appealing project management interface. The component includes a dropdown menu for additional actions and displays key project statistics, such as the number of completed projects.

The `Projects` component does not accept external props. It manages its state and behavior internally.

* #### src/layouts/dashboard/components/Projects/data/index.js

The `data` function is a utility function that generates data used by the Projects component in the Material Dashboard 2 React project. It returns an object containing columns and rows, which define the structure and content of a data table. This table is used to display information about various projects, including the associated company, team members, budget, and completion status. The function utilizes Material-UI components along with custom components from the Material Dashboard 2 React framework to create a visually appealing and informative table.

| Prop Name       | Type              | Required | Description                                                                                       |
|-----------------|-------------------|----------|---------------------------------------------------------------------------------------------------|
| `title`         | `string`         | Yes      | The text to be displayed when the user hovers over the avatar.                                    |
| `placeholder`   | `string`            | No       | Specifies the placement of the tooltip.                                                           |
| `src`           | `string`            | Yes      | The source URL of the avatar image.                                                               |
| `alt`           | `string`            | Yes      | The alt text for the avatar image, used for accessibility.                                        |
| `size`          | `string`            | No       | The size of the avatar, which can be `xs`, `sm`, `md`, `lg`, etc.                                 |
| `sx`            | `object`            | No       | Style overrides for the avatar component, allowing for custom styling.                            |
| `variant`       | `string`            | Yes      | Specifies the typography variant, such as `button`, `caption`, etc.                               |
| `color`         | `string`            | No       | The color of the text, can be one of the theme colors or custom colors.                           |
| `fontWeight`    | `string`            | No       | Specifies the font weight, such as `medium`, `bold`, etc.                                         |
| `ml`            | `num` or `string`  | No       | Margin left for spacing, can be specified in various units (e.g., `px`, `em`).                    |
| `lineHeight`    | `num` or `string`  | No       | The line height for the text.                                                                     |
| `display`       | `string`            | No       | CSS display property, such as `flex`, `block`, etc.                                               |
| `alignItems`    | `string`            | No       | Specifies alignment for flexbox children along the cross axis (e.g., `center`, `flex-start`).     |
| `py`            | `num` or `string`  | No       | Padding on the Y-axis, can be specified in various units (e.g., `px`, `rem`).                     |
| `width`         | `string`            | No       | Sets the width of the component.                                                                  |
| `textAlign`     | `string`            | No       | Sets the text alignment inside the component (e.g., `left`, `center`).                            |
| `value`         | `num`            | Yes      | Specifies the progress value as a percentage (0-100).                                             |
| `variant`       | `string`            | No       | Specifies the style variant of the progress bar, such as `gradient`.                              |
| `label`         | `bool`           | No       | Whether to display a label inside the progress bar.                                               |

