import { useState, useEffect, useCallback } from 'react';
import { useLocation, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Icon from '@mui/material/Icon';
import MDBox from 'components/MDBox';
import CaughtUp from 'components/States/caughtUp';
import MDTypography from 'components/MDTypography';
import { collection, query, where, orderBy, getDocs, doc, getDoc, writeBatch } from 'firebase/firestore';
import { db, auth } from '../../../Firebase';
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarMobileMenu,
} from 'examples/Navbars/DashboardNavbar/styles';
import {
  useMaterialUIController,
  setTransparentNavbar,
  setMiniSidenav,
  setOpenConfigurator,
} from 'context';
import Breadcrumbs from 'examples/Breadcrumbs';
import { formatDistanceToNow } from 'date-fns';

function DashboardNavbar({ absolute, light, isMini }) {
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator, darkMode } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [viewedNotificationIds, setViewedNotificationIds] = useState([]);
  const route = useLocation().pathname.split('/').slice(1);

  const markNotificationsAsSeen = async (notificationIds) => {
    if (!notificationIds.length) return;

    console.log('Marking notifications as seen:', notificationIds);
    const batch = writeBatch(db);

    notificationIds.forEach(id => {
      if (id) {
        const notificationRef = doc(db, 'Notifications', id);
        batch.update(notificationRef, { seen: true });
      } else {
        console.error('Invalid notification ID:', id);
      }
    });

    try {
      await batch.commit();
      console.log('Notifications marked as seen');
    } catch (error) {
      console.error('Error during batch commit:', error);
    }
  };

  useEffect(() => {
    if (fixedNavbar) {
      setNavbarType('sticky');
    } else {
      setNavbarType('static');
    }

    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    window.addEventListener('scroll', handleTransparentNavbar);
    handleTransparentNavbar();

    return () => window.removeEventListener('scroll', handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!auth.currentUser) return;

      const userId = auth.currentUser.uid;

      const notificationsQuery = query(
        collection(db, 'Notifications'),
        where('receiverId', '==', userId),
        where('seen', '==', false),
        orderBy('sharedAt', 'desc')
      );

      try {
        const notificationsSnapshot = await getDocs(notificationsQuery);
        const notificationsData = await Promise.all(notificationsSnapshot.docs.map(async (docSnapshot) => {
          const notification = docSnapshot.data();

          const auditDocRef = doc(db, 'Audit', notification.auditId);
          const auditDocSnapshot = await getDoc(auditDocRef);
          const audit = auditDocSnapshot.data();

          const senderDocRef = doc(db, 'Users', notification.senderId);
          const senderDocSnapshot = await getDoc(senderDocRef);
          const sender = senderDocSnapshot.data();

          return {
            ...notification,
            id: docSnapshot.id,  // Add the ID to track viewed notifications
            auditTitle: audit ? audit.title : 'Unknown Audit',
            senderName: sender ? sender.name : 'Unknown Sender',
            sharedAt: formatDistanceToNow(notification.sharedAt.toDate(), { addSuffix: true }),
          };
        }));

        setNotifications(notificationsData);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    if (openMenu) {
      fetchNotifications();
    }
  }, [openMenu]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
  const handleOpenMenu = (event) => {
    setOpenMenu(event.currentTarget);
  };

  const handleCloseMenu = useCallback(() => {
    setOpenMenu(false);
    // Mark viewed notifications as seen
    if (viewedNotificationIds.length > 0) {
      markNotificationsAsSeen(viewedNotificationIds);
      setViewedNotificationIds([]);
    }
  }, [viewedNotificationIds]);

  const handleNotificationView = (notificationId) => {
    if (!viewedNotificationIds.includes(notificationId)) {
      setViewedNotificationIds((prevIds) => [...prevIds, notificationId]);
    }
  };

  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
    >
      {notifications.length > 0 ? (
        notifications.map((notification, index) => (
          <MDBox key={index} p={2} display="flex" flexDirection="column" onClick={() => handleNotificationView(notification.id)}>
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
          <CaughtUp />
        </MDBox>
      )}
    </Menu>
  );

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
      position={absolute ? 'absolute' : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light, darkMode })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <MDBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
        </MDBox>
        {isMini ? null : (
          <MDBox sx={(theme) => navbarRow(theme, { isMini })}>
            <MDBox color={light ? 'white' : 'inherit'}>
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
                <Icon sx={iconsStyle}>notifications</Icon>
              </IconButton>
              {renderMenu()}
            </MDBox>
          </MDBox>
        )}
      </Toolbar>
    </AppBar>
  );
}

DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
