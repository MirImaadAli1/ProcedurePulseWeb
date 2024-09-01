import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { Close } from '@mui/icons-material';
import PropTypes from 'prop-types';
import ShareModal from './ShareModal'; // Import the ShareModal component

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

const blackBarStyle = {
  width: '100%',
  height: '2px',
  backgroundColor: 'black',
  marginTop: '16px',
  marginBottom: '16px',
  borderRadius: '10px',
};

const buttonStyle = {
  borderRadius: '10px',
  padding: '10px'
};

const SuccessModal = ({ open, handleClose, auditId }) => {
  const [shareOpen, setShareOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleShareOpen = () => {
    setShareOpen(true);
  };

  const handleShareClose = () => {
    setShareOpen(false);
  };

  const handleViewAudit = () => {
    // Navigate to the audit page with the given auditId
    navigate(`/audits`);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        BackdropProps={{
          style: {
            backdropFilter: 'blur(5px)', // This blurs the background
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

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <IoIosCheckmarkCircleOutline style={{ color: 'green', fontSize: '128px' }} />
          </div>
          <Typography id="modal-modal-title" variant="h6" component="h2" style={{ fontSize: '20px' }}>
            AUDIT SUCCESSFULLY CREATED
          </Typography>

          {/* Black bar underneath the title with rounded ends */}
          {/* <div style={blackBarStyle}></div> */}

          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '24px' }}>
            <Button
              variant="contained"
              color="primary"
              style={{ color: '#000000', borderRadius: '10px', backgroundColor: '#f0f0f0', padding: '10px 20px' }}
              onClick={handleViewAudit} // Add onClick handler for navigation
            >
              View Audit
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleShareOpen}
              style={{ color: 'white', backgroundColor: '#2563eb', borderRadius: '10px', padding: '10px 20px' }}
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

SuccessModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  auditId: PropTypes.string.isRequired, // Expecting auditId as a prop
};

export default SuccessModal;
