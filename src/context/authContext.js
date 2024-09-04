import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import prop-types for type checking
import { auth } from '../Firebase'; // Firebase authentication import (make sure the path is correct)

// Create a context for the authentication state
const AuthContext = createContext();

// Custom hook to use the AuthContext
export function useAuth() {
  // This allows any component to easily access the authentication context
  return useContext(AuthContext);
}

// AuthProvider component to wrap around any component that needs authentication state
export function AuthProvider({ children }) { // Destructure 'children' from props
  const [currentUser, setCurrentUser] = useState(null); // State to store the current authenticated user
  const [loading, setLoading] = useState(true); // State to manage the loading status while checking authentication

  // useEffect hook to listen to Firebase authentication state changes
  useEffect(() => {
    // Firebase function that listens for changes in authentication state
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user); // Set the current user if authenticated
      setLoading(false); // Once the state is determined, set loading to false
    });

    // Unsubscribe from the listener when the component unmounts
    return unsubscribe;
  }, []); // Empty dependency array means this effect runs once on component mount

  // The value provided to the AuthContext consumers, including the current user
  const value = { currentUser };

  return (
    // Provide the currentUser to all children components that use this context
    <AuthContext.Provider value={value}>
      {/* Render the children only if the loading state is false */}
      {!loading && children}
    </AuthContext.Provider>
  );
}

// PropTypes validation to ensure 'children' prop is passed and is a valid React node
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
