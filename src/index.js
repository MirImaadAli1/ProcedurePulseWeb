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

// Importing React, the primary library for building user interfaces in JavaScript.
import React from 'react';

// Importing `createRoot` from React DOM to render the React app into the root element of the HTML.
import { createRoot } from 'react-dom/client';

// Importing `BrowserRouter` from 'react-router-dom' for routing within the app, allowing navigation between different components/pages.
import { BrowserRouter } from 'react-router-dom';

// Importing custom CSS styles for the entire app from the `index.css` file.
import './index.css';

// Importing the main `App` component which will serve as the entry point for the application.
import App from 'App';

// Importing a context provider from Material Dashboard 2 React for managing global state within the app.
import { MaterialUIControllerProvider } from 'context';

// Getting the DOM element with the id of 'app' to serve as the root where the React app will be rendered.
const container = document.getElementById('app');

// Creating a root for the React app using `createRoot`, enabling concurrent rendering in React.
const root = createRoot(container);

// Rendering the `App` component within `BrowserRouter` and `MaterialUIControllerProvider`.
// `BrowserRouter` wraps the app to enable routing.
// `MaterialUIControllerProvider` provides a global state/context to the entire app for Material UI theme and other settings.
root.render(
  <BrowserRouter>
    <MaterialUIControllerProvider>
      <App />
    </MaterialUIControllerProvider>
  </BrowserRouter>
);
