import { useState, Fragment } from 'react';
//Material UI Components
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
//Icons
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import PropTypes from 'prop-types';

//Form Elements
import { formEl } from '../constants';

const TextFieldInput = ({
  item,
  handleValue,
  deleteEl,
  handleElType,
  duplicateElement,
}) => {

  const [isElementFocused, setIsElementFocused] = useState(false);

  const isFocused = isElementFocused;
  return (
    <div className="mb-6 pt-4 shadow-lg rounded-lg transition-all duration-300">
      <div
        className={`transition-transform duration-300 ${isFocused ? 'transform scale-105 shadow-2xl' : ''
          }`}
      >
        <Paper elevation={1}>
          <Box sx={{ textAlign: 'center' }}>
            <DragIndicatorIcon sx={{ transform: 'rotate(-90deg)', cursor: 'all-scroll' }} />
          </Box>
          <div style={{ position: 'relative' }}>
            <TextField
              value={item.value}
              variant="outlined"
              onBlur={(e) => {
                setIsElementFocused(false);
              }}
              onFocus={() => setIsElementFocused(true)}
              onChange={(e) => handleValue(item.id, e)}
              fullWidth
              placeholder="Textfield Label"
              sx={{ mb: 2 }}
              InputProps={{
                disableUnderline: true,
                style: { fontSize: '24px', fontWeight: 'bold' },
              }}
            />
            <hr
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: isElementFocused ? '100%' : '0%',
                height: isElementFocused ? '4px' : '2px',
                backgroundColor: 'black',
                transition: 'width 0.3s ease, height 0.3s ease',
              }}
            />
          </div>
          <Divider light />
          <FormGroup row sx={{ alignItems: 'center' }}>
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
  handleRequired: PropTypes.func.isRequired,
  handleElType: PropTypes.func.isRequired,
  duplicateElement: PropTypes.func.isRequired,
};

export default TextFieldInput;
