## CreateAudit

### /src/layouts/createAudit/index.js

#### Overview

The CreateAudit component is a React component designed to facilitate the creation of audit forms within a dashboard layout, helps manage these audits as well. It integrates the FormBuilder component, allowing users to dynamically build and manage audit forms.

#### Component Props

| Prop Name | Type   | Required | Description                                                   | Relations/Connections |
|-----------|--------|----------|---------------------------------------------------------------|-----------------------|
| `columns` | `array`  | Yes      | The columns configuration for the data tables displayed.      | Retrieved from `authorsTableData` and `projectsTableData`. |
| `rows`    | `array` | Yes      | The rows data for the tables displayed within the component.  | Retrieved from `authorsTableData` and `projectsTableData`. |
