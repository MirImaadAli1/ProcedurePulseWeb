import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import { db, storage, auth } from '../../Firebase'; // Import Firebase config
import { doc, getDoc, collection, addDoc } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';



function RespondAudit() {
    const { auditId } = useParams();
    const [audit, setAudit] = useState(null);
    const [answers, setAnswers] = useState({});
    const [auditOwner, setAuditowner] = useState({});

    useEffect(() => {
        const fetchAudit = async () => {
            try {
                const auditRef = doc(db, "Audit", auditId);
                const auditSnap = await getDoc(auditRef);

                if (auditSnap.exists()) {
                    setAudit(auditSnap.data());
                    setAuditowner(audit.userId)
                } else {
                    console.log("No such audit exists!");
                }
            } catch (error) {
                console.error("Error fetching audit:", error);
            }
        };

        if (auditId) {
            fetchAudit();
        }
    }, [auditId]);

    const handleTextChange = (questionNumber, event) => {
        setAnswers({
            ...answers,
            [questionNumber]: event.target.value,
        });
    };

    const handleRadioChange = (questionNumber, value) => {
        setAnswers({
            ...answers,
            [questionNumber]: value,
        });
    };

    const handleImageChange = async (questionNumber, event) => {
        const file = event.target.files[0];
        if (file) {
            const storageRef = ref(storage, `audit-images/${auditId}/${questionNumber}-${file.name}`);
            try {
                await uploadBytes(storageRef, file);
                const downloadURL = await getDownloadURL(storageRef);
                setResponses(prevResponses => ({
                    ...prevResponses,
                    [questionNumber]: { ...prevResponses[questionNumber], imageUrl: downloadURL },
                }));
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    };

    const handleSubmit = async () => {
        try {

            const userId = auth.currentUser?.uid

            await addDoc(collection(db, "Responses"), {
                auditId,
                answers,
                responderId: userId, // Add the responder's ID
                auditOwner, // Add the audit owner's ID
                respondedAt: new Date(),
            });
            alert("Responses submitted successfully!");
        } catch (error) {
            console.error("Error submitting responses:", error);
            alert("Failed to submit responses.");
        }
    };

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox py={3}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Card>
                            <MDBox p={3}>
                                <MDTypography variant="h4">Respond to Audit</MDTypography>
                                {audit ? (
                                    <div>
                                        <MDTypography variant="h6">{audit.title}</MDTypography>
                                        {audit.questions.map((question, index) => (
                                            <MDBox key={index} py={2}> {/* Add padding here */}
                                                <MDTypography variant="body1">{question.questionNumber}: {question.value}</MDTypography>

                                                {/* Yes/No/N/A multiple-choice input */}
                                                {question.yesNoChecked && (
                                                    <RadioGroup
                                                        row
                                                        name={`yesNo-${question.questionNumber}`}
                                                        onChange={(e) => handleRadioChange(question.questionNumber, e.target.value)}
                                                    >
                                                        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                                        <FormControlLabel value="No" control={<Radio />} label="No" />
                                                        <FormControlLabel value="N/A" control={<Radio />} label="N/A" />
                                                    </RadioGroup>
                                                )}

                                                {/* Text comments input */}
                                                {question.commentsChecked && (
                                                    <TextField
                                                        fullWidth
                                                        label="Your Comments"
                                                        variant="outlined"
                                                        margin="normal"
                                                        onChange={(e) => handleTextChange(question.questionNumber, e)}
                                                    />
                                                )}

                                                {/* Image upload input */}
                                                {question.imageChecked && (
                                                    <div>
                                                        <input
                                                            accept="image/*"
                                                            type="file"
                                                            onChange={(e) => handleImageChange(question.questionNumber, e)}
                                                        />
                                                    </div>
                                                )}
                                            </MDBox>
                                        ))}
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleSubmit}
                                        >
                                            Submit Responses
                                        </Button>
                                    </div>
                                ) : (
                                    <MDTypography variant="body1">Loading audit...</MDTypography>
                                )}
                            </MDBox>
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
        </DashboardLayout>
    );

}

export default RespondAudit;
