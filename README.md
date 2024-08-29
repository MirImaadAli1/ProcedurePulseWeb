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

##Test

## Documentation

The documentation for the MD components can be found [here](https://www.creative-tim.com/learning-lab/react/overview/material-dashboard/?ref=readme-mdr).

The documentation for our original components can be found below:

### FormBuilder

#### Overview
The Layout component is a reusable React component designed to provide a structured layout for form elements. It utilizes Material-UI components to create a visually consistent and user-friendly interface. The component supports dynamic form element handling, including deletion, duplication, type selection, and setting the "required" status. The Layout component is highly customizable, allowing developers to pass child components that represent specific form elements.

#### Component Props

| Prop Name        | Type       | Required | Description                                                                                                                                    | Relations/Connections                                                                                              |
|------------------|------------|----------|------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------|
| item           | Object     | Yes      | An object representing the form element. It contains `id`, `value`, `required`, and `type` properties.                                          | Connected to all form element handler functions (`handleValue`, `deleteEl`, `handleRequired`, `handleElType`).      |
| handleValue    | Function   | Yes      | Function to handle changes in the form element's value.                                                                                         | Used in child components for updating the value of the specific form element represented by `item`.                |
| deleteEl       | Function   | Yes      | Function to delete the form element.                                                                                                            | Tied to the delete icon button, allowing the removal of the form element represented by `item`.                    |
| duplicateElement | Function | Yes      | Function to duplicate the form element.                                                                                                         | Tied to the duplicate icon button, allowing the duplication of the form element represented by `item`.             |
| children       | Node       | No       | React children components that represent the specific form element to be rendered within the `Layout`.                                           | Directly rendered within the `Grid` component, providing the visual representation of the form element.            |


#### State
The Layout component does not manage its own state. Instead, it relies on the parent component to pass down the necessary data and handler functions via props.
#### LifeCycle Methods
The Layout component is a functional component and does not utilize any lifecycle methods directly. However, it uses the Fragment component to wrap its content, ensuring that no unnecessary DOM elements are added.
#### Methods
handleElType(id: string, value: string)
This method is passed down as a prop and is used to handle changes in the form element's type. When a new type is selected from the dropdown, this function is called with the id of the element and the new value selected.
handleRequired(id: string)
This method toggles the "required" status of a form element. It's triggered when the user interacts with the switch component.
deleteEl(id: string)
This method deletes the form element. It's invoked when the delete icon button is clicked.
duplicateElement(id: string, type: string)
This method duplicates the form element, creating a new one with the same type and properties. It is triggered when the duplicate icon button is clicked.


### Modals:

#### src/components/Modals/ShareModal.js

| **Prop Name** | **Type**  | **Required** | **Description** | **Relationships/Connections** |
|---------------|-----------|--------------|---------------------------------------------------------------------------------|----------------------------------------------------------------------------|
| `open`        | `bool`    | Yes          | Controls whether the `ShareModal` is open (`true`) or closed (`false`).         | Managed by `SuccessModal`'s state (`shareOpen`). Passed down as a prop from `SuccessModal`. |
| `handleClose` | `func`    | Yes          | Callback function to close the `ShareModal`. It updates the state in the parent component. | Connected to the `open` prop. Passed down from `SuccessModal`'s `handleShareClose` function. |
| `auditId`     | `string`  | Yes          | The ID of the audit being shared. Used to track and store which audit is being shared with selected users. | Passed from `SuccessModal` as a prop. Used in Firestore operations to identify the audit being shared. |

#### src/components/Modals/SuccessModal.js

| **Prop Name** | **Type**  | **Required** | **Description** | **Relationships/Connections** |
|---------------|-----------|--------------|---------------------------------------------------------------------------------|----------------------------------------------------------------------------|
| `open`        | `bool`    | Yes          | Controls whether the `SuccessModal` is open (`true`) or closed (`false`).       | Typically managed by the parent component’s state. Controls the visibility of the `SuccessModal`. |
| `handleClose` | `func`    | Yes          | Callback function to close the `SuccessModal`. It should update the state that controls the `open` prop. | Relates to the `open` prop. When invoked, it changes `open` to `false`, closing the modal. Also indirectly related to `ShareModal` because it closes the modal that triggers the share functionality. |
| `auditId`     | `string`  | Yes          | The ID of the audit that was created, used to pass to the `ShareModal` for sharing. | Passed down to the `ShareModal` component. The `ShareModal` uses this ID for Firestore operations related to sharing the audit. |


### What's included

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
