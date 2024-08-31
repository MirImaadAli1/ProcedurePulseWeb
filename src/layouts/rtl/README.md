## RTL

* #### src/layouts/rtl/index.js

The `RTL` component is part of the Material Dashboard 2 React and is designed to support right-to-left (RTL) languages, such as Arabic. It utilizes the Material UI framework and several custom components to display a dashboard with statistics, charts, and project overviews. The component switches the layout direction to RTL when it is mounted and reverts to the standard left-to-right (LTR) layout when it is unmounted.

Here's a table of component props in an adjustable format for your `.md` or `.ml` file:

| **Prop Name** | **Type** | **Required** | **Description** |
|---------------|----------|--------------|-----------------|
| `color`       | `string` | No           | Defines the color scheme for the component (e.g., `dark`, `success`, `primary`). |
| `icon`        | `string` | No           | The icon to display within the component, typically from Material Icons. |
| `title`       | `string` | Yes          | The title text displayed in the component, indicating what the data represents. |
| `count`       | `string` OR `number` | Yes          | The numerical value or count that the component is displaying. |
| `percentage`  | `object` | No           | An object that includes `color`, `amount`, and `label` to indicate percentage change and related label. |
| `description` | `string` OR `node` | No           | Additional text or content that provides more details about the data displayed. |
| `date`        | `string` | No           | A date or time reference related to the data shown in the component. |
| `chart`       | `object` | Yes          | The chart configuration and data, typically for line or bar charts. |
| `children`    | `node`   | No           | The content or components to be rendered within the parent component. |

* #### src/layouts/rtl/components/OrdersOverview/index.js

The `OrdersOverview` component is a React component from the Material Dashboard 2 React template that provides a summary of order-related activities. It features a timeline that tracks important order events, including design changes, new orders, and payment updates. The component is displayed within a styled card and utilizes Material-UI components for layout and design. The timeline items are color-coded to indicate the status or type of the event.

| **Prop Name** | **Type** | **Required** | **Description** |
|---------------|----------|--------------|-----------------|
| `color`       | `string` | Yes           | The color of the timeline item, indicating the type or status of the event (e.g., `success`, `error`, `info`, `warning`, `primary`). |
| `icon`        | `string` | Yes           | The icon to display alongside the timeline item, usually from Material Icons. |
| `title`       | `string` | Yes           | The title or main text of the timeline item, describing the event. |
| `dateTime`    | `string` | Yes           | The date and time associated with the timeline event, providing context on when the event occurred. |
| `lastItem`    | `bool`   | No            | A boolean indicating if the timeline item is the last in the sequence, affecting the display of the timeline line. |              |


* #### src/layouts/rtl/components/Projects/index.js

The `Projects` component in Material Dashboard 2 React is a card component that displays a list of projects in a table format. It provides a summary of completed projects for the current month, with an option to interact with each project through a dropdown menu. The component leverages Material-UI components for styling and layout, and it uses the `DataTable` component to render the list of projects.

| **Prop Name**   | **Type**   | **Required** | **Description**                                              |
|-----------------|------------|--------------|--------------------------------------------------------------|
| `columns`       | `array`    | Yes          | Defines the structure of the data table, including headers and alignment. |
| `rows`          | `array`    | Yes          | Contains the data to be displayed in the table, aligned with the `columns` structure. |
| `showTotalEntries` | `bool`  | No           | Determines whether the total number of entries is displayed at the bottom of the table. Default is `false`. |
| `isSorted`      | `bool`     | No           | Specifies whether the table is sorted. Default is `false`.    |
| `noEndBorder`   | `bool`     | No           | Removes the bottom border of the table if set to `true`. Default is `false`. |
| `entriesPerPage`| `bool`     | No           | Controls whether the table has pagination enabled. Default is `false`. |


* #### src/layouts/rtl/components/Projects/data/index.js

The `data` function provides the structure and content for a data table that lists various projects, including their budgets, completion statuses, and team members. It uses Material Dashboard 2 React components like `MDBox`, `MDTypography`, `MDAvatar`, and `MDProgress` to create a visually appealing and informative table. Each project entry displays its name, associated team members, budget, and a progress bar indicating the completion level.

| **Prop Name** | **Type**      | **Required** | **Description**                                                |
|---------------|---------------|--------------|----------------------------------------------------------------|
| `columns`     | `array`       | Yes          | Defines the table's structure, including headers and alignment. |
| `rows`        | `array`       | Yes          | Contains the data to be displayed in the table, aligned with the `columns` structure. |
| `Header`      | `string`      | Yes          | Specifies the label for the table column.                       |
| `accessor`    | `string`      | Yes          | Key used to retrieve the value for each column in the `rows` data. |
| `width`       | `string`      | No           | Determines the width of the column, often used for alignment.   |
| `align`       | `string`      | No           | Sets the alignment of the content within the column.            |
