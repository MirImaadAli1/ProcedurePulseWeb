import { useState } from 'react';
// Material UI Components
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import FormGroup from '@material-ui/core/FormGroup';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
// Icons
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import PropTypes from 'prop-types';

const TextFieldInput = ({
  item,
  handleValue,
  deleteEl,
}) => {
  const [isElementFocused, setIsElementFocused] = useState(false);

  // Function to handle focus state
  const handleElementFocus = () => {
    setIsElementFocused(true);
  };

  // Function to handle blur state (when clicking outside the element)
  const handleElementBlur = () => {
    setIsElementFocused(false);
  };

  return (
    <div
      className={`mb-6 pt-4 shadow-lg rounded-lg transition-all duration-300 ${isElementFocused ? 'transform scale-105 shadow-2xl' : ''}`}
      onClick={handleElementFocus} // Handle focus on click
      onBlur={handleElementBlur} // Handle blur on clicking outside
      tabIndex="0" // Make the element focusable
    >
      <Paper elevation={1}>
        <Box sx={{ textAlign: 'center' }}>
          <DragIndicatorIcon sx={{ transform: 'rotate(-90deg)', cursor: 'all-scroll' }} />
        </Box>
        <div style={{ position: 'relative' }}>
          <TextField
            value={item.value}
            variant="outlined"
            onChange={(e) => handleValue(item.id, e)}
            fullWidth
            placeholder="Textfield Label"
            sx={{ mb: 2 }}
            InputProps={{
              disableUnderline: true,
              style: { fontSize: '24px', fontWeight: 'bold' },
            }}
            // Remove focus/blur handlers from the TextField
          />
        </div>
        <Divider light />
        <FormGroup row sx={{ alignItems: 'center', justifyContent: 'center' }}>
          <Tooltip title="Delete Element" aria-label="delete-element">
            <IconButton
              aria-label="delete-element"
              onClick={() => deleteEl(item.id)}
              sx={{ ml: 2 }}
            >
              <DeleteOutlineOutlinedIcon color="secondary" />
            </IconButton>
          </Tooltip>
        </FormGroup>
      </Paper>
    </div>
  );
};

TextFieldInput.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    required: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  handleValue: PropTypes.func.isRequired,
  deleteEl: PropTypes.func.isRequired,
};

export default TextFieldInput;
