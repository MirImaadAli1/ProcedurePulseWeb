import Grid from '@mui/material/Grid';
import React, { useEffect, useState } from 'react';
import MDBox from 'components/MDBox';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import ComplexStatisticsCard from 'examples/Cards/StatisticsCards/ComplexStatisticCard';
import PieChartComponent from 'components/PieChart'; // Import the PieChartComponent
import AuditsList from 'components/UnrespondedAuditsList'; // Import the AuditsList component
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../../Firebase';
import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress

function Dashboard() {
    const [totalAudits, setTotalAudits] = useState(0);
    const [totalResponses, setTotalResponses] = useState(0);
    const [respondedAudits, setRespondedAudits] = useState([]);
    const [unrespondedAudits, setUnrespondedAudits] = useState([]);
    const [respondedAuditCount, setRespondedAuditCount] = useState(0); // New state for responded audit count
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAuditAndResponseCount = async () => {
            setLoading(true);
            try {
                const user = auth.currentUser;
                if (user) {
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
                    let respondedCount = 0; // Variable to count responded audits

                    for (const auditId of auditIds) {
                        const responsesCollectionRef = collection(db, 'Responses');
                        const responsesQuery = query(responsesCollectionRef, where('auditId', '==', auditId));
                        const responsesSnapshot = await getDocs(responsesQuery);
                        responsesCount += responsesSnapshot.size;
                        const auditDoc = auditsSnapshot.docs.find(doc => doc.id === auditId);
                        if (responsesSnapshot.size > 0) {
                            responded.push(auditDoc.data().title);
                            respondedCount++; // Increment responded count
                        } else {
                            unresponded.push(auditDoc.data().title);
                        }
                    }

                    setTotalResponses(responsesCount);
                    setRespondedAudits(responded);
                    setUnrespondedAudits(unresponded);
                    setRespondedAuditCount(respondedCount); // Update responded audit count
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAuditAndResponseCount();
    }, []);

    return (
        <DashboardLayout>
            <DashboardNavbar />
            {loading ? (
                <MDBox py={3} display="flex" justifyContent="center">
                    <CircularProgress />
                </MDBox>
            ) : (
                <MDBox py={3}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6} lg={3}>
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
                        <Grid item xs={12} md={6} lg={3}>
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
                        <Grid item xs={12} md={6} lg={3}>
                            <MDBox mb={1.5}>
                                <ComplexStatisticsCard
                                    color="primary"
                                    icon="person_add"
                                    title="Responded Audits"
                                    count={respondedAuditCount} // Use the respondedAuditCount state here
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
                    {/* <MDBox mt={4.5}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6} lg={8}>
                                <Projects />
                            </Grid>
                            <Grid item xs={12} md={6} lg={4}>
                                <OrdersOverview />
                            </Grid>
                        </Grid>
                    </MDBox> */}
                </MDBox>
            )}
        </DashboardLayout>
    );
}

export default Dashboard;
