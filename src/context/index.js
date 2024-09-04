/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/**
  This file is used for controlling the global states of the components,
  you can customize the states for the different components here.
*/

import { createContext, useContext, useReducer, useMemo } from 'react';

// prop-types is a library for typechecking of props
import PropTypes from 'prop-types';

// Material Dashboard 2 React main context
const MaterialUI = createContext(); // Create a context for the Material UI state management

// Setting custom name for the context which is visible on react dev tools
MaterialUI.displayName = 'MaterialUIContext'; // This name helps in identifying the context in React DevTools

// Material Dashboard 2 React reducer function to handle state changes
function reducer(state, action) {
  // Switch case based on the action type
  switch (action.type) {
    case 'MINI_SIDENAV': {
      return { ...state, miniSidenav: action.value }; // Toggle mini sidenav
    }
    case 'TRANSPARENT_SIDENAV': {
      return { ...state, transparentSidenav: action.value }; // Toggle transparent sidenav
    }
    case 'WHITE_SIDENAV': {
      return { ...state, whiteSidenav: action.value }; // Toggle white sidenav
    }
    case 'SIDENAV_COLOR': {
      return { ...state, sidenavColor: action.value }; // Set sidenav color
    }
    case 'TRANSPARENT_NAVBAR': {
      return { ...state, transparentNavbar: action.value }; // Toggle transparent navbar
    }
    case 'FIXED_NAVBAR': {
      return { ...state, fixedNavbar: action.value }; // Toggle fixed navbar
    }
    case 'OPEN_CONFIGURATOR': {
      return { ...state, openConfigurator: action.value }; // Toggle configurator panel
    }
    case 'DIRECTION': {
      return { ...state, direction: action.value }; // Set text direction (ltr or rtl)
    }
    case 'LAYOUT': {
      return { ...state, layout: action.value }; // Set layout type (dashboard or other)
    }
    case 'DARKMODE': {
      return { ...state, darkMode: action.value }; // Toggle dark mode
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`); // Throw error if action type is unrecognized
    }
  }
}

// Material Dashboard 2 React context provider component
function MaterialUIControllerProvider({ children }) {
  // Initial state for the dashboard's settings
  const initialState = {
    miniSidenav: false,
    transparentSidenav: false,
    whiteSidenav: false,
    sidenavColor: 'info', // Default sidenav color
    transparentNavbar: true,
    fixedNavbar: true,
    openConfigurator: false,
    direction: 'ltr', // Default direction is left-to-right
    layout: 'dashboard',
    darkMode: false, // Default is light mode
  };

  // useReducer hook to manage the global state using the reducer function
  const [controller, dispatch] = useReducer(reducer, initialState);

  // useMemo hook to memoize the value to prevent unnecessary renders
  const value = useMemo(() => [controller, dispatch], [controller, dispatch]);

  // Provide the global state and dispatch to all children
  return <MaterialUI.Provider value={value}>{children}</MaterialUI.Provider>;
}

// Custom hook to use the MaterialUI context
function useMaterialUIController() {
  const context = useContext(MaterialUI); // Access the MaterialUI context

  // Throw an error if the hook is used outside the context provider
  if (!context) {
    throw new Error(
      'useMaterialUIController should be used inside the MaterialUIControllerProvider.'
    );
  }

  return context; // Return the context value (controller and dispatch)
}

// Typechecking props for the MaterialUIControllerProvider
MaterialUIControllerProvider.propTypes = {
  children: PropTypes.node.isRequired, // Ensure the children prop is provided and is valid React nodes
};

// Context module functions to dispatch actions
const setMiniSidenav = (dispatch, value) => dispatch({ type: 'MINI_SIDENAV', value });
const setTransparentSidenav = (dispatch, value) => dispatch({ type: 'TRANSPARENT_SIDENAV', value });
const setWhiteSidenav = (dispatch, value) => dispatch({ type: 'WHITE_SIDENAV', value });
const setSidenavColor = (dispatch, value) => dispatch({ type: 'SIDENAV_COLOR', value });
const setTransparentNavbar = (dispatch, value) => dispatch({ type: 'TRANSPARENT_NAVBAR', value });
const setFixedNavbar = (dispatch, value) => dispatch({ type: 'FIXED_NAVBAR', value });
const setOpenConfigurator = (dispatch, value) => dispatch({ type: 'OPEN_CONFIGURATOR', value });
const setDirection = (dispatch, value) => dispatch({ type: 'DIRECTION', value });
const setLayout = (dispatch, value) => dispatch({ type: 'LAYOUT', value });
const setDarkMode = (dispatch, value) => dispatch({ type: 'DARKMODE', value });

// Export everything needed to use the global state in other components
export {
  MaterialUIControllerProvider,
  useMaterialUIController,
  setMiniSidenav,
  setTransparentSidenav,
  setWhiteSidenav,
  setSidenavColor,
  setTransparentNavbar,
  setFixedNavbar,
  setOpenConfigurator,
  setDirection,
  setLayout,
  setDarkMode,
};
