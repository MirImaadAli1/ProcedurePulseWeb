import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop validation
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import MDBox from 'components/MDBox';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { FaEnvelopeCircleCheck } from 'react-icons/fa6'; // Import the icon

const ResponseEditModal = ({ open, handleClose }) => {
    const navigate = useNavigate(); // Initialize useNavigate

    const handleViewResponse = () => {
        navigate('/yourresponses'); // Navigate to /yourresponses
        handleClose(); // Close the modal after navigation
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogContent>
                <MDBox display="flex" flexDirection="column" alignItems="center" textAlign="center">
                    <FaEnvelopeCircleCheck size={200} color="grey" /> {/* Icon with size and color */}
                    <Typography variant="body1" mt={1} mb={2}>
                        Oh, it seems like you have already responded to this audit.
                    </Typography>
                    <button className="bg-blue-600 text-white py-2 px-4 font-semibold rounded-md whitespace-nowrap mr-2"
                        onClick={handleViewResponse}
                        style={{
                            padding: '6px 16px',
                            fontSize: '0.875rem',
                            minHeight: '36px',
                        }}>
                        View Response
                    </button>
                </MDBox>
            </DialogContent>
            <DialogActions>
                {/* Removed since button is in the DialogContent */}
            </DialogActions>
        </Dialog>
    );
};

// PropTypes validation
ResponseEditModal.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
};

export default ResponseEditModal;
