## Authentication

* #### src/layouts/authentication/authFailure.js
The `AuthFailure` component is a React component designed to display an error message in a modal dialog when an authentication operation fails. It provides a visual indication of the failure with a red error icon, offerong users an option to close the modal and try the operation again.

| Prop Name    | Type     | Required | Description                                                                      |
|--------------|----------|----------|----------------------------------------------------------------------------------|
| `open`       | `boolean`  | Yes      | Controls the visibility of the modal.                                            |
| `onClose`    | `func` | Yes      | Function to close the modal.                                                     |
| `errorMessage` | `string` | No       | The error message to display inside the modal.                                   |



* #### src/layouts/authentication/authSuccess.js
The `AuthSuccess` component is a React component designed to display a success message in a modal dialog after an operation is successfully completed. It provides visual confirmation with a green checkmark icon and includes a button to proceed to a specified path. Ito utilizes React Router's useNavigate for handling navigation upon user confirmation.

| Prop Name    | Type     | Required | Description                                                                      |
|--------------|----------|----------|----------------------------------------------------------------------------------|
| `open`       | `boolean`  | Yes      | Controls the visibility of the modal.                                            |
| `onClose`    | `func` | Yes      | Function to close the modal.                                                     |
| `redirectPath` | `string` | Yes      | The path to navigate to after the user clicks the "Proceed" button.              |



* #### src/layouts/authentication/sign-in/index.js
This `Basic` component is a React component designed for user authentication, specifically for signing in. It provides a user interface for inputting an email and password, with options to remember the user. Upon successful sign-in, it displays a success modal and redirects the user to the dashboard. If the sign-in fails, an error modal is displayed with the relevant error message. The component leverages Firebase for authentication.

#### Component Props

This `Basic` component does not accept external props. It manages its state and behavior internally.

* #### src/layouts/authentication/sign-up/index.js

#### Overview

The `Basic` component is a React component designed for user registration (sign-up). It provides a user-friendly interface for inputting a username, email, and password. Upon successful sign-up, the user is redirected to the sign-in page, and their details are saved in Firebase Firestore. If the sign-up process fails, an error message is displayed in a modal. The component utilizes Firebase for user authentication and Firestore for storing user details.

#### Component Props

This `Basic` component does not accept external props. It manages its state and behavior internally.

* #### src/layouts/authentication/reset-password/cover/index.js

The Cover component is a React component designed for a password reset page. It provides a user interface for users to input their email address and request a password reset. 

#### Component Props

This `Cover` component does not accept external props. It manages its state and behavior internally.

* #### src/layouts/authentication/components/BasicLayout/index.js

The `BasicLayout` component is a React layout component designed to provide a consistent and visually appealing background for authentication pages or other full-page layouts. It features a customizable background image with optional dark mode support. The layout centers its children within the viewport, making it ideal for forms, cards, or other central content.

#### Component Props

| Prop Name  | Type     | Required | Description                                                                      |
|------------|----------|----------|----------------------------------------------------------------------------------|
| `image`    | `string`   | Yes      | The URL of the background image to be displayed.                                 |
| `children` | `node`     | Yes      | The content to be displayed within the centered grid, such as forms or cards.    |

* #### src/layouts/authentication/components/CoverLayout/index.js

The `CoverLayout` component is a React layout component designed to provide a visually appealing cover section for authentication pages or other important content. The layout centers its children within a specific portion of the viewport, making it ideal for forms or other central content.

#### Component Props

| Prop Name    | Type     | Required | Description                                                                      |
|--------------|----------|----------|----------------------------------------------------------------------------------|
| `coverHeight`| `string`   | No       | The height of the cover section. Defaults to '35vh'.                              |
| `image`      | `string`   | Yes      | The URL of the background image to be displayed.                                 |
| `children`   | `node`     | Yes      | The content to be displayed within the centered grid, such as forms or cards.    |

* #### src/layouts/authentication/components/Footer/index.js

The `Footer` component is a React component designed to provide a footer section at the bottom of the page. It features customizable text and links, with an option to adjust the color scheme based on a light or dark mode setting. The footer is designed to be responsive, adjusting its layout for different screen sizes.

#### Component Props

| Prop Name  | Type     | Required | Description                                                                      |
|------------|----------|----------|----------------------------------------------------------------------------------|
| `light`    | `boolean`  | No       | Determines the color scheme of the footer. If true, the footer uses a light color scheme. Defaults to false. |





