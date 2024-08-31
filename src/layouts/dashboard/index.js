import Grid from '@mui/material/Grid';
import React, { useEffect, useState } from 'react';   
import MDBox from 'components/MDBox';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'examples/Footer';
import ReportsBarChart from 'examples/Charts/BarCharts/ReportsBarChart';
import ReportsLineChart from 'examples/Charts/LineCharts/ReportsLineChart';
import ComplexStatisticsCard from 'examples/Cards/StatisticsCards/ComplexStatisticsCard';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../../Firebase';
import reportsBarChartData from 'layouts/dashboard/data/reportsBarChartData';
import reportsLineChartData from 'layouts/dashboard/data/reportsLineChartData';
import Projects from 'layouts/dashboard/components/Projects';
import OrdersOverview from 'layouts/dashboard/components/OrdersOverview';

function Dashboard() {
  const [totalAudits, setTotalAudits] = useState(0);
  const [totalResponses, setTotalResponses] = useState(0);
  const { sales, tasks } = reportsLineChartData;

  useEffect(() => {
    const fetchAuditAndResponseCount = async () => {
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
      }
    };

    fetchAuditAndResponseCount();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="library_books"
                title="No. of User Audits"
                count={totalAudits}
                percentage={{
                  // color: 'success',
                  // amount: '+3%',
                  label: 'No. of Audits made by the user',
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Today's Users"
                count={totalResponses}  
                percentage={{
                  // color: 'success',
                  // amount: '+3%',
                  label: '`No. of responses`',
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Revenue"
                count="34k"
                percentage={{
                  color: 'success',
                  amount: '+1%',
                  label: 'than yesterday',
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
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="website views"
                  description="Last Campaign Performance"
                  date="campaign sent 2 days ago"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="daily sales"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="completed tasks"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
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
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
