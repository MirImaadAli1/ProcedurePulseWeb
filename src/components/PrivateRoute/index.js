import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from 'context/authContext';

const withAuth = (Component) => {
  return (props) => {
    const { currentUser } = useAuth();

    if (!currentUser) {
      return <Navigate to="/authentication/sign-in" replace />;
    }

    return <Component {...props} />;
  };
};

export default withAuth;
