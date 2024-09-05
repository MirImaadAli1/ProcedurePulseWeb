import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../Firebase'; // Importing Firebase db configuration.

const ViewResponseModal = ({ open, onClose, response }) => {
    const [auditData, setAuditData] = useState(null); // Stores audit questions data.
    const [responderName, setResponderName] = useState(null); // Stores responder's name.
    const [loading, setLoading] = useState(true); // Loading state.
    const [error, setError] = useState(null); // Error state.

    // Fetch audit data and responder details when the modal is open
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                // Fetch audit data from Firestore based on auditId
                const auditDoc = doc(db, 'Audit', response.auditId);
                const auditSnapshot = await getDoc(auditDoc);
                if (auditSnapshot.exists()) {
                    setAuditData(auditSnapshot.data());
                } else {
                    console.error('No such audit document!');
                    setError('No such audit document!');
                }

                // Fetch responder's name from Firestore based on responderId
                const userDoc = doc(db, 'Users', response.responderId);
                const userSnapshot = await getDoc(userDoc);
                if (userSnapshot.exists()) {
                    setResponderName(userSnapshot.data().name);
                } else {
                    console.error('No such user document!');
                    setError('No such user document!');
                }
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Error fetching data.');
            } finally {
                setLoading(false); // Ensure loading stops
            }
        };

        // Only fetch data if response contains auditId and responderId
        if (response && response.auditId && response.responderId) {
            fetchData();
        } else {
            setLoading(false);
        }
    }, [response]);

    // Don't render the modal if there's no response or the modal is not open
    if (!response || !open) return null;

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '80%',
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                }}
            >
                {loading ? (
                    <Typography variant="h6">Loading...</Typography> // Display loading state
                ) : error ? (
                    <Typography variant="h6">{error}</Typography> // Display error state
                ) : (
                    <>
                        <IconButton
                            onClick={onClose} // Close button to close the modal
                            aria-label="close"
                            sx={{ position: 'absolute', top: 8, right: 8 }}
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h3" component="h2">
                            Viewing the response of {responderName || response.responderId}
                        </Typography>
                        {auditData && auditData.questions.map((question, index) => {
                            const answer = response.answers.find(ans => ans.questionNumber === question.questionNumber); // Match question with response
                            return (
                                <Box
                                    key={index}
                                    sx={{
                                        marginBottom: 2,
                                        marginTop: 2,
                                        padding: 2,
                                        border: '1px solid #ddd',
                                        borderRadius: '10px',
                                        backgroundColor: '#f9f9f9'
                                    }}
                                >
                                    <Typography variant="subtitle1" sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                                        {question.questionNumber}: {question.value} {/* Display question */}
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontSize: '1rem' }}>
                                        {answer ? (
                                            <>
                                                {answer.comments && (
                                                    <div><strong>Comments:</strong> {answer.comments}</div> {/* Display comments */}
                                                )}
                                                {answer.yesNoNa && (
                                                    <div><strong>Yes/No:</strong> {answer.yesNoNa}</div> {/* Display yes/no answer */}
                                                )}
                                                {answer.imageUrl && answer.imageUrl !== "" ? (
                                                    <div>
                                                        <strong>Image:</strong>
                                                        <img
                                                            src={answer.imageUrl} // Display image if provided
                                                            alt={`Answer ${index}`}
                                                            style={{
                                                                maxWidth: '400px',  // Max width for the image
                                                                maxHeight: '400px', // Max height for the image
                                                                width: 'auto',
                                                                height: 'auto',
                                                                marginTop: '8px',
                                                                display: 'block',
                                                                marginRight: 'auto',
                                                                objectFit: 'contain',
                                                                borderRadius: '10px', // Rounded corners
                                                            }}
                                                        />
                                                    </div>
                                                ) : (
                                                    <div>No image provided</div> // Display fallback message if no image is provided
                                                )}
                                            </>
                                        ) : (
                                            'Not answered' // Display message if the question wasn't answered
                                        )}
                                    </Typography>

                                </Box>
                            );
                        })}
                    </>
                )}
            </Box>
        </Modal>
    );
};

// PropTypes to ensure the correct props are passed
ViewResponseModal.propTypes = {
    open: PropTypes.bool.isRequired, // Boolean to control modal visibility
    onClose: PropTypes.func.isRequired, // Function to close the modal
    response: PropTypes.shape({
        auditId: PropTypes.string.isRequired, // Audit ID to fetch related data
        responderId: PropTypes.string.isRequired, // User ID of the responder
        answers: PropTypes.arrayOf(
            PropTypes.shape({
                questionNumber: PropTypes.string.isRequired, // Question number reference
                comments: PropTypes.string, // Optional comments field
                yesNoNa: PropTypes.string, // Yes/No/NA response
                imageUrl: PropTypes.string, // Optional image URL field
            })
        ).isRequired,
    }).isRequired,
};

export default ViewResponseModal;
