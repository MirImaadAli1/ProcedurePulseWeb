import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Box, Typography, TextField, Button, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { collection, query, where, getDocs, getDoc, doc } from 'firebase/firestore';
import { db, storage } from '../../../../Firebase'; // Adjust import based on your project structure
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'; // For image upload

const ResponseModal = ({ open, onClose, formData, onSave }) => {
    const [auditData, setAuditData] = useState(null);
    const [responses, setResponses] = useState([]);
    const [updatedResponses, setUpdatedResponses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);  // Added the uploading state

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

    const handleImageUpload = (questionNumber, file) => {
        if (!file) return;
        setUploading(true);

        const storageRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            'state_changed',
            snapshot => {
                // You can track the progress of the upload here if you want (optional)
            },
            error => {
                console.error('Error uploading file:', error);
                setUploading(false);
            },
            async () => {
                // On successful upload
                try {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    handleChange(questionNumber, 'imageUrl', downloadURL); // Store the URL in the response
                    setUploading(false);
                } catch (error) {
                    console.error('Error getting download URL:', error);
                    setUploading(false);
                }
            }
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
                maxWidth: '90vw', // Ensure it doesn't exceed viewport width
                maxHeight: '90vh',
                bgcolor: 'background.paper', // Solid background color
                borderRadius: 2,
                boxShadow: 24,
                p: 4,
                outline: 'none', // Remove focus outline
                overflowY: 'auto', // Hide overflow
            }}>
                <Typography id="response-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
                    Audit Name: {auditData ? auditData.title : 'Loading...'}
                </Typography>
                {loading ? (
                    <Typography>Loading...</Typography>
                ) : (
                    <Box>
                        {updatedResponses.map(({ questionNumber, comments, imageUrl, yesNoNa }, index) => (
                            <Box key={index} sx={{ marginBottom: 2, outline: '1px solid #d8d4dc', borderRadius: 2, p: 2 }}>
                                <Typography variant="subtitle1">
                                    Question Number: {questionNumber}
                                </Typography>
                                {/* <Typography variant="subtitle1" sx={{ marginTop: 2 }}>Select Yes/No/NA</Typography> */}
                                <RadioGroup
                                    row
                                    value={yesNoNa}
                                    onChange={(e) => handleChange(questionNumber, 'yesNoNa', e.target.value)}
                                >
                                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                    <FormControlLabel value="no" control={<Radio />} label="No" />
                                    <FormControlLabel value="na" control={<Radio />} label="NA" />
                                </RadioGroup>
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

                                {imageUrl ? (
                                    <Box
                                        sx={{
                                            marginTop: 2,
                                            display: 'flex',
                                            // justifyContent: 'space-between', // Pushes content to opposite sides
                                            alignItems: 'center', // Align items vertically in the center
                                            width: '100%', // Ensures the Box takes full width
                                            flexDirection: 'column',
                                        }}
                                    >
                                        <img
                                            src={imageUrl}
                                            alt={`Question ${questionNumber}`}
                                            style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
                                        />
                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%', marginTop: 1 }}>
                                            <Button
                                                variant="contained"
                                                component="label"
                                                style={{ color: 'white', backgroundColor: '#2563eb', marginTop: 2 }}
                                                disabled={uploading}
                                            >
                                                {uploading ? 'Uploading...' : 'Change Image'}
                                                <input
                                                    type="file"
                                                    hidden
                                                    accept="image/*"
                                                    onChange={(e) => handleImageUpload(questionNumber, e.target.files[0])}
                                                />
                                            </Button>
                                        </Box>
                                    </Box>

                                ) : (
                                    <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Typography variant="subtitle2" color="textSecondary">
                                            No image uploaded.
                                        </Typography>
                                        <Button
                                            variant="contained"
                                            component="label"
                                            style={{ color: 'white', backgroundColor: '#2563eb', marginLeft: 'auto' }}
                                            disabled={uploading}
                                        >
                                            {uploading ? 'Uploading...' : 'Upload Image'}
                                            <input
                                                type="file"
                                                hidden
                                                accept="image/*"
                                                onChange={(e) => handleImageUpload(questionNumber, e.target.files[0])}
                                            />
                                        </Button>
                                    </Box>
                                )}

                            </Box>
                        ))}
                        <div className='flex justify-end'>
                            <Button
                                variant="contained"
                                style={{ color: 'white', backgroundColor: '#2563eb' }}
                                size="small"
                                onClick={handleSave}
                                sx={{ marginTop: 2 }}
                                disabled={uploading} // Disable save while uploading
                            >
                                Save
                            </Button>
                        </div>
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
