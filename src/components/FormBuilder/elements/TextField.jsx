import { useState } from 'react'; // Importing the `useState` hook from React for managing state.
import PropTypes from 'prop-types'; // Importing PropTypes for type-checking the component's props.
import DragIndicatorIcon from '@material-ui/icons/DragIndicator'; // Importing the drag handle icon from Material-UI icons.
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined'; // Importing the delete icon from Material-UI icons.

const TextFieldInput = ({ item, handleValue, deleteEl }) => {
  // Destructuring props to extract the `item`, `handleValue`, and `deleteEl` functions.

  return (
    // Main container for the input, with hover effects and shadow for visual styling.
    <div className="mb-6 pt-4 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
      
      {/* Container for the drag handle icon */}
      <div className="bg-white p-4 text-center">
        <div className="transform rotate-[-90deg] cursor-grab"> {/* Rotates the drag handle for visual styling */}
          <DragIndicatorIcon /> {/* Drag handle icon */}
        </div>
      </div>

      {/* Input field for the audit question */}
      <div className="bg-white p-4 text-center">
        <input
          type="text"
          value={item.value} // Value of the input field comes from the `item.value` prop.
          onChange={(e) => handleValue(item.id, e)} // When the input changes, `handleValue` is called with the `item.id` and event.
          placeholder="Enter Your Audit Question!" // Placeholder text for the input field.
          className="w-full border border-gray-300 rounded-md py-2 px-4 mb-4 text-lg font-bold" // Tailwind CSS classes for styling.
        />
      </div>

      {/* Delete button container */}
      <div className="p-3 flex justify-start items-center">
        <button
          onClick={() => deleteEl(item.id)} // Calls `deleteEl` with the `item.id` to delete the current element.
          className="text-red-600 hover:text-red-800 transition-colors duration-300 flex items-center" // Button styling and hover effect.
          aria-label="delete-element" // Accessibility label for screen readers.
        >
          <DeleteOutlineOutlinedIcon className="mr-1" /> {/* Delete icon */}
          Delete Question
        </button>
      </div>
    </div>
  );
};

// Defining PropTypes for the `TextFieldInput` component to ensure proper prop types are passed.
TextFieldInput.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired, // `item.id` is a required string.
    value: PropTypes.string.isRequired, // `item.value` is a required string.
  }).isRequired,
  handleValue: PropTypes.func.isRequired, // `handleValue` must be a function and is required.
  deleteEl: PropTypes.func.isRequired, // `deleteEl` must be a function and is required.
};

export default TextFieldInput; // Exporting the `TextFieldInput` component to be used elsewhere in the app.
