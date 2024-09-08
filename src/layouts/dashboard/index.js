import Grid from '@mui/material/Grid';
import React, { useEffect, useState } from 'react';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography'; // Import MDTypography
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import ComplexStatisticsCard from 'examples/Cards/StatisticsCards/ComplexStatisticCard';
import PieChartComponent from 'components/PieChart'; // Import the PieChartComponent
import AuditsList from 'components/UnrespondedAuditsList'; // Import the AuditsList component
import { collection, query, where, getDoc, doc, getDocs } from 'firebase/firestore'; // Import getDocs
import { auth, db } from '../../Firebase';
import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress
import { Button } from '@mui/material'; // Import MUI Button
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

function Dashboard() {
    const [totalAudits, setTotalAudits] = useState(0);
    const [totalResponses, setTotalResponses] = useState(0);
    const [respondedAudits, setRespondedAudits] = useState([]);
    const [unrespondedAudits, setUnrespondedAudits] = useState([]);
    const [respondedAuditCount, setRespondedAuditCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [userName, setUserName] = useState(''); // State to hold the user's name
    const navigate = useNavigate(); // Initialize the useNavigate hook

    useEffect(() => {
        const fetchAuditAndResponseCount = async () => {
            setLoading(true);
            try {
                const user = auth.currentUser;
                if (user) {
                    // Fetch user's name from the 'Users' collection
                    const userDocRef = doc(db, 'Users', user.uid);
                    const userDocSnap = await getDoc(userDocRef);

                    if (userDocSnap.exists()) {
                        setUserName(userDocSnap.data().name || 'User');
                    } else {
                        console.log('No such document!');
                    }

                    // Fetch total number of audits for the user
                    const auditsCollectionRef = collection(db, 'Audit');
                    const auditsQuery = query(auditsCollectionRef, where('userId', '==', user.uid));
                    const auditsSnapshot = await getDocs(auditsQuery);
                    setTotalAudits(auditsSnapshot.size);

                    // Fetch total number of responses for the user's audits
                    const auditIds = auditsSnapshot.docs.map(doc => doc.id);
                    let responsesCount = 0;
                    let responded = [];
                    let unresponded = [];
                    let respondedCount = 0;

                    for (const auditId of auditIds) {
                        const responsesCollectionRef = collection(db, 'Responses');
                        const responsesQuery = query(responsesCollectionRef, where('auditId', '==', auditId));
                        const responsesSnapshot = await getDocs(responsesQuery);
                        responsesCount += responsesSnapshot.size;
                        const auditDoc = auditsSnapshot.docs.find(doc => doc.id === auditId);
                        if (responsesSnapshot.size > 0) {
                            responded.push(auditDoc.data().title);
                            respondedCount++;
                        } else {
                            unresponded.push(auditDoc.data().title);
                        }
                    }

                    setTotalResponses(responsesCount);
                    setRespondedAudits(responded);
                    setUnrespondedAudits(unresponded);
                    setRespondedAuditCount(respondedCount);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAuditAndResponseCount();
    }, []);

    // Handlers for button clicks
    const handleCreateAudit = () => {
        navigate('/createaudit'); // Navigate to the Create Audit page
    };

    const handleSearchAudit = () => {
        navigate('/SearchAudits'); // Navigate to the Search Audit page
    };

    return (
        <DashboardLayout>
            <DashboardNavbar />
            {loading ? (
                <MDBox py={3} display="flex" justifyContent="center">
                    <CircularProgress />
                </MDBox>
            ) : (
                <MDBox py={3}>
                    <MDBox mb={4}>
                        <MDTypography variant="h4" fontWeight="medium">
                            Welcome, {userName}
                        </MDTypography>
                    </MDBox>
                    {/* Buttons for Create Audit and Search Audit */}
                    <MDBox mt={4} mb={4}>
                        <Grid container spacing={2} justifyContent="center">
                            <Grid item>
                                <button
                                    className="bg-blue-600 text-white py-2 px-4 font-semibold rounded-md whitespace-nowrap mr-2"
                                    onClick={handleCreateAudit}
                                    style={{
                                        padding: '6px 16px',
                                        fontSize: '0.875rem',
                                        minHeight: '36px',
                                    }}
                                >
                                    Create Audits
                                </button>
                            </Grid>
                            <Grid item>
                                <button
                                    className="bg-blue-600 text-white py-2 px-4 font-semibold rounded-md whitespace-nowrap"
                                    onClick={handleSearchAudit}
                                    style={{
                                        padding: '6px 16px',
                                        fontSize: '0.875rem',
                                        minHeight: '36px',
                                    }}
                                >
                                    Search Audits
                                </button>
                            </Grid>
                        </Grid>
                    </MDBox>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6} lg={3.75}>
                            <MDBox mb={1.5}>
                                <ComplexStatisticsCard
                                    color="dark"
                                    icon="library_books"
                                    title="Audits"
                                    count={totalAudits}
                                    percentage={{
                                        label: 'No. of Audits made by the user',
                                    }}
                                />
                            </MDBox>
                        </Grid>
                        <Grid item xs={12} md={6} lg={3.75}>
                            <MDBox mb={1.5}>
                                <ComplexStatisticsCard
                                    icon="leaderboard"
                                    title="Responses"
                                    count={totalResponses}
                                    percentage={{
                                        label: 'Total no. of responses to your audits',
                                    }}
                                />
                            </MDBox>
                        </Grid>
                        <Grid item xs={12} md={6} lg={3.75}>
                            <MDBox mb={1.5}>
                                <ComplexStatisticsCard
                                    color="primary"
                                    icon="person_add"
                                    title="Responded Audits"
                                    count={respondedAuditCount}
                                    percentage={{
                                        color: 'success',
                                        amount: '',
                                        label: 'No. of audits you have responded to',
                                    }}
                                />
                            </MDBox>
                        </Grid>
                    </Grid>
                    <MDBox mt={4.5}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6} lg={6}>
                                <PieChartComponent />
                            </Grid>
                            <Grid item xs={12} md={6} lg={6}>
                                <AuditsList respondedAudits={respondedAudits} unrespondedAudits={unrespondedAudits} />
                            </Grid>
                        </Grid>
                    </MDBox>
                </MDBox>
            )}
        </DashboardLayout>
    );
}

export default Dashboard;
