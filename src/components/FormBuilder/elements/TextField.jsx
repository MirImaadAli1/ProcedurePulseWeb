import { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import PropTypes from 'prop-types';

const TextFieldInput = ({
  item,
  handleValue,
  handleCheckboxChange,
  deleteEl,
}) => {
  const [yesNoChecked, setYesNoChecked] = useState(item.yesNoChecked ?? true);
  const [commentsChecked, setCommentsChecked] = useState(item.commentsChecked ?? true);
  const [imageChecked, setImageChecked] = useState(item.imageChecked ?? true);

  // Use useEffect to inform the parent component of the initial checkbox states
  useEffect(() => {
    handleCheckboxChange(item.id, {
      yesNoChecked,
      commentsChecked,
      imageChecked,
    });
  }, []);

  const handleCheckbox = (key, value) => {
    if (key === 'yesNoChecked') setYesNoChecked(value);
    if (key === 'commentsChecked') setCommentsChecked(value);
    if (key === 'imageChecked') setImageChecked(value);

    handleCheckboxChange(item.id, {
      yesNoChecked: key === 'yesNoChecked' ? value : yesNoChecked,
      commentsChecked: key === 'commentsChecked' ? value : commentsChecked,
      imageChecked: key === 'imageChecked' ? value : imageChecked,
    });
  };

  return (
    <div className="hover-effect mb-6 pt-4 shadow-lg rounded-lg">
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
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '10px',
            }}
          >
            <FormGroup row style={{ justifyContent: 'center' }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={yesNoChecked}
                    onChange={() => handleCheckbox('yesNoChecked', !yesNoChecked)}
                  />
                }
                label="Yes/No/N/A"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={commentsChecked}
                    onChange={() => handleCheckbox('commentsChecked', !commentsChecked)}
                  />
                }
                label="Comments"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={imageChecked}
                    onChange={() => handleCheckbox('imageChecked', !imageChecked)}
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
    yesNoChecked: PropTypes.bool,
    commentsChecked: PropTypes.bool,
    imageChecked: PropTypes.bool,
  }).isRequired,
  handleValue: PropTypes.func.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
  deleteEl: PropTypes.func.isRequired,
};

export default TextFieldInput;
