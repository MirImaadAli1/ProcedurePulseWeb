## Shared Audits

#### /src/layouts/sharedAudits/index.js
The `SharedAudit` component displays a list of audits shared with the currently authenticated user. It leverages Firebase Firestore to retrieve both audit and user data, mapping shared audits to the appropriate user names and audit titles. The data is presented in a table format using Material-UI components, with a "Respond" button available for each audit, allowing the user to navigate to a response page specific to that audit.

#### Component Props
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
