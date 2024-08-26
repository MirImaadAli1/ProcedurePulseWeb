import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';

const TextFieldInput = ({
  item,
  handleValue,
  handleCheckboxChange,
  deleteEl,
}) => {
  const [yesNoChecked, setYesNoChecked] = useState(item.yesNoChecked ?? true);
  const [commentsChecked, setCommentsChecked] = useState(item.commentsChecked ?? true);
  const [imageChecked, setImageChecked] = useState(item.imageChecked ?? true);

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
        <div className="border border-gray-300 rounded-md p-2">
          <div className="flex justify-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={yesNoChecked}
                onChange={() => handleCheckbox('yesNoChecked', !yesNoChecked)}
                className="mr-2"
              />
              Yes/No/N/A
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={commentsChecked}
                onChange={() => handleCheckbox('commentsChecked', !commentsChecked)}
                className="mr-2"
              />
              Comments
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={imageChecked}
                onChange={() => handleCheckbox('imageChecked', !imageChecked)}
                className="mr-2"
              />
              Image
            </label>
          </div>
        </div>
      </div>
      <div className="p-4">
        <button
          onClick={() => deleteEl(item.id)}
          className="text-red-600 hover:text-red-800 transition-colors duration-300"
          aria-label="delete-element"
        >
          <DeleteOutlineOutlinedIcon />
        </button>
      </div>
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
