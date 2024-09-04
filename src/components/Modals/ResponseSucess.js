import React, { useEffect } from 'react';
import { Modal, Typography, IconButton } from '@mui/material';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io'; // Importing success icon
import { Close } from '@mui/icons-material'; // Importing close icon from Material UI
import PropTypes from 'prop-types'; // Importing PropTypes for prop validation
import { useNavigate } from 'react-router-dom'; // Importing useNavigate for redirection

// Modal style for positioning and design
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: 'white',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  padding: '24px',
  textAlign: 'center',
  borderRadius: '10px',
  position: 'relative', // For positioning the close button
};

// Style for black bar under the success message
const blackBarStyle = {
  width: '100%',
  height: '2px',
  backgroundColor: 'black',
  marginTop: '16px',
  marginBottom: '16px',
  borderRadius: '10px',
};

const ResponseSuccess = ({ open, handleClose }) => {
  const navigate = useNavigate();

  // Effect to automatically close the modal and redirect after 1 second
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        handleClose(); // Close the modal
        navigate('/dashboard'); // Redirect to dashboard
      }, 1000);

      return () => clearTimeout(timer); // Clear the timer if the component unmounts
    }
  }, [open, handleClose, navigate]);

  return (
    <Modal
      open={open}
      onClose={handleClose} // Close modal when clicking outside
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      BackdropProps={{
        style: {
          backdropFilter: 'blur(5px)', // Blurs the background when the modal is open
        },
      }}
    >
      <div style={modalStyle}>
        {/* Close button in the top-right corner */}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          style={{ position: 'absolute', top: '8px', right: '8px' }}
        >
          <Close /> {/* Close icon */}
        </IconButton>

        {/* Success icon and text */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <IoIosCheckmarkCircleOutline style={{ color: 'green', fontSize: '128px' }} /> {/* Success icon */}
        </div>

        {/* Success message */}
        <Typography id="modal-modal-title" variant="h6" component="h2" style={{ fontSize: '20px' }}>
          Responses Successfully Submitted
        </Typography>

        {/* Black bar below the message */}
        <div style={blackBarStyle}></div>
      </div>
    </Modal>
  );
};

// PropTypes validation for the open and handleClose props
ResponseSuccess.propTypes = {
  open: PropTypes.bool.isRequired, // Boolean to control if modal is open
  handleClose: PropTypes.func.isRequired, // Function to handle modal closing
};

export default ResponseSuccess;
