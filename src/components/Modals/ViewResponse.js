import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../Firebase'; // Update with your actual path to the Firebase config

const ViewResponseModal = ({ open, onClose, response }) => {
    const [auditData, setAuditData] = useState(null);
    const [responderName, setResponderName] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                // Fetch audit data
                const auditDoc = doc(db, 'Audit', response.auditId);
                const auditSnapshot = await getDoc(auditDoc);
                if (auditSnapshot.exists()) {
                    setAuditData(auditSnapshot.data());
                } else {
                    console.error('No such audit document!');
                    setError('No such audit document!');
                }

                // Fetch responder's name
                const userDoc = doc(db, 'Users', response.responderId); // Adjust collection name if necessary
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
                setLoading(false);
            }
        };

        if (response && response.auditId && response.responderId) {
            fetchData();
        } else {
            setLoading(false);
        }
    }, [response]);

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
                    <Typography variant="h6">Loading...</Typography>
                ) : error ? (
                    <Typography variant="h6">{error}</Typography>
                ) : (
                    <>
                        <IconButton
                            onClick={onClose}
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
                                        {question.questionNumber}: {question.value}
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontSize: '1rem' }}>
                                        {answer ? (
                                            <>
                                                {answer.comments && (
                                                    <div><strong>Comments:</strong> {answer.comments}</div>
                                                )}
                                                {answer.yesNoNa && (
                                                    <div><strong>Yes/No:</strong> {answer.yesNoNa}</div>
                                                )}
                                                {answer.imageUrl && answer.imageUrl !== "" ? (
                                                    <div>
                                                        <strong>Image:</strong>
                                                        <img
                                                            src={answer.imageUrl}
                                                            alt={`Answer ${index}`}
                                                            style={{ maxWidth: '100%', marginTop: '8px' }}
                                                        />
                                                    </div>
                                                ) : (
                                                    <div>No image provided</div>
                                                )}
                                            </>
                                        ) : (
                                            'Not answered'
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

ViewResponseModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    response: PropTypes.shape({
        auditId: PropTypes.string.isRequired,
        responderId: PropTypes.string.isRequired,
        answers: PropTypes.arrayOf(
            PropTypes.shape({
                questionNumber: PropTypes.string.isRequired,
                comments: PropTypes.string,
                yesNoNa: PropTypes.string,
                imageUrl: PropTypes.string,
            })
        ).isRequired,
    }).isRequired,
};

export default ViewResponseModal;
