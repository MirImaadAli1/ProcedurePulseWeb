import React, { useState } from 'react'; // Importing React and the useState hook for managing component state.
import PropTypes from 'prop-types'; // Importing PropTypes for type-checking the component's props.
import { TextField } from '@mui/material'; // Importing the Material UI TextField component for input fields.

const Header = ({ title, description, setTitle, setDescription }) => {
  // Destructuring props to extract title, description, setTitle, and setDescription.
  
  // Using the useState hook to manage whether the component is hovered.
  const [isHovered, setIsHovered] = useState(false); 

  return (
    // Main container div with padding and shadow for styling, as well as mouse event handlers.
    <div
      className="mb-6 pt-4 shadow-lg rounded-lg transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)} // When mouse enters, set isHovered to true.
      onMouseLeave={() => setIsHovered(false)} // When mouse leaves, set isHovered to false.
    >
      <div
        className={`transition-transform duration-300 ${isHovered ? 'transform scale-105 shadow-2xl' : ''
          }`}
      >
        {/* Container for the color bar, with dynamic background color based on hover state */}
        <div
          style={{
            backgroundColor: isHovered ? 'green' : '#328CED', // Changes color when hovered.
            height: '8px', // Fixed height for the bar.
            transition: 'background-color 0.3s ease', // Smooth transition for color change.
          }}
          className="rounded-t-lg" // CSS class for rounded corners.
        ></div>

        {/* Main content container */}
        <div className="bg-white p-6 rounded-b-lg">
          {/* Title Input Field */}
          <div style={{ position: 'relative' }}>
            <TextField
              fullWidth // Makes the input field take up full width of the container.
              defaultValue={title} // Default value for the text field from the `title` prop.
              onChange={(e) => setTitle(e.target.value)} // Updates the `title` prop when the input changes.
              placeholder="Audit Title" // Placeholder text for the input field.
              variant="standard" // Specifies the input style variant.
              InputProps={{
                disableUnderline: true, // Disables the underline for a cleaner look.
                style: { fontSize: '34px', fontWeight: 'bold' }, // Styles the input text (large, bold).
              }}
            />
          </div>

          {/* Divider between title and description */}
          <div className="border-t-2 border-grey mb-4" />

          {/* Description Input Field */}
          <div style={{ position: 'relative' }}>
            <TextField
              fullWidth // Makes the input field take up full width of the container.
              defaultValue={description} // Default value for the text field from the `description` prop.
              onChange={(e) => setDescription(e.target.value)} // Updates the `description` prop when the input changes.
              placeholder="Form description" // Placeholder text for the input field.
              variant="outlined" // Specifies the input style variant.
              InputProps={{
                disableUnderline: true, // Disables the underline for a cleaner look.
                style: { fontSize: '20px', color: '#6B7280', marginTop: '15px' }, // Styles the input text (smaller, muted color).
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// PropTypes definition for type-checking and ensuring the required props are passed in.
Header.propTypes = {
  title: PropTypes.string.isRequired, // `title` must be a string and is required.
  description: PropTypes.string.isRequired, // `description` must be a string and is required.
  setTitle: PropTypes.func.isRequired, // `setTitle` must be a function and is required.
  setDescription: PropTypes.func.isRequired, // `setDescription` must be a function and is required.
};

// Exporting the Header component to be used in other parts of the application.
export default Header;
