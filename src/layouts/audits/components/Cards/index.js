import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ form }) => {
  return (
    <div style={cardStyle}>
      <h3 style={titleStyle}>{form.title}</h3>
      <p style={descriptionStyle}>{form.description}</p>
      <button style={buttonStyle}>View Form</button>
    </div>
  );
};

const cardStyle = {
  border: '1px solid #ccc',
  borderRadius: '8px',
  padding: '16px',
  width: '300px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#fff',
  margin: '16px',
};

const titleStyle = {
  fontSize: '1.5rem',
  marginBottom: '8px',
};

const descriptionStyle = {
  fontSize: '1rem',
  marginBottom: '16px',
  color: '#555',
};

const buttonStyle = {
  padding: '8px 16px',
  backgroundColor: '#328CED',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

// Adding PropTypes for form, form.title, and form.description
Card.propTypes = {
  form: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default Card;
