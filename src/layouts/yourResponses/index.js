import React, { useEffect, useState } from "react";
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import MDBox from 'components/MDBox';
import Button from '@mui/material/Button';
import MDTypography from 'components/MDTypography';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import DataTable from 'examples/Tables/DataTable';
import { db, auth } from "../../Firebase";
import { collection, getDocs } from 'firebase/firestore';
import Loading from "components/States/loading";
import EmptyState from "components/States/empty";
import ResponseModal from './components/ResponseModal';

function YourResponses() {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [noData, setNoData] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedResponse, setSelectedResponse] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const currentUser = auth.currentUser;

                if (!currentUser) {
                    console.error("User not authenticated.");
                    return;
                }

                const currentUserId = currentUser.uid;

                const usersCollectionRef = collection(db, 'Users');
                const usersSnapshot = await getDocs(usersCollectionRef);

                const userMap = {};
                usersSnapshot.docs.forEach(doc => {
                    const userData = doc.data();
                    userMap[userData.uid] = userData.name;
                });

                const responsesCollectionRef = collection(db, 'Responses');
                const responsesSnapshot = await getDocs(responsesCollectionRef);

                const userResponses = responsesSnapshot.docs
                    .filter(doc => doc.data().responderId === currentUserId)
                    .map(doc => doc.data());

                if (userResponses.length === 0) {
                    setNoData(true);
                }

                const auditsCollectionRef = collection(db, 'Audit');
                const auditsSnapshot = await getDocs(auditsCollectionRef);

                const auditMap = {};
                auditsSnapshot.docs.forEach(doc => {
                    const auditData = doc.data();
                    auditMap[doc.id] = auditData.title;
                });

                const tableRows = userResponses.map((item) => ({
                    title: (
                        <MDTypography 
                            variant="caption" 
                            color="text" 
                            fontWeight="medium"
                            style={{ wordWrap: 'break-word', whiteSpace: 'normal' }}
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
                            onClick={() => handleViewClick(item)}
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

    const handleViewClick = (response) => {
        setSelectedResponse(response);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedResponse(null);
    };

    const handleSave = (updatedData) => {
        // Handle save logic if needed
        console.log('Updated data:', updatedData);
        handleCloseModal();
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
                                        table={{ columns, rows }}
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

            <ResponseModal
                open={modalOpen}
                onClose={handleCloseModal}
                formData={selectedResponse}
                onSave={handleSave}
            />
        </DashboardLayout>
    );
}

export default YourResponses;
