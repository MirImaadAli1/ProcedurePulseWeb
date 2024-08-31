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
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/
import React, { lazy, Suspense } from 'react';
// Material Dashboard 2 React layouts

import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
// @mui icons
import Icon from '@mui/material/Icon';
<<<<<<< HEAD
=======
import Audits from 'layouts/audits';
import Audit_search from 'layouts/audit-search';
import SharedAudit from 'layouts/sharedAudits';
import YourResponses from 'layouts/yourResponses';
import Cover from 'layouts/authentication/reset-password/cover';

>>>>>>> 06662a5a7bb7490ba114ca19256a1f4e2d0511ff
import withAuth from 'components/PrivateRoute';
// Lazy load components
const Dashboard = lazy(() => import('layouts/dashboard'));
const CreateAudit = lazy(() => import('layouts/createAudit'));
const Notifications = lazy(() => import('layouts/notifications'));
const SignIn = lazy(() => import('layouts/authentication/sign-in'));
const SignUp = lazy(() => import('layouts/authentication/sign-up'));
const LandingPage = lazy(() => import('layouts/landing-page'));
const Audits = lazy(() => import('layouts/audits'));
const Audit_search = lazy(() => import('layouts/audit-search'));
const SharedAudit = lazy(() => import('layouts/sharedAudits'));
const YourResponses = lazy(() => import('layouts/yourResponses'));
const RespondAudit = lazy(() => import('layouts/respondAudit'));

const ProtectedDashboard = withAuth(Dashboard);
const ProtectedCreateAudit = withAuth(CreateAudit);
const ProtectedNotifications = withAuth(Notifications);
const ProtectedAudits = withAuth(Audits);
const ProtectedAuditSearch = withAuth(Audit_search);
const ProtectedSharedAudit = withAuth(SharedAudit);
const ProtectedYourResponses = withAuth(YourResponses);
const ProtectedRespondAudit = withAuth(RespondAudit);

const routes = [
  {
    type: 'collapse',
    name: 'Dashboard',
    key: 'dashboard',
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: '/dashboard',
    component: (
      <Suspense fallback={<div>Loading Dashboard...</div>}>
        <ProtectedDashboard />
      </Suspense>
    ),
  },
  {
    type: 'collapse',
    name: 'Notifications',
    key: 'notifications',
    icon: <Icon fontSize="small">notifications</Icon>,
    route: '/notifications',
    component: (
      <Suspense fallback={<div>Loading Notifications...</div>}>
        <ProtectedNotifications />
      </Suspense>
    ),
  },
  {
    type: 'collapse',
    name: 'Create Audit',
    key: 'createaudit',
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: '/createaudit',
    component: (
      <Suspense fallback={<div>Loading Create Audit...</div>}>
        <ProtectedCreateAudit />
      </Suspense>
    ),
  },
  {
    type: 'collapse',
    name: 'Search Audits',
    key: 'Search Audits',
    icon: <Icon fontSize="small">table_view</Icon>,
    route: '/SearchAudits',
    component: (
      <Suspense fallback={<div>Loading Search Audits...</div>}>
        <ProtectedAuditSearch />
      </Suspense>
    ),
  },
  {
    type: 'collapse',
    name: 'Your Audits',
    key: 'audits',
    icon: <Icon fontSize="small">library_books</Icon>,
    route: '/audits',
    component: (
      <Suspense fallback={<div>Loading Your Audits...</div>}>
        <ProtectedAudits />
      </Suspense>
    ),
  },
  {
    type: 'collapse',
    name: 'Your Responses',
    key: 'your-responses',
    icon: <Icon fontSize="small">assignment</Icon>,
    route: '/yourresponses',
    component: (
      <Suspense fallback={<div>Loading Your Responses...</div>}>
        <ProtectedYourResponses />
      </Suspense>
    ),
  },
  {
    type: 'collapse',
    name: 'Shared Audits',
    key: 'shared-audits',
    icon: <Icon fontSize="small">assignment</Icon>,
    route: '/sharedaudits',
    component: (
      <Suspense fallback={<div>Loading Shared Audits...</div>}>
        <ProtectedSharedAudit />
      </Suspense>
    ),
  },
  {
    key: 'respond-audit',
    route: '/respond-audit/:auditId',
    component: (
      <Suspense fallback={<div>Loading Respond Audit...</div>}>
        <ProtectedRespondAudit />
      </Suspense>
    ),
  },
  {
    key: 'landing-page',
    route: '/',
    component: (
      <Suspense fallback={<div>Loading Landing Page...</div>}>
        <LandingPage />
      </Suspense>
    ),
  },
  {
    key: "sign-in",
    route: "/authentication/sign-in",
    component: (
      <Suspense fallback={<div>Loading Sign In...</div>}>
        <SignIn />
      </Suspense>
    ),
  },
  {
    key: "sign-up",
    route: "/authentication/sign-up",
    component: (
      <Suspense fallback={<div>Loading Sign Up...</div>}>
        <SignUp />
      </Suspense>
    ),
  },
  {
    key: 'reset-password',
    route: '/reset-password',
    component: <Cover />,
    // No `type`, `name`, or `icon` means it's hidden from the sidebar
  },
];

export default routes;
