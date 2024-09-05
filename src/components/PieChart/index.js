import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../../Firebase'; // Firebase configuration import
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';

function PieChartComponent() {
    const [pieChartData, setPieChartData] = useState([]); // Stores chart data
    const [loading, setLoading] = useState(true); // Loading state
    const [noData, setNoData] = useState(false); // No data state
    const currentUser = auth.currentUser; // Get current authenticated user
  
    useEffect(() => {
        if (!currentUser) {
            console.error("User not authenticated.");
            setLoading(false);
            return;
        }

        const currentUserId = currentUser.uid;

        // Function to fetch audits shared with the user
        const fetchSharedAudits = async () => {
            try {
                const sharedAuditsCollectionRef = collection(db, 'SharedAudits');
                const sharedAuditsQuery = query(sharedAuditsCollectionRef, where('sharedWith', '==', currentUserId));
                const sharedAuditsSnapshot = await getDocs(sharedAuditsQuery);

                const sharedAudits = sharedAuditsSnapshot.docs.map(doc => doc.data());
                const sharedAuditIds = sharedAudits.map(audit => audit.auditId);

                if (sharedAudits.length === 0) {
                    setNoData(true);
                    setLoading(false);
                    return;
                }

                // Fetch responses for these audits by the current user
                const responsesCollectionRef = collection(db, 'Responses');
                const responsesQueries = sharedAuditIds.map(auditId => 
                    query(responsesCollectionRef, where('auditId', '==', auditId), where('responderId', '==', currentUserId))
                );

                // Get all responses
                const responsesSnapshots = await Promise.all(responsesQueries.map(q => getDocs(q)));
                const respondedCount = responsesSnapshots.reduce((total, snapshot) => total + snapshot.size, 0);
                const notRespondedCount = sharedAudits.length - respondedCount;

                // Update chart data
                setPieChartData([
                    { name: 'Responded', value: respondedCount },
                    { name: 'Not Responded', value: notRespondedCount },
                ]);
                setLoading(false);

            } catch (error) {
                console.error("Error fetching Firestore data:", error);
                setNoData(true);
                setLoading(false);
            }
        };

        fetchSharedAudits();
    }, [currentUser]); // Re-run if currentUser changes

    // Show loading state while data is being fetched
    if (loading) return <MDBox py={3} display="flex" justifyContent="center"><div>Loading...</div></MDBox>;

    // Show message if no data is available
    if (noData) return <MDBox py={3} display="flex" justifyContent="center"><div>No data available</div></MDBox>;

    return (
        <MDBox>
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
                    Response Status of Shared Audits
                </MDTypography>
            </MDBox>

            // Chart rendering */}
            <MDBox pt={3}>
                <PieChart width={400} height={400}>
                    <Pie
                        data={pieChartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={150}
                        fill="#8884d8"
                        label
                    >
                        //* Dynamic cell color alternation
                        {pieChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#2b79e3' : '#ff008b'} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </MDBox>
        </MDBox>
    );
}

export default PieChartComponent;
