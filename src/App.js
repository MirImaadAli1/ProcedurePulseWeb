import { useState, useMemo, useEffect, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Sidenav from 'examples/Sidenav';
import theme from 'assets/theme';
// Removed themeDark import
import ProtectedRoute from 'components/PrivateRoute';

// Images
import brandWhite from 'assets/images/logo-ct.png';
// import brandDark from 'assets/images/logo-ct-dark.png';

import routes from 'routes';
import { useMaterialUIController, setMiniSidenav } from 'context';
import { AuthProvider } from 'context/authContext';

export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    // Removed darkMode
  } = controller; 
  const [onMouseEnter, setOnMouseEnter] = useState(false);

  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };



  useEffect(() => {
    document.body.setAttribute('dir', direction);
  }, [direction]);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, []);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return (
          <Route
            path={route.route}
            element={
              <Suspense fallback={<div>Loading...</div>}>
                {route.private ? (
                  <ProtectedRoute>{route.component}</ProtectedRoute>
                ) : (
                  route.component
                )}
              </Suspense>
            }
            key={route.key}
          />
        );
      }

      return null;
    });

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {layout === 'dashboard' && (
          <Sidenav
            color={sidenavColor}
            brand={(transparentSidenav && !darkMode) || brandWhite}
            brandName="ProcedurePulse"
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
        )}
        {layout === 'vr'}
        <Routes>
          {getRoutes(routes)}
          <Route path="*" element={<Navigate to="/landing-page" />} />
        </Routes>
      </ThemeProvider>
    </AuthProvider>
  );
}
