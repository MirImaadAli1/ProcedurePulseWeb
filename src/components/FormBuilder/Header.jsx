import PropTypes from 'prop-types';
import { Fragment } from 'react';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

const Header = ({ title, description, setTitle, setDescription }) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Paper elevation={2}>
        <TextField
          defaultValue={title}
          onBlur={(e) => setTitle(e.target.value)}
          variant="standard"
          placeholder="Form Title"
          name="title"
          sx={{ mb: 3 }}
          fullWidth
        />
        <TextField
          name="description"
          defaultValue={description}
          onBlur={(e) => setDescription(e.target.value)}
          variant="standard"
          placeholder="Form Description"
          fullWidth
          sx={{ mb: 2 }}
          multiline
          rows={2}
        />
      </Paper>
    </Box>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  setTitle: PropTypes.func.isRequired,
  setDescription: PropTypes.func.isRequired,
};

export default Header;
