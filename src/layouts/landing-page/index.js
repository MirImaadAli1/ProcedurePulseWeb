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

import { useState } from 'react';

// react-router-dom components
import { Link } from 'react-router-dom';

// @mui material components
import Card from '@mui/material/Card';

// Material Dashboard 2 React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';

// Authentication layout components
import BasicLayout from 'layouts/authentication/components/BasicLayout';

// Images
import bgImage from 'assets/images/bg-sign-in-basic.jpeg';

function LandingPage() {
  const [rememberMe, setRememberMe] = useState(false);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox display="flex" justifyContent="center" alignItems="center" pt={0} pb={1} px={1}>
          <MDTypography variant="subtitle2" fontWeight="regular" color="dark" mt={1}>
            {`ProcedurePulse is a user-owned process standardization tool and sharing website that allows you to create and distribute standard methods, with responses available and accessible to You`}
          </MDTypography>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default LandingPage;
