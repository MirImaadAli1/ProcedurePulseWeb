# ProcedurePulse Audit Website
![Image](https://s3.amazonaws.com/creativetim_bucket/products/71/original/material-dashboard-react.jpg?1638950990)

Our professional auditing website is designed for managers and employers to effortlessly create, share, and manage audits, prioritizing a streamlined and efficient auditing process. 
ProcedurePulse has been created with prebuilt design blocks.

Special thanks go to:

- [Nepcha Analytics](https://nepcha.com?ref=readme) for the analytics tool. Nepcha is already integrated with Material Dashboard React. You can use it to gain insights into your sources of traffic.

**Documentation built by Developers**

Each Material Dashboard 2 React (MD) element has existing documentation which can be found [here](https://www.creative-tim.com/learning-lab/react/overview/material-dashboard/).

#### Special thanks

During the development of this dashboard, we have used many existing resources from awesome developers. We want to thank them for providing their tools open source:

- [MUI](https://mui.com/) - The React UI library for faster and easier web development.
- [React ChartJS 2](http://reactchartjs.github.io/react-chartjs-2/#/) - Simple yet flexible React charting for designers & developers.
- [ChromaJS](https://gka.github.io/chroma.js/) - A small-ish zero-dependency JavaScript library for all kinds of color conversions and color scales.

## Table of Contents

- [Versions](#versions)
- [Quick Start](#quick-start)
- [Deploy](#deploy)
- [Documentation](#documentation)
- [File Structure](#file-structure)
- [Browser Support](#browser-support)
- [Resources](#resources)
- [Reporting Issues](#reporting-issues)
- [Technical Support or Questions](#technical-support-or-questions)
- [Licensing](#licensing)
- [Useful Links](#useful-links)

## Versions

<img src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/react-logo.png?raw=true" width="60" height="60" />

| React |
| ----- |

## Terminal Commands

1. Download and Install NodeJs LTS version from [NodeJs Official Page](https://nodejs.org/en/download/).
2. Navigate to the root ./ directory of the product and run `npm install` to install our local dependencies.

## Deploy

:rocket: You can deploy your own version of the template to Genezio with one click:

[![Deploy to Genezio](https://raw.githubusercontent.com/Genez-io/graphics/main/svg/deploy-button.svg)](https://app.genez.io/start/deploy?repository=https://github.com/creativetimofficial/material-dashboard-react&utm_source=github&utm_medium=referral&utm_campaign=github-creativetim&utm_term=deploy-project&utm_content=button-head)

# Documentation

The documentation for the MD components can be found [here](https://www.creative-tim.com/learning-lab/react/overview/material-dashboard/?ref=readme-mdr).

The documentation for our original components can be found below:

## - FormBuilder

##### src/components/FormBuilder/elements/layout/index.jsx

#### Overview
The Layout component is a reusable React component designed to provide a structured layout for form elements. The component supports dynamic form element handling, including deletion, duplication, type selection, and setting the "required" status. The Layout component is highly customizable, allowing developers to pass child components that represent specific form elements.

#### Component Props

| Prop Name        | Type       | Required | Description                                                                                                                                    | Relations/Connections                                                                                              |
|------------------|------------|----------|------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------|
| item           |  `object`     | Yes      | An object representing the form element. It contains `id`, `value`, `required`, and `type` properties.                                          | Connected to all form element handler functions (`handleValue`, `deleteEl`, `handleRequired`, `handleElType`).      |
| handleValue    | `func`   | Yes      | Function to handle changes in the form element's value.                                                                                         | Used in child components for updating the value of the specific form element represented by `item`.                |
| deleteEl       | `func`   | Yes      | Function to delete the form element.                                                                                                            | Tied to the delete icon button, allowing the removal of the form element represented by `item`.                    |
| duplicateElement | Function | Yes      | Function to duplicate the form element.                                                                                                         | Tied to the duplicate icon button, allowing the duplication of the form element represented by `item`.             |
| children       | `node`       | No       | React children components that represent the specific form element to be rendered within the `Layout`.                                           | Directly rendered within the `Grid` component, providing the visual representation of the form element.            |

###### src/components/FormBuilder/elements/TextField.jsx

#### Overview
The TextFieldInput component is a React component designed to serve as a customizable input field for audit questions. It includes options for additional input types such as Yes/No/N/A checkboxes, comments, and image uploads. The component is flexible, allowing users to toggle these additional options on or off. It utilizes Material-UI icons and Tailwind CSS classes for styling.

#### Component Props:

| Prop Name             | Type       | Required | Description                                                                                                                | Relations/Connections                                                                                              |
|-----------------------|------------|----------|----------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------|
| `item`                | `object`     | Yes      | An object representing the text field element. It contains `id`, `value`, `yesNoChecked`, `commentsChecked`, and `imageChecked` properties. | Connected to all functions handling value and checkbox changes (`handleValue`, `handleCheckboxChange`).              |
| `handleValue`         | `func`   | Yes      | Function to handle changes in the text field's value.                                                                      | Used in the input field for updating the value of the text field represented by `item`.                             |
| `handleCheckboxChange`| `func`   | Yes      | Function to handle the changes in the checkbox selections (Yes/No/N/A, Comments, Image).                                   | Tied to the checkbox inputs, enabling updates to the corresponding properties in `item`.                            |
| `deleteEl`            | `func`   | Yes      | Function to delete the text field element.                                                                                 | Tied to the delete button, allowing the removal of the text field element represented by `item`.                    |

###### src/components/FormBuilder/Header.jsx

#### Overview

The Header component is a React component designed to serve as a dynamic and customizable header for an audit form. It includes inputs for a title and a description, which can be edited in place. Material-UI's TextField is used for the input fields, and the component is styled using both Tailwind CSS and inline styles.

#### Component Props

| Prop Name        | Type     | Required | Description                                                                                           | Relations/Connections                                                                                          |
|------------------|----------|----------|-------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------|
| `title`          | `string`   | Yes      | The title of the form or audit. It is displayed as a large, bold text and can be edited by the user.   | Used in the `TextField` component for setting the initial value and updating the title via `setTitle`.          |
| `description`    | `string`   | Yes      | The description of the form or audit. It provides additional context and can also be edited.           | Used in the `TextField` component for setting the initial value and updating the description via `setDescription`. |
| `setTitle`       | `func` | Yes      | A function to update the title state in the parent component.                                          | Connected to the `onChange` event of the title `TextField` to handle updates to the title value.                |
| `setDescription` | `func` | Yes      | A function to update the description state in the parent component.                                    | Connected to the `onChange` event of the description `TextField` to handle updates to the description value.     |

###### src/components/FormBuilder/index.jsx

#### Overview

The FormBuilder component is a powerful React tool for creating dynamic, customizable forms. It allows users to add, reorder, and configure form elements on the fly, with real-time data storage handled by Firebase.

#### Component Props

FormBuilder is a self-contained component and does not accept any props. All state and functionality are managed within the component itself.

## - Modals:

###### src/components/Modals/ShareModal.js

| **Prop Name** | **Type**  | **Required** | **Description** | **Relationships/Connections** |
|---------------|-----------|--------------|---------------------------------------------------------------------------------|----------------------------------------------------------------------------|
| `open`        | `bool`    | Yes          | Controls whether the `ShareModal` is open (`true`) or closed (`false`).         | Managed by `SuccessModal`'s state (`shareOpen`). Passed down as a prop from `SuccessModal`. |
| `handleClose` | `func`    | Yes          | Callback function to close the `ShareModal`. It updates the state in the parent component. | Connected to the `open` prop. Passed down from `SuccessModal`'s `handleShareClose` function. |
| `auditId`     | `string`  | Yes          | The ID of the audit being shared. Used to track and store which audit is being shared with selected users. | Passed from `SuccessModal` as a prop. Used in Firestore operations to identify the audit being shared. |

###### src/components/Modals/SuccessModal.js

| **Prop Name** | **Type**  | **Required** | **Description** | **Relationships/Connections** |
|---------------|-----------|--------------|---------------------------------------------------------------------------------|----------------------------------------------------------------------------|
| `open`        | `bool`    | Yes          | Controls whether the `SuccessModal` is open (`true`) or closed (`false`).       | Typically managed by the parent component’s state. Controls the visibility of the `SuccessModal`. |
| `handleClose` | `func`    | Yes          | Callback function to close the `SuccessModal`. It should update the state that controls the `open` prop. | Relates to the `open` prop. When invoked, it changes `open` to `false`, closing the modal. Also indirectly related to `ShareModal` because it closes the modal that triggers the share functionality. |
| `auditId`     | `string`  | Yes          | The ID of the audit that was created, used to pass to the `ShareModal` for sharing. | Passed down to the `ShareModal` component. The `ShareModal` uses this ID for Firestore operations related to sharing the audit. |

## - CreateAudit

###### src/layouts/createAudit/index.js

#### Overview

The CreateAudit component is a React component designed to facilitate the creation of audit forms within a dashboard layout, helps manage these audits as well. It integrates the FormBuilder component, allowing users to dynamically build and manage audit forms.
#### Component Props

| Prop Name | Type   | Required | Description                                                   | Relations/Connections |
|-----------|--------|----------|---------------------------------------------------------------|-----------------------|
| `columns` | `array`  | Yes      | The columns configuration for the data tables displayed.      | Retrieved from `authorsTableData` and `projectsTableData`. |
| `rows`    | `array` | Yes      | The rows data for the tables displayed within the component.  | Retrieved from `authorsTableData` and `projectsTableData`. |

## - States

###### src/components/States/caughtUp.js
- CaughtUp Component: The `CaughtUp` component is a simple React functional component that displays a message indicating that the user is "all caught up." It uses Material-UI for layout and styling, and react-icons to display a green checkmark icon.

###### src/components/States/empty.js
- EmptyState Component: The `EmptyState` component provides a visual placeholder for empty states in the UI. 

###### src/components/States/loading.js
Loading Component: The `Loading` component is a React functional component that displays a loading indicator with an hourglass icon and a "loading" message.

## - Respond Audit

###### src/layouts/respondAudit/index.js
The `RespondAudit` component allows users to respond to an audit by answering a set of questions, submitting comments, and uploading images. It interacts with Firebase Firestore to fetch the audit data, store user responses, and manage any associated files.

| **Prop Name**       | **Type**  | **Required** | **Description**                                                                 | **Relationships/Connections**                                      |
|---------------------|-----------|--------------|---------------------------------------------------------------------------------|--------------------------------------------------------------------|
| `auditId`           | `string`  | Yes          | The ID of the audit to which the user is responding. This ID is used to fetch the audit data from Firestore and associate the responses with the correct audit. | Passed from the route parameters via `useParams`. Used in Firestore operations to identify and fetch the audit. |
| `setAuditOwner`     | `func`    | No           | Function to set the `auditOwner` state, which tracks the user ID of the audit's creator. | Connected to the `auditId` to fetch the relevant user ID from Firestore. |
| `handleTextChange`  | `func`    | Yes          | Function to handle changes in text input fields, updating the `answers` state.  | Connected to text fields within each question component. Updates the `answers` state. |
| `handleRadioChange` | `func`    | Yes          | Function to handle changes in radio buttons, updating the `answers` state.      | Connected to radio button inputs within each question component. Updates the `answers` state. |
| `handleImageChange` | `func`    | Yes          | Function to handle image uploads and update the `answers` state with the image URL. | Connected to image input fields within each question component. Utilizes Firebase Storage to upload images and retrieve URLs. |
| `handleSubmit`      | `func`    | Yes          | Function to submit all responses, saving them to Firestore under the `Responses` collection. | Executes the Firestore operations to store responses associated with the `auditId` and `auditOwner`. |

## - Shared Audits

###### src/layouts/sharedAudits/index.js
The `SharedAudit` component displays a list of audits shared with the currently authenticated user. It leverages Firebase Firestore to retrieve both audit and user data, mapping shared audits to the appropriate user names and audit titles. The data is presented in a table format using Material-UI components, with a "Respond" button available for each audit, allowing the user to navigate to a response page specific to that audit.

| **Prop Name**        | **Type**  | **Required** | **Description**                                                                 | **Relationships/Connections**                                              |
|----------------------|-----------|--------------|---------------------------------------------------------------------------------|----------------------------------------------------------------------------|
| `auditId`            | `string`  | Yes          | The ID of the audit that is being shared. Used to retrieve and display audit details. | Retrieved from Firestore in the `fetchData` function, used to link the audit to the response. |
| `setRows`            | `func`    | No           | Function to set the state of `rows`, which contains data for the `DataTable`.   | Populated within the `useEffect` hook after fetching data from Firestore.   |
| `handleRespondClick` | `func`    | Yes          | Function to handle clicks on the "Respond" button, navigating the user to the `RespondAudit` page. | Connected to the `Button` component for each audit. Uses the `useNavigate` hook to redirect. |
| `userMap`            | `object`  | No           | An object mapping user IDs to names, used to display the name of the user who shared each audit. | Populated by fetching user data from Firestore in the `fetchData` function. |
| `auditMap`           | `object`  | No           | An object mapping audit IDs to their titles, used to display the title of each shared audit. | Populated by fetching audit data from Firestore in the `fetchData` function. |
| `loading`            | `bool`    | No           | A boolean state that determines if the data is still loading. Displays a loading spinner if true. | Managed within the `useEffect` hook. Controls the display of `Loading` or `EmptyState` components. |
| `noData`             | `bool`    | No           | A boolean state that indicates if there are no shared audits to display.       | Managed within the `useEffect` hook. Controls the display of `EmptyState` component. |
| `columns`            | `array`   | Yes          | Array defining the columns of the `DataTable`, including headers and accessors. | Passed as a prop to the `DataTable` component to structure the table layout. |
| `rows`               | `array`   | Yes          | Array containing the data to be displayed in the `DataTable`.                   | Set in the `fetchData` function after processing Firestore data.            |
| `fetchData`          | `func`    | No           | Function triggered in the `useEffect` hook on component mount to fetch user and audit data from Firestore. | Populates `rows`, `userMap`, and `auditMap`. Connects data to `DataTable`. |
| `handleRespondClick` | `func`    | Yes          | Handles the "Respond" button click, navigating the user to `RespondAudit` page. | Uses `useNavigate` to redirect, using the `auditId` to link to the correct audit. |

## - Audit Search

###### src/layouts/audit-search/index.js
The `AuditSearch` component provides a user interface for searching and viewing audits in a table format. It fetches audit data from Firestore, excluding the current user's own audits, and uses Fuse.js for fuzzy searching of audit titles. The component includes a search bar for filtering audits by title and displays results in a table with options to respond to each audit.

| **Prop Name**        | **Type**    | **Required** | **Description**                                                                                     | **Relationships/Connections**                                                                                           |
|----------------------|-------------|--------------|-----------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| `rows`               | `array`     | No           | Array of audit objects formatted for display in the table.                                          | Populated with audit data from Firestore. Includes creator, title, creation date, and action button.                  |
| `searchTerm`         | `string`    | No           | Current value of the search input field.                                                             | Used to filter audit rows based on title via Fuse.js search results.                                                     |
| `filteredRows`       | `array`     | No           | Array of audit rows filtered by the search term.                                                     | Updated based on the results of the fuzzy search performed by Fuse.js.                                                  |
| `fuse`               | `object`    | No           | Instance of Fuse.js used for fuzzy searching of audit titles.                                        | Initialized with audit data for performing search operations.                                                            |
| `userMap`            | `object`    | No           | Mapping of user IDs to user names, used to display creator names in the table.                        | Populated with user data from the 'Users' collection in Firestore.                                                        |
| `handleSearch`       | `function`  | Yes          | Handles input changes in the search field and updates filtered results based on the search term.      | Updates `searchTerm` and filters `rows` based on the search term using Fuse.js.                                         |
| `fetchData`          | `function`  | Yes          | Fetches audit data and user information from Firestore and initializes Fuse.js for search functionality. | Populates `rows`, `userMap`, and `fuse` with data fetched from Firestore.                                                |
| `columns`            | `array`     | No           | Defines the columns for the DataTable component.                                                     | Includes columns for creator, title, created date, and action button.                                                   |

## - Notifications

###### src/layouts/notifications/index.js
The `Notifications` component fetches and displays a list of audit-related notifications for the currently logged-in user. It retrieves data from Firebase Firestore, including details about the audit and the sender, and presents this information in a list. Each notification includes a clickable area that navigates the user to a response page for the audit.

| **Prop Name**     | **Type**    | **Required** | **Description**                                                                                  | **Relationships/Connections**                                                                                                                                           |
|-------------------|-------------|--------------|--------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `notifications`   | `array`     | No           | Array holding the notifications fetched from Firestore.                                          | Populated by fetching data from the 'Notifications' collection in Firestore. Includes sender’s name, audit title, and shared timestamp, sorted by `sharedAt` in descending order. |
| `loading`         | `bool`      | No           | Indicates whether the component is in a loading state.                                           | Managed internally, used to conditionally render a loading spinner or the notifications.                                                                                 |
| `navigate`        | `function`  | Yes          | React Router hook used to navigate to different routes.                                          | Used in `handleNotificationClick` to navigate to the RespondAudit page for the clicked audit notification.                                                               |
| `handleNotificationClick` | `function`  | Yes          | Handles the click event for each notification, navigating to the audit response page. | Triggered when a notification is clicked, leveraging `navigate` to route the user to the corresponding audit response page.                                               |



## What's included

Within the download you'll find the following directories and files:

```
material-dashboard-react
    ├── public
    │   ├── apple-icon.png
    │   ├── favicon.png
    │   ├── index.html
    │   ├── manifest.json
    │   └── robots.txt
    ├── src
    │   ├── assets
    │   │   ├── images
    │   │   └── theme
    │   │       ├── base
    │   │       ├── components
    │   │       ├── functions
    │   │       ├── index.js
    │   │       └── theme-rtl.js
    │   │   └── theme-dark
    │   │       ├── base
    │   │       ├── components
    │   │       ├── functions
    │   │       ├── index.js
    │   │       └── theme-rtl.js
    │   ├── components
    │   │   ├── MDAlert
    │   │   ├── MDAvatar
    │   │   ├── MDBadge
    │   │   ├── MDBox
    │   │   ├── MDButton
    │   │   ├── MDInput
    │   │   ├── MDPagination
    │   │   ├── MDProgress
    │   │   ├── MDSnackbar
    │   │   └── MDTypography
    │   ├── context
    │   ├── examples
    │   │   ├── Breadcrumbs
    │   │   ├── Cards
    │   │   ├── Charts
    │   │   ├── Configurator
    │   │   ├── Footer
    │   │   ├── Items
    │   │   ├── LayoutContainers
    │   │   ├── Lists
    │   │   ├── Navbars
    │   │   ├── Sidenav
    │   │   ├── Tables
    │   │   └── Timeline
    │   ├── layouts
    │   │   ├── authentication
    │   │   ├── billing
    │   │   ├── dashboard
    │   │   ├── notifications
    │   │   ├── profile
    │   │   ├── rtl
    │   │   └── tables
    │   ├── App.js
    │   ├── index.js
    │   └── routes.js
    ├── .eslintrc.json
    ├── .prettierrc.json
    ├── CHANGELOG.md
    ├── ISSUE_TEMPLATE.md
    ├── jsconfig.json
    ├── LICENSE.md
    ├── package.json
    └── README.md
```

## Browser Support

At present, we officially aim to support the last two versions of the following browsers:

<img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/chrome.png" width="64" height="64"> <img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/firefox.png" width="64" height="64"> <img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/edge.png" width="64" height="64"> <img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/safari.png" width="64" height="64"> <img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/opera.png" width="64" height="64">

## Resources

- Documentation is [here](https://www.creative-tim.com/learning-lab/react/overview/material-dashboard/?ref=readme-mdr)
- [Nepcha Analytics](https://nepcha.com?ref=readme) - Analytics tool for your website

## Technical Support or Questions

If you have questions please [contact us](mailto:aurora.technologies@outlook.com).

## Licensing

- Copyright 2023 [Creative Tim](https://www.creative-tim.com?ref=readme-mdr)
- Creative Tim [license](https://www.creative-tim.com/license?ref=readme-mdr)
