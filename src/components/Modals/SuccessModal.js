import React, { useState } from 'react';
import { Box, Modal, Typography, Button } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PropTypes from 'prop-types';
import ShareModal from './ShareModal'; // Import the ShareModal component

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  textAlign: 'center',
  borderRadius: '10px',
};

const SuccessModal = ({ open, handleClose, auditId }) => {
  const [shareOpen, setShareOpen] = useState(false);
  console.log("hai prequel", auditId)

  const handleShareOpen = () => {
    setShareOpen(true);
  };

  const handleShareClose = () => {
    setShareOpen(false);
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
        <Box sx={style}>
          <CheckCircleIcon style={{ color: 'green', fontSize: 'lg' }} />
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mt: 2 }}>
            AUDIT SUCCESSFULLY CREATED
          </Typography>
          <Box sx={{ width: '100%', height: '2px', bgcolor: 'black', my: 2 }} />
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Would you like to share your audit?
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 3 }}>
            <Button variant="contained" onClick={handleClose}>Close</Button>
            <Button variant="contained" color="primary" onClick={handleShareOpen}>Share</Button>
          </Box>
        </Box>
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
