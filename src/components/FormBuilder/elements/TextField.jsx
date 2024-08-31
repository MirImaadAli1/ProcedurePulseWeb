import { useState } from 'react';
import PropTypes from 'prop-types';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';

const TextFieldInput = ({ item, handleValue, deleteEl }) => {
  return (
    <div className="mb-6 pt-4 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
      <div className="bg-white p-4 text-center">
        <div className="transform rotate-[-90deg] cursor-grab">
          <DragIndicatorIcon />
        </div>
      </div>
      <div className="bg-white p-4 text-center">
        <input
          type="text"
          value={item.value}
          onChange={(e) => handleValue(item.id, e)}
          placeholder="Enter Your Audit Question!"
          className="w-full border border-gray-300 rounded-md py-2 px-4 mb-4 text-lg font-bold"
        />
      </div>
      <div className="p-3 flex justify-start items-center">
        <button
          onClick={() => deleteEl(item.id)}
          className="text-red-600 hover:text-red-800 transition-colors duration-300 flex items-center"
          aria-label="delete-element"
        >
          <DeleteOutlineOutlinedIcon className="mr-1" /> Delete Question
        </button>
      </div>
    </div>
  );
};

TextFieldInput.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired,
  handleValue: PropTypes.func.isRequired,
  deleteEl: PropTypes.func.isRequired,
};

export default TextFieldInput;
