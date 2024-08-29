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
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function SharedAudit() {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [noData, setNoData] = useState(false);
    const userMap = {};
    const auditMap = {}; // Map to store auditId to audit title
    const navigate = useNavigate(); // Initialize navigate hook

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

                // Fetch shared audits
                const sharedAuditsCollectionRef = collection(db, 'SharedAudits');
                const sharedAuditsSnapshot = await getDocs(sharedAuditsCollectionRef);

                // Process shared audits where the current user is the recipient
                const sharedAudits = sharedAuditsSnapshot.docs
                    .filter(doc => doc.data().sharedWith === currentUserId)
                    .map(doc => doc.data());

                if (sharedAudits.length === 0) {
                    setNoData(true);
                }

                // Fetch audits collection to get titles
                const auditsCollectionRef = collection(db, 'Audit');
                const auditsSnapshot = await getDocs(auditsCollectionRef);

                // Create a map of auditId to title
                auditsSnapshot.docs.forEach(doc => {
                    const auditData = doc.data();
                    auditMap[doc.id] = auditData.title;
                });

                // Prepare table rows with processed data
                const tableRows = sharedAudits.map((item) => ({
                    sharedBy: (
                        <MDBox display="flex" alignItems="center" lineHeight={1}>
                            <MDTypography display="block" variant="button" fontWeight="medium">
                                {userMap[item.sharedBy]} {/* This will now show the name of the person who shared the audit */}
                            </MDTypography>
                        </MDBox>
                    ),
                    title: (
                        <MDTypography variant="caption" color="text" fontWeight="medium">
                            {auditMap[item.auditId] || "Unknown Title"} {/* Use audit title from map */}
                        </MDTypography>
                    ),
                    sharedAt: (
                        <MDTypography variant="caption" color="text" fontWeight="medium">
                            {item.sharedAt.toDate().toLocaleDateString('en-US')}
                        </MDTypography>
                    ),
                    action: (
                        <Button
                            variant="contained"
                            style={{ color: 'white', backgroundColor: '#2563eb' }}
                            size="small"
                            onClick={() => handleRespondClick(item.auditId)} // Attach click handler to button
                        >
                            Respond
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

    const handleRespondClick = (auditId) => {
        navigate(`/respond-audit/${auditId}`); // Navigate to RespondAudit with the auditId
    };

    const columns = [
        { Header: 'shared by', accessor: 'sharedBy', width: '30%', align: 'left' },
        { Header: 'title', accessor: 'title', align: 'left' },
        { Header: 'shared on', accessor: 'sharedAt', align: 'center' },
        { Header: 'action', accessor: 'action', align: 'center' },
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
                                        Shared Audits
                                    </MDTypography>
                                </MDBox>

                                <MDBox pt={3}>
                                    <DataTable
                                        table={{ columns, rows }} // Display all shared audits
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

export default SharedAudit;
