## - Modals:
------------------------------------
* #### /src/components/Modals/ShareModal.js
ShareModal is a React component designed for sharing content or resources with other users. It provides input fields for specifying recipient details, typically using email addresses or usernames. The component also includes options for selecting the content to be shared and a button to execute the sharing action.

| **Prop Name** | **Type**  | **Required** | **Description** | **Relationships/Connections** |
|---------------|-----------|--------------|---------------------------------------------------------------------------------|----------------------------------------------------------------------------|
| `open`        | `bool`    | Yes          | Controls whether the `ShareModal` is open (`true`) or closed (`false`).         | Managed by `SuccessModal`'s state (`shareOpen`). Passed down as a prop from `SuccessModal`. |
| `handleClose` | `func`    | Yes          | Callback function to close the `ShareModal`. It updates the state in the parent component. | Connected to the `open` prop. Passed down from `SuccessModal`'s `handleShareClose` function. |
| `auditId`     | `string`  | Yes          | The ID of the audit being shared. Used to track and store which audit is being shared with selected users. | Passed from `SuccessModal` as a prop. Used in Firestore operations to identify the audit being shared. |

* #### /src/components/Modals/SuccessModal.js
SuccessModal is a React component that displays a confirmation message to users after successfully completing an action, such as submitting a form or saving data.

| **Prop Name** | **Type**  | **Required** | **Description** | **Relationships/Connections** |
|---------------|-----------|--------------|---------------------------------------------------------------------------------|----------------------------------------------------------------------------|
| `open`        | `bool`    | Yes          | Controls whether the `SuccessModal` is open (`true`) or closed (`false`).       | Typically managed by the parent component’s state. Controls the visibility of the `SuccessModal`. |
| `handleClose` | `func`    | Yes          | Callback function to close the `SuccessModal`. It should update the state that controls the `open` prop. | Relates to the `open` prop. When invoked, it changes `open` to `false`, closing the modal. Also indirectly related to `ShareModal` because it closes the modal that triggers the share functionality. |
| `auditId`     | `string`  | Yes          | The ID of the audit that was created, used to pass to the `ShareModal` for sharing. | Passed down to the `ShareModal` component. The `ShareModal` uses this ID for Firestore operations related to sharing the audit. |
