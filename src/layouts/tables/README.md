## Tables

* #### src/layouts/tables/index.js

The `Tables` component is designed to display tabular data using two separate tables: one for authors and one for projects. It leverages the `DataTable` component to present data in a structured format, using Material-UI for styling and layout. Each table is placed within a `Card` component, with a header that specifies the table's title. The data for these tables is fetched from predefined data functions `authorsTableData` and `projectsTableData`.

| **Prop Name**       | **Type**  | **Required** | **Description**                                                                 |
|---------------------|-----------|--------------|---------------------------------------------------------------------------------|
| `columns`           | `array`   | Yes          | Defines the structure of the table, including headers and how data is accessed. |
| `rows`              | `array`   | Yes          | Contains the actual data to be displayed in the table.                          |
| `isSorted`          | `bool`    | No           | Determines whether the table columns are sortable. Default is `false`.          |
| `entriesPerPage`    | `bool`    | No           | Controls the pagination of the table. If `false`, all rows are displayed.       |
| `showTotalEntries`  | `bool`    | No           | Decides whether to display the total number of entries in the table.            |
| `noEndBorder`       | `bool`    | No           | Removes the border at the end of the table rows if set to `true`.               |

* #### src/layouts/tables/data/authorsTableData.js

The `data` function generates configuration and data for a table in Material Dashboard 2 React that displays project details. The table includes columns for the project name, budget, status, completion progress, and actions. Each row represents a different project, showing relevant information such as its name, budget, current status, progress, and available actions.

| **Prop Name**  | **Type**      | **Required** | **Description**                                                               |
|----------------|---------------|--------------|-------------------------------------------------------------------------------|
| `image`        | `string`      | Yes          | The URL of the image representing the project, displayed as an avatar.        |
| `name`         | `string`      | Yes          | The name of the project. Displayed next to the project avatar.                |
| `color`        | `string`      | Yes          | The color of the progress bar indicating the project completion percentage.   |
| `value`        | `number`      | Yes          | The percentage value representing the completion of the project.              |
