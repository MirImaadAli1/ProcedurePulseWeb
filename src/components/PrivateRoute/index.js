import React from 'react';
import { Navigate } from 'react-router-dom'; // Used to redirect the user to another route.
import { useAuth } from 'context/authContext'; // Hook to access authentication context.

const withAuth = (Component) => { // Higher-Order Component that wraps around any passed component.
  return (props) => {
    const { currentUser } = useAuth(); // Get the current authenticated user from the auth context.

    if (!currentUser) {
      // If no user is logged in, redirect to the sign-in page.
      return <Navigate to="/authentication/sign-in" replace />;
    }

    // If authenticated, render the wrapped component with all passed props.
    return <Component {...props} />;
  };
};

export default withAuth; // Export the HOC for use in other parts of the application.
