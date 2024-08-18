import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';

const Header = ({ title, description, setTitle, setDescription }) => {
  const [isTitleFocused, setIsTitleFocused] = useState(false);
  const [isDescriptionFocused, setIsDescriptionFocused] = useState(false);

  const isFocused = isTitleFocused || isDescriptionFocused;

  return (
    <div className="mb-6 pt-4 shadow-lg rounded-lg transition-all duration-300">
      <div
        className={`transition-transform duration-300 ${
          isFocused ? 'transform scale-105 shadow-2xl' : ''
        }`}
      >
        {/* Color Bar */}
        <div
          style={{
            backgroundColor: isFocused ? 'green' : '#328CED',
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
              defaultValue={title}
              onBlur={(e) => {
                setIsTitleFocused(false);
                setTitle(e.target.value);
              }}
              onFocus={() => setIsTitleFocused(true)}
              placeholder="Untitled Audit"
              variant="standard"
              InputProps={{
                disableUnderline: true,
                style: { fontSize: '42px', fontWeight: 'bold' },
              }}
            />
            <hr
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: isTitleFocused ? '100%' : '0%',
                height: isTitleFocused ? '4px' : '2px',
                backgroundColor: 'black',
                transition: 'width 0.3s ease, height 0.3s ease',
              }}
            />
          </div>

          {/* Space between Title and Description */}
          <div className="border-t-2 border-black mb-4" />

          {/* Description Input */}
          <div style={{ position: 'relative' }}>
            <TextField
              fullWidth
              defaultValue={description}
              onBlur={(e) => {
                setIsDescriptionFocused(false);
                setDescription(e.target.value);
              }}
              onFocus={() => setIsDescriptionFocused(true)}
              placeholder="Form description"
              variant="standard"
              InputProps={{
                disableUnderline: true,
                style: { fontSize: '30px', color: '#6B7280' },
              }}
            />
            <hr
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: isDescriptionFocused ? '100%' : '0%',
                height: isDescriptionFocused ? '4px' : '2px',
                backgroundColor: 'black',
                transition: 'width 0.3s ease, height 0.3s ease',
              }}
            />
          </div>
          <div className="border-t-2 border-black mb-4" />
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
