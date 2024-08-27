import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../../Firebase.js'; // Adjust path if necessary
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'examples/Footer';
import { formatDistanceToNow } from 'date-fns';

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate(); // Initialize navigate hook

  useEffect(() => {
    const fetchNotifications = async () => {
      const currentUser = auth.currentUser; // Get the currently logged-in user
      const notificationsRef = collection(db, 'Notifications');
      const q = query(notificationsRef, where('receiverId', '==', currentUser.uid));

      const notificationsSnapshot = await getDocs(q);
      const notificationsList = await Promise.all(
        notificationsSnapshot.docs.map(async (notificationDoc) => {
          const notificationData = notificationDoc.data();

          // Fetch the sender's name
          const senderDoc = await getDoc(doc(db, 'Users', notificationData.senderId));
          const senderName = senderDoc.exists() ? senderDoc.data().name : 'Unknown User';

          // Fetch the audit's name
          const auditDoc = await getDoc(doc(db, 'Audit', notificationData.auditId));
          const auditName = auditDoc.exists() ? auditDoc.data().title : 'Unknown Audit';

          return {
            id: notificationDoc.id,
            senderName,
            auditName,
            auditId: notificationData.auditId, // Store auditId for navigation
            sharedAt: notificationData.sharedAt.toDate(),
          };
        })
      );

      // Sort the notifications in descending order by the sharedAt timestamp
      notificationsList.sort((a, b) => b.sharedAt - a.sharedAt);

      setNotifications(notificationsList);
    };

    fetchNotifications();
  }, []);

  // Handler for clicking a notification
  const handleNotificationClick = (auditId) => {
    navigate(`/respond-audit/${auditId}`); // Navigate to RespondAudit with the auditId
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={6} mb={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={8}>
            <Card>
              <MDBox pt={2} px={2}>
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <MDBox
                      key={notification.id}
                      mb={2}
                      onClick={() => handleNotificationClick(notification.auditId)} // Add click event
                      style={{ cursor: 'pointer', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }} // Optional: Add some styling to make it look clickable
                    >
                      <MDTypography variant="body1">
                        <strong>{notification.senderName}</strong> shared an audit{' '}
                        <strong>{notification.auditName}</strong> with you{' '}
                        {formatDistanceToNow(notification.sharedAt)} ago.
                      </MDTypography>
                    </MDBox>
                  ))
                ) : (
                  <MDTypography variant="body1" color="textSecondary">
                    No notifications yet.
                  </MDTypography>
                )}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Notifications;
