import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';

const Header = ({ title, description, setTitle, setDescription }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="mb-6 pt-4 shadow-lg rounded-lg transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`transition-transform duration-300 ${isHovered ? 'transform scale-105 shadow-2xl' : ''}`}
      >
        {/* Color Bar */}
        <div
          style={{
            backgroundColor: isHovered ? 'green' : '#328CED',
            height: '8px', // Fixed height
            transition: 'background-color 0.3s ease',
          }}
          className="rounded-t-lg"
        ></div>

        <div className="bg-white p-6 rounded-b-lg">
          {/* Title Input */}
          <div style={{ position: 'relative' }}>
            <TextField
              fullWidth
              value={title} // Use value instead of defaultValue
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Audit Title"
              variant="standard"
              InputProps={{
                disableUnderline: true,
                style: { fontSize: '34px', fontWeight: 'bold' },
              }}
            />
          </div>

          {/* Space between Title and Description */}
          <div className="border-t-2 border-grey mb-4" />

          {/* Description Input */}
          <div style={{ position: 'relative' }}>
            <TextField
              fullWidth
              value={description} // Use value instead of defaultValue
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Form description"
              variant="outlined"
              InputProps={{
                disableUnderline: true,
                style: { fontSize: '20px', color: '#6B7280', marginTop: '15px' },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  setTitle: PropTypes.func.isRequired,
  setDescription: PropTypes.func.isRequired,
};

export default Header;
