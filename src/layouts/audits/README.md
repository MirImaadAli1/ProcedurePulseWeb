## Audits

* #### src/layouts/audits/index.js
The `audit` component is a React component designed to display and manage audit forms within a dashboard layout. It fetches audit data from Firebase, allowing users to view, edit, and delete existing audits. Well-suited for applications that require managing user-specific audit data.

| Prop Name      | Type     | Required | Description                                                                      |
|----------------|----------|----------|----------------------------------------------------------------------------------|
| `forms`        | `array`     | Yes      | An array of audit forms fetched from Firebase, displayed in `AuditsTable`.       |
| `selectedForm` | `object`   | Yes      | The audit form currently selected for editing.                                   |
| `editModalOpen`| `boolean`  | Yes      | Controls the visibility of the `EditFormModal`.                                  |
| `loading`      | `boolean`  | Yes      | Indicates whether the component is fetching data, showing a loading state.       |
| `handleEdit`   | `func` | Yes      | Passed to `AuditsTable`, opens the `EditFormModal` with the selected form.       |
| `handleDelete` | `func` | Yes      | Passed to `AuditsTable`, deletes a selected form and updates the state.          |
| `open`         | `boolean`  | Yes      | Passed to `EditFormModal`, controls whether the modal is open.                   |
| `onClose`      | `func` | Yes      | Passed to `EditFormModal`, closes the modal without saving changes.              |
| `formData`     | `object`  | Yes      | Passed to `EditFormModal`, contains the data of the form being edited.           |
| `onSave`       | `func` | Yes      | Passed to `EditFormModal`, saves changes made to the form and updates the state. |

* #### src/layouts/audits/components/Cards/index.js
The `AuditsTable` component is a React component designed to display and manage audit forms within a table layout. It offers functionalities such as viewing, editing, and deleting audit forms, as well as expanding rows to show additional details. The component integrates Firebase for fetching audit data, and it also provides a modal for viewing detailed responses to the audits. It is designed to be a part of a larger audit management system, making it easy to track and interact with multiple audits.

| Prop Name    | Type     | Required | Description                                                                      |
|--------------|----------|----------|----------------------------------------------------------------------------------|
| `forms`      | `array`    | Yes      | An array of audit forms to be displayed in the table.                             |
| `handleEdit` | `func` | Yes      | Function to initiate the editing of a selected audit form.                        |
| `handleDelete`| `func`| Yes      | Function to delete a selected audit form.                                         |

* #### src/components/FormBuilder/Header.jsx
The `EditFormModal` component is a React component designed to facilitate the editing of audit forms within a modal dialog. It allows users to update the title, description, and questions of an existing form. The component interacts with Firebase to persist changes in real-time and provides a user-friendly interface for managing form questions, including adding new questions and deleting existing ones. The modal is equipped with actions to save changes or cancel the editing process.

#### Component Props

| Prop Name  | Type     | Required | Description                                                                      |
|------------|----------|----------|----------------------------------------------------------------------------------|
| `open`     | `boolean`  | Yes      | Controls the visibility of the modal.                                            |
| `onClose`  | `func` | Yes      | Function to close the modal without saving changes.                              |
| `formData` | `object`   | Yes      | The data of the form being edited, including title, description, and questions.  |
| `onSave`   | `func` | Yes      | Function to save the updated form data and persist changes to Firebase.          |
