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
import { collection, getDocs} from "firebase/firestore";
import Loading from "components/States/loading";
import EmptyState from "components/States/empty";
import { useNavigate } from 'react-router-dom';

function SharedAudit() {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [noData, setNoData] = useState(false);
    const [userMap, setUserMap] = useState({});
    const [auditMap, setAuditMap] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setNoData(false);
            try {
                const currentUser = auth.currentUser;

                if (!currentUser) {
                    console.error("User not authenticated.");
                    return;
                }

                const currentUserId = currentUser.uid;

                // Fetch users
                const usersCollectionRef = collection(db, 'Users');
                const usersSnapshot = await getDocs(usersCollectionRef);

                const userMapTemp = {};
                usersSnapshot.docs.forEach(doc => {
                    const userData = doc.data();
                    userMapTemp[userData.uid] = userData.name;
                });
                setUserMap(userMapTemp);

                // Fetch shared audits
                const sharedAuditsCollectionRef = collection(db, 'SharedAudits');
                const sharedAuditsSnapshot = await getDocs(sharedAuditsCollectionRef);

                const sharedAudits = sharedAuditsSnapshot.docs
                    .filter(doc => doc.data().sharedWith === currentUserId)
                    .map(doc => doc.data());

                if (sharedAudits.length === 0) {
                    setNoData(true);
                }

                // Fetch audits
                const auditsCollectionRef = collection(db, 'Audit');
                const auditsSnapshot = await getDocs(auditsCollectionRef);

                const auditMapTemp = {};
                auditsSnapshot.docs.forEach(doc => {
                    const auditData = doc.data();
                    auditMapTemp[doc.id] = auditData.title;
                });
                setAuditMap(auditMapTemp);

                // Set rows for the DataTable
                const tableRows = sharedAudits.map((item) => ({
                    sharedBy: (
                        <MDBox display="flex" alignItems="center" lineHeight={1}>
                            <MDTypography display="block" variant="button" fontWeight="medium">
                                {userMap[item.sharedBy] || "Unknown User"}
                            </MDTypography>
                        </MDBox>
                    ),
                    title: (
                        <MDTypography variant="caption" color="text" fontWeight="medium">
                            {auditMap[item.auditId] || "Unknown Title"}
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
                            onClick={() => handleRespondClick(item.auditId)}
                        >
                            Respond
                        </Button>
                    ),
                    rawItem: item,
                }));

                setRows(tableRows);
            } catch (error) {
                console.error("Error fetching Firestore data:", error);
                setNoData(true);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleRespondClick = async (auditId) => {
        // Navigate to the respond page or handle the response
        navigate(`/respond-audit/${auditId}`);
    };

    const columns = [
        { Header: 'Shared By', accessor: 'sharedBy', width: '30%', align: 'left' },
        { Header: 'Title', accessor: 'title', align: 'left' },
        { Header: 'Shared On', accessor: 'sharedAt', align: 'center' },
        { Header: 'Action', accessor: 'action', align: 'center' },
    ];

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox pt={6} pb={3}>
                {loading && <Loading />}
                {noData && !loading && <EmptyState />}
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
                                        Audits Shared With You
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
        </DashboardLayout>
    );
}

export default SharedAudit;
