import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import { db, storage, auth } from '../../Firebase';
import { doc, getDoc, collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Styled components for improved CSS
const QuestionBox = styled(MDBox)(({ theme }) => ({
    padding: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[1],
    marginBottom: theme.spacing(4),
}));

const QuestionTitle = styled(MDTypography)(({ theme }) => ({
    marginBottom: theme.spacing(2),
    fontWeight: theme.typography.fontWeightMedium,
}));

const AnswerGroup = styled(MDBox)(({ theme }) => ({
    marginTop: theme.spacing(2),
}));

function RespondAudit() {
    const { auditId } = useParams();
    const [audit, setAudit] = useState(null);
    const [answers, setAnswers] = useState({});
    const [auditOwner, setAuditOwner] = useState('');

    useEffect(() => {
        const fetchAudit = async () => {
            try {
                const auditRef = doc(db, "Audit", auditId);
                const auditSnap = await getDoc(auditRef);

                if (auditSnap.exists()) {
                    const auditData = auditSnap.data();
                    setAudit(auditData);
                    setAuditOwner(auditData.userId);
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
            [questionNumber]: {
                ...answers[questionNumber],
                comments: event.target.value,
            },
        });
    };

    const handleRadioChange = (questionNumber, value) => {
        setAnswers({
            ...answers,
            [questionNumber]: {
                ...answers[questionNumber],
                yesNoNa: value,
            },
        });
    };

    const handleImageChange = async (questionNumber, event) => {
        const file = event.target.files[0];
        if (file) {
            const storageRef = ref(storage, `audit-images/${auditId}/${questionNumber}-${file.name}`);
            try {
                await uploadBytes(storageRef, file);
                const downloadURL = await getDownloadURL(storageRef);
                setAnswers((prevAnswers) => ({
                    ...prevAnswers,
                    [questionNumber]: {
                        ...prevAnswers[questionNumber],
                        imageUrl: downloadURL,
                    },
                }));
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    };


    const handleSubmit = async () => {
        try {
            const userId = auth.currentUser?.uid;

            const formattedAnswers = Object.keys(answers).map(questionNumber => ({
                questionNumber,
                yesNoNa: answers[questionNumber]?.yesNoNa || '',
                comments: answers[questionNumber]?.comments || '',
                imageUrl: answers[questionNumber]?.imageUrl || '',
            }));

            await addDoc(collection(db, "Responses"), {
                auditId,
                auditOwner,
                responderId: userId,
                respondedAt: new Date(),
                answers: formattedAnswers,
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
                                {audit ? (
                                    <div>
                                        <MDTypography variant="h3">{audit.title}</MDTypography>
                                        <MDTypography fontWeight="light" sx={{ mb: 2 }}>{audit.description}</MDTypography>
                                        {audit.questions.map((question, index) => (
                                            <QuestionBox key={index}>
                                                <QuestionTitle>
                                                    <MDTypography fontWeight="regular">
                                                        {question.questionNumber}: {question.value}
                                                    </MDTypography>
                                                </QuestionTitle>

                                                {/* Yes/No/N/A multiple-choice input */}
                                                <MDTypography fontWeight="regular">
                                                    <AnswerGroup>

                                                        <RadioGroup
                                                            row
                                                            name={`yesNo-${question.questionNumber}`}
                                                            onChange={(e) => handleRadioChange(question.questionNumber, e.target.value)}
                                                        >
                                                            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                                            <FormControlLabel value="No" control={<Radio />} label="No" />
                                                            <FormControlLabel value="N/A" control={<Radio />} label="N/A" />
                                                        </RadioGroup>
                                                    </AnswerGroup>
                                                </MDTypography>

                                                {/* Text comments input */}
                                                <AnswerGroup>
                                                    <TextField
                                                        fullWidth
                                                        label="Your Comments"
                                                        variant="outlined"
                                                        margin="normal"
                                                        onChange={(e) => handleTextChange(question.questionNumber, e)}
                                                    />
                                                </AnswerGroup>

                                                {/* Image upload input */}
                                                <AnswerGroup>
                                                    <input
                                                        accept="image/*"
                                                        type="file"
                                                        onChange={(e) => handleImageChange(question.questionNumber, e)}
                                                    />
                                                </AnswerGroup>

                                                {index !== audit.questions.length - 1 && <Divider />}
                                            </QuestionBox>
                                        ))}
                                        <MDBox mt={4} display="flex" justifyContent="flex-end">
                                            <button className="bg-blue-600 text-white py-2 px-4 font-semibold rounded-md whitespace-nowrap mr-2"
                                                onClick={(handleSubmit)}
                                                style={{
                                                    padding: '6px 16px', // This is the default padding for Material-UI's contained buttons
                                                    fontSize: '0.875rem', // Default font-size for Material-UI buttons (14px)
                                                    minHeight: '36px', // Default minimum height for Material-UI buttons
                                                }}>
                                                Submit Response
                                            </button>
                                        </MDBox>
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
