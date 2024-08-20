import { useState } from 'react';
// Material UI Components
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
// Icons
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import PropTypes from 'prop-types';

// CSS styling for scaling on hover
const scaleStyle = `
  .hover-effect {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .hover-effect:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
`;

const TextFieldInput = ({
  item,
  handleValue,
  deleteEl,
}) => {
  const [yesNoChecked, setYesNoChecked] = useState(true);
  const [commentsChecked, setCommentsChecked] = useState(true);
  const [imageChecked, setImageChecked] = useState(true);

  return (
    <div
      className="hover-effect mb-6 pt-4 shadow-lg rounded-lg"
      onMouseEnter={() => { }}
      onMouseLeave={() => { }}
    >
      <style>{scaleStyle}</style>
      <Paper elevation={1}>
        <Box style={{ textAlign: 'center', padding: '16px' }}>
          <DragIndicatorIcon style={{ transform: 'rotate(-90deg)', cursor: 'all-scroll' }} />
        </Box>
        <Box style={{ textAlign: 'center', padding: '16px' }}>
          <TextField
            value={item.value}
            variant="outlined"
            onChange={(e) => handleValue(item.id, e)}
            fullWidth
            placeholder="Enter Your Audit Question!"
            style={{ marginBottom: '16px' }}
            InputProps={{
              disableUnderline: true,
              style: { fontSize: '24px', fontWeight: 'bold' },
            }}
          />
          <FormControl
            component="fieldset"
            style={{
              marginTop: '10px',
              textAlign: 'center',
              border: '1px solid #ccc', // Add a border
              borderRadius: '8px', // Add border-radius
              padding: '10px', // Optional: add padding for better spacing
            }}
          >
            {/* <FormLabel component="legend">Answer Type</FormLabel> */}
            <FormGroup row style={{ justifyContent: 'center' }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={yesNoChecked}
                    onChange={() => setYesNoChecked(!yesNoChecked)}
                  />
                }
                label="Yes/No/N/A"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={commentsChecked}
                    onChange={() => setCommentsChecked(!commentsChecked)}
                  />
                }
                label="Comments"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={imageChecked}
                    onChange={() => setImageChecked(!imageChecked)}
                  />
                }
                label="Image"
              />
            </FormGroup>
          </FormControl>

        </Box>
        <Divider light />
        <Box style={{ padding: '16px' }}>
          <Tooltip title="Delete Element" aria-label="delete-element">
            <IconButton
              aria-label="delete-element"
              onClick={() => deleteEl(item.id)}
              style={{ marginLeft: '16px' }}
            >
              <DeleteOutlineOutlinedIcon color="secondary" />
            </IconButton>
          </Tooltip>
        </Box>
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
