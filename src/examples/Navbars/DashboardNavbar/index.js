import { useState, useEffect, useCallback } from 'react';
import { useLocation, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Icon from '@mui/material/Icon';
import MDBox from 'components/MDBox';
import CaughtUp from 'components/States/caughtUp'; // Component to display when all notifications are seen
import MDTypography from 'components/MDTypography';
import { collection, query, where, orderBy, getDocs, doc, getDoc, writeBatch } from 'firebase/firestore'; // Firebase imports
import { db, auth } from '../../../Firebase';
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarMobileMenu,
} from 'examples/Navbars/DashboardNavbar/styles'; // Style imports for navbar
import { useNavigate } from 'react-router-dom';
import {
  useMaterialUIController, // Custom hook to access global state
  setTransparentNavbar,
  setMiniSidenav,
  setOpenConfigurator,
} from 'context'; // Global context and dispatch actions for navbar UI
import Breadcrumbs from 'examples/Breadcrumbs'; // Breadcrumbs component
import { formatDistanceToNow } from 'date-fns'; // Helper function to format dates
import Loading from 'components/States/loading'; // Component to show when data is loading

function DashboardNavbar({ absolute, light, isMini }) {
  // State management
  const [navbarType, setNavbarType] = useState(); // Tracks whether navbar is sticky or static
  const [controller, dispatch] = useMaterialUIController(); // Get global state and dispatch from context
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator, darkMode } = controller; // Destructure values from global state
  const [openMenu, setOpenMenu] = useState(false); // Controls whether the notification menu is open
  const [notifications, setNotifications] = useState([]); // Stores fetched notifications
  const [viewedNotificationIds, setViewedNotificationIds] = useState([]); // Stores IDs of viewed notifications
  const [loading, setLoading] = useState(true); // Tracks loading state for notifications
  const [error, setError] = useState(null); // Tracks error state if fetching notifications fails
  const navigate = useNavigate(); // React Router function to navigate between pages
  const route = useLocation().pathname.split('/').slice(1); // Extract the current route for breadcrumb

  // Function to mark notifications as seen
  const markNotificationsAsSeen = async (notificationIds) => {
    if (!notificationIds.length) return;

    console.log('Marking notifications as seen:', notificationIds);
    const batch = writeBatch(db); // Use Firebase batch update

    notificationIds.forEach(id => {
      if (id) {
        const notificationRef = doc(db, 'Notifications', id); // Reference to each notification document
        batch.update(notificationRef, { seen: true }); // Update the "seen" field
      } else {
        console.error('Invalid notification ID:', id);
      }
    });

    try {
      await batch.commit(); // Commit the batch update
      console.log('Notifications marked as seen');
    } catch (error) {
      console.error('Error during batch commit:', error);
    }
  };

  // Effect to manage navbar transparency based on scroll and fixed position
  useEffect(() => {
    if (fixedNavbar) {
      setNavbarType('sticky'); // Set navbar type to sticky if it's fixed
    } else {
      setNavbarType('static'); // Otherwise, set it to static
    }

    function handleTransparentNavbar() {
      // Set transparent navbar based on scroll position and whether it's fixed
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    window.addEventListener('scroll', handleTransparentNavbar); // Add event listener to handle scroll behavior
    handleTransparentNavbar();

    return () => window.removeEventListener('scroll', handleTransparentNavbar); // Cleanup event listener on unmount
  }, [dispatch, fixedNavbar]);

  // Effect to fetch notifications when the notification menu is opened
  useEffect(() => {
    const fetchNotifications = async () => {
      if (!auth.currentUser) {
        setLoading(false); // If no user is authenticated, stop loading
        return;
      }

      const userId = auth.currentUser.uid;

      const notificationsQuery = query(
        collection(db, 'Notifications'),
        where('receiverId', '==', userId), // Query notifications for the current user
        where('seen', '==', false), // Only fetch unseen notifications
        orderBy('sharedAt', 'desc') // Order by the timestamp when shared
      );

      try {
        const notificationsSnapshot = await getDocs(notificationsQuery); // Fetch notifications
        const notificationsData = await Promise.all(notificationsSnapshot.docs.map(async (docSnapshot) => {
          const notification = docSnapshot.data();

          const auditDocRef = doc(db, 'Audit', notification.auditId); // Fetch related audit document
          const auditDocSnapshot = await getDoc(auditDocRef);
          const audit = auditDocSnapshot.data();

          const senderDocRef = doc(db, 'Users', notification.senderId); // Fetch sender's user data
          const senderDocSnapshot = await getDoc(senderDocRef);
          const sender = senderDocSnapshot.data();

          return {
            ...notification,
            id: docSnapshot.id,  // Add the ID to track viewed notifications
            auditTitle: audit ? audit.title : 'Unknown Audit', // Handle unknown audit case
            senderName: sender ? sender.name : 'Unknown Sender', // Handle unknown sender case
            sharedAt: formatDistanceToNow(notification.sharedAt.toDate(), { addSuffix: true }), // Format shared date
          };
        }));

        setNotifications(notificationsData); // Update state with fetched notifications
        setError(null); // Clear any previous errors
      } catch (error) {
        console.error('Error fetching notifications:', error);
        setError('Error fetching notifications'); // Set error state if fetching fails
      } finally {
        setLoading(false); // Stop loading when fetching is complete
      }
    };

    if (openMenu) {
      fetchNotifications(); // Fetch notifications if menu is opened
    }
  }, [openMenu]);

  // Event handlers for the navbar
  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav); // Toggle mini sidenav
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator); // Open configuration panel
  const handleOpenMenu = (event) => {
    setOpenMenu(event.currentTarget); // Open notifications menu
  };

  // Close menu and mark viewed notifications as seen
  const handleCloseMenu = useCallback(() => {
    setOpenMenu(false);
    if (viewedNotificationIds.length > 0) {
      markNotificationsAsSeen(viewedNotificationIds); // Mark notifications as seen when menu closes
      setViewedNotificationIds([]); // Clear viewed notifications state
    }
  }, [viewedNotificationIds]);

  // Track viewed notifications
  const handleNotificationView = (notificationId) => {
    if (!viewedNotificationIds.includes(notificationId)) {
      setViewedNotificationIds((prevIds) => [...prevIds, notificationId]); // Add notification to viewed list
    }
  };

  // Handle notification click to navigate to a specific audit
  const handleNotificationClick = async (notificationId, auditId) => {
    try {
      await markNotificationsAsSeen([notificationId]); // Mark notification as seen
      navigate(`/respond-audit/${auditId}`); // Navigate to audit response page
    } catch (error) {
      console.error('Error handling notification click:', error);
    }
  };

  // Function to render the notification menu
  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={Boolean(openMenu)} // Check if the menu should be open
      onClose={handleCloseMenu} // Close menu handler
      sx={{ mt: 2 }}
    >
      {loading ? ( // Show loading state if data is still being fetched
        <Loading />
      ) : error ? ( // Show error message if there's an error
        <MDBox p={2} display="flex" flexDirection="column">
          <MDTypography variant="body2" color="error">
            {error}
          </MDTypography>
        </MDBox>
      ) : notifications.length > 0 ? ( // If there are notifications, map over them
        notifications.map((notification, index) => (
          <MDBox
            key={index}
            p={2}
            display="flex"
            flexDirection="column"
            border="1px solid"
            borderRadius="10px"
            borderColor="grey.300" // Set border color
            mb={2} // Spacing between notifications
            onClick={() => {
              handleNotificationView(notification.id); // Mark as viewed
              handleNotificationClick(notification.id, notification.auditId); // Navigate to RespondAudit
            }}
          >
            {/* Display notification details */}
            <MDTypography variant="body2" color="textPrimary">
              {notification.senderName} shared audit "{notification.auditTitle}" with you
            </MDTypography>
            <MDTypography variant="caption" color="textSecondary">
              {notification.sharedAt}
            </MDTypography>
          </MDBox>
        ))
      ) : (
        <MDBox p={2} display="flex" flexDirection="column">
          <CaughtUp /> {/* Display this if all notifications have been viewed */}
        </MDBox>
      )}
    </Menu>
  );

  // Style for icons based on theme settings
  const iconsStyle = ({ palette: { dark, white, text }, functions: { rgba } }) => ({
    color: () => {
      let colorValue = light || darkMode ? white.main : dark.main;

      if (transparentNavbar && !light) {
        colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
      }

      return colorValue;
    },
  });

  return (
    <AppBar
      position={absolute ? 'absolute' : navbarType} // Set the position based on navbar type
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light, darkMode })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        {/* Breadcrumbs for showing navigation path */}
        <MDBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
        </MDBox>
        {!isMini && (
          <MDBox sx={(theme) => navbarRow(theme, { isMini })}>
            <MDBox color={light ? 'white' : 'inherit'}>
              {/* Mini sidenav toggle button */}
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarMobileMenu}
                onClick={handleMiniSidenav}
              >
                <Icon sx={iconsStyle} fontSize="medium">
                  {miniSidenav ? 'menu_open' : 'menu'}
                </Icon>
              </IconButton>
              {/* Notifications menu button */}
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                aria-controls="notification-menu"
                aria-haspopup="true"
                variant="contained"
                onClick={handleOpenMenu}
              >
                <Icon sx={iconsStyle} fontSize="medium">
                  notifications
                </Icon>
              </IconButton>
            </MDBox>
          </MDBox>
        )}
      </Toolbar>
      {renderMenu()} {/* Render the notification menu */}
    </AppBar>
  );
}

// PropTypes to validate the props
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

// Default props for the component
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

export default DashboardNavbar; // Export the component
