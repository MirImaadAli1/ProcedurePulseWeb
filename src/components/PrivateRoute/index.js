import React from 'react';
import PropTypes from 'prop-types';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const { currentUser } = useAuth();
  
  return (
    <Route
      {...rest}
      element={currentUser ? <Element /> : <Navigate to="/sign-in" />}
    />
  );
};

PrivateRoute.propTypes = {
  element: PropTypes.elementType.isRequired, // Ensure 'element' is a valid React component
};

export default PrivateRoute;
