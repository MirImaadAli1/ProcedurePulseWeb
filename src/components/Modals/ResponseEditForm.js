import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogContent, DialogActions, Typography } from '@mui/material';
import MDBox from 'components/MDBox';
import { useNavigate } from 'react-router-dom';
import { FaEnvelopeCircleCheck } from 'react-icons/fa6';

const ResponseEditModal = ({ open, handleClose }) => {
    const navigate = useNavigate(); // Hook for navigation

    // Navigate to /yourresponses and close the modal
    const handleViewResponse = () => {
        navigate('/yourresponses');
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogContent>
                <MDBox display="flex" flexDirection="column" alignItems="center" textAlign="center">
                    {/* Display the check icon */}
                    <FaEnvelopeCircleCheck size={200} color="grey" />
                    {/* Message text */}
                    <Typography variant="body1" mt={1} mb={2}>
                        Oh, it seems like you have already responded to this audit.
                    </Typography>
                    {/* Button to view the response */}
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
                {/* Actions section is empty as button is in the content */}
            </DialogActions>
        </Dialog>
    );
};

// PropTypes validation to enforce correct prop types
ResponseEditModal.propTypes = {
    open: PropTypes.bool.isRequired, // Modal open state is required and must be a boolean
    handleClose: PropTypes.func.isRequired, // Function to handle closing the modal
};

export default ResponseEditModal;
