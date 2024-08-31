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

// Material Dashboard 2 React examples
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
// Lazy load the FormBuilder component
import React, { Suspense } from 'react';
import 'react-nestable/dist/styles/index.css';

// Lazy load the FormBuilder component
const FormBuilder = React.lazy(() => import('components/FormBuilder'));

function CreateAudit() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Suspense fallback={<div>Loading..</div>}>
        <FormBuilder />
      </Suspense>
    </DashboardLayout>
  );
}

export default CreateAudit;
