import React, { useState } from 'react';
import { Modal, Typography, Button, IconButton } from '@mui/material'; // Importing Material-UI components for modal and buttons.
import { IoIosCheckmarkCircleOutline } from 'react-icons/io'; // Importing success icon.
import { Close } from '@mui/icons-material'; // Importing close icon from Material UI.
import PropTypes from 'prop-types'; // Importing PropTypes for prop validation.
import ShareModal from './ShareModal'; // Importing ShareModal component to handle audit sharing.

// Styles for the main modal
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

// Styles for the black bar below the success message
const blackBarStyle = {
  width: '100%',
  height: '2px',
  backgroundColor: 'black',
  marginTop: '16px',
  marginBottom: '16px',
  borderRadius: '10px',
};

// Styles for the buttons
const buttonStyle = {
  borderRadius: '10px',
  padding: '10px',
};

// Main SuccessModal component
const SuccessModal = ({ open, handleClose, auditId }) => {
  const [shareOpen, setShareOpen] = useState(false); // State to control visibility of ShareModal

  // Function to open the ShareModal
  const handleShareOpen = () => {
    setShareOpen(true);
  };

  // Function to close the ShareModal
  const handleShareClose = () => {
    setShareOpen(false);
  };

  return (
    <>
      {/* Modal for displaying the success message */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        BackdropProps={{
          style: {
            backdropFilter: 'blur(5px)', // Blurs the background when modal is open
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
            <Close />
          </IconButton>

          {/* Success icon and message */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <IoIosCheckmarkCircleOutline style={{ color: 'green', fontSize: '128px' }} />
          </div>
          <Typography id="modal-modal-title" variant="h6" component="h2" style={{ fontSize: '20px' }}>
            AUDIT SUCCESSFULLY CREATED
          </Typography>

          {/* Black bar below the success message */}
          <div style={blackBarStyle}></div>

          {/* Buttons for "View Audit" and "Share Audit" */}
          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '24px' }}>
            <Button
              variant="contained"
              color="primary"
              style={buttonStyle}
            >
              View Audit
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleShareOpen} // Open the ShareModal when clicked
              style={buttonStyle}
            >
              Share Audit
            </Button>
          </div>
        </div>
      </Modal>

      {/* ShareModal for sharing the audit */}
      <ShareModal open={shareOpen} handleClose={handleShareClose} auditId={auditId} />
    </>
  );
};

// PropTypes validation to ensure correct prop types
SuccessModal.propTypes = {
  open: PropTypes.bool.isRequired, // Boolean to control modal visibility
  handleClose: PropTypes.func.isRequired, // Function to close the modal
  auditId: PropTypes.string.isRequired, // Audit ID to be passed to the ShareModal
};

export default SuccessModal;
