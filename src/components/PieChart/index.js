import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../../Firebase';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';

function PieChartComponent() {
    const [pieChartData, setPieChartData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [noData, setNoData] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const currentUser = auth.currentUser;

                if (!currentUser) {
                    console.error("User not authenticated.");
                    return;
                }

                const currentUserId = currentUser.uid;

                // Fetch user's audits
                const auditsCollectionRef = collection(db, 'Audit');
                const auditsQuery = query(auditsCollectionRef, where('userId', '==', currentUserId));
                const auditsSnapshot = await getDocs(auditsQuery);
                const auditIds = auditsSnapshot.docs.map(doc => doc.id);

                // Fetch responses for these audits
                let responsesCount = 0;
                let totalAudits = auditIds.length;

                for (const auditId of auditIds) {
                    const responsesCollectionRef = collection(db, 'Responses');
                    const responsesQuery = query(responsesCollectionRef, where('auditId', '==', auditId));
                    const responsesSnapshot = await getDocs(responsesQuery);
                    responsesCount += responsesSnapshot.size;
                }

                // Fetch shared audits
                const sharedAuditsCollectionRef = collection(db, 'SharedAudits');
                const sharedAuditsQuery = query(sharedAuditsCollectionRef, where('sharedWith', '==', currentUserId));
                const sharedAuditsSnapshot = await getDocs(sharedAuditsQuery);
                const sharedAudits = sharedAuditsSnapshot.docs.map(doc => doc.data());
                const respondedCount = sharedAudits.filter(audit => auditIds.includes(audit.auditId)).length;
                const notRespondedCount = sharedAudits.length - respondedCount;

                setPieChartData([
                    { name: 'Responded', value: respondedCount },
                    { name: 'Not Responded', value: notRespondedCount },
                ]);

                setLoading(false);
            } catch (error) {
                console.error("Error fetching Firestore data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (noData) return <div>No data available</div>;

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
                            <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#8884d8' : '#82ca9d'} />
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
