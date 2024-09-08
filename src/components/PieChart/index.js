import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../../Firebase'; // Ensure this path is correct
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';

function PieChartComponent() {
    const [pieChartData, setPieChartData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [noData, setNoData] = useState(false);
    const currentUser = auth.currentUser;
  
    useEffect(() => {
        if (!currentUser) {
            console.error("User not authenticated.");
            setLoading(false);
            return;
        }

        const currentUserId = currentUser.uid;

        // Fetch audits shared with the user
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

                // Fetch responses to these audits by the current user
                const responsesCollectionRef = collection(db, 'Responses');
                const responsesQueries = sharedAuditIds.map(auditId => 
                    query(responsesCollectionRef, where('auditId', '==', auditId), where('responderId', '==', currentUserId))
                );

                const responsesSnapshots = await Promise.all(responsesQueries.map(q => getDocs(q)));
                const respondedCount = responsesSnapshots.reduce((total, snapshot) => total + snapshot.size, 0);
                const notRespondedCount = sharedAudits.length - respondedCount;

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
    }, [currentUser]);

    if (loading) return <MDBox py={3} display="flex" justifyContent="center"><div>Loading...</div></MDBox>;
    if (noData) return <MDBox py={3} display="flex" justifyContent="center"><di>Respond to Audits to see your data</di></MDBox>;

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
