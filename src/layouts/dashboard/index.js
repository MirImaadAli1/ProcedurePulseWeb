import Grid from '@mui/material/Grid';
import React, { useEffect, useState } from 'react';
import MDBox from 'components/MDBox';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import ComplexStatisticsCard from 'examples/Cards/StatisticsCards/ComplexStatisticsCard';
import PieChartComponent from 'components/PieChart'; // Import the PieChartComponent
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../../Firebase';
import Projects from 'layouts/dashboard/components/Projects';
import OrdersOverview from 'layouts/dashboard/components/OrdersOverview';
import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress

function Dashboard() {
    const [totalAudits, setTotalAudits] = useState(0);
    const [totalResponses, setTotalResponses] = useState(0);
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

                    for (const auditId of auditIds) {
                        const responsesCollectionRef = collection(db, 'Responses');
                        const responsesQuery = query(responsesCollectionRef, where('auditId', '==', auditId));
                        const responsesSnapshot = await getDocs(responsesQuery);
                        responsesCount += responsesSnapshot.size;
                    }

                    setTotalResponses(responsesCount);
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
                                    title="Followers"
                                    count="+91"
                                    percentage={{
                                        color: 'success',
                                        amount: '',
                                        label: 'Just updated',
                                    }}
                                />
                            </MDBox>
                        </Grid>
                    </Grid>
                    <MDBox mt={4.5}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6} lg={4}>
                                <PieChartComponent />
                            </Grid>
                        </Grid>
                    </MDBox>
                    <MDBox mt={4.5}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6} lg={8}>
                                <Projects />
                            </Grid>
                            <Grid item xs={12} md={6} lg={4}>
                                <OrdersOverview />
                            </Grid>
                        </Grid>
                    </MDBox>
                </MDBox>
            )}
        </DashboardLayout>
    );
}

export default Dashboard;
