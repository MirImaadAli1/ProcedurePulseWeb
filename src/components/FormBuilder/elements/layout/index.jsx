import { Fragment } from 'react'; // Importing Fragment to group multiple elements without adding extra DOM nodes.
//Material UI Components
import Box from '@material-ui/core/Box'; // Importing Box from Material-UI for layout and spacing.
import Paper from '@material-ui/core/Paper'; // Importing Paper from Material-UI to give the component a card-like appearance.
import FormGroup from '@material-ui/core/FormGroup'; // Importing FormGroup from Material-UI to group form elements.
import FormControlLabel from '@material-ui/core/FormControlLabel'; // Importing FormControlLabel to label the form control (like a switch).
import Switch from '@material-ui/core/Switch'; // Importing Switch for toggle functionality.
import Divider from '@material-ui/core/Divider'; // Importing Divider to visually separate sections.
import IconButton from '@material-ui/core/IconButton'; // Importing IconButton for clickable icons.
import Tooltip from '@material-ui/core/Tooltip'; // Importing Tooltip for displaying hints when hovering over elements.
import Grid from '@material-ui/core/Grid'; // Importing Grid for layout control.
import MenuItem from '@material-ui/core/MenuItem'; // Importing MenuItem for options in the select dropdown.
import Select from '@material-ui/core/Select'; // Importing Select for creating a dropdown list.
import InputLabel from '@material-ui/core/InputLabel'; // Importing InputLabel to label the Select dropdown.
import FormControl from '@material-ui/core/FormControl'; // Importing FormControl to wrap the Select and its label.
import PropTypes from 'prop-types'; // Importing PropTypes for type-checking props passed into the component.
//Icons
import DragIndicatorIcon from '@material-ui/icons/DragIndicator'; // Importing drag icon for UI.
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined'; // Importing delete icon for UI.
import FileCopyIcon from '@material-ui/icons/FileCopy'; // Importing copy/duplicate icon for UI.

//Form Elements
import { formEl } from '../../constants'; // Importing a constant `formEl`, likely a list of form elements and their types.

const Layout = ({
  item,
  deleteEl,
  handleRequired,
  handleElType,
  duplicateElement,
  children
}) => {
  // Destructuring props to extract individual items such as `item`, `deleteEl`, `handleRequired`, `handleElType`, `duplicateElement`, and `children`.

  return (
    <Fragment>
      {/* Paper component to wrap the layout with a card-like look and an elevation (shadow) effect */}
      <Paper elevation={1}>
        
        {/* Box used for centering the drag indicator icon */}
        <Box sx={{ textAlign: 'center' }}>
          <DragIndicatorIcon sx={{ transform: 'rotate(-90deg)', cursor: 'all-scroll' }} /> {/* Drag icon rotated for styling */}
        </Box>

        {/* Main content section */}
        <Box sx={{ p: 3 }}>
          <Grid container spacing={1}>
            
            {/* Grid to contain form element, taking 9 out of 12 columns */}
            <Grid item xs={9}>
              {children} {/* `children` prop will render any nested content within this Layout component */}
            </Grid>
            
            {/* Grid for element type selection dropdown */}
            <Grid item xs={3}>
              <FormControl fullWidth> {/* Full width control to wrap select dropdown */}
                <InputLabel id="el-type-label">Type</InputLabel> {/* Label for the dropdown */}
                <Select
                  labelId="el-type-label"
                  id="el-type"
                  label="Type"
                  value={item.type} // Value of the select dropdown based on the item type.
                  onChange={(e) => handleElType(item.id, e.target.value)} // Updates the element type when a new option is selected.
                >
                  {/* Mapping over `formEl` to create dropdown options */}
                  {formEl &&
                    formEl.map((el, key) => (
                      <MenuItem key={key} value={el.value}>
                        {el.label} {/* Displaying the label for each dropdown option */}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        {/* Divider to separate the main content from the action buttons */}
        <Divider light />

        {/* Group of action buttons (delete, duplicate, and required switch) */}
        <FormGroup row sx={{ alignItems: 'center' }}>
          
          {/* Tooltip for delete icon */}
          <Tooltip title="Delete Element" aria-label="delete-element">
            <IconButton
              aria-label="delete-element"
              onClick={() => deleteEl(item.id)} // Calls `deleteEl` with the item's id to delete it.
              sx={{ ml: 2 }} // Adds margin-left for spacing.
            >
              <DeleteOutlineOutlinedIcon color="secondary" /> {/* Delete icon with secondary color */}
            </IconButton>
          </Tooltip>

          {/* Tooltip for duplicate icon */}
          <Tooltip title="Duplicate Element" aria-label="duplicate-element">
            <IconButton
              aria-label="duplicate-element"
              onClick={() => duplicateElement(item.id, item.type)} // Calls `duplicateElement` with the item's id and type to duplicate it.
              sx={{ ml: 2 }} // Adds margin-left for spacing.
            >
              <FileCopyIcon color="secondary" /> {/* Duplicate (copy) icon with secondary color */}
            </IconButton>
          </Tooltip>

          {/* Switch to mark the element as required or not */}
          <FormControlLabel
            control={
              <Switch
                checked={item.required} // Sets the checked state based on whether the item is required.
                onChange={() => handleRequired(item.id)} // Calls `handleRequired` to toggle the required status.
                name="required-field"
                color="secondary" // Switch color set to secondary.
              />
            }
            label="Required" // Label for the switch.
            sx={{ ml: 2 }} // Adds margin-left for spacing.
          />
        </FormGroup>
      </Paper>
    </Fragment>
  );
};

// PropTypes to ensure proper data types for the props.
Layout.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired, // `item.id` is a required string.
    value: PropTypes.string, // `item.value` can be a string (optional).
    required: PropTypes.bool, // `item.required` can be a boolean (optional).
    type: PropTypes.string, // `item.type` can be a string (optional).
  }).isRequired,
  handleValue: PropTypes.func.isRequired, // `handleValue` must be a function and is required.
  deleteEl: PropTypes.func.isRequired, // `deleteEl` must be a function and is required.
  handleRequired: PropTypes.func.isRequired, // `handleRequired` must be a function and is required.
  handleElType: PropTypes.func.isRequired, // `handleElType` must be a function and is required.
  duplicateElement: PropTypes.func.isRequired, // `duplicateElement` must be a function and is required.
  children: PropTypes.node, // `children` can be any renderable node (optional).
};

export default Layout; // Exporting the Layout component for use in other parts of the application.
