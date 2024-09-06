import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { collection, query, where, getDocs, getDoc, doc } from 'firebase/firestore';
import { db, storage } from '../../../../Firebase'; // Adjust import based on your project structure
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'; // For image upload

const ResponseModal = ({ open, onClose, formData, onSave }) => {
    const [auditData, setAuditData] = useState(null);
    const [responses, setResponses] = useState({});
    const [updatedResponses, setUpdatedResponses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

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

                // Map responses using questionNumber
                const responseMap = {};
                auditResponses.forEach(response => {
                    response.answers.forEach(answer => {
                        responseMap[answer.questionNumber] = {
                            comments: answer.comments || '',
                            imageUrl: answer.imageUrl || '',
                            yesNoNa: answer.yesNoNa || '' // Ensure that yesNoNa is correctly mapped
                        };
                    });
                });

                setResponses(responseMap);

                // Initialize updatedResponses with data from responseMap
                const initialUpdatedResponses = Object.keys(responseMap).map(questionNumber => ({
                    questionNumber,
                    comments: responseMap[questionNumber].comments || '',
                    imageUrl: responseMap[questionNumber].imageUrl || '',
                    yesNoNa: responseMap[questionNumber].yesNoNa || '', // Initialize yesNoNa
                }));

                setUpdatedResponses(initialUpdatedResponses);
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
                try {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    handleChange(questionNumber, 'imageUrl', downloadURL);
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
                maxWidth: '90vw',
                maxHeight: '90vh',
                bgcolor: 'background.paper',
                borderRadius: 2,
                boxShadow: 24,
                p: 4,
                outline: 'none',
                overflowY: 'auto',
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
                                <RadioGroup
                                    row
                                    value={yesNoNa}
                                    onChange={(e) => handleChange(questionNumber, 'yesNoNa', e.target.value)}
                                >
                                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                    <FormControlLabel value="No" control={<Radio />} label="No" />
                                    <FormControlLabel value="N/A" control={<Radio />} label="N/A" />
                                </RadioGroup>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    multiline
                                    minRows={1}
                                    maxRows={3}
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
                                            alignItems: 'center',
                                            width: '100%',
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
                                disabled={uploading}
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
    formData: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
};

export default ResponseModal;
