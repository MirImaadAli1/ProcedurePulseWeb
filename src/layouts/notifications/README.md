## Notifications

#### /src/layouts/notifications/index.js
The `Notifications` component fetches and displays a list of audit-related notifications for the currently logged-in user. It retrieves data from Firebase Firestore, including details about the audit and the sender, and presents this information in a list. Each notification includes a clickable area that navigates the user to a response page for the audit.

#### Component Props
| **Prop Name**     | **Type**    | **Required** | **Description**                                                                                  | **Relationships/Connections**                                                                                                                                           |
|-------------------|-------------|--------------|--------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `notifications`   | `array`     | No           | Array holding the notifications fetched from Firestore.                                          | Populated by fetching data from the 'Notifications' collection in Firestore. Includes sender’s name, audit title, and shared timestamp, sorted by `sharedAt` in descending order. |
| `loading`         | `bool`      | No           | Indicates whether the component is in a loading state.                                           | Managed internally, used to conditionally render a loading spinner or the notifications.                                                                                 |
| `navigate`        | `function`  | Yes          | React Router hook used to navigate to different routes.                                          | Used in `handleNotificationClick` to navigate to the RespondAudit page for the clicked audit notification.                                                               |
| `handleNotificationClick` | `function`  | Yes          | Handles the click event for each notification, navigating to the audit response page. | Triggered when a notification is clicked, leveraging `navigate` to route the user to the corresponding audit response page.                                               |
