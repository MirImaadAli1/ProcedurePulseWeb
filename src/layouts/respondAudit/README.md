## Respond Audits

#### /src/layouts/respondAudit/index.js
The `RespondAudit` component allows users to respond to an audit by answering a set of questions, submitting comments, and uploading images. It interacts with Firebase Firestore to fetch the audit data, store user responses, and manage any associated files.

#### Component Props
| **Prop Name**       | **Type**  | **Required** | **Description**                                                                 | **Relationships/Connections**                                      |
|---------------------|-----------|--------------|---------------------------------------------------------------------------------|--------------------------------------------------------------------|
| `auditId`           | `string`  | Yes          | The ID of the audit to which the user is responding. This ID is used to fetch the audit data from Firestore and associate the responses with the correct audit. | Passed from the route parameters via `useParams`. Used in Firestore operations to identify and fetch the audit. |
| `setAuditOwner`     | `func`    | No           | Function to set the `auditOwner` state, which tracks the user ID of the audit's creator. | Connected to the `auditId` to fetch the relevant user ID from Firestore. |
| `handleTextChange`  | `func`    | Yes          | Function to handle changes in text input fields, updating the `answers` state.  | Connected to text fields within each question component. Updates the `answers` state. |
| `handleRadioChange` | `func`    | Yes          | Function to handle changes in radio buttons, updating the `answers` state.      | Connected to radio button inputs within each question component. Updates the `answers` state. |
| `handleImageChange` | `func`    | Yes          | Function to handle image uploads and update the `answers` state with the image URL. | Connected to image input fields within each question component. Utilizes Firebase Storage to upload images and retrieve URLs. |
| `handleSubmit`      | `func`    | Yes          | Function to submit all responses, saving them to Firestore under the `Responses` collection. | Executes the Firestore operations to store responses associated with the `auditId` and `auditOwner`. |
