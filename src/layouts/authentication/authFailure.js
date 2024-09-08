import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { FaTimesCircle } from 'react-icons/fa';
import PropTypes from 'prop-types';
import MDTypography from 'components/MDTypography';

const AuthFailure = ({ open, onClose, errorMessage }) => {
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
        <FaTimesCircle style={{ color: 'red', fontSize: '40px' }} />
        <MDTypography variant="h4" color="textPrimary" mt={2}>
        Error!
        </MDTypography>
        {/* Display the custom error message */}
        <MDTypography variant="body1" color="textSecondary" mt={2} mb={2}>
        Invalid Username/Password
        </MDTypography>
        <button className="bg-blue-600 text-white py-2 px-4 font-semibold rounded-md whitespace-nowrap mr-2"
          onClick={onClose}
          style={{
            padding: '6px 16px',
            fontSize: '0.875rem',
            minHeight: '36px',
          }}>
          Try Again!
        </button>
      </DialogContent>
    </Dialog>
  );
};

AuthFailure.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};

export default AuthFailure;
