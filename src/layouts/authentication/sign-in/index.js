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
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

import bgImage from 'assets/images/greybg.jpg';

// react-router-dom components
import { Link } from 'react-router-dom';

// @mui material components
import Card from '@mui/material/Card';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Grid';
import MuiLink from '@mui/material/Link';

// @mui icons
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';

// Material Dashboard 2 React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import MDInput from 'components/MDInput';
import MDButton from 'components/MDButton';

// Authentication layout components
import BasicLayout from 'layouts/authentication/components/BasicLayout';
import { auth } from '../../../Firebase.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { SetMeal } from '@mui/icons-material';

import { useMaterialUIController } from 'context';

function Basic() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const SignIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        navigate('/dashboard');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  return (
    <BasicLayout image={bgImage}>
      <Card
        sx={{
          borderRadius: '16px',
          overflow: 'hidden',
        }}
      >
        <MDBox
          variant="gradient"
          bgColor={darkMode ? 'dark' : 'white'}
          borderRadius="lg"
          coloredShadow="dark"
          mt={-1}
          p={1}
          pt={2}
          mb={1}
          textAlign="center"
          sx={{
            borderTopLeftRadius: '16px',
            borderTopRightRadius: '16px',
            borderBottomLeftRadius: '0px',
            borderBottomRightRadius: '0px',
            marginBottom: '0px',
          }}
        >
          <MDTypography variant="h4" fontWeight="medium" color="dark" mt={1}>
            Sign in
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3} bgColor={darkMode ? 'dark' : 'white'} variant="gradient">
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                InputProps={{
                  style: { color: 'dark' }, // Input text color to white
                }}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                InputProps={{
                  style: { color: 'dark' }, // Input text color to white
                }}
              />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1} pt={1} pb={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="dark"
                onClick={handleSetRememberMe}
                sx={{ cursor: 'pointer', userSelect: 'none', ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={SignIn}>
                sign in
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="dark" fontWeight="regular">
                Don&apos;t have an account?{' '}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
