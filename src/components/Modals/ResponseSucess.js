import React, { useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { Close } from '@mui/icons-material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

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

const ResponseSuccess = ({ open, handleClose }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      // Redirect to the dashboard after 3 seconds
      const timer = setTimeout(() => {
        handleClose();
        navigate('/dashboard'); // Replace '/dashboard' with the path to your dashboard
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [open, handleClose, navigate]);

  return (
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
          Responses Successfully Submitted
        </Typography>

        {/* Black bar underneath the title with rounded ends */}
        <div style={blackBarStyle}></div>
      </div>
    </Modal>
  );
};

ResponseSuccess.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default ResponseSuccess;
