import PropTypes from 'prop-types';

const Header = ({ title, description, setTitle, setDescription }) => {
  return (
    <div className="mb-6 pt-4 shadow-lg rounded-lg">
      {/* Purple Bar */}
      <div style={{ backgroundColor: '#328CED' }} className="h-2 rounded-t-lg"></div>

      <div className="bg-white p-6 rounded-b-lg">
        {/* Title Input */}
        <input
          type="text"
          defaultValue={title}
          onBlur={(e) => setTitle(e.target.value)}
          placeholder="Untitled form"
          className="w-full text-2xl font-semibold text-gray-900 focus:outline-none mb-2"
        />

        {/* Black Line */}
        <hr className="border-t-2 border-black mb-2" />

        {/* Description Input */}
        <input
          type="text"
          defaultValue={description}
          onBlur={(e) => setDescription(e.target.value)}
          placeholder="Form description"
          className="w-full text-base text-gray-500 focus:outline-none"
        />
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
