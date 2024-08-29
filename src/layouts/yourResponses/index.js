import React, { useEffect, useState } from "react";
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import MDBox from 'components/MDBox';
import { Button } from "@mui/material";
import MDTypography from 'components/MDTypography';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import DataTable from 'examples/Tables/DataTable';
import { db, auth } from "../../Firebase";
import { collection, getDocs, doc } from "firebase/firestore";
import Loading from "components/States/loading";
import EmptyState from "components/States/empty";
import { useNavigate } from 'react-router-dom';

function YourResponses() {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [noData, setNoData] = useState(false);
    const userMap = {};
    const auditMap = {};
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const currentUser = auth.currentUser;

                if (!currentUser) {
                    console.error("User not authenticated.");
                    return;
                }

                const currentUserId = currentUser.uid;

                // Fetch users collection to map userId to names
                const usersCollectionRef = collection(db, 'Users');
                const usersSnapshot = await getDocs(usersCollectionRef);

                // Create a user map of userId -> name
                usersSnapshot.docs.forEach(doc => {
                    const userData = doc.data();
                    userMap[userData.uid] = userData.name;
                });

                // Fetch responses where the current user is the responder
                const responsesCollectionRef = collection(db, 'Responses');
                const responsesSnapshot = await getDocs(responsesCollectionRef);

                const userResponses = responsesSnapshot.docs
                    .filter(doc => doc.data().responderId === currentUserId)
                    .map(doc => doc.data());

                if (userResponses.length === 0) {
                    setNoData(true);
                }

                // Fetch audits collection to get titles
                const auditsCollectionRef = collection(db, 'Audit');
                const auditsSnapshot = await getDocs(auditsCollectionRef);

                auditsSnapshot.docs.forEach(doc => {
                    const auditData = doc.data();
                    auditMap[doc.id] = auditData.title;
                });

                // Prepare table rows with processed data
                const tableRows = userResponses.map((item) => ({
                    title: (
                        <MDTypography 
                            variant="caption" 
                            color="text" 
                            fontWeight="medium"
                            style={{ wordWrap: 'break-word', whiteSpace: 'normal' }} // Ensure wrapping
                        >
                            {auditMap[item.auditId] || "Unknown Title"}
                        </MDTypography>
                    ),
                    creator: (
                        <MDTypography variant="caption" color="text" fontWeight="medium">
                            {userMap[item.auditOwner] || "Unknown Creator"}
                        </MDTypography>
                    ),
                    respondedAt: (
                        <MDTypography variant="caption" color="text" fontWeight="medium">
                            {item.respondedAt.toDate().toLocaleDateString('en-US')}
                        </MDTypography>
                    ),
                    action: (
                        <Button
                            variant="contained"
                            style={{ color: 'white', backgroundColor: '#2563eb' }}
                            size="small"
                            onClick={() => handleViewClick(item.auditId)} // Attach click handler to button
                        >
                            View / Edit
                        </Button>
                    ),
                    rawItem: item,
                }));

                setRows(tableRows);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching Firestore data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleViewClick = (auditId) => {
        navigate(`/view-audit/${auditId}`); // Navigate to ViewAudit with the auditId
    };

    const columns = [
        { Header: 'Title', accessor: 'title', width: '30%', align: 'left' },
        { Header: 'Creator', accessor: 'creator', align: 'left' },
        { Header: 'Responded On', accessor: 'respondedAt', align: 'center' },
        { Header: 'Action', accessor: 'action', align: 'center' },
    ];

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox pt={6} pb={3}>
                {loading && (
                    <Loading />
                )}
                {noData && !loading && (
                    <EmptyState />
                )}
                {!loading && !noData && (
                    <Grid container spacing={6}>
                        <Grid item xs={12}>
                            <Card>
                                <MDBox
                                    mx={2}
                                    mt={-3}
                                    py={3}
                                    px={2}
                                    variant="gradient"
                                    bgColor="info"
                                    borderRadius="lg"
                                    coloredShadow="info"
                                >
                                    <MDTypography variant="h6" color="white">
                                        Your Responses
                                    </MDTypography>
                                </MDBox>

                                <MDBox pt={3}>
                                    <DataTable
                                        table={{ columns, rows }} // Display all responses
                                        isSorted={false}
                                        entriesPerPage={false}
                                        showTotalEntries={false}
                                        noEndBorder
                                    />
                                </MDBox>
                            </Card>
                        </Grid>
                    </Grid>
                )}
            </MDBox>
        </DashboardLayout>
    );
}

export default YourResponses;
