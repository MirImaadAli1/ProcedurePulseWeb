import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { FaCheckCircle } from 'react-icons/fa';
import PropTypes from 'prop-types';
import MDTypography from 'components/MDTypography';
import { useNavigate } from 'react-router-dom';

const AuthSuccess = ({ open, onClose, redirectPath }) => {
  const navigate = useNavigate();

  const handleProceed = () => {
    onClose(); // Close the modal
    navigate(redirectPath); // Redirect to the specified path
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '20px',
        }}
      >
        <FaCheckCircle style={{ color: 'green', fontSize: '200px' }} />
        <MDTypography variant="h4" color="textPrimary" mt={2} mb={2}>
          Operation Successful!
        </MDTypography>
        <button
          className="bg-blue-600 text-white py-2 px-4 font-semibold rounded-md whitespace-nowrap mr-2"
          onClick={handleProceed}
          style={{
            padding: '6px 16px',
            fontSize: '0.875rem',
            minHeight: '36px',
          }}
        >
          Proceed
        </button>
      </DialogContent>
    </Dialog>
  );
};

AuthSuccess.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  redirectPath: PropTypes.string.isRequired, // Add this prop type
};

export default AuthSuccess;
