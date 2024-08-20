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

// @mui material components
import Grid from '@mui/material/Grid';

// Material Dashboard 2 React components

import { Fragment } from 'react';
// Material Dashboard 2 React examples
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import FormBuilder from 'components/FormBuilder';
import 'react-nestable/dist/styles/index.css';

import Card from '@mui/material/Card';
import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../../Firebase';
import Cards from './components/Cards';
// Material Dashboard 2 React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';

// Material Dashboard 2 React example components
import Footer from 'examples/Footer';
import DataTable from 'examples/Tables/DataTable';

// Data
import authorsTableData from 'layouts/tables/data/authorsTableData';
import projectsTableData from 'layouts/tables/data/projectsTableData';

function Audits() {
  const UserFormsPage = () => {
    const [forms, setForms] = useState([]);

    useEffect(() => {
      const fetchForms = async () => {
        const user = auth.currentUser;
        if (user) {
          const formsCollectionRef = collection(db, 'Audit');
          const q = query(formsCollectionRef, where('userId', '==', user.uid));
          const querySnapshot = await getDocs(q);
          const userForms = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setForms(userForms);
        }
      };
      fetchForms();
    }, []);

    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', padding: '16px' }}>
        {forms.map(form => (
          <Cards key={form.id} form={form} />
        ))}
      </div>
    );
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <UserFormsPage />
    </DashboardLayout>
  );
}

export default Audits;
