import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { collection, query, where, getDocs, getDoc, doc } from 'firebase/firestore';
import { db } from '../../../../Firebase'; // Adjust import based on your project structure

const ResponseModal = ({ open, onClose, formData, onSave }) => {
    const [auditData, setAuditData] = useState(null);
    const [responses, setResponses] = useState([]);
    const [updatedResponses, setUpdatedResponses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAuditData = async () => {
            if (!formData) return;

            setLoading(true);
            try {
                // Fetch audit details
                const auditDocRef = doc(db, 'Audit', formData.auditId);
                const auditDoc = await getDoc(auditDocRef);
                if (auditDoc.exists()) {
                    setAuditData(auditDoc.data());
                } else {
                    console.error('Audit document does not exist.');
                    setAuditData(null);
                }

                // Fetch responses for the audit
                const responsesCollectionRef = collection(db, 'Responses');
                const responsesQuery = query(responsesCollectionRef, where('auditId', '==', formData.auditId));
                const responsesSnapshot = await getDocs(responsesQuery);
                const auditResponses = responsesSnapshot.docs.map(doc => doc.data());

                console.log("Audit Responses:", auditResponses); // Debugging line

                // Map responses using questionNumber
                const responseMap = {};
                auditResponses.forEach(response => {
                    response.answers.forEach(answer => {
                        responseMap[answer.questionNumber] = {
                            comments: answer.comments || '',
                            imageUrl: answer.imageUrl || '',
                            yesNoNa: answer.yesNoNa || ''
                        };
                    });
                });

                setResponses(responseMap);
                setUpdatedResponses(Object.entries(responseMap).map(([questionNumber, response]) => ({
                    questionNumber,
                    comments: response.comments || '',
                    imageUrl: response.imageUrl || '',
                    yesNoNa: response.yesNoNa || '',
                })));
            } catch (error) {
                console.error('Error fetching audit data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAuditData();
    }, [formData]);

    const handleChange = (questionNumber, field, value) => {
        setUpdatedResponses(prev =>
            prev.map(item =>
                item.questionNumber === questionNumber
                    ? { ...item, [field]: value }
                    : item
            )
        );
    };

    const handleSave = () => {
        onSave(updatedResponses);
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="response-modal-title"
            aria-describedby="response-modal-description"
            closeAfterTransition
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 500,
                maxWidth: '90%', // Ensure it doesn't exceed viewport width
                bgcolor: 'background.paper', // Solid background color
                borderRadius: 2,
                boxShadow: 24,
                p: 4,
                outline: 'none', // Remove focus outline
                overflow: 'hidden', // Hide overflow
            }}>
                <Typography id="response-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
                    Audit Name: {auditData ? auditData.title : 'Loading...'}
                </Typography>
                {loading ? (
                    <Typography>Loading...</Typography>
                ) : (
                    <Box>
                        {updatedResponses.map(({ questionNumber, comments, imageUrl, yesNoNa }, index) => (
                            <Box key={index} sx={{ marginBottom: 2 }}>
                                <Typography variant="subtitle1">
                                    Question Number: {questionNumber}
                                </Typography>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    multiline
                                    minRows={1} // Adjust as needed
                                    maxRows={3} // Adjust as needed
                                    value={comments}
                                    onChange={(e) => handleChange(questionNumber, 'comments', e.target.value)}
                                    placeholder="Enter your comments"
                                    label="Comments"
                                    sx={{ marginTop: 1 }}
                                />
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    multiline
                                    value={imageUrl}
                                    minRows={1} // Adjust as needed
                                    maxRows={3} // Adjust as needed
                                    onChange={(e) => handleChange(questionNumber, 'imageUrl', e.target.value)}
                                    placeholder="Enter image URL"
                                    label="Image URL"
                                    sx={{ marginTop: 2 }}
                                />
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    multiline
                                    value={yesNoNa}
                                    onChange={(e) => handleChange(questionNumber, 'yesNoNa', e.target.value)}
                                    placeholder="Yes/No/NA"
                                    label="Yes/No/NA"
                                    sx={{ marginTop: 2 }}
                                />
                            </Box>
                        ))}
                        <Button
                            variant="contained"
                            style={{ color: 'white', backgroundColor: '#2563eb' }}
                            size="small"
                            onClick={handleSave}
                            sx={{ marginTop: 2 }}
                        >
                            Save
                        </Button>
                    </Box>
                )}
            </Box>
        </Modal>
    );
};

ResponseModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    formData: PropTypes.shape({
        auditId: PropTypes.string.isRequired,
    }).isRequired,
    onSave: PropTypes.func.isRequired,
};

export default ResponseModal;
